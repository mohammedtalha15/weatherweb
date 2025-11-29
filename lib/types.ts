export interface PhysicsParameters {
    gravity: number; // 0.1 to 3.0 (Earth = 1.0)
    airDensity: number; // 0.1 to 2.0 kg/m³ (Earth = 1.225)
    pressure: number; // 500 to 1500 mb (Earth = 1013)
    co2: number; // 200 to 2000 ppm (Earth = 400)
    sunlight: number; // 0.5 to 2.0 (Earth = 1.0)
    cloudCondensation: number; // 0.5 to 2.0 (Earth = 1.0)
    windDrag: number; // 0.1 to 2.0 (Earth = 1.0)
    humidity: number; // 0 to 100 %
}

export interface WeatherOutput {
    temperature: number; // °C
    cloudAltitude: number; // meters
    precipitationChance: number; // 0-100%
    windSpeed: number; // km/h
    evaporationRate: number; // mm/day
    stormProbability: number; // 0-100%
    heatIndex: number; // °C
    visibility: number; // km
    dewPoint: number; // °C
    comfortIndex: number; // 0-100
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
