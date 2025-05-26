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
      {/* Simplified Background - keeping original halftone-bg only */}
      <div className="absolute inset-0 halftone-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-br from-comic-red/20 via-comic-purple/20 to-comic-blue/20" />
      
      {/* Header Section with Halftone Border */}
      <div className="text-center mb-8 relative z-10">
        <div className="relative inline-block">
          <div 
            className="absolute inset-0 -m-4 opacity-20"
            style={{
              backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
              backgroundSize: '8px 8px'
            }}
          />
          <h1 className="font-bold text-4xl md:text-6xl text-comic-dark mb-4 comic-border bg-comic-yellow px-6 py-3 transform -rotate-1 inline-block relative z-10">
            <Zap className="inline mr-2 h-8 w-8 md:h-12 md:w-12" />
            Waiting for Battle to Begin!
          </h1>
          
          {/* Floating comic effects with halftone backgrounds */}
          <div 
            className="absolute -top-4 -right-4 w-16 h-16 bg-comic-red comic-border rounded-full flex items-center justify-center transform rotate-12 animate-pulse relative"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }}
          >
            <span className="text-white font-bold text-sm relative z-10">BAM!</span>
          </div>
        </div>
        
        <p className="text-xl text-comic-dark font-bold mt-4 animate-fade-in-up">
          {captions[captionIndex]}
        </p>
        
        <div className="mt-4 text-comic-dark font-bold">
          Room: <span className="bg-comic-purple text-white px-3 py-1 comic-border text-lg relative">
            {roomId}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '6px 6px'
              }}
            />
          </span>
        </div>
      </div>

      {/* Main Battle Arena */}
      <div className="w-full max-w-6xl mx-auto relative">
        {/* Player Cards with Enhanced Halftone Effects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mb-8">
          {/* Player 1 Card */}
          <Card className="comic-border bg-comic-blue p-6 transform -rotate-1 relative overflow-hidden">
            {/* Halftone Background Layer */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)',
                backgroundSize: '12px 12px'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-comic-blue via-comic-purple to-comic-blue opacity-80" />
            <div className="relative z-10 text-center text-white">
              <div className="relative">
                <Avatar className="w-20 h-20 mx-auto mb-4 comic-border">
                  <AvatarFallback className="bg-comic-yellow text-comic-dark font-bold text-2xl">
                    {playerName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {/* Halftone Ring Around Avatar */}
                <div 
                  className="absolute inset-0 w-24 h-24 mx-auto mb-4 rounded-full opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #FFD600 1px, transparent 1px)',
                    backgroundSize: '6px 6px',
                    top: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              </div>
              
              <h3 className="font-bold text-2xl mb-2">{playerName}</h3>
              <Badge className={`mb-4 text-lg px-4 py-2 comic-border relative ${
                isReady ? 'bg-comic-green animate-pulse-glow' : 'bg-gray-500'
              }`}>
                {/* Halftone Pattern in Badge */}
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />
                <span className="relative z-10">
                  {isReady ? '⚡ READY!' : 'Getting Ready...'}
                </span>
              </Badge>
              
              <div className="bg-comic-dark text-white px-3 py-1 comic-border inline-block relative">
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '3px 3px'
                  }}
                />
                <span className="font-bold relative z-10">PRO</span>
              </div>
              
              {/* Speech Bubble with Halftone Shadow */}
              <div className="speech-bubble mt-4 bg-white text-comic-dark relative">
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
                    backgroundSize: '4px 4px'
                  }}
                />
                <p className="font-bold text-sm relative z-10">
                  {isReady ? taunts[Math.floor(Math.random() * taunts.length)] : "Preparing arguments..."}
                </p>
              </div>
            </div>
          </Card>

          {/* Player 2 Card */}
          <Card className="comic-border bg-comic-red p-6 transform rotate-1 relative overflow-hidden">
            {/* Halftone Background Layer */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 2px)',
                backgroundSize: '12px 12px'
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-comic-red via-comic-pink to-comic-red opacity-80" />
            <div className="relative z-10 text-center text-white">
              <div className="relative">
                <Avatar className="w-20 h-20 mx-auto mb-4 comic-border">
                  <AvatarFallback className="bg-comic-yellow text-comic-dark font-bold text-2xl">
                    ?
                  </AvatarFallback>
                </Avatar>
                {/* Halftone Ring Around Avatar */}
                <div 
                  className="absolute inset-0 w-24 h-24 mx-auto mb-4 rounded-full opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #FFD600 1px, transparent 1px)',
                    backgroundSize: '6px 6px',
                    top: '-2px',
                    left: '50%',
                    transform: 'translateX(-50%)'
                  }}
                />
              </div>
              
              <h3 className="font-bold text-2xl mb-2">Waiting for opponent...</h3>
              <Badge className={`mb-4 text-lg px-4 py-2 comic-border relative ${
                opponentReady ? 'bg-comic-green animate-pulse-glow' : 'bg-gray-500'
              }`}>
                <div 
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                    backgroundSize: '4px 4px'
                  }}
                />
                <span className="relative z-10">
                  {opponentReady ? '⚡ READY!' : 'Joining...'}
                </span>
              </Badge>
              
              <div className="bg-comic-dark text-white px-3 py-1 comic-border inline-block relative">
                <div 
                  className="absolute inset-0 opacity-15"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '3px 3px'
                  }}
                />
                <span className="font-bold relative z-10">CON</span>
              </div>
              
              {/* Speech Bubble with Halftone Shadow */}
              <div className="speech-bubble mt-4 bg-white text-comic-dark relative">
                <div 
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 0.5px, transparent 0.5px)',
                    backgroundSize: '4px 4px'
                  }}
                />
                <p className="font-bold text-sm relative z-10">
                  {opponentReady ? taunts[Math.floor(Math.random() * taunts.length)] : "Loading..."}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Center VS Divider with Enhanced Halftone Effects */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="relative">
            <div className="w-32 h-32 bg-comic-yellow comic-border rounded-full flex items-center justify-center transform rotate-12 animate-comic-zoom relative">
              {/* Halftone Background in VS Circle */}
              <div 
                className="absolute inset-0 rounded-full opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #000 1.5px, transparent 1.5px)',
                  backgroundSize: '8px 8px'
                }}
              />
              <Swords className="h-16 w-16 text-comic-dark relative z-10" />
            </div>
            <div className="absolute -top-2 -right-2 w-24 h-24 bg-comic-orange comic-border rounded-full flex items-center justify-center transform -rotate-12 relative">
              <div 
                className="absolute inset-0 rounded-full opacity-25"
                style={{
                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                  backgroundSize: '5px 5px'
                }}
              />
              <span className="font-bold text-2xl text-comic-dark relative z-10">VS</span>
            </div>
            
            {showCountdown && (
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="bg-comic-red text-white px-4 py-2 comic-border text-2xl font-bold animate-pulse relative">
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
                      backgroundSize: '4px 4px'
                    }}
                  />
                  <div className="relative z-10">
                    <Timer className="inline mr-2" />
                    {countdown}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Topic Display with Halftone Border */}
      <div className="mt-8 mb-6 text-center">
        <Card className="comic-border bg-comic-green p-4 transform rotate-1 inline-block relative">
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)',
              backgroundSize: '6px 6px'
            }}
          />
          <div className="relative z-10">
            <h4 className="font-bold text-comic-dark text-lg mb-2">🎯 Debate Topic:</h4>
            <p className="text-comic-dark font-bold">
              "Should AI be regulated by government oversight?"
            </p>
          </div>
        </Card>
      </div>

      {/* Tips Carousel with Halftone Effect */}
      <div className="mb-8 text-center">
        <div className="bg-comic-purple text-white px-6 py-3 comic-border inline-block transform -rotate-1 relative">
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '5px 5px'
            }}
          />
          <p className="font-bold relative z-10">
            {tips[Math.floor(Math.random() * tips.length)]}
          </p>
        </div>
      </div>

      {/* Bottom Action Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
        <Button
          onClick={onLeaveRoom}
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold text-lg px-6 py-3 comic-border transform hover:scale-105 transition-transform relative"
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }}
          />
          <div className="relative z-10">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Leave Room
          </div>
        </Button>
        
        <Button
          onClick={handleToggleReady}
          disabled={showCountdown}
          className={`font-bold text-xl px-8 py-4 comic-border transform hover:scale-105 transition-transform relative ${
            isReady 
              ? 'bg-comic-green hover:bg-comic-green/80 text-white animate-pulse-glow' 
              : 'bg-comic-red hover:bg-comic-red/80 text-white'
          }`}
        >
          <div 
            className="absolute inset-0 opacity-15"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '4px 4px'
            }}
          />
          <div className="relative z-10">
            <Zap className="mr-2 h-6 w-6" />
            {isReady ? 'READY TO BATTLE!' : 'TOGGLE READY'}
          </div>
        </Button>
      </div>

      {/* Floating Effects with Halftone Backgrounds */}
      <div 
        className="absolute top-20 left-10 w-16 h-16 bg-comic-orange comic-border rounded-full flex items-center justify-center transform rotate-45 animate-bounce opacity-60 relative"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)',
          backgroundSize: '4px 4px'
        }}
      >
        <span className="text-comic-dark font-bold text-xs relative z-10">POW!</span>
      </div>
      
      <div 
        className="absolute bottom-20 right-10 w-20 h-20 bg-comic-pink comic-border rounded-full flex items-center justify-center transform -rotate-45 animate-pulse opacity-60 relative"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px)',
          backgroundSize: '5px 5px'
        }}
      >
        <span className="text-white font-bold text-sm relative z-10">FIGHT!</span>
      </div>
    </div>
  );
};
