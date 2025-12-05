import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { PhysicsParameters, WeatherOutput } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const { message, parameters, weatherOutput }: { message: string; parameters: PhysicsParameters; weatherOutput: WeatherOutput } = await request.json();

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json({
                response: "I'm sorry, I can't answer that right now because the AI service is not configured."
            });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const prompt = `You are an expert climate physicist assistant.
        
Current Simulation Parameters:
- Gravity: ${parameters.gravity}x
- Pressure: ${parameters.pressure} atm
- Sunlight: ${parameters.sunlight}x
- CO2: ${parameters.co2} ppm
- Humidity: ${parameters.humidity}%
- Air Density: ${parameters.airDensity} kg/m³

Current Weather Output:
- Temperature: ${weatherOutput.temperature}°C
- Rain Chance: ${weatherOutput.precipitationChance}%
- Wind Speed: ${weatherOutput.windSpeed} km/h
- Storm Risk: ${weatherOutput.stormProbability}%

User Question: "${message}"

Answer the user's question based on the current simulation state. Be concise, scientific, yet accessible. If the question is unrelated to the simulation or weather physics, politely steer the conversation back to the topic.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ response: text });

    } catch (error) {
        console.error('AI Chat error:', error);
        return NextResponse.json({
            response: "I encountered an error while processing your question. Please try again."
        }, { status: 500 });
    }
}
