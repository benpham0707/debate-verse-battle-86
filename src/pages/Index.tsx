
import React, { useState } from 'react';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { GameLobby } from '@/components/GameLobby';
import { DebateRoom } from '@/components/DebateRoom';

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
    <div className="min-h-screen bg-gradient-to-br from-comic-blue via-comic-purple to-comic-pink">
      <div className="halftone-bg min-h-screen">
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
