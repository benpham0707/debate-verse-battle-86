
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
      
      {/* Comic Text Effects scattered around */}
      <div className="comic-pow top-10 left-20" style={{ animationDelay: '0s' }}></div>
      <div className="comic-boom bottom-32 right-24" style={{ animationDelay: '1.2s' }}></div>
      <div className="comic-zap top-1/3 right-1/4" style={{ animationDelay: '0.8s' }}></div>
      <div className="comic-wham bottom-20 left-1/3" style={{ animationDelay: '2s' }}></div>
      <div className="comic-kapow top-1/2 left-16" style={{ animationDelay: '1.6s' }}></div>
      
      {/* Additional smaller effects */}
      <div className="comic-pow comic-small top-20 right-1/3" style={{ animationDelay: '0.4s' }}></div>
      <div className="comic-zap comic-small bottom-40 left-20" style={{ animationDelay: '1.8s' }}></div>
      <div className="comic-kapow comic-medium top-2/3 right-16" style={{ animationDelay: '2.4s' }}></div>
      
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
