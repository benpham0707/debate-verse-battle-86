
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Bell } from 'lucide-react';

export const NewsDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="comic-border bg-gradient-to-r from-comic-orange to-comic-yellow text-comic-dark px-4 py-2 font-bold text-sm hover:from-comic-yellow hover:to-comic-orange transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
        <Bell className="h-4 w-4" />
        NEWS & UPDATES
        <ChevronDown className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 comic-border bg-white/95 backdrop-blur-sm z-50">
        <DropdownMenuLabel className="text-comic-dark font-bold text-lg">Latest Updates</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-comic-dark/20" />
        
        <DropdownMenuItem className="p-3 hover:bg-comic-blue/10 transition-colors">
          <div className="space-y-1">
            <div className="font-bold text-comic-red text-sm">🔥 NEW FEATURE</div>
            <div className="text-sm text-comic-dark">Health system now includes combo multipliers!</div>
            <div className="text-xs text-comic-dark/70">2 days ago</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 hover:bg-comic-green/10 transition-colors">
          <div className="space-y-1">
            <div className="font-bold text-comic-green text-sm">⚡ PATCH v1.2.1</div>
            <div className="text-sm text-comic-dark">Fixed timer synchronization issues</div>
            <div className="text-xs text-comic-dark/70">1 week ago</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 hover:bg-comic-purple/10 transition-colors">
          <div className="space-y-1">
            <div className="font-bold text-comic-purple text-sm">🎨 UI UPDATE</div>
            <div className="text-sm text-comic-dark">Enhanced Spider-Verse visual effects</div>
            <div className="text-xs text-comic-dark/70">2 weeks ago</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem className="p-3 hover:bg-comic-pink/10 transition-colors">
          <div className="space-y-1">
            <div className="font-bold text-comic-pink text-sm">🏆 TOURNAMENT</div>
            <div className="text-sm text-comic-dark">Weekly championship starts Monday!</div>
            <div className="text-xs text-comic-dark/70">3 weeks ago</div>
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator className="bg-comic-dark/20" />
        <DropdownMenuItem className="p-3 text-center text-comic-blue font-bold hover:bg-comic-blue/10">
          View All Updates →
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
