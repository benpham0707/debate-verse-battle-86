
import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { GameLobby } from '@/components/GameLobby';
import { DebateRoom } from '@/components/DebateRoom';
import { NewsDropdown } from '@/components/NewsDropdown';
import { DirectoryDropdown } from '@/components/DirectoryDropdown';

export type GameState = 'welcome' | 'lobby' | 'debate';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('welcome');
  const [roomId, setRoomId] = useState<string>('');
  const [playerName, setPlayerName] = useState<string>('');

  const handleJoinRoom = (room: string, name: string) => {
    setRoomId(room);
    setPlayerName(name);
    setGameState('lobby');
  };

  const handleStartDebate = () => {
    setGameState('debate');
  };

  const handleBackToWelcome = () => {
    setGameState('welcome');
    setRoomId('');
    setPlayerName('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-comic-red via-comic-purple to-comic-blue relative overflow-hidden">
      {/* Enhanced background with multiple layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-comic-yellow/20 via-transparent to-comic-pink/20" />
      <div className="absolute inset-0 halftone-bg opacity-30" />
      
      {/* Bang Effects scattered around */}
      <div className="absolute top-10 left-20 w-16 h-16 opacity-80 animate-pulse" style={{ animationDelay: '0s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-32 right-24 w-20 h-20 opacity-70 animate-pulse" style={{ animationDelay: '1.2s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 opacity-90 animate-pulse" style={{ animationDelay: '0.8s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-20 left-1/3 w-14 h-14 opacity-75 animate-pulse" style={{ animationDelay: '2s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/2 left-16 w-18 h-18 opacity-85 animate-pulse" style={{ animationDelay: '1.6s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Additional smaller effects */}
      <div className="absolute top-20 right-1/3 w-10 h-10 opacity-60 animate-pulse" style={{ animationDelay: '0.4s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-40 left-20 w-8 h-8 opacity-70 animate-pulse" style={{ animationDelay: '1.8s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-2/3 right-16 w-16 h-16 opacity-80 animate-pulse" style={{ animationDelay: '2.4s' }}>
        <img src="/lovable-uploads/4b50e222-484a-42e7-891b-86a7fa075523.png" alt="" className="w-full h-full object-contain" />
      </div>
      
      {/* Header with dropdowns */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-between items-start px-6">
        <div className="relative">
          <NewsDropdown />
        </div>
        <div className="relative">
          <DirectoryDropdown playerName={playerName} />
        </div>
      </div>

      <div className="min-h-screen relative z-10 pt-16">
        {gameState === 'welcome' && (
          <WelcomeScreen onJoinRoom={handleJoinRoom} />
        )}
        
        {gameState === 'lobby' && (
          <GameLobby 
            roomId={roomId}
            playerName={playerName}
            onStartDebate={handleStartDebate}
            onBack={handleBackToWelcome}
          />
        )}
        
        {gameState === 'debate' && (
          <DebateRoom 
            roomId={roomId}
            playerName={playerName}
            onBack={handleBackToWelcome}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
