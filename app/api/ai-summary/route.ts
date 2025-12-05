import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PhysicsParameters, WeatherOutput } from '@/lib/types';

export async function POST(request: NextRequest) {
    let parameters: PhysicsParameters | null = null;
    let weatherOutput: WeatherOutput | null = null;

    try {
        const body = await request.json();
        parameters = body.parameters;
        weatherOutput = body.weatherOutput;

        if (!parameters || !weatherOutput) {
            throw new Error('Invalid request body');
        }

        // Check for API key
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            // Return mock data if no API key
            return NextResponse.json(generateFallbackResponse(parameters, weatherOutput));
        }

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Create prompt
        const prompt = `You are an expert climate physicist.

User changed the following physics parameters:
- Gravity: ${parameters.gravity}x Earth gravity (normal = 1.0)
- Air Density: ${parameters.airDensity} kg/m³ (normal = 1.225)
- Pressure: ${parameters.pressure} mb (normal = 1013)
- CO₂: ${parameters.co2} ppm (normal = 400)
- Sunlight: ${parameters.sunlight}x normal intensity
- Humidity: ${parameters.humidity}%
- Wind Drag: ${parameters.windDrag}x
- Cloud Condensation: ${parameters.cloudCondensation}x

This resulted in:
- Temperature: ${weatherOutput.temperature}°C
- Cloud Altitude: ${weatherOutput.cloudAltitude}m
- Rain Chance: ${weatherOutput.precipitationChance}%
- Wind Speed: ${weatherOutput.windSpeed} km/h
- Storm Probability: ${weatherOutput.stormProbability}%
- Evaporation Rate: ${weatherOutput.evaporationRate} mm/day
- Visibility: ${weatherOutput.visibility} km
- Human Comfort: ${weatherOutput.comfortIndex}/100

Explain the resulting weather in EXACTLY this format (use clear section headers):

1. SIMPLE SUMMARY
[2-3 sentences for general audience explaining the main weather changes]

2. SCIENTIFIC EXPLANATION
[Detailed physics reasoning about why these changes occurred]

3. BIOLOGICAL IMPACT
[Effects on plants, humans, and animals in these conditions]

4. WHAT YOUR DAY FEELS LIKE
[Vivid, sensory description of what it would be like to experience this weather]

5. RISKS & ANOMALIES
[Potential dangers or unusual effects - be specific about safety concerns]

6. FUN FACT
[Interesting trivia related to these physics changes]

Keep each section concise but informative. Use engaging language.`;

        // Generate AI response
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Parse the response into sections
        const sections = {
            summary: extractSection(text, '1. SIMPLE SUMMARY', '2. SCIENTIFIC EXPLANATION'),
            scientific: extractSection(text, '2. SCIENTIFIC EXPLANATION', '3. BIOLOGICAL IMPACT'),
            biological: extractSection(text, '3. BIOLOGICAL IMPACT', '4. WHAT YOUR DAY FEELS LIKE'),
            dayFeeling: extractSection(text, '4. WHAT YOUR DAY FEELS LIKE', '5. RISKS & ANOMALIES'),
            risks: extractSection(text, '5. RISKS & ANOMALIES', '6. FUN FACT'),
            funFact: extractSection(text, '6. FUN FACT', null),
            comfortIndex: weatherOutput.comfortIndex,
        };

        return NextResponse.json(sections);
    } catch (error) {
        console.error('AI Summary error:', error);

        // Return fallback response if we have the parameters
        if (parameters && weatherOutput) {
            return NextResponse.json(generateFallbackResponse(parameters, weatherOutput));
        }

        // Generic fallback if parsing failed completely
        return NextResponse.json({
            summary: "Unable to generate summary.",
            scientific: "Data unavailable.",
            biological: "Unknown impact.",
            comfortIndex: 50,
            dayFeeling: "Data unavailable.",
            risks: "Unknown risks.",
            funFact: "Simulation data required."
        });
    }
}

function generateFallbackResponse(parameters: PhysicsParameters, weatherOutput: WeatherOutput) {
    return {
        summary: `With ${parameters.gravity}x gravity and ${parameters.sunlight}x sunlight, the weather becomes ${weatherOutput.temperature > 25 ? 'significantly warmer' : 'cooler'} with ${weatherOutput.precipitationChance}% chance of rain.`,
        scientific: `The modified gravity (${parameters.gravity}x Earth normal) affects atmospheric pressure distribution and cloud formation. Combined with ${parameters.co2} ppm CO₂, this creates a greenhouse effect that ${parameters.co2 > 400 ? 'increases' : 'decreases'} surface temperatures. The air density of ${parameters.airDensity} kg/m³ influences wind patterns and heat retention.`,
        biological: `Plants would experience ${parameters.gravity < 1 ? 'easier growth due to reduced gravitational stress' : 'stunted growth from increased weight'}. Humans would feel ${weatherOutput.comfortIndex > 70 ? 'comfortable' : 'uncomfortable'} in these conditions. Insects and birds would ${parameters.airDensity < 1 ? 'fly more easily' : 'struggle with flight'}.`,
        comfortIndex: weatherOutput.comfortIndex,
        dayFeeling: `Your day would feel ${weatherOutput.temperature > 30 ? 'hot and oppressive' : weatherOutput.temperature < 10 ? 'cold and crisp' : 'pleasant'}. The ${weatherOutput.windSpeed} km/h winds would ${weatherOutput.windSpeed > 20 ? 'make it feel cooler' : 'be barely noticeable'}. ${parameters.humidity > 70 ? 'High humidity would make it feel sticky.' : 'Low humidity would make the air feel dry.'}`,
        risks: `${weatherOutput.stormProbability > 60 ? '⚠️ High storm risk! Seek shelter.' : weatherOutput.stormProbability > 30 ? 'Moderate storm chance - stay alert.' : 'Low storm risk.'} ${parameters.gravity < 0.5 ? '⚠️ Extreme low gravity - objects and people could float away!' : parameters.gravity > 2 ? '⚠️ High gravity - movement would be extremely difficult!' : ''} ${weatherOutput.temperature > 40 ? '⚠️ Dangerous heat levels!' : weatherOutput.temperature < -10 ? '⚠️ Freezing conditions!' : ''}`,
        funFact: `Did you know? ${parameters.gravity < 1 ? 'On the Moon (0.16x Earth gravity), clouds would rise 6x higher!' : parameters.sunlight > 1.5 ? 'If Earth received 50% more sunlight, our oceans would eventually boil!' : parameters.co2 > 1000 ? 'At 1000+ ppm CO₂, humans experience drowsiness and reduced cognitive function!' : 'Earth\'s weather is a delicate balance of countless factors!'}`,
    };
}

function extractSection(text: string, startMarker: string, endMarker: string | null): string {
    const startIndex = text.indexOf(startMarker);
    if (startIndex === -1) return '';

    const contentStart = startIndex + startMarker.length;
    const endIndex = endMarker ? text.indexOf(endMarker, contentStart) : text.length;

    if (endIndex === -1) return text.substring(contentStart).trim();

    return text.substring(contentStart, endIndex).trim();
}
