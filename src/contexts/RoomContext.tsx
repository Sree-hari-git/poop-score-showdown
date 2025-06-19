
import React, { createContext, useContext, useState } from 'react';

interface Room {
  id: string;
  code: string;
  name: string;
  memberCount: number;
}

interface Submission {
  id: string;
  username: string;
  score: number;
  sizeScore: number;
  colorScore: number;
  textureScore: number;
  analysis: string;
  imageUrl?: string;
  createdAt: string;
}

interface LeaderboardEntry {
  username: string;
  score: number;
  submissions: number;
  rank: number;
}

interface RoomContextType {
  currentRoom: Room | null;
  createRoom: () => Promise<Room>;
  joinRoom: (code: string) => Promise<void>;
  leaveRoom: () => void;
  getLeaderboard: (roomCode: string) => Promise<{ daily: LeaderboardEntry[]; allTime: LeaderboardEntry[] }>;
  uploadImage: (image: File, roomId: string) => Promise<Submission>;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const createRoom = async (): Promise<Room> => {
    // Simulate API call
    const room: Room = {
      id: 'room_' + Date.now(),
      code: generateRoomCode(),
      name: 'Poop Room',
      memberCount: 1
    };
    
    setCurrentRoom(room);
    return room;
  };

  const joinRoom = async (code: string) => {
    // Simulate API call
    const room: Room = {
      id: 'room_' + Date.now(),
      code: code.toUpperCase(),
      name: 'Poop Room',
      memberCount: 5
    };
    
    setCurrentRoom(room);
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
  };

  const getLeaderboard = async (roomCode: string) => {
    // Simulate API call
    return {
      daily: [
        { username: 'PoopMaster42', score: 145, submissions: 3, rank: 1 },
        { username: 'TurdNinja', score: 132, submissions: 2, rank: 2 },
        { username: 'BrownBomber', score: 128, submissions: 1, rank: 3 }
      ],
      allTime: [
        { username: 'PoopMaster42', score: 1250, submissions: 15, rank: 1 },
        { username: 'TurdNinja', score: 1180, submissions: 12, rank: 2 },
        { username: 'BrownBomber', score: 1050, submissions: 10, rank: 3 }
      ]
    };
  };

  const uploadImage = async (image: File, roomId: string): Promise<Submission> => {
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Generate random scores
    const sizeScore = Math.floor(Math.random() * 50) + 1;
    const colorScore = Math.floor(Math.random() * 50) + 1;
    const textureScore = Math.floor(Math.random() * 50) + 1;
    const totalScore = sizeScore + colorScore + textureScore;

    return {
      id: 'submission_' + Date.now(),
      username: 'CurrentUser',
      score: totalScore,
      sizeScore,
      colorScore,
      textureScore,
      analysis: `Your poop scored ${totalScore}/150! Size: ${sizeScore}/50 - Good volume and impressive girth. Color: ${colorScore}/50 - Healthy brown tone indicates good digestion. Texture: ${textureScore}/50 - Perfect consistency for optimal elimination.`,
      createdAt: new Date().toISOString()
    };
  };

  return (
    <RoomContext.Provider value={{
      currentRoom,
      createRoom,
      joinRoom,
      leaveRoom,
      getLeaderboard,
      uploadImage
    }}>
      {children}
    </RoomContext.Provider>
  );
};
