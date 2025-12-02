import { PhysicsParameters, WeatherOutput } from './types';
import {
    EARTH_GRAVITY,
    BASE_PRESSURE,
    BASE_TEMPERATURE,
    BASE_WIND_SPEED,
    BASE_RAIN_RATE,
    BASE_EVAPORATION,
    BASE_STORM_CHANCE,
    CLOUD_HEIGHT_FACTOR,
} from './constants';

/**
 * Calculate cloud base altitude based on temperature and dew point.
 * The formula approximates the Lifting Condensation Level (LCL).
 * 
 * @param temperature - Current air temperature in Celsius
 * @param dewPoint - Current dew point in Celsius
 * @param gravity - Gravity multiplier (1 = Earth standard)
 * @returns Estimated cloud base altitude in meters
 */
function calculateCloudAltitude(
    temperature: number,
    dewPoint: number,
    gravity: number
): number {
    // Standard lapse rate approximation: (T - Td) * 125
    const baseHeight = (temperature - dewPoint) * CLOUD_HEIGHT_FACTOR;

    // Gravity affects atmospheric density gradient.
    // Lower gravity means the atmosphere is less compressed, so clouds form higher.
    const gravityFactor = 1 / gravity;

    return baseHeight * gravityFactor;
}

/**
 * Calculate rainfall rate based on environmental factors.
 * 
 * @param gravity - Gravity multiplier
 * @param pressure - Atmospheric pressure in hPa
 * @param humidity - Relative humidity percentage (0-100)
 * @param cloudCondensation - Multiplier for cloud density
 * @returns Rainfall rate in mm/hour (approximate)
 */
function calculateRainfall(
    gravity: number,
    pressure: number,
    humidity: number,
    cloudCondensation: number
): number {
    // Gravity affects droplet fall speed. Higher gravity = faster/harder rain.
    const gravityEffect = Math.pow(gravity, 0.4);

    // Higher pressure generally suppresses updrafts needed for rain,
    // but here we model it as atmospheric density supporting larger droplets.
    const pressureEffect = pressure / BASE_PRESSURE;

    // Humidity is the primary driver. Below a certain threshold, rain is unlikely.
    const humidityEffect = humidity / 100;

    return BASE_RAIN_RATE * gravityEffect * pressureEffect * humidityEffect * cloudCondensation;
}

/**
 * Calculate wind speed based on air density and drag
 */
function calculateWindSpeed(
    airDensity: number,
    windDrag: number,
    pressure: number
): number {
    // Lower air density = faster winds
    const densityEffect = 1 / airDensity;
    // Pressure differences drive wind
    const pressureEffect = Math.abs(pressure - BASE_PRESSURE) / BASE_PRESSURE;

    return BASE_WIND_SPEED * densityEffect * windDrag * (1 + pressureEffect);
}

/**
 * Calculate evaporation rate
 */
function calculateEvaporation(
    humidity: number,
    sunlight: number,
    gravity: number,
    temperature: number
): number {
    // Lower humidity = more evaporation
    const humidityEffect = (100 - humidity) / 100;
    // More sunlight = more evaporation
    const sunlightEffect = sunlight;
    // Lower gravity = easier evaporation
    const gravityEffect = 1 / gravity;
    // Higher temperature = more evaporation
    const tempEffect = temperature > 0 ? 1 + (temperature / 100) : 0.5;

    return BASE_EVAPORATION * humidityEffect * sunlightEffect * gravityEffect * tempEffect;
}

/**
 * Calculate temperature shift based on multiple factors
 */
function calculateTemperature(
    co2: number,
    airDensity: number,
    sunlight: number,
    pressure: number
): number {
    // CO2 greenhouse effect
    const co2Effect = (co2 / 400) * 2; // Doubles temp at 2x CO2
    // Air density affects heat retention
    const densityEffect = airDensity * 0.5;
    // Sunlight directly affects temperature
    const sunlightEffect = (sunlight - 1) * 15; // ±15°C per unit
    // Pressure affects temperature
    const pressureEffect = ((pressure - BASE_PRESSURE) / BASE_PRESSURE) * 5;

    return BASE_TEMPERATURE + co2Effect - densityEffect + sunlightEffect + pressureEffect;
}

/**
 * Calculate storm probability
 */
function calculateStormProbability(
    humidity: number,
    pressure: number,
    temperature: number,
    windSpeed: number
): number {
    // High humidity increases storms
    const humidityEffect = humidity / 100;
    // Low pressure = storms
    const pressureEffect = pressure < BASE_PRESSURE ? 1.5 : 0.8;
    // Extreme temperatures increase storms
    const tempEffect = Math.abs(temperature - 20) / 20;
    // High winds = storms
    const windEffect = windSpeed / BASE_WIND_SPEED;

    const probability = BASE_STORM_CHANCE * humidityEffect * pressureEffect * (1 + tempEffect) * windEffect;
    return Math.min(100, Math.max(0, probability));
}

