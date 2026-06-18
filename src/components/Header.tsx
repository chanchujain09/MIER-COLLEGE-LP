/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, Mail, FileText, Menu, X, Landmark, Search, 
  ChevronDown, Home, Rocket, GraduationCap, Award, HelpCircle
} from 'lucide-react';

interface HeaderProps {
  onScrollToForm: () => void;
  onOpenPortal: () => void;
  inquiryCount: number;
}

export default function Header({ onScrollToForm, onOpenPortal, inquiryCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { 
      name: 'ABOUT US', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Our Legacy (Estd. 1936)', href: '#academic-experience' },
        { label: 'NAAC A+ Accreditation & Score', href: '#accreditation' },
        { label: 'Vision, Mission & Core Values', href: '#academic-experience' },
        { label: 'Leadership & Board of Directors', href: '#academic-experience' }
      ]
    },
    { 
      name: 'ADMISSIONS', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Apply Online for 2026 Session', href: '#inquiry-form-section' },
        { label: 'Scholarship Schemes & Grants', href: '#accreditation' },
        { label: 'Eligibility & Selection Norms', href: '#program-explorer' },
        { label: 'Admission Fee Structure', href: '#inquiry-form-section' }
      ]
    },
    { 
      name: 'ACADEMICS', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Pedagogical Excellence Model', href: '#academic-experience' },
        { label: 'Internal Quality Assurance (IQAC)', href: '#accreditation' },
        { label: 'Academic Calendar 2026', href: '#academic-experience' },
        { label: 'Research & Innovation Wing', href: '#success-stories' }
      ]
    },
    { 
      name: 'PROGRAMS', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'B.Ed. (Bachelor of Education)', href: '#program-explorer' },
        { label: 'M.Ed. (Master of Education)', href: '#program-explorer' },
        { label: 'M.A. (Education)', href: '#program-explorer' },
        { label: 'B.Ed. Special Education', href: '#program-explorer' }
      ]
    },
    { name: 'RESEARCH', hasDropdown: false },
    { name: 'PLACEMENTS', hasDropdown: false },
    { 
      name: 'CONTACT US', 
      hasDropdown: true,
      dropdownItems: [
        { label: 'Campus Contact Directory', href: '#inquiry-form-section' },
        { label: 'Dean Office Inquiry', href: '#inquiry-form-section' },
        { label: 'Location Map & Tour Guide', href: '#inquiry-form-section' }
      ]
    }
  ];

  return (
    <header className="w-full relative z-50 shadow-sm font-sans select-none">
      

      {/* 2. MAIN HEADER BLOCK (Double layered on desktop, clean drawer on mobile) */}
      <div className="w-full bg-white relative border-b border-gray-100">
        <div className="w-full mx-auto flex items-stretch h-18 md:h-24 relative pl-4 md:pl-12">
          
          {/* ================ LEFT BRANDING SIDEBAR ================ */}
          <div className="relative flex items-center bg-white pl-4 pr-6 md:pl-2 md:pr-10 z-20 self-stretch shrink-0 shadow-none border-none">
            <a href="#" className="flex items-center">
              <img 
                src="https://i.postimg.cc/rwkhdp2m/MIER-COLLEGE-OF-EDUCATION-copy.png" 
                alt="MIER College of Education" 
                referrerPolicy="no-referrer"
                className="h-14 md:h-20 w-auto object-contain select-none"
              />
            </a>
          </div>

          {/* ================ RIGHT LAYER (Double decker) ================ */}
          <div className="flex-1 flex flex-col justify-between items-stretch">
            
            {/* MIDDLE ROW (Blue Ribbon) - Desktop Only */}
            <div 
              className="hidden lg:flex flex-1 bg-[#134e8f] items-center justify-end pr-8 pl-14 relative z-15 text-white"
              style={{ clipPath: 'polygon(36px 0, 100% 0, 100% 100%, 0 100%)' }}
            >

            </div>

            {/* BOTTOM ROW (White Main Menu Navigation) - Desktop Only */}
            <div className="hidden lg:flex h-14 items-center justify-between px-6 z-10 border-b border-gray-100 bg-white">

            </div>

            {/* Combined Row for Mobile - Logo Area with Hamburguer Option right next to it */}
            <div className="flex lg:hidden flex-1 items-center justify-end px-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  id="btn-portal-mobile"
                  onClick={onOpenPortal}
                  className="bg-brand-navy border border-brand-gold text-brand-gold px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1 relative active:scale-95 transition-all"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>Portal</span>
                  {inquiryCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[8px] font-black h-4.5 w-4.5 rounded-full flex items-center justify-center animate-bounce border border-white">
                      {inquiryCount}
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  id="btn-mobile-hamburger"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-brand-navy hover:text-brand-gold cursor-pointer transition-colors"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile slide drawer */}

        {/* ================ MOBILE DROPDOWN BOX DRAWERS ================ */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden w-full bg-white border-t border-gray-100 shadow-2xl overflow-hidden absolute top-full left-0 z-35"
            >
              <div className="px-6 py-4 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
                
                {/* Search Bar on Mobile */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search MIER website..."
                    className="w-full pl-9 pr-3 py-2 rounded-md border border-gray-200 text-xs focus:ring-1 focus:ring-brand-gold bg-slate-50 focus:outline-none"
                  />
                </div>

                {/* Navigation Links */}
                <div className="space-y-1">
                  <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 py-2 text-xs font-black text-brand-navy hover:text-brand-gold">
                    <Home className="h-4 w-4" />
                    <span>CAMPUS HOME</span>
                  </a>

                  {menuItems.map((item) => (
                    <div key={item.name} className="border-b border-gray-50 py-1">
                      <div 
                        className="flex justify-between items-center py-2 text-xs font-extrabold text-gray-700 cursor-pointer hover:text-brand-navy"
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      >
                        <span>{item.name}</span>
                        {item.hasDropdown && (
                          <span className={`text-[9px] transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`}>▼</span>
                        )}
                      </div>

                      {item.hasDropdown && activeDropdown === item.name && (
                        <div className="pl-3 py-1 space-y-1 border-l-2 border-brand-gold/20 mb-2">
                          {item.dropdownItems?.map((dropItem) => (
                            <a
                              key={dropItem.label}
                              href={dropItem.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1.5 text-[11px] text-gray-500 hover:text-brand-navy font-bold"
                            >
                              • {dropItem.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Admission Info Micro Area for Mobile */}
                <div className="bg-slate-50 p-4 rounded-lg space-y-3 border border-slate-100">
                  <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold">
                    <span>Academic Year: 2026-27</span>
                    <span>Accreditation: NAAC A+</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onScrollToForm();
                    }}
                    className="w-full bg-brand-gold hover:bg-brand-gold-dark text-brand-navy py-2.5 rounded-md text-center text-xs font-black shadow-md block transition-all"
                  >
                    🚀 Try Beta / Apply Now
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenPortal();
                    }}
                    className="w-full bg-white hover:bg-slate-50 border border-gray-200 text-brand-navy py-2 rounded-md text-center text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm block transition-all"
                  >
                    <FileText className="h-4 w-4 text-brand-gold" />
                    <span>My Inquiries Portal ({inquiryCount})</span>
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </header>
  );
}
