"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Settings, Camera, Edit3, Save, X, Star, Flame, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  // Mock current user data
  const [profile, setProfile] = useState({
    name: "You",
    age: 25,
    bio: "Love walking barefoot on the beach and trying new adventures! Looking for someone who appreciates the simple joys in life. 🌊👣",
    photos: [
      "https://images.unsplash.com/photo-1596834305268-968b8e6c4b45?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop"
    ],
    interests: ["Beach walks", "Yoga", "Photography", "Travel"],
    shoeSize: "7.5",
    preferredStyle: "Barefoot"
  });

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, this would save to the backend
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-400 to-orange-500">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white/10 backdrop-blur border-b border-white/20 sticky top-0 z-10">
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
          <h1 className="text-2xl font-black text-white drop-shadow-lg">Profile</h1>
          <Flame className="w-7 h-7 text-yellow-300" />
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
          className="text-white hover:bg-white/20 rounded-full w-12 h-12"
        >
          {isEditing ? (
            <X className="w-7 h-7" />
          ) : (
            <Edit3 className="w-7 h-7" />
          )}
        </Button>
      </header>

      <main className="p-4 max-w-md mx-auto space-y-6">
        {/* Photo Section */}
        <Card className="p-8 bg-white/95 backdrop-blur border-0 shadow-2xl rounded-3xl">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Avatar className="w-40 h-40 ring-6 ring-gradient-to-r from-orange-400 to-pink-400 shadow-2xl">
                <AvatarImage
                  src={profile.photos[0]}
                  alt="Your feet"
                  className="object-cover"
                />
              </Avatar>
              {isEditing && (
                <Button
                  size="icon"
                  className="absolute -bottom-2 -right-2 w-12 h-12 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 rounded-full shadow-xl"
                >
                  <Camera className="w-6 h-6 text-white" />
                </Button>
              )}
            </div>
            <div className="flex justify-center mt-4">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
            </div>
          </div>

          {/* Photo Gallery */}
          <div className="grid grid-cols-3 gap-3">
            {profile.photos.map((photo, index) => (
              <div key={photo} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg"
                />
                {isEditing && (
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full shadow-lg"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && profile.photos.length < 6 && (
              <div className="aspect-square border-3 border-dashed border-orange-300 rounded-2xl flex items-center justify-center cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all duration-300 shadow-lg">
                <Camera className="w-8 h-8 text-orange-400" />
              </div>
            )}
          </div>
        </Card>

        {/* Profile Info */}
        <Card className="p-8 bg-white/95 backdrop-blur border-0 shadow-2xl rounded-3xl">
          <div className="space-y-6">
            {/* Name & Age */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Name</label>
                {isEditing ? (
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-xl font-semibold"
                  />
                ) : (
                  <p className="text-2xl font-black text-gray-800">{profile.name}</p>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Age</label>
                {isEditing ? (
                  <Input
                    type="number"
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: Number.parseInt(e.target.value) }))}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-xl font-semibold"
                  />
                ) : (
                  <p className="text-2xl font-black text-gray-800">{profile.age}</p>
                )}
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Bio</label>
              {isEditing ? (
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={4}
                  placeholder="Tell people about yourself..."
                  className="border-2 border-orange-200 focus:border-orange-400 rounded-xl font-medium"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed font-medium">{profile.bio}</p>
              )}
            </div>

            {/* Shoe Size & Style */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Shoe Size</label>
                {isEditing ? (
                  <Input
                    value={profile.shoeSize}
                    onChange={(e) => setProfile(prev => ({ ...prev, shoeSize: e.target.value }))}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-xl font-semibold"
                  />
                ) : (
                  <Badge className="bg-gradient-to-r from-orange-400 to-pink-400 text-white font-bold px-4 py-2 rounded-full text-lg">
                    Size {profile.shoeSize}
                  </Badge>
                )}
              </div>
              <div>
                <label className="text-sm font-bold text-gray-700 mb-2 block">Style</label>
                {isEditing ? (
                  <Input
                    value={profile.preferredStyle}
                    onChange={(e) => setProfile(prev => ({ ...prev, preferredStyle: e.target.value }))}
                    className="border-2 border-orange-200 focus:border-orange-400 rounded-xl font-semibold"
                  />
                ) : (
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-bold px-4 py-2 rounded-full text-lg">
                    {profile.preferredStyle}
                  </Badge>
                )}
              </div>
            </div>

            {/* Interests */}
            <div>
              <label className="text-sm font-bold text-gray-700 mb-3 block">Interests</label>
              <div className="flex gap-2 flex-wrap">
                {profile.interests.map((interest, index) => (
                  <Badge key={interest} className="bg-gradient-to-r from-blue-200 to-purple-200 text-gray-700 hover:from-blue-300 hover:to-purple-300 transition-colors font-bold px-3 py-2 rounded-full relative">
                    {interest}
                    {isEditing && (
                      <button
                        onClick={() => setProfile(prev => ({
                          ...prev,
                          interests: prev.interests.filter((_, i) => i !== index)
                        }))}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </Badge>
                ))}
                {isEditing && (
                  <Badge className="border-2 border-dashed border-orange-300 bg-transparent text-orange-600 hover:bg-orange-50 cursor-pointer font-bold px-3 py-2 rounded-full">
                    + Add Interest
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        {isEditing && (
          <Button
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-4 rounded-2xl font-bold text-lg shadow-2xl transform hover:scale-105 transition-all duration-300"
            size="lg"
          >
            <Save className="w-6 h-6 mr-3" />
            Save Changes
          </Button>
        )}

        {/* Settings */}
        {!isEditing && (
          <Card className="p-6 bg-white/95 backdrop-blur border-0 shadow-2xl rounded-3xl">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-700 hover:bg-orange-50 font-bold text-lg py-4 rounded-xl"
            >
              <Settings className="w-6 h-6 mr-3" />
              App Settings
            </Button>
          </Card>
        )}

        {/* Fun Stats */}
        <Card className="p-8 bg-white/90 backdrop-blur border-0 shadow-2xl rounded-3xl text-center">
          <h3 className="text-2xl font-black text-gray-800 mb-6">Your Feender Stats</h3>
          <div className="grid grid-cols-3 gap-6">
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-2">42</div>
              <div className="text-gray-600 font-semibold">Likes Given</div>
              <Heart className="w-5 h-5 text-pink-400 mx-auto mt-1" />
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-2">18</div>
              <div className="text-gray-600 font-semibold">Matches</div>
              <Flame className="w-5 h-5 text-orange-400 mx-auto mt-1" />
            </div>
            <div className="transform hover:scale-110 transition-all duration-300">
              <div className="text-4xl font-black bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">156</div>
              <div className="text-gray-600 font-semibold">Messages</div>
              <Star className="w-5 h-5 text-yellow-400 mx-auto mt-1" />
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}
