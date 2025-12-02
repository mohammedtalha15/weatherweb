/**
 * Fundamental physics parameters that drive the weather simulation.
 * These are the inputs controlled by the user via sliders.
 */
export interface PhysicsParameters {
    /** Gravity multiplier relative to Earth (1.0 = 9.81 m/s²) */
    gravity: number; // Range: 0.1 to 3.0
    /** Atmospheric density in kg/m³ (Earth sea level = 1.225) */
    airDensity: number; // Range: 0.1 to 2.0
    /** Atmospheric pressure in millibars/hPa (Earth standard = 1013) */
    pressure: number; // Range: 500 to 1500
    /** Carbon Dioxide concentration in parts per million (Earth ~420) */
    co2: number; // Range: 200 to 2000
    /** Solar irradiance multiplier (1.0 = Earth standard) */
    sunlight: number; // Range: 0.5 to 2.0
    /** Cloud condensation nuclei multiplier (affects cloud formation) */
    cloudCondensation: number; // Range: 0.5 to 2.0
    /** Aerodynamic drag coefficient multiplier */
    windDrag: number; // Range: 0.1 to 2.0
    /** Relative humidity percentage */
    humidity: number; // Range: 0 to 100
}

/**
 * Calculated weather metrics resulting from the physics simulation.
 * These are the outputs displayed on the dashboard.
 */
export interface WeatherOutput {
    /** Surface temperature in Celsius */
    temperature: number;
    /** Altitude of the cloud base in meters */
    cloudAltitude: number;
    /** Probability of precipitation (0-100%) */
    precipitationChance: number;
    /** Wind speed in km/h */
    windSpeed: number;
    /** Rate of water evaporation in mm/day */
    evaporationRate: number;
    /** Probability of storm conditions (0-100%) */
    stormProbability: number;
    /** Heat Index (feels-like temperature) in Celsius */
    heatIndex: number;
    /** Visibility distance in kilometers */
    visibility: number;
    /** Dew point temperature in Celsius */
    dewPoint: number;
    /** Human comfort score (0-100, where 100 is ideal) */
    comfortIndex: number;
}

export interface AIExplanation {
    summary: string;
    scientific: string;
    biological: string;
    comfortIndex: number;
    dayFeeling: string;
    risks: string;
    funFact: string;
}

export interface ComparisonData {
    earth: WeatherOutput;
    modified: WeatherOutput;
    parameters: PhysicsParameters;
}
