/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, Star, Award, ShieldCheck, Briefcase, Users, Calendar, 
  ChevronDown, Sparkles, BookOpen, HelpCircle, 
  BookOpenCheck, Compass, HeartHandshake, Landmark, PhoneCall, Check,
  ChevronLeft, ChevronRight, Play, Lightbulb, Target, Clock, Trophy,
  Facebook, Linkedin, Instagram, Youtube, Twitter, Mail, MapPin, Phone
} from 'lucide-react';

import Header from './components/Header';
import LeadForm from './components/LeadForm';
import ProgramExplorer from './components/ProgramExplorer';
import LeadPortal from './components/LeadPortal';
import { Inquiry } from './types';
import { HERO_CONTENT, ACHIEVEMENTS, REVIEWS, FAQS } from './data';

const studentTestimonials = [
  {
    name: 'Ms. Aprajita Sharma',
    batch: '2016-18',
    text: 'The two years that I have spent at MIER College of Education, have been truly memorable and life-changing. Throughout my academic journey in the college, the faculty had been extremely supportive. Along with professional guidance, they went above and beyond to give me personalised attention in the form of mentoring and counselling. It is only because of their guidance and encouragement that I have been able to accomplish my academic and personals goals.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    name: 'Deeksha Sharma',
    batch: 'B.Ed. Special Education (ID) Batch 2017-19',
    text: 'MIER College has fulfilled my dream of becoming a special educator. The curriculum design and instructional methodology have a perfect balance of theory and practical. It was my good fortune to have been taught by the best faculty in the field of special education. Today, I can say with utmost confidence that my learning years at MIER have laid a strong foundation on which I can build and enhance my professional path.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

const videoTestimonials = [
  {
    name: 'Palak Shrivatsva',
    batch: 'B.Ed. 2019-21 Batch',
    college: 'MIER College of Education',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800&h=500'
  },
  {
    name: 'Rohit Sharma',
    batch: 'M.Ed. 2020-22 Batch',
    college: 'MIER College of Education',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800&h=500'
  }
];

export default function App() {
  // Local storage inquiry state
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [focusedProgramId, setFocusedProgramId] = useState<string | null>(null);
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(null);
  
  const [activeTextIndex, setActiveTextIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  // Initialize inquiries from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mier_admissions_inquiries');
      if (saved) {
        setInquiries(JSON.parse(saved));
      }
    } catch {
      console.warn('Unable to access localStorage for inquiries');
    }
  }, []);

  // Handle new submission (State + Local Storage write)
  const handleInquirySubmitted = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    try {
      localStorage.setItem('mier_admissions_inquiries', JSON.stringify(updated));
    } catch {
      console.warn('Unable to write to localStorage');
    }
    // Briefly launch portal to show status to student
    setTimeout(() => {
      setIsPortalOpen(true);
    }, 1500);
  };

  // Safe scroll coordination to form
  const scrollToForm = () => {
    const elem = document.getElementById('program-explorer');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle choice of program from ProgramExplorer
  const handleSelectProgramFromExplorer = (programId: string) => {
    setFocusedProgramId(programId);
    scrollToForm();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col antialiased custom-scrollbar">
      
      {/* HEADER COMPONENT */}
      <Header 
        onScrollToForm={scrollToForm} 
        onOpenPortal={() => setIsPortalOpen(true)}
        inquiryCount={inquiries.length}
      />

      {/* 1. HERO SECTION (Designed strictly around NAAC A+ Admissions 2026 guidelines with campus banner decoration) */}
      <section 
        id="hero-section" 
        className="w-full relative min-h-[380px] sm:min-h-[510px] md:min-h-[630px] lg:min-h-[720px] flex items-center justify-center text-white bg-brand-navy-dark overflow-hidden"
      >
        {/* Real Campus Banner Backdrop with soft elegant overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="https://www.miercollege.in/images/banner.jpg" 
            alt="MIER College Campus" 
            className="w-full h-full object-cover object-center opacity-55"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-dark/95 via-brand-navy-dark/75 to-brand-navy-dark/40" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,transparent_50%,rgba(5,15,30,0.7)_100%)]" />
        </div>

        {/* Decorative background blur objects placed behind the text */}
        <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute -bottom-20 -left-20 h-[500px] w-[500px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10 py-12 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Side: Brand headlines and value propositions */}
            <div className="lg:col-span-7 space-y-6 text-left flex flex-col items-start">
              
              {/* Premium academic accreditation tag */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 rounded-full px-4 py-2 text-brand-gold text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md"
              >
                <Award className="h-4 w-4 text-brand-gold-light animate-bounce" />
                <span>{HERO_CONTENT.accreditation}</span>
              </motion.div>

              {/* Main sans emphasis and colossal display title */}
              <div className="space-y-2">
                <p className="font-sans italic text-brand-gold-light text-2xl md:text-3xl font-semibold leading-none tracking-wide">
                  {HERO_CONTENT.titleHighlight}
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans font-black tracking-tight text-white leading-tight uppercase max-w-2xl">
                  {HERO_CONTENT.titleSub}
                </h2>
                <div className="h-1 bg-gradient-to-r from-brand-gold via-brand-gold-light to-transparent w-40 rounded-full mt-2" />
              </div>

              {/* Engaging description */}
              <p className="text-white/95 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl font-medium tracking-wide">
                {HERO_CONTENT.bulletin}
              </p>

              {/* Admission Notice Indicators */}
              <div className="flex flex-wrap gap-2.5">
                <span className="flex items-center gap-1.5 bg-red-600 border border-red-500 text-white font-extrabold text-[10px] md:text-xs px-3.5 py-1.5 rounded-lg shadow-md uppercase tracking-wider">
                  {HERO_CONTENT.notice}
                </span>
                <span className="flex items-center gap-1.5 bg-brand-navy/85 border border-white/20 text-brand-gold font-extrabold text-[10px] md:text-xs px-3.5 py-1.5 rounded-lg shadow-md backdrop-blur-md">
                  {HERO_CONTENT.session}
                </span>
              </div>

              {/* Student Trust Checklist */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-lg pt-4 border-t border-white/10 mt-2">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-bold text-white/90">NCTE & RCI Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold flex-shrink-0">
                    <Check className="h-3 w-3 stroke-[3]" />
                  </div>
                  <span className="text-[11px] font-bold text-white/90">First ISO Certified in J&K</span>
                </div>
              </div>

              {/* Static trust score validation */}
              <div className="flex items-center gap-2.5 bg-brand-navy/85 px-3 py-2 rounded-lg border border-white/10 w-fit text-xs backdrop-blur-md">
                <div className="flex text-brand-gold">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-brand-gold text-brand-gold" />
                  ))}
                </div>
                <span className="font-extrabold text-white/95">{HERO_CONTENT.collegeName}</span>
              </div>

            </div>

            {/* Right Side: Lead Inquiry Form Container */}
            <div className="lg:col-span-5 w-full relative z-20">
              <LeadForm 
                onInquirySubmitted={handleInquirySubmitted} 
                selectedProgramId={focusedProgramId} 
              />
            </div>

          </div>
        </div>
      </section>

      {/* 2. EXCELLENCE YOU CAN TRUST (SECTION - 2) */}
      <section className="w-full bg-slate-50/50 border-y border-slate-100 py-10 md:py-12 px-4 md:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Headers - Compact & Elegant */}
          <div className="text-center mb-8 space-y-1">
            <span className="text-brand-gold-dark font-sans text-xs font-black uppercase tracking-widest">
              Accreditation & Recognition
            </span>
            <h2 className="text-xl sm:text-2xl font-sans font-black tracking-tight text-brand-navy uppercase">
              EXCELLENCE YOU CAN TRUST
            </h2>
            <p className="text-slate-500 font-sans italic text-xs tracking-wide">
              Recognised. Accredited. Ranked.
            </p>
          </div>

          {/* 5 Minimalists Micro-cards Row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            
            {/* Card 1: NAAC */}
            <div className="bg-[#B84D2C] text-white rounded-xl p-4.5 flex flex-col justify-center items-center text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <span className="text-xl font-black tracking-tight">Grade A+</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 mt-2">NAAC</span>
              <span className="text-[11px] text-white/90 font-medium">Accredited</span>
            </div>

            {/* Card 2: Ranked No. 1 */}
            <div className="bg-[#A31F1F] text-white rounded-xl p-4.5 flex flex-col justify-center items-center text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <span className="text-xl font-black tracking-tight">Ranked No. 1</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 mt-2">Seven Times</span>
              <span className="text-[11px] text-white/90 font-medium">In a Row</span>
            </div>

            {/* Card 3: NCTE */}
            <div className="bg-[#F49C18] text-white rounded-xl p-4.5 flex flex-col justify-center items-center text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <span className="text-xl font-black tracking-tight">NCTE</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 mt-2">Recognised</span>
              <span className="text-[11px] text-white/90 font-medium">Programs</span>
            </div>

            {/* Card 4: University Affiliation */}
            <div className="bg-[#AA1D1D] text-white rounded-xl p-4.5 flex flex-col justify-center items-center text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <span className="text-xl font-black tracking-tight">Affiliated</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 mt-2">University of</span>
              <span className="text-[11px] text-white/90 font-medium">Jammu</span>
            </div>

            {/* Card 5: Autonomous Status */}
            <div className="bg-[#B0401E] text-white rounded-xl p-4.5 flex flex-col justify-center items-center text-center shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 col-span-2 md:col-span-1">
              <span className="text-xl font-black tracking-tight">Autonomous</span>
              <span className="text-[10px] font-black uppercase tracking-wider text-white/80 mt-2">College Status</span>
              <span className="text-[11px] text-white/90 font-medium">Granted</span>
            </div>

          </div>

        </div>
      </section>

      {/* 4. PROGRAM EXPLORER COMPONENT */}
      <ProgramExplorer onSelectProgram={handleSelectProgramFromExplorer} />

      {/* 4. WHY CHOOSE MIER COLLEGE? (SECTION 4 - Elegant matching the high-fidelity reference image, made small and minimal) */}
      <section className="w-full bg-[#FAF9F6] py-12 md:py-16 px-4 md:px-8 relative overflow-hidden">
        {/* Subtle decorative background shadows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 h-[350px] w-[350px] bg-brand-gold/5 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-4xl mx-auto">
          {/* Header block resembling reference */}
          <div className="text-center mb-10 md:mb-12 space-y-2">
            <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-brand-navy uppercase">
              WHY CHOOSE MIER College?
            </h2>
            <p className="text-slate-500 font-sans italic text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
              Because Your Education Deserves the Best Foundation
            </p>
            <div className="h-0.5 bg-brand-gold w-16 mx-auto rounded-full mt-1.5" />
          </div>

          {/* Cards Grid resembling reference image layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 max-w-3xl mx-auto pb-8">
            
            {/* CARD 1: Academic Excellence & Foundation */}
            <div className="relative bg-white border border-[#E8B83D]/60 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.03)] p-6 sm:p-7 flex flex-col justify-between min-h-[300px] hover:shadow-[0_12px_24px_rgba(232,184,61,0.06)] transition-all duration-300">
              <div className="space-y-4">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#FCD34D] bg-white flex items-center justify-center p-0.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B83D]" />
                  </div>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    <b className="text-brand-navy font-black">Experienced Faculty</b>: Learn from qualified, experienced educators dedicated to your growth.
                  </p>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#FCD34D] bg-white flex items-center justify-center p-0.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B83D]" />
                  </div>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    <b className="text-brand-navy font-black">Practical, Hands-On Learning</b>: Beyond textbooks — real classroom training, labs & internships.
                  </p>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#FCD34D] bg-white flex items-center justify-center p-0.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B83D]" />
                  </div>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    <b className="text-brand-navy font-black">Career Guidance & Counselling</b>: Personalized support to help you choose the right path and pursue it confidently.
                  </p>
                </div>
              </div>

              {/* Bottom Overlapping Circular Badge with MIER logo */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border-2 border-[#E8B83D]/60 rounded-full flex items-center justify-center p-1.5 shadow-[0_6px_16px_rgba(232,184,61,0.15)] z-20 overflow-hidden">
                <img 
                  src="https://i.postimg.cc/rwkhdp2m/MIER-COLLEGE-OF-EDUCATION-copy.png" 
                  alt="MIER Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* CARD 2: Student Success & Pathways */}
            <div className="relative bg-white border border-[#E8B83D]/60 rounded-xl shadow-[0_8px_20px_rgba(0,0,0,0.03)] p-6 sm:p-7 flex flex-col justify-between min-h-[300px] hover:shadow-[0_12px_24px_rgba(232,184,61,0.06)] transition-all duration-300">
              <div className="space-y-4">
                {/* Bullet 1 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#FCD34D] bg-white flex items-center justify-center p-0.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B83D]" />
                  </div>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    <b className="text-brand-navy font-black">Holistic Development</b>: Programs designed to build skills, confidence & character — not just degrees.
                  </p>
                </div>

                {/* Bullet 2 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#FCD34D] bg-white flex items-center justify-center p-0.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B83D]" />
                  </div>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    <b className="text-brand-navy font-black">Well-Established Campus</b>: A focused learning environment built for academic and personal growth.
                  </p>
                </div>

                {/* Bullet 3 */}
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border border-[#FCD34D] bg-white flex items-center justify-center p-0.5 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#E8B83D]" />
                  </div>
                  <p className="text-xs text-brand-navy leading-relaxed">
                    <b className="text-brand-navy font-black">Strong Student Support</b>: Dedicated mentorship and guidance throughout your academic journey.
                  </p>
                </div>
              </div>

              {/* Bottom Overlapping Circular Badge with MIER logo */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white border-2 border-[#E8B83D]/60 rounded-full flex items-center justify-center p-1.5 shadow-[0_6px_16px_rgba(232,184,61,0.15)] z-20 overflow-hidden">
                <img 
                  src="https://i.postimg.cc/rwkhdp2m/MIER-COLLEGE-OF-EDUCATION-copy.png" 
                  alt="MIER Logo" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. STUDENT TESTIMONIALS */}
      <section id="success-stories" className="w-full bg-white py-16 md:py-24 px-4 md:px-8 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          {/* Testimonial Header matching image 3 style: small label 'TESTIMONIALS' and bold subtitle */}
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-1">
            <span className="text-[11px] text-brand-navy/60 font-medium uppercase tracking-widest block font-sans">
              TESTIMONIALS
            </span>
            <h4 className="text-2xl md:text-3xl font-sans font-black text-brand-navy tracking-tight uppercase">
              What students say about us
            </h4>
            <p className="text-slate-500 font-sans italic text-xs leading-relaxed max-w-xl mx-auto">
              Real Stories. Real Impact.
            </p>
          </div>

          {/* Testimonials Dual Section - Small and Minimal matching image 3 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto pb-4">
            
            {/* LEFT BOX: Clean Text Testimonials Slider with Arrow buttons on margins */}
            <div className="bg-[#FAF9F6] border border-slate-100/60 rounded-xl p-6 md:p-8 flex flex-col justify-between relative min-h-[320px]">
              
              {/* Slider wrapper with side absolute arrows */}
              <div className="relative flex-1 flex flex-col justify-center px-4">
                
                {/* Arrow Left */}
                <button 
                  onClick={() => setActiveTextIndex((prev) => (prev === 0 ? studentTestimonials.length - 1 : prev - 1))}
                  className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-500 hover:text-brand-navy hover:border-brand-navy/30 transition-all z-10 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Arrow Right */}
                <button 
                  onClick={() => setActiveTextIndex((prev) => (prev === studentTestimonials.length - 1 ? 0 : prev + 1))}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-500 hover:text-brand-navy hover:border-brand-navy/30 transition-all z-10 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Active Testimonial Content */}
                <div className="text-left select-none py-2 flex flex-col justify-between h-full">
                  <p className="text-slate-600 text-[13px] sm:text-sm font-medium leading-relaxed italic mb-6">
                    "{studentTestimonials[activeTextIndex].text}"
                  </p>
                  
                  {/* Student details with clean headshots */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                    <img
                      src={studentTestimonials[activeTextIndex].image}
                      alt={studentTestimonials[activeTextIndex].name}
                      referrerPolicy="no-referrer"
                      className="h-11 w-11 rounded-full object-cover border border-brand-gold/40 shadow-sm"
                    />
                    <div>
                      <h5 className="text-xs font-black text-brand-navy leading-none">
                        {studentTestimonials[activeTextIndex].name}
                      </h5>
                      <p className="text-[10px] text-slate-500 font-semibold mt-1">
                        {studentTestimonials[activeTextIndex].batch}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT BOX: Beautiful Video Testimonials Player matching image 3 style exactly */}
            <div className="bg-[#FAF9F6] border border-slate-100/60 rounded-xl p-6 md:p-8 flex flex-col justify-between relative min-h-[320px]">
              
              {/* Slider controls for multiple video sources, with absolute absolute arrows */}
              <div className="relative flex-1 flex flex-col justify-center">
                
                {/* Arrow Left */}
                <button 
                  onClick={() => setActiveVideoIndex((prev) => (prev === 0 ? videoTestimonials.length - 1 : prev - 1))}
                  className="absolute left-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-500 hover:text-brand-navy hover:border-brand-navy/30 transition-all z-10 cursor-pointer"
                  aria-label="Previous video testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Arrow Right */}
                <button 
                  onClick={() => setActiveVideoIndex((prev) => (prev === videoTestimonials.length - 1 ? 0 : prev + 1))}
                  className="absolute right-[-16px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm text-slate-500 hover:text-brand-navy hover:border-brand-navy/30 transition-all z-10 cursor-pointer"
                  aria-label="Next video testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Playable Video Frame with metadata overlays */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden group shadow-md border border-slate-200/50">
                  {/* Thumbnail Cover */}
                  <img 
                    src={videoTestimonials[activeVideoIndex].image} 
                    alt={videoTestimonials[activeVideoIndex].name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Dark overlay with video metadata */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/50 p-4 flex flex-col justify-between">
                    
                    {/* Top title info bar */}
                    <div className="text-left">
                      <h5 className="text-white text-xs font-black drop-shadow-md">
                        {videoTestimonials[activeVideoIndex].name} {videoTestimonials[activeVideoIndex].batch}
                      </h5>
                      <p className="text-slate-300 text-[10px] font-bold drop-shadow-sm uppercase">
                        {videoTestimonials[activeVideoIndex].college}
                      </p>
                    </div>

                    {/* Red Custom YouTube style Play button */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:bg-red-700">
                        <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                      </div>
                    </div>

                    {/* Watch on YouTube button on bottom-right corner as shown in screen 3 */}
                    <div className="mt-auto flex justify-end">
                      <a 
                        href="https://www.youtube.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-black/80 hover:bg-black border border-slate-700/60 px-3 py-1 rounded text-white text-[10px] font-bold tracking-tight inline-flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        Watch on <span className="text-red-500 font-black">YouTube</span>
                      </a>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 6: ADMISSION PROCESS - Interactive Infographic Section (Styled perfectly after Business Process Infographic) */}
      <section id="admission-process" className="w-full bg-[#FAF9F6] py-16 md:py-24 px-4 md:px-8 border-t border-slate-100 relative overflow-hidden">
        {/* Subtle decorative grid/spots background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-500/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto text-center">
          {/* Header Block precisely replicating the style */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16 space-y-2">
            <span className="text-[11px] text-brand-navy/60 font-medium uppercase tracking-widest block font-sans">
              MILESTONES
            </span>
            <h3 className="text-2xl md:text-3xl font-sans font-black text-brand-navy tracking-tight uppercase">
              ADMISSION PROCESS
            </h3>
            
            {/* Elegant neutral divider */}
            <div className="h-0.5 bg-brand-gold/80 w-16 mx-auto rounded-full mt-3" />

            <p className="text-slate-500 font-sans text-xs md:text-sm mt-3 leading-relaxed max-w-xl mx-auto">
              Follow our simplified, structured path from initial query to final seat reservation. Let us guide you at every milestone of your profile verification.
            </p>
          </div>

          {/* Core Cards Content Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 lg:gap-x-12 xl:gap-x-14 max-w-6xl mx-auto mt-16 px-4 md:px-0">
            
            {/* CARD 1 */}
            <div className="bg-white border border-slate-100 rounded-lg shadow-sm flex flex-col justify-between pt-10 pb-8 px-5 relative group hover:shadow-md transition-shadow h-[290px] text-left">
              {/* Top & Bottom Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-gold rounded-t-lg mx-3" />
              <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-brand-navy rounded-b-lg mx-3" />

              {/* Float Bubble */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-2 border-brand-navy flex items-center justify-center text-brand-navy z-20 shadow-sm group-hover:scale-105 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">
                <Lightbulb className="w-6 h-6" />
              </div>

              <div className="space-y-4">
                {/* Horizontal Banner Ribbon */}
                <div className="w-full bg-brand-navy text-brand-gold py-1.5 px-3 text-center text-[10.5px] font-sans font-black uppercase tracking-wider rounded-sm mt-2">
                  01 FILL ENQUIRY
                </div>

                <div className="space-y-2 mt-4 px-1">
                  <div className="flex gap-2 items-start">
                    <span className="w-2 h-2 mt-1.5 bg-brand-navy rounded-full flex-shrink-0" />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                      Complete the initial inquiry form on our registration portal, choosing your desired undergraduate or postgraduate degree program.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Connecting Arrow Pipes */}
              <div className="hidden lg:flex absolute right-[-24px] xl:right-[-28px] top-1/2 -translate-y-1/2 items-center gap-1 z-30 pointer-events-none">
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
                <div className="w-5 h-5 bg-slate-400 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-xs font-mono">
                  &gt;
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="bg-white border border-slate-100 rounded-lg shadow-sm flex flex-col justify-between pt-10 pb-8 px-5 relative group hover:shadow-md transition-shadow h-[290px] text-left">
              {/* Top & Bottom Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-gold rounded-t-lg mx-3" />
              <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-brand-navy rounded-b-lg mx-3" />

              {/* Float Bubble */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-2 border-brand-navy flex items-center justify-center text-brand-navy z-20 shadow-sm group-hover:scale-105 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">
                <Target className="w-6 h-6" />
              </div>

              <div className="space-y-4">
                {/* Horizontal Banner Ribbon */}
                <div className="w-full bg-brand-navy text-brand-gold py-1.5 px-3 text-center text-[10.5px] font-sans font-black uppercase tracking-wider rounded-sm mt-2">
                  02 COUNSELLING
                </div>

                <div className="space-y-2 mt-4 px-1">
                  <div className="flex gap-2 items-start">
                    <span className="w-2 h-2 mt-1.5 bg-brand-navy rounded-full flex-shrink-0" />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                      Engage in an in-depth counseling discussion with our expert academic advisors regarding eligibility, syllabus structure, and study plans.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Connecting Arrow Pipes */}
              <div className="hidden lg:flex absolute right-[-24px] xl:right-[-28px] top-1/2 -translate-y-1/2 items-center gap-1 z-30 pointer-events-none">
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
                <div className="w-5 h-5 bg-slate-400 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-xs font-mono">
                  &gt;
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="bg-white border border-slate-100 rounded-lg shadow-sm flex flex-col justify-between pt-10 pb-8 px-5 relative group hover:shadow-md transition-shadow h-[290px] text-left">
              {/* Top & Bottom Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-gold rounded-t-lg mx-3" />
              <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-brand-navy rounded-b-lg mx-3" />

              {/* Float Bubble */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-2 border-brand-navy flex items-center justify-center text-brand-navy z-20 shadow-sm group-hover:scale-105 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">
                <Clock className="w-6 h-6" />
              </div>

              <div className="space-y-4">
                {/* Horizontal Banner Ribbon */}
                <div className="w-full bg-brand-navy text-brand-gold py-1.5 px-3 text-center text-[10.5px] font-sans font-black uppercase tracking-wider rounded-sm mt-2">
                  03 SUBMIT DOCS
                </div>

                <div className="space-y-2 mt-4 px-1">
                  <div className="flex gap-2 items-start">
                    <span className="w-2 h-2 mt-1.5 bg-brand-navy rounded-full flex-shrink-0" />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                      Forward all official certificates, transcript dossiers, identity proofs, and special category documents to our registrar panel for validation.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dynamic Connecting Arrow Pipes */}
              <div className="hidden lg:flex absolute right-[-24px] xl:right-[-28px] top-1/2 -translate-y-1/2 items-center gap-1 z-30 pointer-events-none">
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
                <div className="w-5 h-5 bg-slate-400 text-white rounded-full flex items-center justify-center text-[9px] font-black shadow-xs font-mono">
                  &gt;
                </div>
                <div className="flex gap-0.5">
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="bg-white border border-slate-100 rounded-lg shadow-sm flex flex-col justify-between pt-10 pb-8 px-5 relative group hover:shadow-md transition-shadow h-[290px] text-left">
              {/* Top & Bottom Accent Lines */}
              <div className="absolute top-0 left-0 right-0 h-[5px] bg-brand-gold rounded-t-lg mx-3" />
              <div className="absolute bottom-0 left-0 right-0 h-[5px] bg-brand-navy rounded-b-lg mx-3" />

              {/* Float Bubble */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white border-2 border-brand-navy flex items-center justify-center text-brand-navy z-20 shadow-sm group-hover:scale-105 group-hover:border-brand-gold group-hover:text-brand-gold transition-all">
                <Trophy className="w-6 h-6" />
              </div>

              <div className="space-y-4">
                {/* Horizontal Banner Ribbon */}
                <div className="w-full bg-brand-navy text-brand-gold py-1.5 px-3 text-center text-[10.5px] font-sans font-black uppercase tracking-wider rounded-sm mt-2">
                  04 CONFIRM SEAT
                </div>

                <div className="space-y-2 mt-4 px-1">
                  <div className="flex gap-2 items-start">
                    <span className="w-2 h-2 mt-1.5 bg-brand-navy rounded-full flex-shrink-0" />
                    <p className="text-xs text-slate-500 font-medium leading-relaxed font-sans">
                      Fulfill the mandatory partial enrollment program registration fee to lock down your final seat allocation and prepare for orientation.
                    </p>
                  </div>
                </div>
              </div>
            </div>


          </div>

        </div>


      </section>

      {/* ADMISSIONS FUTURE BANNER (Styled precisely following the logo navy and gold color theme) */}
      <section id="admissions-future-banner" className="w-full bg-gradient-to-br from-brand-navy-dark via-brand-navy to-[#0B2F57] py-16 md:py-20 px-4 md:px-8 relative overflow-hidden flex flex-col items-center justify-center border-t-2 border-brand-gold/20">
        {/* Curved waves / grid mesh SVG lines overlaid beautifully to match reference image precisely */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-20">
          <svg className="w-full h-full min-w-[1024px]" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            {/* Top wave lines */}
            <path d="M0,96 C120,112 240,160 360,160 C480,160 600,112 720,128 C840,144 960,224 1080,224 C1200,224 1320,144 1440,112 V0 H0 Z" stroke="white" strokeWidth="1" strokeDasharray="3 3" />
            <path d="M0,160 C240,220 480,100 720,180 C960,260 1200,140 1440,200" stroke="white" strokeWidth="1.2" />
            <path d="M0,60 C300,140 600,40 900,160 C1200,280 1350,180 1440,150" stroke="white" strokeWidth="0.8" opacity="0.7" />
            <path d="M-50,220 C250,120 550,310 850,210 C1150,110 1350,260 1490,190" stroke="white" strokeWidth="0.6" opacity="0.6" />
            
            {/* Mesh grid perspective lines */}
            <path d="M100,-50 Q250,150 400,350" stroke="white" strokeWidth="0.5" opacity="0.4" />
            <path d="M300,-50 Q450,150 600,350" stroke="white" strokeWidth="0.5" opacity="0.4" />
            <path d="M500,-50 Q650,150 800,350" stroke="white" strokeWidth="0.5" opacity="0.4" />
            <path d="M700,-50 Q850,150 1000,350" stroke="white" strokeWidth="0.5" opacity="0.4" />
            <path d="M900,-50 Q1050,150 1200,350" stroke="white" strokeWidth="0.5" opacity="0.4" />
          </svg>
        </div>

        {/* Dynamic center light ray */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <div className="space-y-3.5">
            <span className="text-brand-gold font-sans font-black tracking-[0.2em] text-xs uppercase block animate-pulse">
              Admissions Open for 2026 — Apply Now →
            </span>
            <h3 className="text-white text-2xl md:text-3xl lg:text-[2.15rem] font-sans font-bold tracking-tight leading-tight max-w-2xl mx-auto">
              Take the First Step Toward Your Future Today.
            </h3>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              type="button"
              onClick={scrollToForm}
              className="bg-brand-gold hover:bg-brand-gold-dark text-brand-navy font-sans font-black text-xs md:text-sm px-9 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer tracking-wider uppercase"
            >
              Apply Now
            </button>
          </div>
        </div>
      </section>

      {/* 7. EXPANDABLE FAQ & ACCORDION SYSTEM */}
      <section id="faq" className="w-full bg-slate-50 py-16 md:py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="text-[10px] bg-brand-navy/5 text-brand-navy font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Admissions Desk FAQ
            </span>
            <h3 className="text-3xl md:text-4.5xl font-sans font-black text-brand-navy tracking-tight mt-3">
              Frequently Asked Questions
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mt-3.5 font-medium leading-relaxed">
              Find transparent facts on curriculum structures, scholarship criteria, placement guidelines, and affiliation references.
            </p>
          </div>

          {/* Interactive accordion block lists */}
          <div className="space-y-3.5">
            {FAQS.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div 
                  key={faq.id} 
                  className="bg-white border text-left border-slate-100 hover:border-brand-gold/30 rounded-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full py-4.5 px-5 flex items-center justify-between text-left font-sans font-bold text-gray-800 text-xs md:text-sm cursor-pointer select-none"
                  >
                    <span className="pr-4 leading-relaxed">{faq.question}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-500 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180 text-brand-gold' : ''}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 pb-5 pt-1 text-slate-500 text-xs md:text-[13px] leading-relaxed border-t border-slate-50 font-medium">
                          <p>{faq.answer}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>



      {/* 8. CORE FOOTER WITH SEALS & TRUST (Styled precisely after the high-fidelity mock-up) */}
      <footer id="footer-landing-section" className="w-full bg-[#181818] text-white pt-16 pb-10 px-4 md:px-12 relative z-10 font-sans border-t-[4px] border-brand-gold">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start text-left">
            
            {/* Column 1: College credentials & Brand (lg:col-span-6) */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="bg-white p-1 rounded-full h-14 w-14 flex items-center justify-center shadow-lg border border-slate-700/30 flex-shrink-0">
                  <img 
                    src="https://i.postimg.cc/rwkhdp2m/MIER-COLLEGE-OF-EDUCATION-copy.png" 
                    alt="MIER College Emblem" 
                    referrerPolicy="no-referrer"
                    className="h-11 w-11 object-contain"
                  />
                </div>
                <div className="flex flex-col select-none">
                  <span className="text-2xl font-black tracking-tight text-white leading-none">MIER</span>
                  <span className="text-[10px] uppercase font-black text-white/90 tracking-wide mt-1.5">COLLEGE OF EDUCATION</span>
                  <span className="text-[10px] uppercase font-extrabold text-brand-gold tracking-widest mt-0.5">AUTONOMOUS</span>
                </div>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-sans font-medium max-w-md">
                Since its inception in 1981, the college has emerged as a trend setting educational institution utilizing both formal and non-formal techniques on the principles of excellence, quality, self-reliance, collaboration.
              </p>
            </div>

            {/* Column 2: CONTACT US (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-3.5">
              <div>
                <h5 className="font-extrabold uppercase text-white text-[11px] tracking-widest">CONTACT US</h5>
                <div className="h-[2px] bg-brand-gold w-12 mt-1.5" />
              </div>
              <div className="space-y-3.5 pt-2 text-[12.5px] text-stone-300 font-medium font-sans">
                <div className="flex gap-2.5 items-start">
                  <MapPin className="w-4 h-4 text-brand-gold mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed">MIER College of Education, B.C. Road, Jammu. J&K.</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Phone className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href="tel:+911912546078" className="hover:text-white transition-colors">0191-2546078, 2565098</a>
                </div>
                <div className="flex gap-2.5 items-center">
                  <Mail className="w-4 h-4 text-brand-gold flex-shrink-0" />
                  <a href="mailto:principal@miercollege.in" className="hover:text-white transition-colors">principal@miercollege.in</a>
                </div>
                <div className="pt-2 border-t border-stone-850">
                  <span className="font-bold text-white text-[12px] block">For Admissions:</span>
                  <p className="text-[12px] text-stone-300 font-semibold mt-0.5 font-sans">
                    <a href="tel:9419797673" className="hover:text-brand-gold transition-colors">9419797673</a> &amp; <a href="tel:7006931947" className="hover:text-brand-gold transition-colors">7006931947</a>
                  </p>
                </div>
              </div>
            </div>

            {/* Column 3: FOLLOW US (lg:col-span-2) */}
            <div className="lg:col-span-2 space-y-2.5">
              <div>
                <h5 className="font-extrabold uppercase text-white text-[11px] tracking-widest">FOLLOW US</h5>
                <div className="h-[2px] bg-brand-gold w-10 mt-1.5" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <a href="#footer-landing-section" className="text-stone-300 hover:text-brand-gold transition-all hover:scale-110" aria-label="Facebook">
                  <Facebook className="w-4.5 h-4.5" />
                </a>
                <a href="#footer-landing-section" className="text-stone-300 hover:text-brand-gold transition-all hover:scale-110" aria-label="LinkedIn">
                  <Linkedin className="w-4.5 h-4.5" />
                </a>
                <a href="#footer-landing-section" className="text-stone-300 hover:text-brand-gold transition-all hover:scale-110" aria-label="Instagram">
                  <Instagram className="w-4.5 h-4.5" />
                </a>
                <a href="#footer-landing-section" className="text-stone-300 hover:text-brand-gold transition-all hover:scale-110" aria-label="YouTube">
                  <Youtube className="w-4.5 h-4.5" />
                </a>
                <a href="#footer-landing-section" className="text-stone-300 hover:text-brand-gold transition-all hover:scale-110" aria-label="Twitter">
                  <Twitter className="w-4.5 h-4.5" />
                </a>
              </div>
            </div>

          </div>

          <hr className="border-stone-800" />

          {/* Copyright, legal regulatory & affiliations */}
          <div className="flex flex-col md:flex-row justify-between items-center text-[10.5px] text-stone-500 gap-4 pt-1">
            <p className="text-center md:text-left leading-normal font-sans font-medium">
              © {new Date().getFullYear()} MIER College of Education. All Rights Reserved. Affiliated with the University of Jammu. Recognized by NCTE and RCI. Certified under ISO 9001:2015 specifications.
            </p>
            <div className="flex gap-4 font-sans font-bold text-stone-400">
              <a onClick={scrollToForm} className="hover:text-white transition-colors cursor-pointer">Apply Online</a>
              <span>•</span>
              <a onClick={() => setIsPortalOpen(true)} className="hover:text-white transition-colors cursor-pointer">Inquiry Tracker</a>
            </div>
          </div>

        </div>
      </footer>

      {/* SLIDEOUT STUDENT QUERY SUPPORT DRAWER PORTAL */}
      <LeadPortal 
        isOpen={isPortalOpen} 
        onClose={() => setIsPortalOpen(false)} 
        inquiries={inquiries}
      />

    </div>
  );
}
