
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, User, History, List, Book } from 'lucide-react';

interface DirectoryDropdownProps {
  playerName: string;
}

export const DirectoryDropdown = ({ playerName }: DirectoryDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="comic-border bg-gradient-to-r from-comic-purple to-comic-pink text-white px-4 py-2 font-bold text-sm hover:from-comic-pink hover:to-comic-purple transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
        <User className="h-4 w-4" />
        {playerName || 'PLAYER'}
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 comic-border bg-white/95 backdrop-blur-sm z-50">
        <DropdownMenuLabel className="text-comic-dark font-bold text-lg flex items-center gap-2">
          <User className="h-5 w-5 text-comic-purple" />
          Player Menu
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-comic-dark/20" />
        
        <DropdownMenuItem className="p-3 hover:bg-comic-purple/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <User className="h-5 w-5 text-comic-purple" />
            <div>
              <div className="font-bold text-comic-dark">Profile</div>
              <div className="text-xs text-comic-dark/70">View and edit your profile</div>
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 hover:bg-comic-blue/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <History className="h-5 w-5 text-comic-blue" />
            <div>
              <div className="font-bold text-comic-dark">Match History</div>
              <div className="text-xs text-comic-dark/70">See your past debates</div>
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 hover:bg-comic-green/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <Book className="h-5 w-5 text-comic-green" />
            <div>
              <div className="font-bold text-comic-dark">Leaderboards</div>
              <div className="text-xs text-comic-dark/70">Check rankings</div>
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 hover:bg-comic-orange/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <List className="h-5 w-5 text-comic-orange" />
            <div>
              <div className="font-bold text-comic-dark">Settings</div>
              <div className="text-xs text-comic-dark/70">Game preferences</div>
            </div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-comic-dark/20" />
        
        <DropdownMenuItem className="p-3 hover:bg-comic-red/10 transition-colors cursor-pointer">
          <div className="flex items-center gap-3 w-full">
            <div className="w-5 h-5 bg-comic-red rounded text-white text-xs flex items-center justify-center font-bold">!</div>
            <div>
              <div className="font-bold text-comic-red">Logout</div>
              <div className="text-xs text-comic-dark/70">Sign out of your account</div>
            </div>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
