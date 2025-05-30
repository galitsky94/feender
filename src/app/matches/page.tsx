"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Heart, Star, Flame } from "lucide-react";
import { mockMatches } from "@/lib/mockData";
import { useRouter } from "next/navigation";

export default function MatchesPage() {
  const router = useRouter();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur border-b border-white/20 sticky top-0 z-10">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/swipe")}
          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>
        <div className="flex items-center gap-2">
          <Flame className="w-7 h-7 text-yellow-300" />
          <h1 className="text-2xl font-black text-white drop-shadow-lg">Matches</h1>
          <Flame className="w-7 h-7 text-yellow-300" />
        </div>
      </header>

      <main className="p-4">
        {mockMatches.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8">
            <div className="w-32 h-32 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mb-8 shadow-2xl">
              <Heart className="w-16 h-16 text-white" />
            </div>
            <h2 className="text-4xl font-black text-white mb-4 drop-shadow-lg">No matches yet</h2>
            <p className="text-white/90 mb-8 max-w-sm text-xl font-semibold drop-shadow">
              Keep feeting to find your sole mate!
            </p>
            <Button
              onClick={() => router.push("/swipe")}
              className="bg-gradient-to-r from-pink-500 to-orange-500 hover:from-pink-600 hover:to-orange-600 text-white px-8 py-4 rounded-full font-bold shadow-2xl text-lg transform hover:scale-105 transition-all duration-300"
            >
              <Heart className="w-6 h-6 mr-2" />
              Start Feeting
            </Button>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {/* Header Stats */}
            <div className="text-center mb-8">
              <div className="bg-white/20 backdrop-blur rounded-2xl inline-block px-6 py-3 shadow-xl">
                <p className="text-white font-black text-xl drop-shadow">
                  🔥 {mockMatches.length} {mockMatches.length === 1 ? 'match' : 'matches'} found! 💕
                </p>
              </div>
            </div>

            {mockMatches.map((match) => (
              <Card
                key={match.id}
                className="p-6 bg-white/95 backdrop-blur border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-pointer rounded-3xl transform hover:scale-[1.02] group"
                onClick={() => router.push(`/chat/${match.id}`)}
              >
                <div className="flex items-center gap-6">
                  {/* Profile Photo */}
                  <div className="relative">
                    <Avatar className="w-20 h-20 ring-4 ring-gradient-to-r from-orange-400 to-pink-400 shadow-xl">
                      <AvatarImage
                        src={match.user.photos[0]}
                        alt={`${match.user.name}'s feet`}
                        className="object-cover"
                      />
                    </Avatar>
                    {/* Online Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-green-400 to-green-600 rounded-full border-3 border-white shadow-lg" />
                  </div>

                  {/* Match Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-black text-2xl text-gray-800 truncate">
                        {match.user.name}
                      </h3>
                      <div className="flex">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      </div>
                      <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-2 py-1 rounded-full text-xs">
                        Size {match.user.shoeSize}
                      </Badge>
                    </div>

                    <p className="text-gray-700 text-lg truncate mb-3 font-semibold">
                      {match.lastMessage || "👋 Start the conversation!"}
                    </p>

                    <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                      <span>✨ Matched {formatTimeAgo(match.matchedAt)}</span>
                      {match.lastMessageAt && (
                        <>
                          <span>•</span>
                          <span>💬 {formatTimeAgo(match.lastMessageAt)}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Message Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* Quick Preview of Interests */}
                <div className="mt-4 flex gap-2 flex-wrap">
                  {match.user.interests.slice(0, 3).map((interest) => (
                    <Badge key={interest} className="bg-gradient-to-r from-yellow-200 to-orange-200 text-gray-700 hover:from-yellow-300 hover:to-orange-300 transition-colors text-sm font-semibold px-3 py-1 rounded-full">
                      {interest}
                    </Badge>
                  ))}
                  <Badge className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 text-sm font-semibold px-3 py-1 rounded-full">
                    📍 {match.user.distance}km away
                  </Badge>
                </div>
              </Card>
            ))}

            {/* Continue Feeting CTA */}
            <Card className="p-8 text-center bg-white/90 backdrop-blur border-0 shadow-2xl rounded-3xl mt-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-black text-gray-800 mb-3">
                Keep the momentum going!
              </h3>
              <p className="text-gray-600 mb-6 text-lg font-medium">
                Keep the momentum going!
              </p>
              <Button
                onClick={() => router.push("/swipe")}
                className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-3 rounded-full font-bold shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Continue Feeting 👣✨
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
