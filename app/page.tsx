'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import { StarsBackground } from '@/components/ui/stars-background';

const TEXT_ITEMS = [
  "Autonomous Walking",
  "Reinforcement Learning",
  "PPO/SAC Policies",
  "Sim-to-Real Transfer"
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
    <div className="w-full flex-col overflow-x-hidden bg-[#050505] text-[#f8fafc] relative">
      {/* Stars Background - Global */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20">
        <StarsBackground
          starColor="#ffffff"
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
        <div className="hidden lg:flex w-[70%] relative items-center justify-center overflow-hidden z-10 border-r border-[#222] bg-[#0A0A0A]">
          {/* Text Overlay */}
          <div className="absolute top-16 left-12 z-20 select-none pointer-events-none">
            <h1 className="text-6xl font-light tracking-tighter text-white mb-2">
              Axiom<span className="font-semibold">Robotics</span>
            </h1>
            <p className="text-slate-400 uppercase tracking-[0.3em] font-medium text-xs mb-8">
              Autonomous Bipedal Robot Platform
            </p>
          </div>

          <div className="absolute bottom-16 left-12 right-12 z-20 select-none pointer-events-none">
            <div className="absolute inset-0 bg-black/60 blur-3xl -z-10 rounded-full scale-110" />
            <div className="h-14 relative overflow-hidden mb-3">
              <AnimatePresence mode="wait">
                <motion.h2
                  key={activeTextIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl font-light text-white absolute w-full tracking-tight"
                >
                  {TEXT_ITEMS[activeTextIndex]}
                </motion.h2>
              </AnimatePresence>
            </div>
            <p className="text-slate-400 text-sm md:text-base max-w-2xl leading-relaxed">
              An open-source autonomous bipedal robot platform. Demonstrating the intersection of mechanical design, embedded systems, and reinforcement learning.
            </p>
          </div>

          {/* Spline 3D Viewer */}
          <div className="w-full h-[140%] -mb-32 relative z-10 transition-transform duration-700 ease-out hover:scale-[1.02]">
            <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </div>
        </div>

        {/* Right Column: Interaction Form (30%) */}
        <div className="w-full lg:w-[30%] h-full flex flex-col items-center justify-center relative z-20 bg-[#050505] shadow-[-20px_0_40px_rgba(0,0,0,0.5)]">
          <div className="w-full max-w-sm mx-auto p-8 rounded-xl bg-[#0b0b0b] border border-[#222] shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            <div className="relative z-10 space-y-8">
              {/* Header Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-xl font-medium text-white tracking-tight">Axiom Robotics</span>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest px-2 py-1 rounded-sm border border-[#333] bg-[#111] w-fit mb-4">
                  Sim-to-Real Transfer
                </p>

                <h2 className="text-2xl font-light text-white tracking-tight">Access the Interface</h2>
                <p className="text-sm text-slate-500">Initiate serial command protocols to the ESP32-C3 motor control loop.</p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Node Name</label>
                    <div className="halo-input-wrapper group">
                      <input
                        type="text"
                        required
                        className="halo-input block w-full rounded px-4 py-3 text-white placeholder-slate-600 text-sm focus:ring-0 bg-[#111] group-focus-within:bg-[#050505] border border-[#333] focus:border-slate-500 transition-all duration-300"
                        placeholder="e.g. Axiom-Core"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 ml-1 uppercase tracking-wider">Access Key</label>
                    <div className="halo-input-wrapper group">
                      <input
                        type="password"
                        required
                        className="halo-input block w-full rounded px-4 py-3 text-white placeholder-slate-600 text-sm focus:ring-0 bg-[#111] group-focus-within:bg-[#050505] border border-[#333] focus:border-slate-500 transition-all duration-300"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-slate-300 font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
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

              <div className="pt-6 border-t border-[#222] flex items-center justify-center gap-6">
                <motion.a
                  href="https://github.com/urtaste909/Axiom-Robotics.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-full bg-[#111] border border-[#333] group-hover:bg-[#222] transition-colors">
                    <Github size={16} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Source</span>
                </motion.a>

                <motion.a
                  href="https://x.com/Axiomrobotics1"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="p-2 rounded-full bg-[#111] border border-[#333] group-hover:bg-[#222] transition-colors">
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
      <section className="min-h-screen py-24 px-6 md:px-16 w-full flex flex-col items-center justify-center border-t border-[#222] bg-[#0A0A0A] relative z-20">
        <div className="max-w-6xl w-full mx-auto space-y-20">
          
          {/* Header */}
          <div className="text-center space-y-6">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-emerald-400">System Architecture</p>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white max-w-3xl mx-auto leading-tight">
              Bridging the gap between <span className="font-normal italic">RL</span> and <span className="font-normal italic">Physical Actuation</span>.
            </h2>
            <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-lg">
              Through PPO/SAC training in MuJoCo, Axiom Robotics analyzes optimal bipedal gaits and executes commands over a 50Hz ESP32-C3 loop directly to Feetech STS3215 servos.
            </p>
          </div>

          {/* Grid Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Visualizing Pipeline - Image */}
            <div className="space-y-6">
              <div className="bg-[#111] p-6 md:p-8 rounded-2xl shadow-xl border border-[#333] relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <h3 className="text-xl font-medium tracking-tight mb-2 text-white">Reward Design</h3>
                <p className="text-sm text-slate-400 mb-8 max-w-sm">Multi-objective reward function balancing locomotion quality, thermal safety, and energy efficiency.</p>
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-black border border-[#222] flex items-center justify-center group-hover:border-[#444] transition-colors">
                  <Image
                    src="/axiompic.jpeg"
                    alt="Reward Design - Multi-objective reward function"
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Video Demonstration */}
            <div className="space-y-6">
              <div className="bg-black p-6 md:p-8 rounded-2xl shadow-2xl relative group overflow-hidden border border-[#222]">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-50 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-xl font-medium tracking-tight mb-1 text-white">Control Loop Architecture</h3>
                  <h4 className="text-sm font-semibold tracking-wide text-emerald-400 mb-2">Locomotion Video Demo</h4>
                  <p className="text-sm text-slate-400 mb-6 max-w-sm">Walk testing showcasing stable sim-to-real transferred policies.</p>
                  
                  <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-[#0A0A0A] border border-[#333] flex items-center justify-center group-hover:border-emerald-500/50 transition-colors">
                    <video 
                      src="/media/mov.mp4" 
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
