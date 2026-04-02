'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { StarsBackground } from '@/components/ui/stars-background';

const TEXT_ITEMS = [
  "Intelligent Perception",
  "Adaptive Locomotion",
  "Reinforcement Learning",
  "Real-time Motor Control"
];

export default function LandingPage() {
  const [activeTextIndex, setActiveTextIndex] = useState(0);

  // Text morphing interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTextIndex((prev) => (prev + 1) % TEXT_ITEMS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Custom Cursor Logic
  useEffect(() => {
    const cursorDot = document.getElementById('cursorDot');
    const cursorTrail = document.getElementById('cursorTrail');

    const moveCursor = (e: MouseEvent) => {
      if (cursorDot && cursorTrail) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;

        // Add a slight delay/easing to the trail for smoothness
        setTimeout(() => {
          cursorTrail.style.left = `${e.clientX}px`;
          cursorTrail.style.top = `${e.clientY}px`;
        }, 50);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="w-full flex w-full flex-col overflow-x-hidden bg-white text-slate-900 relative">
      {/* Stars Background - Global, tweaked for lighter elegant Look or maybe keep it just for a section */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 filter invert">
        <StarsBackground
          starColor="#000"
          speed={0.01}
          factor={0.03}
        />
      </div>

      {/* Custom Cursor Elements */}
      <div className="cursor-dot hidden md:block z-[9999]" id="cursorDot"></div>
      <div className="cursor-trail hidden md:block z-[9998]" id="cursorTrail"></div>

      {/* --- HERO SECTION --- */}
      <section className="h-screen w-full flex flex-col lg:flex-row relative z-10">
        
        {/* Left Column: 3D Robot & Animation (70%) */}
        <div className="hidden lg:flex w-[70%] relative items-center justify-center overflow-hidden z-10 border-r border-slate-200/50 bg-slate-50">
          {/* Text Overlay */}
          <div className="absolute top-16 left-12 z-20 select-none pointer-events-none">
            <h1 className="text-6xl font-light tracking-tighter text-slate-900 mb-2">
              ArmSentient<span className="font-semibold">Robot</span>
            </h1>
            <p className="text-slate-500 uppercase tracking-[0.3em] font-medium text-xs mb-8">
              Quadruped Robot Platform
            </p>
          </div>

          <div className="absolute bottom-16 left-12 right-12 z-20 select-none pointer-events-none">
            <div className="absolute inset-0 bg-white/60 blur-3xl -z-10 rounded-full scale-110" />
            <div className="h-14 relative overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-light text-slate-900 absolute w-full tracking-tight"
                >
                  {TEXT_ITEMS[activeTextIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl leading-relaxed">
              A four-layer hierarchical control architecture combining cloud AI reasoning, reinforcement learning, real-time motor control, and physical hardware.
            </p>
          </div>

          {/* Spline 3D Viewer */}
          <div className="w-full h-[140%] -mb-32 relative z-10 transition-transform duration-700 ease-out hover:scale-[1.02]">
            <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </div>
        </div>

        {/* Right Column: Interaction Form (30%) */}
        <div className="w-full lg:w-[30%] h-full flex flex-col items-center justify-center relative z-20 bg-white shadow-[-20px_0_40px_rgba(0,0,0,0.03)]">
          <div className="w-full max-w-sm mx-auto p-8 rounded-xl bg-white border border-slate-100 shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              {/* Header Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-medium text-slate-900 tracking-tight">ArmSentientRobot</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest px-2 py-1 rounded-sm border border-slate-200 bg-slate-50 w-fit mb-4">
                  Sim-to-Real Transfer
                </p>

                <h2 className="text-2xl font-light text-slate-900 tracking-tight">Access the Interface</h2>
                <p className="text-sm text-slate-500">Initiate serial command protocols or join the reasoning node network.</p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 ml-1 uppercase tracking-wider">Node Name</label>
                    <div className="halo-input-wrapper group">
                      <input
                        type="text"
                        required
                        className="halo-input block w-full rounded px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:ring-0 bg-slate-50 group-focus-within:bg-white border border-slate-200 focus:border-slate-400 transition-all duration-300"
                        placeholder="e.g. Master-01"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 ml-1 uppercase tracking-wider">Access Key</label>
                    <div className="halo-input-wrapper group">
                      <input
                        type="password"
                        required
                        className="halo-input block w-full rounded px-4 py-3 text-slate-900 placeholder-slate-400 text-sm focus:ring-0 bg-slate-50 group-focus-within:bg-white border border-slate-200 focus:border-slate-400 transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-600 font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-800"></span>
                    </span>
                    <span>System Online (50Hz Loop)</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="shimmer-button w-full flex justify-center items-center gap-2 rounded px-4 py-3 text-center font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Authenticate</span>
                  <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </button>
              </form>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-6">
                <motion.a
                  href="https://github.com/ohmyzaid/ArmSentientRobot.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
                >
                  <div className="p-2 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-slate-100 transition-colors">
                    <Github size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Source</span>
                </motion.a>

                <motion.a
                  href="https://x.com/armsentient?s=21"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors group"
                >
                  <div className="p-2 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-slate-100 transition-colors">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4 fill-current">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                    </svg>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Twitter</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPLANATION SECTION --- */}
      <section className="min-h-screen py-24 px-6 md:px-16 w-full flex flex-col items-center justify-center border-t border-slate-200 bg-slate-50 relative z-20">
        <div className="max-w-6xl w-full mx-auto space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-slate-400">System Architecture</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
              Bridging the gap between <span className="font-normal italic">Cloud AI</span> and <span className="font-normal italic">Physical Actuation</span>.
            </h2>
            <p className="max-w-2xl mx-auto text-slate-500 text-base md:text-lg">
              Through a sophisticated 4-layer control loop, ArmSentientRobot analyzes optimal gaits (Trot, Wave, Tripod, Crawl) and executes commands. Powered by RL sim-to-real transfer over an automated 50Hz timing environment.
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Visualizing Pipeline - Image */}
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100 relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <h3 className="text-xl font-medium tracking-tight mb-2 text-slate-900">Control Loop Architecture</h3>
                <p className="text-sm text-slate-500 mb-8 max-w-sm">Detailed visualization of the inverse kinematics solver and real-time posture adjustments.</p>
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center group-hover:border-slate-300 transition-colors">
                  <Image
                    src="/v1.jpeg"
                    alt="Control Loop Architecture"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Video Demonstration */}
            <div className="space-y-6">
              <div className="bg-slate-900 p-6 md:p-8 rounded-2xl shadow-2xl relative group overflow-hidden text-white">
                <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent opacity-50 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-xl font-medium tracking-tight mb-2">Locomotion Video Demo</h3>
                  <p className="text-sm text-slate-400 mb-8 max-w-sm">Watch the physical hardware execute smooth transitioning between Trot and Crawl gaits.</p>
                  
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center group-hover:border-slate-600 transition-colors">
                    <video 
                      src="/v2.mp4" 
                      className="w-full h-full object-cover"
                      playsInline 
                      autoPlay 
                      muted 
                      loop
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
