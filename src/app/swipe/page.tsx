"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Heart, RotateCcw, MessageCircle, Users, Footprints, Star, Flame } from "lucide-react";
import { mockUsers, type User } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function SwipePage() {
  const router = useRouter();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [matches, setMatches] = useState<User[]>([]);
  const [showMatchDialog, setShowMatchDialog] = useState(false);

  const currentUser = mockUsers[currentUserIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    if (isAnimating) return;

    setSwipeDirection(direction);
    setIsAnimating(true);

    // If swiped right, add to matches (simulate random matching)
    if (direction === 'right' && Math.random() > 0.3) {
      setMatches(prev => [...prev, currentUser]);
      setShowMatchDialog(true);
    }

    setTimeout(() => {
      setCurrentUserIndex(prev => (prev + 1) % mockUsers.length);
      setSwipeDirection(null);
      setIsAnimating(false);
      if (showMatchDialog) {
        setTimeout(() => setShowMatchDialog(false), 2000);
      }
    }, 500);
  };

  const resetSwipe = () => {
    setCurrentUserIndex(0);
    setMatches([]);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 flex items-center justify-center p-4">
        <Card className="p-8 text-center bg-white/95 backdrop-blur rounded-3xl shadow-2xl max-w-md">
          <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">No more profiles!</h2>
          <p className="text-gray-600 mb-6 text-lg">You've seen everyone in your area.</p>
          <Button
            onClick={resetSwipe}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-xl"
          >
            Start Over
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/10 backdrop-blur border-b border-white/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/")}
          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
        >
          <Footprints className="w-7 h-7" />
        </Button>

        <div className="flex items-center gap-2">
          <Flame className="w-8 h-8 text-yellow-300" />
          <h1 className="text-2xl font-black text-white drop-shadow-lg">Feender</h1>
          <Flame className="w-8 h-8 text-yellow-300" />
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/matches")}
            className="text-white hover:bg-white/20 rounded-full w-12 h-12 relative"
          >
            <MessageCircle className="w-7 h-7" />
            {matches.length > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                {matches.length}
              </div>
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/profile")}
            className="text-white hover:bg-white/20 rounded-full w-12 h-12"
          >
            <Users className="w-7 h-7" />
          </Button>
        </div>
      </header>

      {/* Main Card Area */}
      <main className="flex-1 flex items-center justify-center p-6 min-h-[calc(100vh-200px)]">
        <div className="relative w-full max-w-sm">
          {/* Current Card */}
          <Card
            className={`relative w-full h-[650px] bg-white shadow-2xl overflow-hidden transition-all duration-500 rounded-3xl border-4 border-white/50 ${
              swipeDirection === 'left' ? 'transform -translate-x-full rotate-12 opacity-0' :
              swipeDirection === 'right' ? 'transform translate-x-full rotate-12 opacity-0' :
              'transform translate-x-0 rotate-0 opacity-100'
            }`}
          >
            {/* Photo with Gradient Overlay */}
            <div className="relative h-3/4 overflow-hidden">
              <img
                src={currentUser.photos[0]}
                alt="Profile"
                className="w-full h-full object-cover"
              />
              {/* Top Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

              {/* Distance Badge */}
              <div className="absolute top-6 right-6">
                <Badge className="bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold px-3 py-1 rounded-full shadow-lg text-sm">
                  {currentUser.distance} km away
                </Badge>
              </div>

              {/* Like/Nope Indicators */}
              {swipeDirection === 'right' && (
                <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
                  <div className="bg-green-500 text-white px-8 py-4 rounded-full font-black text-2xl shadow-2xl transform rotate-12">
                    LIKE 💚
                  </div>
                </div>
              )}
              {swipeDirection === 'left' && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
                  <div className="bg-red-500 text-white px-8 py-4 rounded-full font-black text-2xl shadow-2xl transform -rotate-12">
                    NOPE ❌
                  </div>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <div className="p-6 h-1/4 flex flex-col justify-between bg-gradient-to-t from-white via-white to-white/95">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <h2 className="text-3xl font-black text-gray-800">
                    {currentUser.name}
                  </h2>
                  <div className="text-2xl font-bold text-gray-600">{currentUser.age}</div>
                  <div className="flex">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </div>
                </div>

                <div className="flex gap-2 mb-3">
                  <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                    Size {currentUser.shoeSize}
                  </Badge>
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-3 py-1 rounded-full">
                    {currentUser.preferredStyle}
                  </Badge>
                </div>

                <p className="text-gray-700 text-sm line-clamp-2 leading-relaxed font-medium">
                  {currentUser.bio}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap">
                {currentUser.interests.slice(0, 3).map((interest) => (
                  <Badge key={interest} className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-xs font-semibold px-2 py-1 rounded-full">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Next Card Preview */}
          {mockUsers[currentUserIndex + 1] && (
            <Card className="absolute inset-0 w-full h-[650px] bg-white shadow-xl overflow-hidden -z-10 scale-95 opacity-50 rounded-3xl border-4 border-white/30">
              <img
                src={mockUsers[currentUserIndex + 1].photos[0]}
                alt="Next profile"
                className="w-full h-3/4 object-cover"
              />
            </Card>
          )}
        </div>
      </main>

      {/* Action Buttons */}
      <div className="flex justify-center gap-6 p-6 bg-white/10 backdrop-blur border-t border-white/20">
        <Button
          size="lg"
          onClick={() => handleSwipe('left')}
          disabled={isAnimating}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white shadow-2xl transform hover:scale-110 transition-all duration-200 border-4 border-white/30"
        >
          <X className="w-8 h-8" />
        </Button>

        <Button
          size="lg"
          onClick={resetSwipe}
          className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white shadow-xl transform hover:scale-110 transition-all duration-200 border-4 border-white/30"
        >
          <RotateCcw className="w-6 h-6" />
        </Button>

        <Button
          size="lg"
          onClick={() => handleSwipe('right')}
          disabled={isAnimating}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white shadow-2xl transform hover:scale-110 transition-all duration-200 border-4 border-white/30"
        >
          <Heart className="w-8 h-8" />
        </Button>
      </div>

      {/* Match Dialog */}
      {showMatchDialog && (
        <div className="fixed inset-0 bg-gradient-to-br from-pink-500 via-orange-500 to-yellow-500 flex items-center justify-center z-50 p-4">
          <div className="text-center text-white max-w-md">
            <div className="text-8xl mb-6 animate-bounce">💕</div>
            <h1 className="text-5xl font-black mb-4 drop-shadow-2xl">It's a Match!</h1>
            <p className="text-2xl mb-8 drop-shadow-lg font-semibold">
              You and {currentUser.name} liked each other!
            </p>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => setShowMatchDialog(false)}
                className="bg-white/20 backdrop-blur text-white hover:bg-white/30 px-6 py-3 rounded-full font-bold shadow-xl border-2 border-white/30"
              >
                Keep Swiping
              </Button>
              <Button
                onClick={() => router.push("/matches")}
                className="bg-white text-orange-600 hover:bg-gray-100 px-6 py-3 rounded-full font-bold shadow-xl"
              >
                Send Message 💌
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
