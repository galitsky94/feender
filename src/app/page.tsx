"use client";

import { Button } from "@/components/ui/button";
import { Heart, Footprints } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500">
      {/* Header */}
      <header className="relative z-10 p-8 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-2 bg-white/20 backdrop-blur rounded-full">
            <Footprints className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          <h1 className="text-6xl font-black bg-gradient-to-r from-white via-yellow-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
            Feender
          </h1>
          <div className="p-2 bg-white/20 backdrop-blur rounded-full">
            <Footprints className="w-10 h-10 text-white drop-shadow-lg scale-x-[-1]" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-5xl font-black text-white mb-8 drop-shadow-2xl leading-tight">
            Find your perfect sole mate
          </h2>

          {/* Hero Image */}
          <div className="mb-12 flex justify-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=350&fit=crop&q=80"
                alt="Happy feet with smiley faces on grass"
                className="rounded-3xl shadow-2xl w-96 h-64 object-cover border-4 border-white/30"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl" />
            </div>
          </div>

          <Button
            onClick={() => router.push("/swipe")}
            size="lg"
            className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-12 py-6 text-2xl font-bold rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-4 border-white/30"
          >
            <Heart className="w-8 h-8 mr-3" />
            Start Feeting
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 text-white/80">
        <div className="bg-white/10 backdrop-blur rounded-2xl inline-block px-8 py-4 shadow-xl">
          <p className="text-xl font-semibold">Made with 💕 for foot lovers</p>
        </div>
      </footer>
    </div>
  );
}
