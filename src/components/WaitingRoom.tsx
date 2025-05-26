
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Zap, Swords, ArrowLeft, Timer, Shield, Target } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-comic-blue via-comic-purple to-comic-red relative overflow-hidden">
      {/* Cleaner background pattern */}
      <div className="absolute inset-0 opacity-20" 
           style={{
             backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
             backgroundSize: '30px 30px'
           }} />
      
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <h1 className="text-6xl font-bold text-white comic-border bg-comic-yellow px-8 py-4 transform -rotate-2 inline-block shadow-2xl">
              BATTLE ARENA
            </h1>
            <div className="absolute -top-3 -right-3 bg-comic-red comic-border rounded-full w-16 h-16 flex items-center justify-center transform rotate-12 animate-pulse">
              <Swords className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="mt-6 bg-comic-dark text-white px-6 py-3 comic-border inline-block transform rotate-1">
            <span className="text-lg font-bold">Room Code: {roomId}</span>
          </div>
        </div>

        {/* Main Battle Section */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          
          {/* Player 1 */}
          <Card className="bg-gradient-to-br from-comic-blue to-comic-purple p-8 comic-border transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="text-center text-white space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 mx-auto comic-border bg-comic-yellow">
                  <AvatarFallback className="text-comic-dark font-bold text-3xl">
                    {playerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Shield className="absolute -top-2 -right-2 w-8 h-8 text-comic-yellow" />
              </div>
              
              <h3 className="text-2xl font-bold">{playerName}</h3>
              
              <Badge className={`text-lg px-4 py-2 comic-border ${
                isReady ? 'bg-comic-green animate-pulse' : 'bg-gray-500'
              }`}>
                {isReady ? '⚡ READY TO FIGHT!' : 'Preparing...'}
              </Badge>
              
              <div className="bg-comic-yellow text-comic-dark px-3 py-1 comic-border font-bold rounded">
                PRO SIDE
              </div>
              
              {isReady && (
                <div className="bg-white/90 text-comic-dark p-3 comic-border rounded-lg">
                  <p className="font-bold text-sm">
                    "{battleReadyQuotes[Math.floor(Math.random() * battleReadyQuotes.length)]}"
                  </p>
                </div>
              )}
            </div>
          </Card>

          {/* Center VS Section */}
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-32 h-32 bg-comic-orange comic-border rounded-full flex items-center justify-center transform rotate-12 animate-bounce">
                <span className="text-4xl font-bold text-white">VS</span>
              </div>
              <Target className="absolute -top-4 -right-4 w-12 h-12 text-comic-red animate-spin" />
            </div>
            
            {showCountdown && (
              <div className="bg-comic-red text-white px-6 py-3 comic-border text-3xl font-bold animate-pulse">
                <Timer className="inline mr-2" />
                {countdown}
              </div>
            )}
            
            <div className="text-center">
              <div className="bg-comic-green text-white px-4 py-2 comic-border font-bold">
                🎯 TOPIC: "Should AI be regulated?"
              </div>
            </div>
          </div>

          {/* Player 2 / Opponent */}
          <Card className="bg-gradient-to-br from-comic-red to-comic-pink p-8 comic-border transform rotate-1 hover:rotate-0 transition-transform duration-300">
            <div className="text-center text-white space-y-4">
              <div className="relative">
                <Avatar className="w-24 h-24 mx-auto comic-border bg-comic-yellow">
                  <AvatarFallback className="text-comic-dark font-bold text-3xl">
                    {opponentReady ? 'O' : '?'}
                  </AvatarFallback>
                </Avatar>
                <Shield className="absolute -top-2 -right-2 w-8 h-8 text-comic-yellow" />
              </div>
              
              <h3 className="text-2xl font-bold">
                {opponentReady ? 'Opponent' : 'Finding opponent...'}
              </h3>
              
              <Badge className={`text-lg px-4 py-2 comic-border ${
                opponentReady ? 'bg-comic-green animate-pulse' : 'bg-gray-500'
              }`}>
                {opponentReady ? '⚡ READY TO FIGHT!' : 'Joining...'}
              </Badge>
              
              <div className="bg-comic-yellow text-comic-dark px-3 py-1 comic-border font-bold rounded">
                CON SIDE
              </div>
              
              {opponentReady && (
                <div className="bg-white/90 text-comic-dark p-3 comic-border rounded-lg">
                  <p className="font-bold text-sm">
                    "{battleReadyQuotes[Math.floor(Math.random() * battleReadyQuotes.length)]}"
                  </p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Tips Section */}
        <div className="mt-12 text-center">
          <div className="bg-comic-purple text-white px-6 py-4 comic-border transform -rotate-1 inline-block">
            <p className="font-bold text-lg">
              {tips[Math.floor(Math.random() * tips.length)]}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row gap-6 items-center">
          <Button
            onClick={onLeaveRoom}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-8 py-4 comic-border transform hover:scale-105 transition-transform"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Leave Arena
          </Button>
          
          <Button
            onClick={handleToggleReady}
            disabled={showCountdown}
            className={`font-bold text-xl px-12 py-6 comic-border transform hover:scale-105 transition-transform ${
              isReady 
                ? 'bg-comic-green hover:bg-comic-green/80 text-white shadow-lg shadow-comic-green/50' 
                : 'bg-comic-red hover:bg-comic-red/80 text-white shadow-lg shadow-comic-red/50'
            }`}
          >
            <Zap className="mr-3 h-6 w-6" />
            {isReady ? 'READY FOR BATTLE!' : 'GET READY!'}
          </Button>
        </div>

        {/* Floating comic effects */}
        <div className="absolute top-32 left-16 bg-comic-orange comic-border rounded-full w-20 h-20 flex items-center justify-center transform rotate-45 animate-bounce opacity-70">
          <span className="text-white font-bold text-sm">POW!</span>
        </div>
        
        <div className="absolute bottom-32 right-16 bg-comic-pink comic-border rounded-full w-16 h-16 flex items-center justify-center transform -rotate-45 animate-pulse opacity-70">
          <span className="text-white font-bold text-xs">BOOM!</span>
        </div>
      </div>
    </div>
  );
};
