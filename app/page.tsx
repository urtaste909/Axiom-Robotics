'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Spline from '@splinetool/react-spline';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Twitter } from 'lucide-react';
import { StarsBackground } from '@/components/ui/stars-background';

const TEXT_ITEMS = [
  "Autonomous AI Orchestration",
  "Seamless Agentic Workflows",
  "Real-time Cognitive Simulation",
  "Scalable Task Automation"
];

export default function LoginPage() {
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
    <div className="h-screen w-full flex overflow-hidden bg-slate-950 text-slate-100 relative">
      {/* Stars Background - Global */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <StarsBackground
          starColor="#fff"
          speed={0.02}
          factor={0.05}
        />
      </div>

      {/* Custom Cursor Elements */}
      <div className="cursor-dot hidden md:block z-[9999]" id="cursorDot"></div>
      <div className="cursor-trail hidden md:block z-[9998]" id="cursorTrail"></div>

      {/* Left Column: 3D Robot & Animation (70%) */}
      <div className="hidden lg:flex w-[70%] relative items-center justify-center overflow-hidden z-10">

        {/* Text Overlay */}
        <div className="absolute bottom-16 left-8 right-8 z-20 p-8 select-none pointer-events-none">
          {/* Added white gradient background for text readability */}
          <div className="absolute inset-0 bg-slate-950/60 blur-3xl -z-10 rounded-full scale-110" />
          <div className="h-12 relative overflow-hidden mb-3">
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeTextIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="text-4xl font-bold text-white absolute w-full uppercase tracking-tight"
              >
                {TEXT_ITEMS[activeTextIndex]}
              </motion.h2>
            </AnimatePresence>
          </div>
          <p className="text-slate-300 text-base max-w-2xl leading-relaxed">
            Agent Weaver is an advanced AI orchestration framework dedicated to building and managing complex multi-agent systems. It provides a robust, scalable, and highly expressive cognitive architecture for developers and enterprises.
          </p>
        </div>

        {/* Spline 3D Viewer */}
        <div className="w-full h-[140%] -mb-32 relative z-10 transition-transform duration-700 ease-out hover:scale-105">
          <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
        </div>
      </div>

      {/* Right Column: Login Form (30%) */}
      <div className="w-full lg:w-[30%] flex flex-col items-center justify-center relative z-20">

        {/* Glass Card Container - ENHANCED VISIBILITY */}
        <div className="w-full max-w-md mx-auto p-8 rounded-2xl bg-slate-900/40 backdrop-blur-md border border-slate-800 shadow-2xl relative overflow-hidden ring-1 ring-slate-800/50">

          {/* Very subtle noise/gradient for texture, ensuring transparency */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 space-y-8">

            {/* Header Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-6">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Image
                    src="/logo.jpeg"
                    alt="Agent Weaver Logo"
                    width={32}
                    height={32}
                    className="rounded-lg object-cover shadow-lg shadow-purple-500/20 transition-transform hover:scale-110"
                  />
                </Link>
                <span className="text-xl font-semibold text-white tracking-tight uppercase">AGENT <span className="text-purple-500 font-normal">WEAVER</span></span>
                <span className="ml-auto px-2 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/30 text-[10px] font-medium text-purple-400 uppercase tracking-wider">
                  Invite Only
                </span>
              </div>
              <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest px-1 py-0.5 rounded bg-purple-500/10 w-fit mb-4">
                Intelligent Agent Orchestration
              </p>

              <h2 className="text-2xl font-bold text-white tracking-tight">Access the Future</h2>
              <p className="text-sm text-slate-400">Join the waitlist to gain access to the Agent Weaver autonomous orchestration and Cognitive Graph interface.</p>
            </div>

            {/* Form */}
            <form className="space-y-5">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 ml-1">Full Name</label>
                  <div className="halo-input-wrapper group">
                    <input
                      type="text"
                      required
                      className="halo-input block w-full rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:ring-0 bg-slate-950/50 group-focus-within:bg-slate-900 border border-slate-800 focus:border-purple-500/50 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-400 ml-1">Email Address</label>
                  <div className="halo-input-wrapper group">
                    <input
                      type="email"
                      required
                      className="halo-input block w-full rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:ring-0 bg-slate-950/50 group-focus-within:bg-slate-900 border border-slate-800 focus:border-purple-500/50 transition-all duration-300"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400/80">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>14 spots remaining today</span>
                </div>
              </div>

              <button
                type="submit"
                className="shimmer-button w-full flex justify-center items-center gap-2 rounded-lg px-4 py-3 text-start font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/25 bg-gradient-to-r from-purple-600 to-indigo-500 hover:from-purple-500 hover:to-indigo-400 border border-purple-400/20"
              >
                <span>Join Waitlist</span>
                <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
              </button>
            </form>

            <p className="text-center text-xs text-slate-500">
              Already have an invite?
              <Link href="#" className="text-purple-400 hover:text-purple-300 ml-1 font-medium transition-colors hover:underline">
                Enter Access Code
              </Link>
            </p>

            {/* Social Links - Integrated into card footer */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-center gap-6">
              <motion.a
                href="https://github.com/ohmyzaid/agent-weaver.git"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
                  <Github size={18} />
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">GitHub</span>
              </motion.a>

              <motion.a
                href="https://x.com/AgentWeave80918"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors group"
              >
                <div className="p-2 rounded-full bg-slate-800 group-hover:bg-slate-700 transition-colors">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[18px] h-[18px] fill-current">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                  </svg>
                </div>
                <span className="text-[10px] font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">X / Twitter</span>
              </motion.a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
