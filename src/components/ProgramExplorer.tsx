/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROGRAMS } from '../data';
import { Program } from '../types';
import { BookOpen, Award, GraduationCap, Heart, Smile, CheckSquare, Clock, Users, ArrowRight, Sparkles, Star } from 'lucide-react';

interface ProgramExplorerProps {
  onSelectProgram: (programId: string) => void;
}

// Highly descriptive, contextual image mapping for top academic program cards
const PROGRAM_IMAGES: Record<string, string> = {
  'ba-psychology': 'https://images.unsplash.com/photo-1516534775068-ba3e84589d90?auto=format&fit=crop&q=80&w=400&h=240',
  'ba-polscience': 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=400&h=240',
  'ba-english': 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400&h=240',
  'ba-ai': 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400&h=240',
  'ba-bed-special': 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400&h=240',
  'b-ed': 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400&h=240',
  'b-ed-special': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=400&h=240',
  'ma-psychology': 'https://images.unsplash.com/photo-1527137341206-1a7ab47ba951?auto=format&fit=crop&q=80&w=400&h=240',
  'ma-polscience': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=400&h=240',
  'm-ed': 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400&h=240',
  'm-ed-special': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=400&h=240'
};

export default function ProgramExplorer({ onSelectProgram }: ProgramExplorerProps) {
  const [activeCategory, setActiveCategory] = useState<'Undergraduate' | 'Postgraduate'>('Undergraduate');

  // Filter programs to show only Undergraduate or Postgraduate
  const filteredPrograms = PROGRAMS.filter(p => p.level === activeCategory);

  // Selector helper for card level icon mapping
  const getIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className={className} />;
      case 'Award':
        return <Award className={className} />;
      case 'GraduationCap':
        return <GraduationCap className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      case 'Smile':
        return <Smile className={className} />;
      default:
        return <GraduationCap className={className} />;
    }
  };

  return (
    <section id="program-explorer" className="w-full bg-white py-16 md:py-24 px-4 md:px-8 relative overflow-hidden">
      {/* Subtle decorative accents */}
      <div className="absolute top-0 right-1/4 h-72 w-72 bg-brand-gold/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 h-72 w-72 bg-brand-navy/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading matching high levels of craft */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-sans font-black tracking-tight text-brand-navy uppercase">
            OUR PROGRAMS
          </h2>
          <div className="h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent w-20 mx-auto rounded-full mt-3 mb-4" />
          <p className="text-slate-500 text-xs md:text-sm tracking-widest uppercase font-black">
            Choose your gateway to academic leadership & professional specialized careers
          </p>
        </div>

        {/* Horizontal Tab Menu replicating image's custom design */}
        <div className="relative w-full max-w-2xl mx-auto mb-12">
          {/* Flat horizontal background line */}
          <div className="absolute bottom-0 left-0 w-full h-[2px] bg-slate-200 z-0" />

          {/* Centered tab switcher buttons */}
          <div className="relative flex justify-center items-center gap-2 sm:gap-4 z-10">
            {(['Undergraduate', 'Postgraduate'] as const).map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  id={`tab-${cat.toLowerCase()}`}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-6 sm:px-10 py-3 text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 cursor-pointer min-w-[150px] sm:min-w-[180px] text-center rounded-t-xl ${
                    isActive
                      ? 'bg-brand-gold text-brand-navy shadow-md'
                      : 'bg-slate-50 text-slate-500 hover:text-brand-navy hover:bg-slate-100'
                  }`}
                >
                  <span>{cat}</span>
                  {isActive && (
                    <div className="absolute -bottom-[2px] left-0 w-full h-1 bg-brand-navy" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programs Grid: Beautiful warm, gold/cream-toned card layout imitating the premium aesthetic */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPrograms.map((prog, index) => {
              const cardImage = PROGRAM_IMAGES[prog.id] || 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=400&h=240';
              return (
                <motion.div
                  key={prog.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="bg-[#FDF6EE] hover:bg-[#FAF0E3] rounded-2xl border border-brand-gold/20 shadow-sm transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  
                  {/* Top Image block for exquisite real-world context - Made smaller and more minimal */}
                  <div className="relative h-28 sm:h-32 w-full overflow-hidden bg-slate-100">
                    <img 
                      src={cardImage} 
                      alt={prog.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Top overlay badge */}
                    <div className="absolute top-2.5 left-2.5 bg-brand-navy/90 text-brand-gold text-[8px] font-black tracking-widest px-2 py-0.5 rounded uppercase shadow">
                      {prog.level}
                    </div>
                  </div>

                  {/* Card Content parameters - Reduced padding for high density */}
                  <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Icon Row */}
                      <div className="flex gap-2 justify-between items-start mb-2">
                        <h3 className="text-sm font-extrabold text-brand-navy leading-snug tracking-tight">
                          {prog.name}
                        </h3>
                        <div className="h-7 w-7 rounded-md bg-brand-navy text-brand-gold flex items-center justify-center flex-shrink-0 shadow-inner">
                          {getIcon(prog.iconName, "h-3.5 w-3.5")}
                        </div>
                      </div>

                      {/* Brief description - Exact content only */}
                      <p className="text-slate-600 text-[11px] leading-relaxed font-semibold mb-3">
                        {prog.description}
                      </p>
                    </div>

                    {/* Dynamic Interactive Call to Action */}
                    <div className="mt-2.5">
                      <button
                        type="button"
                        onClick={() => onSelectProgram(prog.id)}
                        className="w-full bg-brand-navy hover:bg-brand-navy-dark text-white font-black py-1.5 px-2 rounded-md text-[10px] flex items-center justify-center gap-1 transition-colors cursor-pointer group/btn uppercase tracking-wider"
                      >
                        <span>Admissions Inquiry</span>
                        <ArrowRight className="h-3 w-3 text-brand-gold group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Minimalist Micro Pagination Dots echoing reference look */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeCategory === 'Undergraduate' ? 'bg-[#A31F1F] scale-125' : 'bg-slate-300'}`} />
          <div className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${activeCategory === 'Postgraduate' ? 'bg-[#A31F1F] scale-125' : 'bg-slate-300'}`} />
        </div>

      </div>
    </section>
  );
}
