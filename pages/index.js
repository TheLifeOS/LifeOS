import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingDown, Zap, Clock, ArrowRight, Share2 } from 'lucide-react';

export default function SovereignTerminal() {
  const [data, setData] = useState({ age: '', incomeNow: '', incomeAlt: '', delay: '', decision: '' });
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState(null);
  const [ticker, setTicker] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Ensure animations and tickers only run on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Real-time Hemorrhage Ticker
  useEffect(() => {
    if (data.incomeNow && data.incomeAlt && isClient) {
      const monthlyGap = parseInt(data.incomeAlt) - parseInt(data.incomeNow);
      const secondValue = monthlyGap / 30 / 24 / 60 / 60;
      const interval = setInterval(() => {
        setTicker((prev) => prev + secondValue);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data.incomeNow, data.incomeAlt, isClient]);

  const executeSimulation = () => {
    if (!data.age || !data.incomeNow || !data.incomeAlt || !data.delay) {
      alert("THE MIRROR REQUIRES DATA FOR REFLECTION.");
      return;
    }
    setSimulating(true);
    
    // Simulate complex probability scanning
    setTimeout(() => {
      const remainingYears = 80 - parseInt(data.age);
      const monthlyLoss = parseInt(data.incomeAlt) - parseInt(data.incomeNow);
      const decay = monthlyLoss * parseInt(data.delay);
      const lifetimeDelta = decay * Math.pow(1.08, remainingYears);
      const sovereignScore = Math.max(12, 100 - (parseInt(data.delay) * 2.5));
      const commitmentID = `LDP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      setResult({ decay, lifetimeDelta, sovereignScore, commitmentID });
      setSimulating(false);
    }, 2000);
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] font-mono selection:bg-red-500">
      <Head>
        <title>TERMINAL // SOVEREIGN_MIRROR</title>
        <meta name="description" content="Personal Decision Intelligence Engine" />
      </Head>

      <main className="max-w-4xl mx-auto p-6 py-20 relative">
        {/* Real-time Awareness Bar */}
        <div className="fixed top-0 left-0 w-full border-b border-white/5 bg-black/80 backdrop-blur-md p-3 z-50 flex justify-between px-10 text-[10px] tracking-widest text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
            SYSTEM_STATUS: <span className="text-green-500 uppercase tracking-tighter">Active</span>
          </div>
          <div>HEMORRHAGE_CLEARENCE: <span className="text-red-500">-${ticker.toFixed(4)}</span></div>
        </div>

        <header className="mb-20 space-y-2 mt-8">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-black italic tracking-tighter glow"
          >
            SOVEREIGN MIRROR
          </motion.h1>
          <p className="text-gray-500 uppercase text-[10px] tracking-[0.5em]">The Universal Protocol for Life Trajectory Optimization</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Interface */}
          <section className="space-y-8 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-sm">
            <div className="space-y-6">
              <TerminalInput label="Biological Age" name="age" type="number" value={data.age} onChange={setData} />
              <TerminalInput label="Dilemma (The Choice)" name="decision" placeholder="e.g. Quit Job / Relocate" value={data.decision} onChange={setData} />
              <div className="grid grid-cols-2 gap-4">
                <TerminalInput label="Current Monthly Income ($)" name="incomeNow" type="number" value={data.incomeNow} onChange={setData} />
                <TerminalInput label="Potential Monthly Income ($)" name="incomeAlt" type="number" value={data.incomeAlt} onChange={setData} />
              </div>
              <TerminalInput label="Months of Hesitation" name="delay" type="number" value={data.delay} onChange={setData} />
            </div>

            <button 
              onClick={executeSimulation}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all transform active:scale-95 shadow-xl shadow-white/5"
            >
              {simulating ? "PROCESING_PROBABILITIES..." : "RUN_SIMULATION"}
            </button>
          </section>

          {/* Results Output */}
          <section className="relative min-h-[450px]">
            <AnimatePresence mode="wait">
              {!result && !simulating && (
                <motion.div 
                  key="idle"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center border border-dashed border-white/10 rounded-3xl text-gray-600 text-[10px] text-center p-10 leading-relaxed tracking-widest uppercase"
                >
                  AWAITING_INPUTDATA: <br/> The mirror reflects nothing until the truth is provided.
                </motion.div>
              )}

              {simulating && (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                >
                  <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400">Scanning Shadow Network...</p>
                </motion.div>
              )}

              {result && (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
                  className="space-y-6"
                >
                  <div className="bg-red-600/10 border border-red-600/20 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 text-[8px] text-red-500/50 font-bold">{result.commitmentID}</div>
                    <p className="text-[10px] uppercase text-red-500 mb-2 font-bold tracking-[0.3em]">Hemorrhage Detected</p>
                    <p className="text-6xl font-black tracking-tighter glow">-${result.decay.toLocaleString()}</p>
                    <p className="mt-4 text-[10px] text-gray-400 leading-relaxed uppercase tracking-wider">
                      This is the direct cost of your delay. It is a structural leak in your legacy.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <StatBox label="Sovereign Score" value={result.sovereignScore} sub="Efficiency Index" />
                    <StatBox label="Wealth Delta" value={`$${Math.round(result.lifetimeDelta / 1000)}k`} sub="Lifetime Destruction" />
                  </div>

                  {/* MONETIZATION BRIDGE */}
                  <div className="pt-4 space-y-4">
                    <a 
                      href="YOUR_COMMERCE_LINK" 
                      target="_blank" 
                      className="group flex items-center justify-between w-full p-6 bg-blue-600 text-white rounded-3xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20"
                    >
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 italic">Stop the bleeding</p>
                        <p className="text-lg font-black italic tracking-tighter uppercase">Get the Decisive Roadmap</p>
                      </div>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </a>
                    
                    <button className="w-full py-4 border border-white/10 rounded-2xl text-[10px] uppercase tracking-[0.3em] text-gray-500 hover:text-white hover:border-white transition-all">
                      Export Commitment Certificate
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>

        {/* Global Pulse Indicator */}
        <footer className="mt-24 border-t border-white/5 pt-12 text-center space-y-8">
           <div className="opacity-30 text-[8px] uppercase tracking-[0.4em] flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            842 Simulations running globally in last 24h
          </div>
          <p className="text-gray-700 text-[10px] uppercase tracking-widest">LifeOS Protocol // Phase 1.0 // Uncopyable Architecture</p>
        </footer>
      </main>
    </div>
  );
}

function TerminalInput({ label, onChange, ...props }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{label}</p>
      <input 
        {...props}
        className="w-full bg-transparent border-b border-white/10 py-3 text-lg outline-none focus:border-white transition-all font-sans placeholder:text-gray-800"
        onChange={(e) => onChange(prev => ({ ...prev, [props.name]: e.target.value }))}
        autoComplete="off"
      />
    </div>
  );
}

function StatBox({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl hover:bg-white/10 transition-colors">
      <p className="text-[8px] uppercase tracking-[0.2em] text-gray-500 mb-1 font-bold">{label}</p>
      <p className="text-3xl font-black tracking-tighter italic">{value}</p>
      <p className="text-[8px] uppercase tracking-widest text-gray-600 mt-2">{sub}</p>
    </div>
  );
}
