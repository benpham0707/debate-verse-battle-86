
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Zap, Swords, ArrowLeft, Timer, Shield, Target, Users, Clock } from 'lucide-react';

interface WaitingRoomProps {
  roomId: string;
  playerName: string;
  onLeaveRoom: () => void;
  onStartDebate?: () => void;
}

export const WaitingRoom = ({ roomId, playerName, onLeaveRoom, onStartDebate }: WaitingRoomProps) => {
  const [isReady, setIsReady] = useState(false);
  const [opponentReady, setOpponentReady] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [showCountdown, setShowCountdown] = useState(false);

  const battleReadyQuotes = [
    "Time to prove my point!",
    "Logic will be my weapon!",
    "Ready for intellectual combat!",
    "Facts don't lie!",
    "Bring on the debate!"
  ];

  const tips = [
    "💡 Strong arguments need solid evidence",
    "🎯 Listen carefully to counter effectively", 
    "⚡ Stay calm under pressure",
    "🔥 Open strong, finish stronger"
  ];

  // Simulate opponent joining
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpponentReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Start countdown when both ready
  useEffect(() => {
    if (isReady && opponentReady && !showCountdown) {
      setShowCountdown(true);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            onStartDebate?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isReady, opponentReady, showCountdown, onStartDebate]);

  const handleToggleReady = () => {
    setIsReady(!isReady);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 halftone-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-comic-red/20 via-comic-purple/20 to-comic-blue/20" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-bounce">
        <Swords className="h-8 w-8 text-comic-red opacity-60" />
      </div>
      <div className="absolute bottom-32 right-16 animate-bounce delay-1000">
        <Users className="h-6 w-6 text-comic-blue opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce delay-500">
        <Shield className="h-7 w-7 text-comic-green opacity-60" />
      </div>
      
      <div className="w-full max-w-2xl space-y-8 animate-fade-in relative z-10">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-bold text-5xl text-comic-dark mb-4 transform -rotate-1 comic-border bg-comic-yellow px-4 py-2 inline-block">
            BATTLE ARENA
          </h1>
          <div className="mt-6 bg-comic-dark text-white px-6 py-3 comic-border inline-block transform rotate-1">
            <span className="text-lg font-bold">Room Code: {roomId}</span>
          </div>
        </div>

        {/* Main Battle Preparation Card */}
        <Card className="comic-border bg-white p-8 transform rotate-1 relative overflow-hidden">
          {/* Halftone overlay on card */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle, #FF1744 1px, transparent 1px)`,
              backgroundSize: '15px 15px',
              backgroundPosition: '0 0'
            }}
          />
          
          <div className="space-y-8 relative z-10">
            {/* Battle Topic */}
            <div className="text-center">
              <div className="bg-comic-green text-white px-6 py-3 comic-border inline-block transform -rotate-1">
                <h2 className="font-bold text-xl">🎯 TOPIC: "Should AI be regulated?"</h2>
              </div>
            </div>

            {/* Players Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Player 1 */}
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-fit">
                  <Avatar className="w-20 h-20 mx-auto comic-border bg-comic-blue">
                    <AvatarFallback className="text-white font-bold text-2xl">
                      {playerName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-comic-yellow comic-border rounded-full w-8 h-8 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-comic-dark" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-comic-dark">{playerName}</h3>
                  <div className="bg-comic-yellow text-comic-dark px-3 py-1 comic-border font-bold rounded-lg text-sm mt-2">
                    PRO SIDE
                  </div>
                </div>
                
                <Badge className={`text-lg px-4 py-2 comic-border ${
                  isReady ? 'bg-comic-green animate-pulse' : 'bg-gray-500'
                }`}>
                  {isReady ? '⚡ READY!' : 'Preparing...'}
                </Badge>
                
                {isReady && (
                  <div className="bg-comic-blue/10 text-comic-dark p-3 comic-border rounded-lg">
                    <p className="font-bold text-sm">
                      "{battleReadyQuotes[Math.floor(Math.random() * battleReadyQuotes.length)]}"
                    </p>
                  </div>
                )}
              </div>

              {/* VS Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 bg-comic-orange comic-border rounded-full flex items-center justify-center transform rotate-12 animate-bounce">
                    <span className="text-2xl font-bold text-white">VS</span>
                  </div>
                  <Target className="absolute -top-3 -right-3 w-8 h-8 text-comic-red animate-spin" />
                </div>
                
                {showCountdown && (
                  <div className="bg-comic-red text-white px-4 py-2 comic-border text-2xl font-bold animate-pulse rounded-lg">
                    <Timer className="inline mr-2" />
                    {countdown}
                  </div>
                )}
              </div>

              {/* Player 2 / Opponent */}
              <div className="text-center space-y-4">
                <div className="relative mx-auto w-fit">
                  <Avatar className="w-20 h-20 mx-auto comic-border bg-comic-red">
                    <AvatarFallback className="text-white font-bold text-2xl">
                      {opponentReady ? 'O' : '?'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 bg-comic-yellow comic-border rounded-full w-8 h-8 flex items-center justify-center">
                    <Shield className="w-4 h-4 text-comic-dark" />
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-comic-dark">
                    {opponentReady ? 'Opponent' : 'Finding opponent...'}
                  </h3>
                  <div className="bg-comic-pink text-white px-3 py-1 comic-border font-bold rounded-lg text-sm mt-2">
                    CON SIDE
                  </div>
                </div>
                
                <Badge className={`text-lg px-4 py-2 comic-border ${
                  opponentReady ? 'bg-comic-green animate-pulse' : 'bg-gray-500'
                }`}>
                  {opponentReady ? '⚡ READY!' : 'Joining...'}
                </Badge>
                
                {opponentReady && (
                  <div className="bg-comic-red/10 text-comic-dark p-3 comic-border rounded-lg">
                    <p className="font-bold text-sm">
                      "{battleReadyQuotes[Math.floor(Math.random() * battleReadyQuotes.length)]}"
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Status Section */}
            <div className="text-center">
              <div className="bg-comic-purple/20 comic-border p-4 transform -rotate-1 rounded-lg">
                <p className="text-comic-dark font-bold text-lg">
                  {!opponentReady ? 'Waiting for opponent to join...' : 
                   !isReady ? 'Click "GET READY" when you\'re prepared!' :
                   !showCountdown ? 'Waiting for both players to be ready...' :
                   'Battle starting soon!'}
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            {!opponentReady && (
              <div className="w-full bg-comic-dark/20 rounded-full h-3 comic-border overflow-hidden">
                <div className="h-full bg-gradient-to-r from-comic-red to-comic-purple animate-pulse w-3/4" />
              </div>
            )}
          </div>
        </Card>

        {/* Tips Section */}
        <div className="text-center">
          <div className="bg-comic-yellow/20 comic-border p-4 transform rotate-1 rounded-lg inline-block">
            <p className="text-comic-dark font-bold text-lg">
              {tips[Math.floor(Math.random() * tips.length)]}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Button
            onClick={onLeaveRoom}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-6 py-3 comic-border transform hover:scale-105 transition-transform"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            LEAVE ARENA
          </Button>
          
          <Button
            onClick={handleToggleReady}
            disabled={showCountdown}
            className={`font-bold text-xl px-8 py-4 comic-border transform hover:scale-105 transition-transform ${
              isReady 
                ? 'bg-comic-green hover:bg-comic-green/80 text-white shadow-lg shadow-comic-green/50' 
                : 'bg-comic-red hover:bg-comic-red/80 text-white shadow-lg shadow-comic-red/50'
            }`}
          >
            <Zap className="mr-2 h-6 w-6" />
            {isReady ? 'READY FOR BATTLE!' : 'GET READY!'}
          </Button>
        </div>
      </div>
    </div>
  );
};
