import { NextRequest, NextResponse } from 'next/server';
import { simulateWeather } from '@/lib/physicsEngine';
import { PhysicsParameters } from '@/lib/types';

export async function POST(request: NextRequest) {
    try {
        const params: PhysicsParameters = await request.json();

        // Validate parameters
        if (!params || typeof params.gravity !== 'number') {
            return NextResponse.json(
                { error: 'Invalid parameters' },
                { status: 400 }
            );
        }

        // Run simulation
        const weatherOutput = simulateWeather(params);

        return NextResponse.json(weatherOutput);
    } catch (error) {
        console.error('Simulation error:', error);
        return NextResponse.json(
            { error: 'Simulation failed' },
            { status: 500 }
        );
    }
}
