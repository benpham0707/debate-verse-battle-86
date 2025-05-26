
import React from 'react';

interface Message {
  id: string;
  player: string;
  content: string;
  timestamp: Date;
  phase: string;
}

interface ChatMessageProps {
  message: Message;
  isOwn: boolean;
}

export const ChatMessage = ({ message, isOwn }: ChatMessageProps) => {
  const getBubbleStyle = () => {
    if (isOwn) {
      return 'comic-panel bg-comic-blue text-white ml-8 transform rotate-1';
    }
    return 'comic-panel bg-white text-comic-dark mr-8 transform -rotate-1';
  };

  const getPlayerColor = () => {
    return isOwn ? 'text-comic-yellow' : 'text-comic-red';
  };

  return (
    <div className={`${isOwn ? 'text-right' : 'text-left'} animate-bounce-in relative`}>
      {/* Comic book panel wrapper */}
      <div className="relative inline-block">
        {/* Background comic effect elements */}
        {!isOwn && (
          <div className="comic-effect comic-effect-pow comic-effect-small absolute -top-3 -left-3 z-10" style={{ animationDelay: '0.2s' }}></div>
        )}
        {isOwn && (
          <div className="comic-effect comic-effect-zap comic-effect-small absolute -top-3 -right-3 z-10" style={{ animationDelay: '0.3s' }}></div>
        )}
        
        {/* Main message panel */}
        <div className={`inline-block max-w-xs ${getBubbleStyle()} relative z-20`}>
          {/* Panel border effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/10 pointer-events-none rounded-lg"></div>
          
          <div className="relative z-30 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-bold ${getPlayerColor()} drop-shadow-lg`}>
                {message.player}
              </span>
              <span className="text-xs opacity-75 bg-black/20 px-2 py-1 rounded">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            
            {/* Argument text with comic styling */}
            <div className="relative">
              <p className="font-bold text-lg leading-tight drop-shadow-md">{message.content}</p>
              
              {/* Speech bubble tail for comic effect */}
              <div className={`absolute bottom-0 ${isOwn ? 'right-0 transform translate-x-4 translate-y-4' : 'left-0 transform -translate-x-4 translate-y-4'}`}>
                <div className={`w-0 h-0 border-l-[15px] border-r-[15px] border-t-[20px] ${isOwn ? 'border-l-transparent border-r-comic-blue border-t-comic-blue' : 'border-r-transparent border-l-white border-t-white'}`}></div>
                <div className={`w-0 h-0 border-l-[12px] border-r-[12px] border-t-[16px] absolute top-[-18px] ${isOwn ? 'left-[3px] border-l-transparent border-r-black border-t-black' : 'left-0 border-r-transparent border-l-black border-t-black'}`}></div>
              </div>
            </div>
            
            <div className="text-xs opacity-90 mt-2 font-bold bg-black/20 px-2 py-1 rounded inline-block">
              {message.phase.toUpperCase()} PHASE
            </div>
          </div>
          
          {/* Impact lines for dramatic effect */}
          <div className="comic-impact-lines opacity-30"></div>
        </div>
        
        {/* Additional comic effects */}
        {message.content.length > 50 && (
          <div className={`comic-effect comic-effect-explosion comic-effect-small absolute ${isOwn ? 'bottom-2 left-2' : 'bottom-2 right-2'} z-10`} style={{ animationDelay: '0.5s' }}></div>
        )}
      </div>
    </div>
  );
};
