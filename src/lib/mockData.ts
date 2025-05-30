export interface User {
  id: string;
  name: string;
  age: number;
  bio: string;
  photos: string[];
  distance: number;
  interests: string[];
  shoeSize: string;
  preferredStyle: string;
}

export interface Match {
  id: string;
  user: User;
  matchedAt: Date;
  lastMessage?: string;
  lastMessageAt?: Date;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Sarah",
    age: 26,
    bio: "Love long walks on the beach... literally! 🏖️ Size 7 and proud. Looking for someone who appreciates a good pedicure.",
    photos: [
      "https://images.unsplash.com/photo-1596834305268-968b8e6c4b45?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop"
    ],
    distance: 2,
    interests: ["Beach walks", "Yoga", "Dancing"],
    shoeSize: "7",
    preferredStyle: "Barefoot"
  },
  {
    id: "2",
    name: "Alex",
    age: 29,
    bio: "Professional dancer with moves that'll sweep you off your feet! 💃 Always perfectly pedicured.",
    photos: [
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573496527892-904f897eb744?w=400&h=600&fit=crop"
    ],
    distance: 5,
    interests: ["Dancing", "Fitness", "Art"],
    shoeSize: "8",
    preferredStyle: "Heels"
  },
  {
    id: "3",
    name: "Jordan",
    age: 24,
    bio: "Athlete with strong foundation. Love hiking and exploring new trails. These feet have seen many adventures! 🥾",
    photos: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop"
    ],
    distance: 8,
    interests: ["Hiking", "Rock climbing", "Photography"],
    shoeSize: "9",
    preferredStyle: "Athletic"
  },
  {
    id: "4",
    name: "Morgan",
    age: 31,
    bio: "Yoga instructor seeking zen and sole-mate 🧘‍♀️ Flexible in body and mind. Let's find our balance together!",
    photos: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1596834305268-968b8e6c4b45?w=400&h=600&fit=crop"
    ],
    distance: 3,
    interests: ["Yoga", "Meditation", "Wellness"],
    shoeSize: "6.5",
    preferredStyle: "Minimalist"
  },
  {
    id: "5",
    name: "Casey",
    age: 27,
    bio: "Artist who believes every step is a masterpiece 🎨 My feet tell stories of creativity and wanderlust.",
    photos: [
      "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=600&fit=crop",
      "https://images.unsplash.com/photo-1573496527892-904f897eb744?w=400&h=600&fit=crop"
    ],
    distance: 6,
    interests: ["Art", "Travel", "Music"],
    shoeSize: "7.5",
    preferredStyle: "Vintage"
  }
];

export const mockMatches: Match[] = [
  {
    id: "match1",
    user: mockUsers[0],
    matchedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    lastMessage: "Hey! Love your beach vibes! 🏖️",
    lastMessageAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
  },
  {
    id: "match2",
    user: mockUsers[1],
    matchedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    lastMessage: "Would love to go dancing sometime!",
    lastMessageAt: new Date(Date.now() - 30 * 60 * 1000)
  }
];

export const mockMessages: { [matchId: string]: Message[] } = {
  "match1": [
    {
      id: "msg1",
      senderId: "current-user",
      text: "Hi there! Your beach photos are amazing! 🏖️",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: "msg2",
      senderId: "1",
      text: "Thank you! I could spend all day with my toes in the sand ☺️",
      timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000)
    },
    {
      id: "msg3",
      senderId: "current-user",
      text: "Same here! What's your favorite beach spot?",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    },
    {
      id: "msg4",
      senderId: "1",
      text: "Hey! Love your beach vibes! 🏖️",
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ]
};
