import { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const CARDS = [
  {
    id: 'cse',
    title: 'B.Tech CSE',
    description: 'Trained for software development, systems design, and full-stack engineering through real coding practice and modern labs.',
    career: 'Software Engineer, Full Stack Developer, Systems Analyst, IT Consultant.',
    bgClass: 'bg-[#2a4e40]',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=800',
  },
  {
    id: 'ai',
    title: 'B.Tech AI',
    description: 'Built around machine learning, deep learning, and intelligent systems — guided by IIT faculty and an AI-first curriculum.',
    career: 'AI Engineer, Machine Learning Engineer, Research Analyst, Automation Specialist.',
    bgClass: 'bg-[#182a3f]',
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800&h=800',
  },
  {
    id: 'ds',
    title: 'B.Tech Data Science',
    description: 'Hands-on with real datasets and analytics tools to build data-driven decision-making skills.',
    career: 'Data Scientist, Data Analyst, BI Analyst, Data Engineer.',
    bgClass: 'bg-[#48332d]',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=800',
  },
  {
    id: 'eee',
    title: 'B.Tech EEE',
    description: 'Trained on power systems, circuits, and electronics design in AICTE-standard labs.',
    career: 'Electrical Engineer, Power Systems Engineer, Electronics Design Engineer, Control Systems Engineer.',
    bgClass: 'bg-[#2c3756]',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=800',
  },
  {
    id: 'mech',
    title: 'B.Tech Mechanical',
    description: 'Hands-on with design, manufacturing, and mechanical systems for real industrial application.',
    career: 'Mechanical Design Engineer, Production Engineer, R&D Engineer, Maintenance Engineer.',
    bgClass: 'bg-[#433b2a]',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800&h=800',
  },
  {
    id: 'civil',
    title: 'B.Tech Civil',
    description: 'Built on construction, infrastructure, and structural design fundamentals.',
    career: 'Civil Engineer, Site Engineer, Structural Engineer, Infrastructure Planner.',
    bgClass: 'bg-[#1b2b36]',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800&h=800',
  }
];

export default function CareerOpportunities() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 800;
      scrollRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' }); // 24 is gap
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 800;
      scrollRef.current.scrollBy({ left: cardWidth + 24, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPos = scrollRef.current.scrollLeft;
      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 800;
      const index = Math.round(scrollPos / (cardWidth + 24));
      setActiveIndex(index);
    }
  };

  return (
    <section className="w-full bg-[#0a1114] py-16 px-4 md:px-8 relative overflow-hidden font-sans">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Container */}
      <div className="max-w-[1400px] mx-auto flex flex-col xl:flex-row gap-8 xl:gap-8 items-center xl:items-center">
        
        {/* Left Side Content */}
        <div className="w-full xl:w-[28%] flex flex-col justify-center text-white space-y-5 shrink-0 mx-auto xl:mx-0 max-w-lg xl:max-w-xs">
          <h2 className="text-2xl md:text-3xl font-medium tracking-tight">
            Career Opportunities
          </h2>
          <p className="text-[#a0afb8] text-sm leading-relaxed font-light">
            B.Tech graduates from HITM Ranchi step into industry-ready roles — built on an industry-oriented curriculum and IIT faculty guidance.
          </p>
          <div>
            <button className="bg-[#dcf47a] hover:bg-[#d0ea6a] transition-all duration-300 text-black px-5 py-2.5 rounded-full font-semibold flex items-center justify-center gap-2 text-xs uppercase tracking-wider hover:scale-105 active:scale-95">
              APPLY NOW <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>
        </div>

        {/* Right Side Carousel */}
        <div className="w-full xl:w-[72%] relative min-w-0">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 hide-scrollbar pb-6 pl-4 md:pl-0 pr-12 xl:pr-32"
          >
            {CARDS.map((card, i) => (
              <div 
                key={card.id}
                className="w-[85vw] sm:w-[500px] md:w-[650px] shrink-0 snap-center md:snap-start rounded-2xl overflow-hidden flex flex-col md:flex-row h-auto md:h-[340px]"
              >
                {/* Card Left: Content */}
                <div className={`w-full md:w-[45%] lg:w-[42%] ${card.bgClass} p-6 md:p-8 flex flex-col justify-center text-white h-[280px] md:h-full`}>
                  <p className="text-[10px] font-semibold tracking-widest uppercase mb-2 opacity-80">{card.title}</p>
                  <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-4 tracking-tight">{card.title}</h3>
                  <p className="text-xs text-white/80 mb-6 leading-relaxed font-light">
                    {card.description}
                  </p>
                  <div className="mt-auto">
                    <p className="text-xs text-[#dcf47a] font-semibold tracking-wide uppercase mb-1">
                      Career paths:
                    </p>
                    <p className="text-sm text-white font-medium leading-relaxed">
                      {card.career}
                    </p>
                  </div>
                </div>
                {/* Card Right: Image */}
                <div className="w-full md:w-[55%] lg:w-[58%] h-[200px] md:h-full">
                  <img 
                    src={card.image} 
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-2 max-w-[650px] pl-4 md:pl-0">
            {/* Dots */}
            <div className="flex gap-2 items-center object-contain">
              {CARDS.map((_, i) => (
                <button 
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-[#37be7e]' : 'w-2 bg-[#1f303a]'}`}
                  onClick={() => {
                    if (scrollRef.current) {
                      const cardWidth = scrollRef.current.firstElementChild?.clientWidth || 650;
                      scrollRef.current.scrollTo({ left: i * (cardWidth + 16), behavior: 'smooth' });
                    }
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Arrows */}
            <div className="flex gap-2.5 pr-4 md:pr-0">
              <button 
                onClick={scrollLeft}
                className="w-10 h-10 rounded-full bg-[#dcf47a] hover:bg-[#d0ea6a] transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-black"
                aria-label="Previous"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={scrollRight}
                className="w-10 h-10 rounded-full bg-[#dcf47a] hover:bg-[#d0ea6a] transition-all hover:scale-105 active:scale-95 flex items-center justify-center text-black"
                aria-label="Next"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
