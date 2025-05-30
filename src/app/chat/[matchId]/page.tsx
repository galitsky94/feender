"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Send, Heart, MoreVertical, Star, Flame } from "lucide-react";
import { mockMatches, mockMessages, type Message } from "@/lib/mockData";
import { useRouter, useParams } from "next/navigation";

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const matchId = params.matchId as string;

  const match = mockMatches.find(m => m.id === matchId);
  const [messages, setMessages] = useState<Message[]>(mockMessages[matchId] || []);
  const [newMessage, setNewMessage] = useState("");

  if (!match) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 flex items-center justify-center p-4">
        <Card className="p-8 text-center bg-white/95 backdrop-blur rounded-3xl shadow-2xl">
          <h2 className="text-2xl font-bold mb-4">Chat not found</h2>
          <Button
            onClick={() => router.push("/matches")}
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-bold"
          >
            Back to Matches
          </Button>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: "current-user",
      text: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, message]);
    setNewMessage("");

    // Simulate response after a delay
    setTimeout(() => {
      const responses = [
        "That sounds amazing! 😊",
        "I totally agree! 👣",
        "Tell me more about that!",
        "Haha, you're so funny! 😂",
        "I'd love to hear more stories!",
        "Your feet must have amazing adventures! 🌟"
      ];

      const response: Message = {
        id: (Date.now() + 1).toString(),
        senderId: match.user.id,
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, response]);
    }, 1000 + Math.random() * 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500 flex flex-col">
      {/* Header */}
      <header className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur border-b border-white/20">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/matches")}
          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
        >
          <ArrowLeft className="w-7 h-7" />
        </Button>

        <Avatar className="w-12 h-12 ring-3 ring-white/50 shadow-xl">
          <AvatarImage
            src={match.user.photos[0]}
            alt={`${match.user.name}'s feet`}
            className="object-cover"
          />
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-black text-white truncate drop-shadow">
              {match.user.name}
            </h1>
            <div className="flex">
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
              <Star className="w-4 h-4 text-yellow-300 fill-current" />
            </div>
          </div>
          <p className="text-white/80 text-sm font-semibold">
            Size {match.user.shoeSize} • {match.user.distance}km away • Online
          </p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
        >
          <MoreVertical className="w-6 h-6" />
        </Button>
      </header>

      {/* Match Info Banner */}
      <div className="px-4 py-3 bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-500 text-white text-center shadow-lg">
        <div className="flex items-center justify-center gap-2">
          <Heart className="w-5 h-5 animate-pulse" />
          <span className="text-sm font-bold drop-shadow">
            You matched with {match.user.name} on {match.matchedAt.toLocaleDateString()} 🔥
          </span>
          <Heart className="w-5 h-5 animate-pulse" />
        </div>
      </div>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/5">
        {messages.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Heart className="w-12 h-12 text-white animate-pulse" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 drop-shadow-lg">
              Say hello to {match.user.name}!
            </h3>
            <p className="text-white/90 text-lg max-w-sm mx-auto font-semibold drop-shadow">
              You both swiped right. Start a conversation and see where it leads!
            </p>
          </div>
        ) : (
          <>
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === "current-user";
              const showTime = index === 0 ||
                messages[index - 1].timestamp.getTime() - message.timestamp.getTime() > 300000; // 5 minutes

              return (
                <div key={message.id}>
                  {showTime && (
                    <div className="text-center text-sm text-white/70 mb-3 font-semibold">
                      {formatTime(message.timestamp)}
                    </div>
                  )}
                  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-5 py-3 rounded-3xl shadow-xl font-medium ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'bg-white/95 backdrop-blur text-gray-800 border border-white/50'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        )}

        {/* User Profile Quick View */}
        <Card className="p-6 bg-white/90 backdrop-blur border-0 shadow-2xl mx-auto max-w-sm rounded-3xl">
          <div className="text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4 ring-4 ring-gradient-to-r from-orange-400 to-pink-400 shadow-xl">
              <AvatarImage
                src={match.user.photos[0]}
                alt={`${match.user.name}'s feet`}
                className="object-cover"
              />
            </Avatar>
            <h3 className="font-black text-xl text-gray-800 mb-2">
              {match.user.name}, {match.user.age}
            </h3>
            <div className="flex justify-center gap-2 mb-4">
              <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-3 py-1 rounded-full">
                Size {match.user.shoeSize}
              </Badge>
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-3 py-1 rounded-full">
                {match.user.preferredStyle}
              </Badge>
            </div>
            <p className="text-sm text-gray-700 mb-4 line-clamp-2 leading-relaxed font-medium">
              {match.user.bio}
            </p>
            <div className="flex gap-2 justify-center flex-wrap">
              {match.user.interests.slice(0, 3).map((interest) => (
                <Badge key={interest} className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full">
                  {interest}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      </main>

      {/* Message Input */}
      <div className="p-4 bg-white/10 backdrop-blur border-t border-white/20">
        <div className="flex gap-3">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 bg-white/90 backdrop-blur border-0 rounded-full px-6 py-3 text-gray-800 placeholder-gray-500 shadow-xl font-medium focus:ring-2 focus:ring-white/50"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            size="icon"
            className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full w-12 h-12 shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-white/70 mt-3 text-center font-semibold">
          Be respectful and have fun! 💕 Remember, it's all about those beautiful feet! 👣
        </p>
      </div>
    </div>
  );
}
