'use client';

import { GlobeToMapTransform } from '@/components/GlobeToMapTransform';

export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#1a1a1a] p-4">
      <div className="relative flex flex-col h-[700px] w-full max-w-5xl rounded-2xl p-6 justify-stretch items-stretch gap-4 overflow-clip bg-neutral-950 border border-neutral-800 shadow-2xl">
        <div className="flex flex-col gap-2 my-2">
          <h3 className="text-2xl font-bold text-white mx-2">Globe To Map Transform</h3>
          <p className="text-neutral-400 mx-2 text-sm">
            Interactive visualization that smoothly transforms a 3D globe into a 2D equirectangular map.
          </p>
        </div>
        <div className="flex p-2 w-full flex-1 min-h-32 justify-center items-center bg-black/20 rounded-xl border border-white/5">
          <GlobeToMapTransform />
        </div>
        <div className="flex flex-col gap-1 my-1">
          <p className="text-neutral-500 mx-2 text-xs">
            Controls: "Unroll Globe" to transition to map view, "Roll to Globe" to return, and "Reset" to clear rotation.
          </p>
        </div>
      </div>
    </div>
  );
}
