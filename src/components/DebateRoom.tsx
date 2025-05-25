
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Heart, Clock, Mic, MicOff, Send } from 'lucide-react';
import { HealthBar } from '@/components/HealthBar';
import { DebateTimer } from '@/components/DebateTimer';
import { ChatMessage } from '@/components/ChatMessage';

interface DebateRoomProps {
  roomId: string;
  playerName: string;
  onBack: () => void;
}

type DebatePhase = 'opening' | 'rebuttal' | 'crossfire' | 'final' | 'judging' | 'complete';

interface Player {
  name: string;
  health: number;
  side: 'pro' | 'con';
}

interface Message {
  id: string;
  player: string;
  content: string;
  timestamp: Date;
  phase: DebatePhase;
}

export const DebateRoom = ({ roomId, playerName, onBack }: DebateRoomProps) => {
  const [players] = useState<Player[]>([
    { name: playerName, health: 100, side: 'pro' },
    { name: 'Opponent', health: 85, side: 'con' }
  ]);
  
  const [currentPhase, setCurrentPhase] = useState<DebatePhase>('opening');
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [currentSpeaker, setCurrentSpeaker] = useState(0);
  const [isMyTurn, setIsMyTurn] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  const topic = "Should AI be heavily regulated by governments?";

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handlePhaseComplete();
          return getPhaseTime(getNextPhase());
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPhase]);

  const getPhaseTime = (phase: DebatePhase): number => {
    switch (phase) {
      case 'opening':
      case 'rebuttal':
      case 'final':
        return 30;
      case 'crossfire':
        return 90;
      case 'judging':
        return 30;
      default:
        return 0;
    }
  };

  const getNextPhase = (): DebatePhase => {
    const phases: DebatePhase[] = ['opening', 'rebuttal', 'crossfire', 'final', 'judging', 'complete'];
    const currentIndex = phases.indexOf(currentPhase);
    return phases[currentIndex + 1] || 'complete';
  };

  const handlePhaseComplete = () => {
    const nextPhase = getNextPhase();
    setCurrentPhase(nextPhase);
    
    if (nextPhase === 'judging') {
      // Simulate AI judging
      setTimeout(() => {
        setCurrentPhase('complete');
      }, 3000);
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !isMyTurn) return;

    const message: Message = {
      id: Date.now().toString(),
      player: playerName,
      content: newMessage,
      timestamp: new Date(),
      phase: currentPhase
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsMyTurn(false);
    
    // Simulate opponent response (in real app, this would be real-time)
    setTimeout(() => {
      setIsMyTurn(true);
    }, 2000);
  };

  const getPhaseDescription = () => {
    switch (currentPhase) {
      case 'opening':
        return 'Opening Statements - Present your initial argument';
      case 'rebuttal':
        return 'Rebuttals - Address your opponent\'s points';
      case 'crossfire':
        return 'Crossfire - Rapid back-and-forth Q&A';
      case 'final':
        return 'Final Arguments - Make your closing case';
      case 'judging':
        return 'AI Judging - GPT-4 is evaluating arguments...';
      case 'complete':
        return 'Debate Complete!';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen p-4 relative">
      {/* Comic Effects Background */}
      <div className="absolute top-10 right-20 comic-explosion w-12 h-12 opacity-30"></div>
      <div className="absolute bottom-20 left-10 comic-zap w-10 h-12 opacity-40"></div>
      <div className="absolute top-1/3 left-1/4 comic-pow w-8 h-6 opacity-25"></div>
      <div className="comic-star-burst top-20 left-20" style={{ animationDelay: '0.5s' }}></div>
      <div className="comic-star-burst bottom-40 right-40" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-6xl mx-auto space-y-4 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button 
            onClick={onBack}
            variant="outline"
            className="comic-border bg-white hover:bg-gray-50 relative"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Exit Battle
            <div className="comic-star-burst -top-1 -right-1" style={{ animationDelay: '2s' }}></div>
          </Button>
          
          <div className="text-center relative">
            <Badge className="bg-comic-blue text-white font-bold text-lg px-4 py-2 mb-2 comic-border relative">
              ROOM: {roomId}
              <div className="comic-impact-lines"></div>
            </Badge>
            <h2 className="font-bold text-xl text-comic-dark">{topic}</h2>
            <div className="comic-burst w-6 h-6 absolute -top-2 -right-2 opacity-50"></div>
          </div>
          
          <div className="relative">
            <DebateTimer timeRemaining={timeRemaining} phase={currentPhase} />
            <div className="comic-zap w-6 h-8 absolute -bottom-2 -right-2 opacity-60"></div>
          </div>
        </div>

        {/* Players Health */}
        <div className="grid grid-cols-2 gap-4">
          {players.map((player, index) => (
            <Card key={index} className="comic-border bg-white p-4 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-comic-dark">{player.name}</span>
                <Badge className={`${player.side === 'pro' ? 'bg-comic-green' : 'bg-comic-red'} text-white font-bold comic-border`}>
                  {player.side.toUpperCase()}
                </Badge>
              </div>
              <HealthBar health={player.health} maxHealth={100} />
              <div className="comic-star-burst top-2 right-2" style={{ animationDelay: `${index * 0.5}s` }}></div>
            </Card>
          ))}
        </div>

        {/* Phase Info */}
        <Card className="comic-border bg-comic-yellow/20 p-4 relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-comic-dark text-lg">{getPhaseDescription()}</h3>
              <p className="text-comic-dark">
                {isMyTurn ? "Your turn to speak" : "Waiting for opponent..."}
              </p>
            </div>
            <Button
              onClick={() => setIsMuted(!isMuted)}
              variant="outline"
              className="comic-border relative"
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {!isMuted && <div className="comic-impact-lines"></div>}
            </Button>
          </div>
          <div className="comic-explosion w-8 h-8 absolute -top-2 -left-2 opacity-40"></div>
        </Card>

        {/* Chat Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Messages */}
          <Card className="lg:col-span-2 comic-border bg-white p-4 h-96 relative">
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                {messages.map((message) => (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    isOwn={message.player === playerName}
                  />
                ))}
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <p className="font-bold">Debate starts now!</p>
                    <p>Make your opening statement...</p>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex space-x-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={isMyTurn ? "Enter your argument..." : "Wait for your turn..."}
                  disabled={!isMyTurn || currentPhase === 'judging' || currentPhase === 'complete'}
                  className="comic-border"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!isMyTurn || !newMessage.trim() || currentPhase === 'judging' || currentPhase === 'complete'}
                  className="bg-comic-blue hover:bg-comic-blue/80 text-white comic-border relative"
                >
                  <Send className="h-4 w-4" />
                  <div className="comic-impact-lines"></div>
                </Button>
              </div>
            </div>
            <div className="comic-pow w-6 h-4 absolute -bottom-1 -right-1 opacity-50"></div>
          </Card>

          {/* Battle Stats */}
          <Card className="comic-border bg-white p-4 relative">
            <h3 className="font-bold text-comic-dark text-lg mb-4">BATTLE STATS</h3>
            <div className="space-y-3">
              <div className="p-3 bg-comic-green/20 comic-border relative">
                <p className="text-sm font-bold text-comic-dark">Current Phase</p>
                <p className="text-lg font-bold text-comic-green">{currentPhase.toUpperCase()}</p>
                <div className="comic-star-burst top-1 right-1" style={{ animationDelay: '0.3s' }}></div>
              </div>
              
              <div className="p-3 bg-comic-blue/20 comic-border relative">
                <p className="text-sm font-bold text-comic-dark">Time Left</p>
                <p className="text-lg font-bold text-comic-blue">{timeRemaining}s</p>
                <div className="comic-zap w-4 h-5 absolute top-0 right-0 opacity-60"></div>
              </div>
              
              <div className="p-3 bg-comic-purple/20 comic-border">
                <p className="text-sm font-bold text-comic-dark">Messages</p>
                <p className="text-lg font-bold text-comic-purple">{messages.length}</p>
              </div>

              {currentPhase === 'complete' && (
                <div className="p-3 bg-comic-yellow comic-border relative">
                  <p className="text-sm font-bold text-comic-dark">Winner</p>
                  <p className="text-lg font-bold text-comic-red">
                    {players[0].health > players[1].health ? players[0].name : players[1].name}
                  </p>
                  <div className="comic-explosion w-8 h-8 absolute -top-2 -right-2 opacity-70"></div>
                  <div className="comic-impact-lines"></div>
                </div>
              )}
            </div>
            <div className="comic-burst w-10 h-10 absolute -top-2 -left-2 opacity-30"></div>
          </Card>
        </div>
      </div>
    </div>
  );
};
