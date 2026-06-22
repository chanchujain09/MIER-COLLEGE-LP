/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  X, Calendar, FileText, CheckCircle2, ChevronRight, MessageSquare, 
  ShieldCheck, HelpCircle, Award, Compass, Cloud, FileUp, Loader2, 
  Check, Lock, AlertCircle, ExternalLink, HelpCircle as HelpIcon 
} from 'lucide-react';
import { Inquiry, AttachedFile } from '../types';
import { PROGRAMS } from '../data';
import { loadGoogleScripts, requestGoogleAccessToken, showGooglePicker } from '../utils/googlePicker';

interface LeadPortalProps {
  isOpen: boolean;
  onClose: () => void;
  inquiries: Inquiry[];
  onUpdateInquiry: (updatedInq: Inquiry) => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  time: string;
}

export default function LeadPortal({ isOpen, onClose, inquiries, onUpdateInquiry }: LeadPortalProps) {
  const [activeTab, setActiveTab] = useState<'status' | 'scholarship' | 'chat'>('status');
  
  // Google Picker states
  const [googleScriptsLoaded, setGoogleScriptsLoaded] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [loadingScripts, setLoadingScripts] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isVerifyingGoogle, setIsVerifyingGoogle] = useState(false);
  const [showConfigTips, setShowConfigTips] = useState(false);
  
  // Counselor chat states
  const [chatMessages, setChatMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hello! I am Priya Verma, Senior Academic Advisor at MIER. Ask me anything about programs, admission eligibility, girls hostels, or NEP-2020 placements!', time: 'Now' }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Scholarship calculator states
  const [calcScore, setCalcScore] = useState<number>(75);
  const [isJKResident, setIsJKResident] = useState<boolean>(true);
  const [isReservedCategory, setIsReservedCategory] = useState<boolean>(false);
  const [isSportsChampion, setIsSportsChampion] = useState<boolean>(false);

  // Calculate scholarship dynamic rating
  let tentativeWaiver = 0;
  if (calcScore >= 90) tentativeWaiver = 30;
  else if (calcScore >= 80) tentativeWaiver = 20;
  else if (calcScore >= 70) tentativeWaiver = 10;

  if (isSportsChampion) tentativeWaiver += 10;
  if (isReservedCategory) tentativeWaiver += 5;
  if (tentativeWaiver > 50) tentativeWaiver = 50; // Cap at 50%

  const handleChatSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText;
    setInputText('');
    
    // Add user message
    const timestamp = new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg, time: timestamp }]);

    setIsTyping(true);

    // Simulate smart rule-based counselor answers instantly
    setTimeout(() => {
      let botAnswer = '';
      const textLower = userMsg.toLowerCase();

      if (textLower.includes('hostel') || textLower.includes('accommodation') || textLower.includes('stay')) {
        botAnswer = 'We provide safe, gated in-campus girls hostels with 24/7 security, high-speed Wi-Fi, laundry facilities, health assistance, and standard nutritional food packages overseen directly by a resident Warden. Fees range around ₹65,000 per academic year.';
      } else if (textLower.includes('fee') || textLower.includes('charges') || textLower.includes('cost') || textLower.includes('payment')) {
        botAnswer = 'The annual tuition fee for B.Ed is approximately ₹72,000 per year, and for M.Ed/M.A. Education it is approx ₹68,000. Under our NAAC A+ charter, scholarship brackets cover 10% to 50% of tuition fees for students securing top grades or presenting reservation proof.';
      } else if (textLower.includes('scholarship') || textLower.includes('waiver') || textLower.includes('concession')) {
        botAnswer = 'MIER College is J&K’s leading provider of educational scholarships. You can secure up to a 50% fee concession based on your graduation aggregate percentage, sports certifications, national merit standing, or minority category certificates.';
      } else if (textLower.includes('placement') || textLower.includes('job') || textLower.includes('hire') || textLower.includes('salary')) {
        botAnswer = 'Our Placement Cell secures tie-ups with DPS, Kendriya Vidyalaya, Army Public School, and multiple premium schools in Punjab & Haryana. B.Ed students undergo a compulsory 20-week teaching internship leading to strong PPO options.';
      } else if (textLower.includes('eligibility') || textLower.includes('admission') || textLower.includes('cut off') || textLower.includes('qualification')) {
        botAnswer = 'For B.Ed: minimum 50% marks in Graduation/PG. For M.Ed: Minimum 55% marks in B.Ed or equivalent degree. We also offer B.Ed in Special Education (RCI approved) for Graduates holding more than 50% marks.';
      } else if (textLower.includes('contact') || textLower.includes('call') || textLower.includes('number') || textLower.includes('phone')) {
        botAnswer = 'You can reach out directly to the Admissions Desk at +91 191 254 6078 or WhatsApp our central support coordinate. We are open from 9:30 AM to 4:30 PM (Mon-Sat).';
      } else {
        botAnswer = 'Thank you for asking! MIER College provides NAAC A+ quality teaching setups, ICT equipment, in-campus internship drives, and specialized counseling courses. Your inquiry has already been registered in our Priority Queue, and a counselor will call you to walk you through documentation guidelines.';
      }

      setChatMessages(prev => [...prev, { sender: 'bot', text: botAnswer, time: timestamp }]);
      setIsTyping(false);
    }, 900);
  };

  // Load Google Scripts when Portal mounts or opens
  useEffect(() => {
    if (isOpen) {
      setLoadingScripts(true);
      loadGoogleScripts(
        () => {
          setGoogleScriptsLoaded(true);
          setLoadingScripts(false);
          setAuthError(null);
        },
        (err) => {
          console.error(err);
          setAuthError(err);
          setLoadingScripts(false);
        }
      );
    }
  }, [isOpen]);

  const handleAuthAndPicker = (inq: Inquiry, documentSlot: string) => {
    const clientId = (import.meta as any).env.VITE_GOOGLE_CLIENT_ID;
    
    if (!clientId || clientId.includes('your_google_client_id_here') || clientId.trim() === '') {
      // Trigger demo picker fallback
      triggerDemoPicker(inq, documentSlot);
      return;
    }

    setIsVerifyingGoogle(true);
    setAuthError(null);

    requestGoogleAccessToken(clientId, (token, error) => {
      setIsVerifyingGoogle(false);
      if (error) {
        console.warn('Google Auth Error:', error);
        setAuthError(`OAuth Authorization Failed: ${error}. Triggering developer fallback...`);
        triggerDemoPicker(inq, documentSlot);
      } else if (token) {
        setAccessToken(token);
        launchRealPicker(token, inq, documentSlot);
      }
    });
  };

  const launchRealPicker = (token: string, inq: Inquiry, documentSlot: string) => {
    showGooglePicker(token, (file) => {
      const prevAttached = inq.attachedFiles || [];
      const newFile: AttachedFile = {
        id: file.id,
        name: `${documentSlot}: ${file.name}`,
        mimeType: file.mimeType,
        url: file.url,
        sizeBytes: file.sizeBytes,
        iconUrl: file.iconUrl,
      };
      
      const updatedInq: Inquiry = {
        ...inq,
        attachedFiles: [...prevAttached.filter(f => !f.name.startsWith(documentSlot)), newFile],
      };
      
      onUpdateInquiry(updatedInq);
    });
  };

  const triggerDemoPicker = (inq: Inquiry, documentSlot: string) => {
    const mockFiles: Record<string, string> = {
      "Class 10th Marks Sheet": "Class_10_Marksheet_2020.pdf",
      "Class 12th Marks Sheet": "Senior_Secondary_Certificate_2022.pdf",
      "Graduation Certificate": "Bachelor_of_Science_Degree.pdf",
      "Domicile Certificate": "Domicile_Certificate_J_K.pdf",
    };
    
    const fileName = mockFiles[documentSlot] || "Attached_Document.pdf";
    const fileId = "mock-drive-" + Math.random().toString(36).substr(2, 9);
    
    const prevAttached = inq.attachedFiles || [];
    const newFile: AttachedFile = {
      id: fileId,
      name: `${documentSlot}: ${fileName}`,
      mimeType: "application/pdf",
      url: "https://drive.google.com/drive/my-drive",
      sizeBytes: 1542000,
    };
    
    const updatedInq: Inquiry = {
      ...inq,
      attachedFiles: [...prevAttached.filter(f => !f.name.startsWith(documentSlot)), newFile],
    };
    
    onUpdateInquiry(updatedInq);
  };

  const getProgramName = (id: string) => {
    return PROGRAMS.find(p => p.id === id)?.name || id;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Black backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-neutral-900 cursor-pointer"
      />

      {/* Slide-out Portal panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="relative w-full max-w-md bg-brand-navy-dark border-l border-brand-gold/10 text-white flex flex-col h-full shadow-2xl z-10"
      >
        {/* Header Block with student branding */}
        <div className="p-5 border-b border-white/5 flex items-center justify-between bg-brand-navy">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-lg bg-brand-gold/20 flex items-center justify-center text-brand-gold">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white leading-none">MIER Student Portal</h3>
              <p className="text-[10px] text-brand-gold font-bold uppercase tracking-wider mt-1">2026 Academic intake</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 px-2.5 bg-white/10 hover:bg-white/20 hover:text-white transition-colors text-white/50 rounded-lg text-xs font-bold mr-1 flex items-center gap-1 cursor-pointer"
          >
            <X className="h-4 w-4" />
            <span>Close</span>
          </button>
        </div>

        {/* Portal Horizontal Tabs */}
        <div className="grid grid-cols-3 border-b border-white/5 bg-brand-navy text-xs font-bold text-white/60 text-center select-none">
          <button
            type="submit"
            onClick={() => setActiveTab('status')}
            className={`py-3 ${activeTab === 'status' ? 'text-brand-gold border-b-2 border-brand-gold bg-white/5' : 'hover:text-white hover:bg-white/5'} cursor-pointer`}
          >
            Inquiry Tracking
          </button>
          <button
            type="submit"
            onClick={() => setActiveTab('scholarship')}
            className={`py-3 ${activeTab === 'scholarship' ? 'text-brand-gold border-b-2 border-brand-gold bg-white/5' : 'hover:text-white hover:bg-white/5'} cursor-pointer`}
          >
            Scholarship Estimator
          </button>
          <button
            type="submit"
            onClick={() => setActiveTab('chat')}
            className={`py-3 ${activeTab === 'chat' ? 'text-brand-gold border-b-2 border-brand-gold bg-white/5' : 'hover:text-white hover:bg-white/5'} cursor-pointer`}
          >
            AI Advise Bot
          </button>
        </div>

        {/* Dynamic Inner views */}
        <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-brand-navy-dark">
          
          {/* TAB 1: INQUIRY TRACKING & STATUS TICKETS */}
          {activeTab === 'status' && (
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase text-brand-gold tracking-widest">
                My Filed Inquiries ({inquiries.length})
              </h4>

              {inquiries.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-xl border border-dashed border-white/10 bg-white/5">
                  <Calendar className="h-10 w-10 text-brand-gold mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-semibold text-white/80">No Inquiries Found</p>
                  <p className="text-xs text-white/40 max-w-[250px] mx-auto mt-1">
                    Please submit the admissions inquiry on the homepage to start tracking validation states.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="mt-4 inline-flex items-center gap-1 bg-brand-gold text-brand-navy px-4 py-2 rounded-lg text-xs font-extrabold cursor-pointer"
                  >
                    <span>Register an Inquiry</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div key={inq.id} className="bg-brand-navy/60 border border-brand-gold/20 p-4 rounded-xl space-y-3.5 relative">
                      {/* Ticket header details */}
                      <div className="flex justify-between items-start border-b border-white/5 pb-2">
                        <div>
                          <p className="text-[11px] font-mono text-brand-gold">{inq.id}</p>
                          <h5 className="text-xs font-black text-white mt-1">{getProgramName(inq.programId)}</h5>
                        </div>
                        <span className="text-[9px] bg-emerald-500/15 text-emerald-400 font-extrabold px-2 py-0.5 rounded uppercase border border-emerald-500/10">
                          Active Lead
                        </span>
                      </div>

                      {/* Info details */}
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-white/70">
                        <div>
                          <span className="text-white/30 block">QUALIFICATION:</span>
                          <b>{inq.highestQualification} ({inq.score}%)</b>
                        </div>
                        <div>
                          <span className="text-white/30 block">ORIGIN STATE:</span>
                          <b>{inq.state}</b>
                        </div>
                      </div>

                      {/* Visual Admission Timeline tracker (Conversion/Trust Booster) */}
                      <div className="pt-2">
                        <span className="text-[9px] font-bold text-white/30 block mb-2 uppercase">Admissions Path Progress</span>
                        
                        <div className="flex justify-between items-center relative pl-1">
                          
                          {/* Thread Line across indicators */}
                          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                          
                          {/* Step 1: Inquiry Filed */}
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-emerald-500 text-brand-navy flex items-center justify-center text-[10px] font-black border border-emerald-500 shadow-sm shadow-emerald-500/20">
                              ✓
                            </div>
                            <span className="text-[9px] text-emerald-400 font-bold mt-1 text-center scale-90">Inquiry Received</span>
                          </div>

                          {/* Step 2: Verification Review */}
                          <div className="relative z-10 flex flex-col items-center">
                            <div className="h-6 w-6 rounded-full bg-brand-navy border-2 border-brand-gold/80 text-brand-gold flex items-center justify-center text-[10px] font-bold">
                              ➔
                            </div>
                            <span className="text-[9px] text-brand-gold font-bold mt-1 text-center scale-90">Document Verification</span>
                          </div>

                          {/* Step 3: Call Scheduled */}
                          <div className="relative z-10 flex flex-col items-center opacity-40">
                            <div className="h-6 w-6 rounded-full bg-brand-navy border-2 border-white/20 text-white flex items-center justify-center text-[10px]">
                              3
                            </div>
                            <span className="text-[9px] font-semibold mt-1 text-center scale-90">Advisor Interview</span>
                          </div>

                          {/* Step 4: Confirmed Offer */}
                          <div className="relative z-10 flex flex-col items-center opacity-40">
                            <div className="h-6 w-6 rounded-full bg-brand-navy border-2 border-white/20 text-white flex items-center justify-center text-[10px]">
                              4
                            </div>
                            <span className="text-[9px] font-semibold mt-1 text-center scale-90">Seat Allocation</span>
                          </div>

                        </div>
                      </div>

                      {/* Document Picker Panel / Submission Board */}
                      <div className="mt-4 p-3.5 bg-white/5 border border-white/10 rounded-xl space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs font-black text-brand-gold uppercase tracking-wider">
                            <Cloud className="h-4 w-4 animate-pulse" />
                            <span>NAAC A+ Verification Documents</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setShowConfigTips(!showConfigTips)}
                            className="text-white/40 hover:text-white transition-colors cursor-pointer"
                            title="OAuth Setup Help"
                          >
                            <HelpIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        
                        <p className="text-[10.5px] text-white/60 leading-relaxed font-semibold">
                          Select and attach required documents securely from Google Drive using the Google Picker container.
                        </p>

                        {/* Error notice if present */}
                        {authError && (
                          <div className="p-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[10px] rounded-lg flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                            <span className="leading-tight">{authError}</span>
                          </div>
                        )}

                        {/* Setup Advice Panel */}
                        {showConfigTips && (
                          <div className="p-3 bg-brand-navy/80 border border-brand-gold/15 text-[10px] text-white/85 rounded-lg space-y-2">
                            <p className="font-bold text-brand-gold">📋 How to configure Google Picker:</p>
                            <ol className="list-decimal list-inside space-y-1 text-white/70 font-semibold">
                              <li>Set <code className="bg-white/10 px-1 py-0.5 rounded text-brand-gold">VITE_GOOGLE_CLIENT_ID</code> in AI Studio.</li>
                              <li>Make sure authorized JavaScript origins allow this sandbox URL.</li>
                              <li>Otherwise, the app uses a robust simulated Picker fallback.</li>
                            </ol>
                          </div>
                        )}

                        {/* File Slots Checklist */}
                        <div className="space-y-2 pt-1 font-sans">
                          {[
                            "Class 10th Marks Sheet",
                            "Class 12th Marks Sheet",
                            "Graduation Certificate",
                            "Domicile Certificate"
                          ].map((slot) => {
                            const attached = inq.attachedFiles?.find(f => f.name.startsWith(slot));
                            return (
                              <div key={slot} className="flex items-center justify-between p-2 rounded-lg bg-brand-navy/40 border border-white/5 text-xs">
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5">
                                    {attached ? (
                                      <span className="h-4 w-4 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-[9px] font-bold">
                                        ✓
                                      </span>
                                    ) : (
                                      <span className="h-4 w-4 bg-white/5 text-white/30 rounded-full flex items-center justify-center text-[9px]">
                                        •
                                      </span>
                                    )}
                                    <span className={`font-bold ${attached ? 'text-white' : 'text-white/60'}`}>{slot}</span>
                                  </div>
                                  
                                  {attached && (
                                    <p className="text-[10px] text-brand-gold font-mono truncate max-w-[170px] pl-5">
                                      {attached.name.replace(`${slot}: `, '')}
                                    </p>
                                  )}
                                </div>

                                <div className="flex items-center gap-2">
                                  {attached ? (
                                    <>
                                      <a
                                        href={attached.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[10px] text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-0.5 hover:underline"
                                      >
                                        <span>Open</span>
                                        <ExternalLink className="h-3 w-3" />
                                      </a>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (window.confirm(`Remove ${slot} proof?`)) {
                                            const updatedInq: Inquiry = {
                                              ...inq,
                                              attachedFiles: (inq.attachedFiles || []).filter(f => f.id !== attached.id),
                                            };
                                            onUpdateInquiry(updatedInq);
                                          }
                                        }}
                                        className="text-[10px] text-red-400 hover:text-red-300 font-extrabold cursor-pointer"
                                      >
                                        Remove
                                      </button>
                                    </>
                                  ) : (
                                    <button
                                      type="button"
                                      onClick={() => handleAuthAndPicker(inq, slot)}
                                      disabled={isVerifyingGoogle}
                                      className="inline-flex items-center gap-1.5 bg-brand-gold hover:bg-brand-gold/90 disabled:opacity-50 text-brand-navy font-bold text-[10px] px-2.5 py-1 rounded transition-colors cursor-pointer"
                                    >
                                      {isVerifyingGoogle ? (
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                      ) : (
                                        <FileUp className="h-3 w-3" />
                                      )}
                                      <span>Attach</span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Action call buttons */}
                      <div className="pt-2 mt-4 bg-white/5 p-2 rounded text-[10.5px] text-white/70 flex justify-between items-center">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                          <span>Admission priority locked.</span>
                        </span>
                        <a href="tel:+911912546078" className="text-brand-gold font-bold hover:underline">
                          Direct Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SCHOLARSHIP ESTIMATOR */}
          {activeTab === 'scholarship' && (
            <div className="space-y-4">
              <h4 className="text-[11px] font-black uppercase text-brand-gold tracking-widest">
                Interactive Scholarship Analyzer
              </h4>
              <p className="text-xs text-white/70">
                Play around with inputs representing J&K eligibility quotas to view estimated tuition concessions under NAAC A+ regulations.
              </p>

              {/* Slider Input */}
              <div className="space-y-2 bg-brand-navy border border-white/5 p-4 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-white/85">Graduation Aggregate / CGPA</span>
                  <span className="text-sm font-black text-brand-gold">{calcScore}%</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="100"
                  step="1"
                  value={calcScore}
                  onChange={(e) => setCalcScore(parseInt(e.target.value))}
                  className="w-full select-none cursor-pointer h-1 bg-white/10 rounded-lg appearance-none accent-brand-gold"
                />
                <div className="flex justify-between text-[10px] text-white/40 font-mono">
                  <span>45% Min Eligible</span>
                  <span>75% Good</span>
                  <span>95% Gold Merit</span>
                </div>
              </div>

              {/* Checkboxes variables */}
              <div className="space-y-2.5">
                <label className="flex items-center gap-2.5 bg-brand-navy border border-white/5 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                  <input
                    type="checkbox"
                    checked={isJKResident}
                    onChange={(e) => setIsJKResident(e.target.checked)}
                    className="rounded border-white/20 select-none text-brand-gold focus:ring-0 cursor-pointer h-4 w-4 bg-brand-navy-dark"
                  />
                  <div>
                    <span className="text-xs font-bold block">Jammu & Kashmir UT Resident</span>
                    <span className="text-[10px] text-white/40">Grants territorial priority weighting</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-brand-navy border border-white/5 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                  <input
                    type="checkbox"
                    checked={isReservedCategory}
                    onChange={(e) => setIsReservedCategory(e.target.checked)}
                    className="rounded border-white/20 select-none text-brand-gold focus:ring-0 cursor-pointer h-4 w-4 bg-brand-navy-dark"
                  />
                  <div>
                    <span className="text-xs font-bold block">SC / ST / OBC / Disability quota</span>
                    <span className="text-[10px] text-white/40">Additional 5% concession eligibility</span>
                  </div>
                </label>

                <label className="flex items-center gap-2.5 bg-brand-navy border border-white/5 p-3 rounded-xl cursor-pointer hover:bg-white/5 transition-all">
                  <input
                    type="checkbox"
                    checked={isSportsChampion}
                    onChange={(e) => setIsSportsChampion(e.target.checked)}
                    className="rounded border-white/20 select-none text-brand-gold focus:ring-0 cursor-pointer h-4 w-4 bg-brand-navy-dark"
                  />
                  <div>
                    <span className="text-xs font-bold block">National or State Level Sports champion</span>
                    <span className="text-[10px] text-white/40">Additional 10% athletic concession waiver</span>
                  </div>
                </label>
              </div>

              {/* Projected Result Block (Trust elements) */}
              <div className="bg-brand-navy border border-brand-gold/30 p-5 rounded-xl text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-1 bg-brand-gold text-brand-navy font-black text-[8px] uppercase tracking-wide rounded-bl">
                  Provisional estimate
                </div>
                <div className="mx-auto h-10 w-10 bg-brand-gold/20 rounded-full flex items-center justify-center text-brand-gold mb-2.5">
                  <Award className="h-5 w-5" />
                </div>
                <p className="text-xs text-white/70 uppercase font-black tracking-wider leading-none">Tuition Fee Concession</p>
                <h3 className="text-3xl font-black text-brand-gold mt-1.5">{tentativeWaiver}% Waiver</h3>
                <p className="text-[10.5px] text-white/50 mt-1">
                  Applicable across academic semesters for qualified learners.
                </p>
                
                <hr className="border-white/5 my-3.5" />

                <div className="text-left text-[11px] text-white/70 space-y-1 bg-brand-navy-dark p-2.5 rounded">
                  <div className="flex justify-between">
                    <span>Base Score Merit:</span>
                    <span className="text-white font-bold">{calcScore >= 70 ? `${tentativeWaiver - (isReservedCategory ? 5 : 0) - (isSportsChampion ? 10 : 0)}%` : '0%'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Special Quotas Credit:</span>
                    <span className="text-white font-bold">{isReservedCategory ? '+5%' : '0%'} {isSportsChampion ? '+10%' : '0%'}</span>
                  </div>
                </div>

                <p className="text-[10px] text-white/40 italic mt-3">
                  *Official document verification remains paramount during final intake clearance.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SMART COUNSELOR AUTOPILOT CHAT BOX */}
          {activeTab === 'chat' && (
            <div className="flex flex-col h-[480px]">
              {/* Chat info label */}
              <div className="bg-white/5 p-3 rounded-lg border border-white/10 text-[11px] flex gap-2 items-start mb-3">
                <MessageSquare className="h-4 w-4 text-brand-gold flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Automated Counselor Advisor Desk</span>
                  <span>Ask about girls hostel fees, session starting dates, placement stats, and University of Jammu affiliation guidelines.</span>
                </div>
              </div>

              {/* Chat thread list */}
              <div className="flex-1 overflow-y-auto mb-3 space-y-3.5 pr-1 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
                  >
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-brand-gold text-brand-navy font-semibold rounded-br-none'
                          : 'bg-brand-navy-dark border border-white/10 text-white rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[9px] text-white/30 mt-1 font-mono">{msg.time}</span>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex flex-col max-w-[85%] mr-auto items-start">
                    <div className="p-3 bg-brand-navy-dark border border-white/10 rounded-xl rounded-bl-none flex items-center gap-1.5">
                      <span className="h-2 w-2 bg-brand-gold rounded-full animate-bounce" />
                      <span className="h-2 w-2 bg-brand-gold rounded-full animate-bounce [animation-delay:0.2s]" />
                      <span className="h-2 w-2 bg-brand-gold rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Quick questions buttons */}
              <div className="flex gap-1 overflow-x-auto pb-1.5 scrollbar-thin select-none">
                {['Hostel facilities', 'B.Ed fee structures', 'Placement records', 'Scholarship details'].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      setInputText(opt);
                    }}
                    className="flex-shrink-0 bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 rounded-full px-2.5 py-1 text-[10px] font-semibold cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Message Typing Inputs form */}
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type admission questions here..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="flex-1 bg-brand-navy border border-white/15 focus:border-brand-gold focus:outline-none rounded-lg px-3.5 py-2.5 text-xs text-white placeholder-white/40"
                />
                <button
                  type="submit"
                  className="bg-brand-gold text-brand-navy hover:bg-brand-gold-dark transition-colors px-4 rounded-lg text-xs font-bold font-sans cursor-pointer flex items-center justify-center"
                >
                  Ask
                </button>
              </form>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
