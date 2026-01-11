import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingDown, Zap, Clock, ArrowRight, AlertCircle, Lock } from 'lucide-react';

export default function SovereignMirrorV2() {
  const [data, setData] = useState({ age: '', incomeNow: '', incomeAlt: '', delay: '', decision: '' });
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState(null);
  const [ticker, setTicker] = useState(0);

  // Hemorrhage Ticker: Quantifies the cost of time spent on the page
  useEffect(() => {
    if (data.incomeNow && data.incomeAlt) {
      const gap = Math.max(0, parseInt(data.incomeAlt) - parseInt(data.incomeNow));
      const perSecond = gap / (30 * 24 * 60 * 60);
      const interval = setInterval(() => setTicker(t => t + perSecond), 1000);
      return () => clearInterval(interval);
    }
  }, [data.incomeNow, data.incomeAlt]);

  const executeSimulation = () => {
    if (!data.age || !data.incomeNow || !data.incomeAlt || !data.delay) return;
    setSimulating(true);
    
    // Aesthetic simulation delay to build tension
    setTimeout(() => {
      const monthlyGap = parseInt(data.incomeAlt) - parseInt(data.incomeNow);
      const immediateLoss = monthlyGap * parseInt(data.delay);
      const yearsLeft = 80 - parseInt(data.age);
      const lifetimeLoss = immediateLoss * Math.pow(1.08, yearsLeft);
      const score = Math.max(10, 100 - (parseInt(data.delay) * 3.5));
      
      setResult({ immediateLoss, lifetimeLoss, score });
      setSimulating(false);
    }, 2400);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] font-sans selection:bg-red-600">
      <Head>
        <title>Sovereign Mirror // The Cost of Hesitation</title>
      </Head>

      {/* Trust & Awareness Bar: Addresses UX point 1b & 6b */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 text-blue-400">
            <ShieldCheck size={16} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Secure Decision Environment</span>
          </div>
          {ticker > 0 && (
            <div className="text-red-500 font-mono text-xs flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              UNRECOVERED_LOSS: -${ticker.toFixed(4)}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Section: Value Proposition (Addresses UX point 6a) */}
        <div className="flex flex-col justify-center space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-6xl font-black tracking-tight leading-[0.9] mb-6">
              HEARING THE <span className="text-red-600 italic">TRUTH</span> <br/>IS EXPENSIVE.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
              Your hesitation isn't free. Calculate the exact <strong>Opportunity Cost</strong> of your current path and stop the structural leak in your legacy.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 opacity-60">
            <Feature icon={<Clock size={14}/>} text="Identify your Overthinking Tax" />
            <Feature icon={<TrendingDown size={14}/>} text="Visualize Wealth Destruction" />
            <Feature icon={<Lock size={14}/>} text="100% Private Logic Engine" />
          </div>
        </div>

        {/* Right Section: The Engine (Addresses UX point 1c & 6c) */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative overflow-hidden">
          {!result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Biological Age" name="age" type="number" placeholder="e.g. 28" onChange={setData} />
                <Input label="Months Delayed" name="delay" type="number" placeholder="e.g. 6" onChange={setData} />
              </div>
              <Input label="Current Dilemma" name="decision" placeholder="e.g. Quitting Corporate to Build" onChange={setData} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Current Monthly ($)" name="incomeNow" type="number" placeholder="5000" onChange={setData} />
                <Input label="Potential Monthly ($)" name="incomeAlt" type="number" placeholder="12000" onChange={setData} />
              </div>
              
              <button 
                onClick={executeSimulation}
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all transform active:scale-[0.98] shadow-xl"
              >
                {simulating ? "Scanning Probabilities..." : "Run Sovereign Simulation"}
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
              <div className="text-center space-y-2">
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-[0.3em]">Hemorrhage Detected</p>
                <h2 className="text-7xl font-black tracking-tighter">-${result.immediateLoss.toLocaleString()}</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <StatBox label="Sovereign Score" value={`${result.score}/100`} sub="Action Efficiency" />
                <StatBox label="Lifetime Decay" value={`$${Math.round(result.lifetimeLoss/1000)}k`} sub="Compound Impact" />
              </div>

              <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-3xl text-sm leading-relaxed text-red-200/80 italic text-center">
                "By delaying this choice for {data.delay} months, you have effectively paid a ${result.immediateLoss.toLocaleString()} tax to stay in your comfort zone."
              </div>

              <div className="space-y-3">
                <button className="w-full py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-2 group">
                  Get My Recovery Roadmap
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => setResult(null)}
                  className="w-full py-3 text-[10px] uppercase tracking-widest text-gray-600 hover:text-white transition-colors"
                >
                  Reset Parameters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-white/5 opacity-20 hover:opacity-100 transition-opacity flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <p>LifeOS Protocol v1.4.2</p>
        <p>The Personal Decision Infrastructure</p>
      </footer>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{label}</label>
      <input 
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-600/50 transition-all font-mono text-sm placeholder:text-gray-800"
        onChange={(e) => props.onChange(prev => ({ ...prev, [props.name]: e.target.value }))}
      />
    </div>
  );
}

function StatBox({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 p-5 rounded-2xl text-center">
      <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-black italic tracking-tighter">{value}</p>
      <p className="text-[8px] uppercase tracking-[0.2em] text-gray-600 mt-1">{sub}</p>
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <span className="text-[10px] uppercase tracking-widest font-bold">{text}</span>
    </div>
  );
}