/**
 * Calculate dew point from temperature and humidity
 */
function calculateDewPoint(temperature: number, humidity: number): number {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(humidity / 100);
    return (b * alpha) / (a - alpha);
}

/**
 * Calculate heat index (feels like temperature)
 */
function calculateHeatIndex(temperature: number, humidity: number): number {
    if (temperature < 27) return temperature;

    const T = temperature;
    const RH = humidity;

    const HI = -8.78469475556 +
        1.61139411 * T +
        2.33854883889 * RH +
        -0.14611605 * T * RH +
        -0.012308094 * T * T +
        -0.0164248277778 * RH * RH +
        0.002211732 * T * T * RH +
        0.00072546 * T * RH * RH +
        -0.000003582 * T * T * RH * RH;

    return HI;
}

/**
 * Calculate visibility based on humidity and particles
 */
function calculateVisibility(
    humidity: number,
    airDensity: number,
    temperature: number
): number {
    // High humidity reduces visibility
    const humidityEffect = (100 - humidity) / 100;
    // Dense air can hold more particles
    const densityEffect = 1 / airDensity;
    // Temperature inversions affect visibility
    const tempEffect = temperature > 0 ? 1 : 0.7;

    const visibility = 10 * humidityEffect * densityEffect * tempEffect;
    return Math.max(0.5, Math.min(50, visibility));
}

/**
 * Calculate human comfort index (0-100)
 */
function calculateComfortIndex(
    temperature: number,
    humidity: number,
    windSpeed: number,
    pressure: number
): number {
    // Ideal conditions
    const idealTemp = 22;
    const idealHumidity = 50;
    const idealPressure = 1013;

    // Temperature comfort (0-40 scale)
    const tempDiff = Math.abs(temperature - idealTemp);
    const tempScore = Math.max(0, 40 - tempDiff * 2);

    // Humidity comfort (0-30 scale)
    const humidityDiff = Math.abs(humidity - idealHumidity);
    const humidityScore = Math.max(0, 30 - humidityDiff * 0.6);

    // Wind comfort (0-20 scale)
    const windScore = windSpeed < 20 ? 20 - windSpeed * 0.5 : Math.max(0, 20 - (windSpeed - 20));

    // Pressure comfort (0-10 scale)
    const pressureDiff = Math.abs(pressure - idealPressure);
    const pressureScore = Math.max(0, 10 - pressureDiff * 0.01);

    return Math.round(tempScore + humidityScore + windScore + pressureScore);
}

/**
 * Main physics simulation function
 * Takes physics parameters and returns weather outputs
 */
export function simulateWeather(params: PhysicsParameters): WeatherOutput {
    // Calculate temperature first as it affects other calculations
    const temperature = calculateTemperature(
        params.co2,
        params.airDensity,
        params.sunlight,
        params.pressure
    );

    // Calculate dew point
    const dewPoint = calculateDewPoint(temperature, params.humidity);

    // Calculate cloud altitude
    const cloudAltitude = calculateCloudAltitude(temperature, dewPoint, params.gravity);

    // Calculate wind speed
    const windSpeed = calculateWindSpeed(params.airDensity, params.windDrag, params.pressure);

    // Calculate precipitation
    const precipitationChance = Math.min(100, calculateRainfall(
        params.gravity,
        params.pressure,
        params.humidity,
        params.cloudCondensation
    ) * 10);

    // Calculate evaporation
    const evaporationRate = calculateEvaporation(
        params.humidity,
        params.sunlight,
        params.gravity,
        temperature
    );

    // Calculate storm probability
    const stormProbability = calculateStormProbability(
        params.humidity,
        params.pressure,
        temperature,
        windSpeed
    );

    // Calculate heat index
    const heatIndex = calculateHeatIndex(temperature, params.humidity);

    // Calculate visibility
    const visibility = calculateVisibility(params.humidity, params.airDensity, temperature);

    // Calculate comfort index
    const comfortIndex = calculateComfortIndex(temperature, params.humidity, windSpeed, params.pressure);

    return {
        temperature: Math.round(temperature * 10) / 10,
        cloudAltitude: Math.round(cloudAltitude),
        precipitationChance: Math.round(precipitationChance),
        windSpeed: Math.round(windSpeed * 10) / 10,
        evaporationRate: Math.round(evaporationRate * 10) / 10,
        stormProbability: Math.round(stormProbability),
        heatIndex: Math.round(heatIndex * 10) / 10,
        visibility: Math.round(visibility * 10) / 10,
        dewPoint: Math.round(dewPoint * 10) / 10,
        comfortIndex,
    };
}
