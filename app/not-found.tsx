import Link from 'next/link';
import { Home, CloudRain } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 text-blue-500 animate-bounce">
                <CloudRain size={48} />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">Page Not Found</h2>
            <p className="text-neutral-500 max-w-md mb-8">
                The atmospheric conditions you are looking for do not exist in this simulation.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-lg shadow-blue-500/20"
            >
                <Home size={18} />
                Return to Base
            </Link>
        </div>
    );
}
