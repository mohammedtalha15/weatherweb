// Physical constants
export const EARTH_GRAVITY = 9.81; // m/s²
export const BASE_PRESSURE = 1013; // mb
export const BASE_AIR_DENSITY = 1.225; // kg/m³
export const BASE_TEMPERATURE = 15; // °C
export const BASE_CO2 = 400; // ppm
export const BASE_HUMIDITY = 60; // %

// Default physics parameters (Earth normal)
export const DEFAULT_PARAMS = {
    gravity: 1.0,
    airDensity: 1.225,
    pressure: 1013,
    co2: 400,
    sunlight: 1.0,
    cloudCondensation: 1.0,
    windDrag: 1.0,
    humidity: 60,
};

// Parameter ranges
export const PARAM_RANGES = {
    gravity: { min: 0.1, max: 3.0, step: 0.1 },
    airDensity: { min: 0.1, max: 2.0, step: 0.05 },
    pressure: { min: 500, max: 1500, step: 10 },
    co2: { min: 200, max: 2000, step: 50 },
    sunlight: { min: 0.5, max: 2.0, step: 0.1 },
    cloudCondensation: { min: 0.5, max: 2.0, step: 0.1 },
    windDrag: { min: 0.1, max: 2.0, step: 0.1 },
    humidity: { min: 0, max: 100, step: 5 },
};

// Weather calculation constants
export const CLOUD_HEIGHT_FACTOR = 125; // meters per degree
export const BASE_WIND_SPEED = 15; // km/h
export const BASE_RAIN_RATE = 5; // mm/day
export const BASE_EVAPORATION = 4; // mm/day
export const BASE_STORM_CHANCE = 20; // %

// Color thresholds for UI
export const TEMP_COLORS = {
    freezing: '#00D9FF', // < 0°C
    cold: '#4A90E2', // 0-10°C
    mild: '#50E3C2', // 10-20°C
    warm: '#F5A623', // 20-30°C
    hot: '#FF006E', // > 30°C
};

export const SEVERITY_COLORS = {
    safe: '#50E3C2',
    caution: '#F5A623',
    warning: '#FF6B35',
    danger: '#FF006E',
};
