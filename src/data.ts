/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Program, FAQ, Review, Achievement } from './types';

export const HERO_CONTENT = {
  collegeName: "MIER College of Education",
  accreditation: "NAAC A+ Accredited Institution",
  titleHighlight: "Build Your Future",
  titleSub: "With Career-Focused Programs",
  notice: "🎓 ADMISSION OPEN",
  session: "📅 2026 SESSION",
  bulletin: "Begin your educational leadership journey at J&K's first ISO 9001:2015 certified college. Learn from research pioneers, master modern pedagogies (NEP 2020), and secure placements in top schools.",
  trustScore: "⭐ 4.8/5 Rated by 800+ Alumni"
};

export const PROGRAMS: Program[] = [
  {
    id: 'ba-psychology',
    name: 'B.A. (Hons.) Psychology',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 or equivalent in any stream with at least 50% marks from a recognized board.',
    intake: 60,
    description: 'Understand human behaviour, mental health & counselling fundamentals.',
    prospects: [
      'Clinical Psychology Assistant',
      'Counselling Associate',
      'Mental Health Support Officer',
      'HR Specialist'
    ],
    iconName: 'Smile',
    tags: ['Practical Labs', 'Mental Health Focus', 'NEP 2020 Aligned']
  },
  {
    id: 'ba-polscience',
    name: 'B.A. (Hons.) Political Science',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 or equivalent in any stream with at least 50% marks from a recognized board.',
    intake: 60,
    description: 'Study governance, policy & global affairs — built for civil services & law.',
    prospects: [
      'Civil Services Candidate',
      'Political Analyst',
      'Public Policy Assistant',
      'Legal Associate'
    ],
    iconName: 'Award',
    tags: ['Civil Services Map', 'Policy & Law', 'Public Administration']
  },
  {
    id: 'ba-english',
    name: 'B.A. (Hons.) English',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 or equivalent in any stream with at least 50% marks with English as a subject.',
    intake: 60,
    description: 'Master literature, language & communication for media, teaching & beyond.',
    prospects: [
      'Content Writer & Editor',
      'Media & PR Professional',
      'Journalism Associate',
      'English Language Teacher'
    ],
    iconName: 'BookOpen',
    tags: ['Creative Writing', 'Media Prospects', 'Literature Review']
  },
  {
    id: 'ba-ai',
    name: 'B.A. (Hons.) Applied AI',
    level: 'Undergraduate',
    duration: '3 Years (6 Semesters)',
    eligibility: '10+2 or equivalent in any stream with at least 50% marks from a recognized board.',
    intake: 45,
    description: 'Hands-on training in AI, data & automation for the future of work.',
    prospects: [
      'AI Specialist Assistant',
      'Data Analyst Associate',
      'Automation Consultant',
      'Tech Product Coordinator'
    ],
    iconName: 'Sparkles',
    tags: ['Emerging Tech', 'Hands-on AI Lab', 'Data & Analytics']
  },
  {
    id: 'ba-bed-special',
    name: "B.A. B.Ed. in Special Education (J&K's First Integrated Dual Degree)",
    level: 'Undergraduate',
    duration: '4 Years (8 Semesters)',
    eligibility: '10+2 of J&K Board or equivalent in any stream with at least 50% marks.',
    intake: 30,
    description: 'Earn two degrees together — specialized training in inclusive education.',
    prospects: [
      'Special educator in CBSE/ICSE schools',
      'Resource Teacher',
      'Rehabilitation Therapist',
      'Early Interventionist'
    ],
    iconName: 'Heart',
    tags: ['Integrated Dual Degree', "J&K's First", 'RCI Approved']
  },
  {
    id: 'b-ed',
    name: 'B.Ed. (Bachelor of Education)',
    level: 'Undergraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation or Post Graduation in any discipline with at least 50% marks (45% for reserved categories).',
    intake: 100,
    description: 'NCTE recognised programme with practical classroom training & internships.',
    prospects: [
      'Trained Graduate Teacher (TGT)',
      'Educational Content Developer',
      'Academic Coordinator',
      'Curriculum Planner'
    ],
    iconName: 'GraduationCap',
    tags: ['NCTE Recognized', '100% Internship Placement', 'ICT Integrated']
  },
  {
    id: 'b-ed-special',
    name: 'B.Ed. Special Education',
    level: 'Undergraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation/Post Graduation from a UGC recognized university with 50% or above aggregate marks.',
    intake: 30,
    description: 'Specialized training to teach and support children with diverse learning needs.',
    prospects: [
      'Special Educator in inclusive schools',
      'Clinical Therapist Assistant',
      'Specialist Needs Tutor',
      'Applied Behavior Analyst'
    ],
    iconName: 'Heart',
    tags: ['RCI Approved', 'Diverse Learning Needs', 'Clinical Practice']
  },
  {
    id: 'ma-psychology',
    name: 'M.A. Psychology (Clinical & Counselling)',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduation with Psychology as one of the electives or any Graduate degree with minimum 55% aggregate marks.',
    intake: 40,
    description: 'Advanced training in therapy, counselling & clinical assessment.',
    prospects: [
      'Clinical Psychologist',
      'Mental Health Therapist',
      'Counselling Consultant',
      'Corporate Well-being supervisor'
    ],
    iconName: 'Smile',
    tags: ['Advanced Therapy', 'Psychometrics Practice', 'Clinical Internships']
  },
  {
    id: 'ma-polscience',
    name: 'M.A. Political Science',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'Graduate degree with Political Science/Social Sciences or any graduate with 50% or more.',
    intake: 40,
    description: 'Advanced study of governance, policy-making & international relations.',
    prospects: [
      'Policy Advisor',
      'Political Strategist & Consultant',
      'International Relations Officer',
      'Public Relations officer'
    ],
    iconName: 'Award',
    tags: ['Diplomacy Track', 'IR Specialization', 'Governance Studies']
  },
  {
    id: 'm-ed',
    name: 'M.Ed. (Master of Education)',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'B.Ed. or equivalent degree with minimum 55% marks (50% for reserved categories) from a recognized university.',
    intake: 50,
    description: 'Advanced pedagogy, research & leadership skills for educators.',
    prospects: [
      'School Principal or School Administrator',
      'Lecturer in College of Education',
      'Syllabus & Curriculum Specialist',
      'Senior Educational Researcher'
    ],
    iconName: 'GraduationCap',
    tags: ['NCTE Approved', 'Research Intensive', 'Leadership Track']
  },
  {
    id: 'm-ed-special',
    name: 'M.Ed. Special Education',
    level: 'Postgraduate',
    duration: '2 Years (4 Semesters)',
    eligibility: 'B.Ed. Special Education or equivalent degree with 55% or more aggregate marks.',
    intake: 30,
    description: 'Specialize in inclusive education leadership & adaptive teaching strategies.',
    prospects: [
      'Special School Director',
      'Inclusive Syllabus Evaluator',
      'Senior Rehabilitation Specialist',
      'Special Education Advisor'
    ],
    iconName: 'Heart',
    tags: ['Inclusive Leadership', 'Adaptive Tech', 'RCI Approved']
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'naac',
    title: 'NAAC A+ Accredited',
    desc: 'Top academic score indicating high excellence across faculty calibration and resources.',
    stat: 'Grade A+',
    iconName: 'ShieldCheck'
  },
  {
    id: 'legacy',
    title: 'Heritage of Excellence',
    desc: 'Empowering J&K and neighboring states with educators and researchers since 1936.',
    stat: '85+ Yrs',
    iconName: 'CalendarRange'
  },
  {
    id: 'alumni',
    title: 'Strong Network',
    desc: 'Alumni placed in senior positions, leading CBSE/ICSE schools and academic departments.',
    stat: '25,000+',
    iconName: 'Users'
  },
  {
    id: 'placement',
    title: 'Placement Support',
    desc: 'Annual on-campus placement drives partnering with regional, national & EdTech stakeholders.',
    stat: '100%',
    iconName: 'Briefcase'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'student-1',
    name: 'Anjali Sharma',
    role: 'B.Ed Batch Valedictorian',
    batch: 'Class of 2025',
    text: 'Choosing MIER was the turning point of my teaching career. The practical training sessions in digital smart-classrooms gave me confidence. I was hired by an international school during our placement drive before graduation!',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'student-2',
    name: 'Rahul Dogra',
    role: 'M.Ed Scholar',
    batch: 'Class of 2024',
    text: 'The research infrastructure is unmatched. Publishing a journal paper with my professor\'s guidance helped me win a doctoral fellowship. This is indeed the absolute best institution for serious education planners.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 'student-3',
    name: 'Dr. Meenakshi Jamwal',
    role: 'Assistant Professor / Former Student',
    batch: 'Class of 2018',
    text: 'From student to faculty member, MIER has cultivated a mindset for innovation in learning. The institution has set standard-defining milestones based closely on NEP guidelines and instructional psychology.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const FAQS: FAQ[] = [
  {
    id: 'faq-1',
    question: 'Is MIER College of Education accredited?',
    answer: 'Yes, MIER is a NAAC A+ accredited, autonomous college, ranked No. 1 seven times in a row.',
    category: 'Campus'
  },
  {
    id: 'faq-2',
    question: 'Are the B.Ed. and M.Ed. programs recognised?',
    answer: 'Yes, both B.Ed. and M.Ed. programs are NCTE recognised.',
    category: 'Programs'
  },
  {
    id: 'faq-3',
    question: 'What is the eligibility criteria for these courses?',
    answer: 'Eligibility varies by program. Contact us for specific eligibility details for your chosen course.',
    category: 'Admissions'
  },
  {
    id: 'faq-4',
    question: 'Does MIER provide placement assistance?',
    answer: 'MIER supports students with career guidance and counselling throughout their academic journey.',
    category: 'Programs'
  },
  {
    id: 'faq-5',
    question: 'How can I apply for admission?',
    answer: 'You can apply by filling out the enquiry form on this page, or by visiting the MIER College of Education campus at B.C. Road, Jammu.',
    category: 'Admissions'
  },
  {
    id: 'faq-6',
    question: 'Is there a dual degree option available?',
    answer: 'Yes — MIER offers a B.A. B.Ed. in Special Education, the first integrated dual degree of its kind in Jammu & Kashmir.',
    category: 'Programs'
  },
  {
    id: 'faq-7',
    question: 'What is the duration of the B.A. B.Ed. Special Education programme?',
    answer: "It's a 4-year integrated dual degree programme.",
    category: 'Programs'
  }
];

export const STATES_AND_UT = [
  'Jammu & Kashmir', 'Punjab', 'Himachal Pradesh', 'Haryana', 'Delhi', 'Uttar Pradesh', 'Rajasthan', 'Uttarakhand', 'Other States'
];

export const HEADING_FONT = 'font-sans font-bold tracking-tight text-brand-navy';
export const MONO_FONT = 'font-mono text-xs text-brand-gold';
