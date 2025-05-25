
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Zap, Swords, ArrowLeft, Timer } from 'lucide-react';

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
  const [captionIndex, setCaptionIndex] = useState(0);
  const [showCountdown, setShowCountdown] = useState(false);

  const captions = [
    "Sharpen your arguments...",
    "Opponent is warming up...",
    "Prepare for intellectual combat!",
    "Ready to debate?"
  ];

  const taunts = [
    "You're going down!",
    "I've got facts on my side!",
    "Prepare to be schooled!",
    "Bring your A-game!",
    "Logic will prevail!"
  ];

  const tips = [
    "💡 Tip: Use concrete examples to support your points",
    "🎯 Tip: Listen carefully to counter your opponent's arguments",
    "⚡ Tip: Stay calm and focused during heated exchanges",
    "🔥 Tip: Strong opening statements set the tone"
  ];

  // Rotate captions every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % captions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Simulate opponent joining and getting ready
  useEffect(() => {
    const timer = setTimeout(() => {
      setOpponentReady(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Start countdown when both players are ready
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
      {/* Background Effects */}
      <div className="absolute inset-0 halftone-bg opacity-20" />
      
      {/* Header Section */}
      <div className="text-center mb-8 relative z-10">
        <div className="relative inline-block">
          <h1 className="font-bold text-4xl md:text-6xl text-comic-dark mb-4 comic-border bg-comic-yellow px-6 py-3 transform -rotate-1 inline-block">
            <Zap className="inline mr-2 h-8 w-8 md:h-12 md:w-12" />
            Waiting for Battle to Begin!
          </h1>
          
          {/* Floating comic effects */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-comic-red comic-border rounded-full flex items-center justify-center transform rotate-12 animate-pulse">
            <span className="text-white font-bold text-sm">BAM!</span>
          </div>
        </div>
        
        <p className="text-xl text-comic-dark font-bold mt-4 animate-fade-in-up">
          {captions[captionIndex]}
        </p>
        
        <div className="mt-4 text-comic-dark font-bold">
          Room: <span className="bg-comic-purple text-white px-3 py-1 comic-border text-lg">{roomId}</span>
        </div>
      </div>

      {/* Main Battle Arena */}
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Player Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8">
          {/* Player 1 Card */}
          <Card className="comic-border bg-comic-blue p-6 transform -rotate-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-comic-blue via-comic-purple to-comic-blue opacity-80" />
            <div className="relative z-10 text-center text-white">
              <Avatar className="w-20 h-20 mx-auto mb-4 comic-border">
                <AvatarFallback className="bg-comic-yellow text-comic-dark font-bold text-2xl">
                  {playerName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-bold text-2xl mb-2">{playerName}</h3>
              <Badge className={`mb-4 text-lg px-4 py-2 comic-border ${
                isReady ? 'bg-comic-green animate-pulse-glow' : 'bg-gray-500'
              }`}>
                {isReady ? '⚡ READY!' : 'Getting Ready...'}
              </Badge>
              
              <div className="bg-comic-dark text-white px-3 py-1 comic-border inline-block">
                <span className="font-bold">PRO</span>
              </div>
              
              {/* Speech Bubble */}
              <div className="speech-bubble mt-4 bg-white text-comic-dark">
                <p className="font-bold text-sm">
                  {isReady ? taunts[Math.floor(Math.random() * taunts.length)] : "Preparing arguments..."}
                </p>
              </div>
            </div>
          </Card>

          {/* Player 2 Card */}
          <Card className="comic-border bg-comic-red p-6 transform rotate-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-comic-red via-comic-pink to-comic-red opacity-80" />
            <div className="relative z-10 text-center text-white">
              <Avatar className="w-20 h-20 mx-auto mb-4 comic-border">
                <AvatarFallback className="bg-comic-yellow text-comic-dark font-bold text-2xl">
                  ?
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-bold text-2xl mb-2">Waiting for opponent...</h3>
              <Badge className={`mb-4 text-lg px-4 py-2 comic-border ${
                opponentReady ? 'bg-comic-green animate-pulse-glow' : 'bg-gray-500'
              }`}>
                {opponentReady ? '⚡ READY!' : 'Joining...'}
              </Badge>
              
              <div className="bg-comic-dark text-white px-3 py-1 comic-border inline-block">
                <span className="font-bold">CON</span>
              </div>
              
              {/* Speech Bubble */}
              <div className="speech-bubble mt-4 bg-white text-comic-dark">
                <p className="font-bold text-sm">
                  {opponentReady ? taunts[Math.floor(Math.random() * taunts.length)] : "Loading..."}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Center VS Divider */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="relative">
            <div className="w-32 h-32 bg-comic-yellow comic-border rounded-full flex items-center justify-center transform rotate-12 animate-comic-zoom">
              <Swords className="h-16 w-16 text-comic-dark" />
            </div>
            <div className="absolute -top-2 -right-2 w-24 h-24 bg-comic-orange comic-border rounded-full flex items-center justify-center transform -rotate-12">
              <span className="font-bold text-2xl text-comic-dark">VS</span>
            </div>
            
            {showCountdown && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-comic-red text-white px-4 py-2 comic-border text-2xl font-bold animate-pulse">
                  <Timer className="inline mr-2" />
                  {countdown}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Topic Display */}
      <div className="mt-8 mb-6 text-center">
        <Card className="comic-border bg-comic-green p-4 transform rotate-1 inline-block">
          <h4 className="font-bold text-comic-dark text-lg mb-2">🎯 Debate Topic:</h4>
          <p className="text-comic-dark font-bold">
            "Should AI be regulated by government oversight?"
          </p>
        </Card>
      </div>

      {/* Tips Carousel */}
      <div className="mb-8 text-center">
        <div className="bg-comic-purple text-white px-6 py-3 comic-border inline-block transform -rotate-1">
          <p className="font-bold">
            {tips[Math.floor(Math.random() * tips.length)]}
          </p>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          onClick={onLeaveRoom}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-6 py-3 comic-border transform hover:scale-105 transition-transform"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Leave Room
        </Button>
        
        <Button
          onClick={handleToggleReady}
          disabled={showCountdown}
          className={`font-bold text-xl px-8 py-4 comic-border transform hover:scale-105 transition-transform ${
            isReady 
              ? 'bg-comic-green hover:bg-comic-green/80 text-white animate-pulse-glow' 
              : 'bg-comic-red hover:bg-comic-red/80 text-white'
          }`}
        >
          <Zap className="mr-2 h-6 w-6" />
          {isReady ? 'READY TO BATTLE!' : 'TOGGLE READY'}
        </Button>
      </div>

      {/* Floating Effects */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-comic-orange comic-border rounded-full flex items-center justify-center transform rotate-45 animate-bounce opacity-60">
        <span className="text-comic-dark font-bold text-xs">POW!</span>
      </div>
      
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-comic-pink comic-border rounded-full flex items-center justify-center transform -rotate-45 animate-pulse opacity-60">
        <span className="text-white font-bold text-sm">FIGHT!</span>
      </div>
    </div>
  );
};
