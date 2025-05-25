
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
      
      {/* Comic book style background elements with effects */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-comic-yellow rounded-full opacity-20 animate-pulse comic-explosion"></div>
      <div className="absolute bottom-20 right-16 w-48 h-48 bg-comic-pink rounded-full opacity-15 animate-pulse comic-burst" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-comic-green rounded-full opacity-25 animate-pulse comic-pow" style={{ animationDelay: '2s' }}></div>
      
      {/* Additional comic effects scattered around */}
      <div className="absolute top-20 left-1/3 comic-zap w-16 h-20 opacity-30" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-40 right-1/3 comic-explosion w-20 h-20 opacity-40" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 left-20 comic-burst w-14 h-14 opacity-35" style={{ animationDelay: '2.5s' }}></div>
      
      {/* Flying comic stars */}
      <div className="comic-star-burst top-32 left-1/2 opacity-60" style={{ animationDelay: '0.2s' }}></div>
      <div className="comic-star-burst bottom-32 left-1/4 opacity-50" style={{ animationDelay: '1.2s' }}></div>
      <div className="comic-star-burst top-3/4 right-1/4 opacity-70" style={{ animationDelay: '2.2s' }}></div>
      <div className="comic-star-burst bottom-1/4 right-1/2 opacity-45" style={{ animationDelay: '3.2s' }}></div>
      
      {/* Header with dropdowns */}
      <div className="absolute top-4 left-0 right-0 z-50 flex justify-between items-start px-6">
        <div className="relative">
          <NewsDropdown />
          <div className="comic-star-burst -top-1 -right-1" style={{ animationDelay: '1.8s' }}></div>
        </div>
        <div className="relative">
          <DirectoryDropdown playerName={playerName} />
          <div className="comic-star-burst -top-1 -left-1" style={{ animationDelay: '2.8s' }}></div>
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
