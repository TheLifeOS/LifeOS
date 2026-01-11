import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, TrendingDown, Zap, Clock, ArrowRight, ShieldCheck, Info } from 'lucide-react';

export default function LifeOSV2() {
  const [data, setData] = useState({ age: '', incomeNow: '', incomeAlt: '', delay: '', decision: '' });
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState(null);
  const [ticker, setTicker] = useState(0);

  // Reality Ticker: Shows the cost of staying on the page
  useEffect(() => {
    if (data.incomeNow && data.incomeAlt) {
      const gap = Math.max(0, parseInt(data.incomeAlt) - parseInt(data.incomeNow));
      const perSecond = gap / (30 * 24 * 60 * 60);
      const interval = setInterval(() => setTicker(t => t + perSecond), 1000);
      return () => clearInterval(interval);
    }
  }, [data.incomeNow, data.incomeAlt]);

  const runSimulation = () => {
    if (!data.age || !data.incomeNow || !data.incomeAlt || !data.delay) return;
    setSimulating(true);
    setTimeout(() => {
      const monthlyGap = parseInt(data.incomeAlt) - parseInt(data.incomeNow);
      const immediateLoss = monthlyGap * parseInt(data.delay);
      const yearsLeft = 80 - parseInt(data.age);
      const lifetimeLoss = immediateLoss * Math.pow(1.08, yearsLeft);
      const score = Math.max(10, 100 - (parseInt(data.delay) * 3));
      
      setResult({ immediateLoss, lifetimeLoss, score });
      setSimulating(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500">
      <Head>
        <title>LifeOS // Stop the Hemorrhage</title>
      </Head>

      {/* Trust Header */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl fixed top-0 w-full z-50 p-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-blue-500 w-5 h-5" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Encrypted Decision Environment</span>
          </div>
          {ticker > 0 && (
            <div className="text-red-500 font-mono text-xs">
              LIVE_LOSS: -${ticker.toFixed(4)}
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: The Narrative */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-6xl font-black tracking-tighter leading-none mb-6">
              HEARING THE <br/> <span className="text-red-600 italic">TRUTH</span> IS EXPENSIVE.
            </h1>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">
              Every month of hesitation is a direct tax on your future. Calculate the exact 
              Opportunity Cost of your current path.
            </p>
          </motion.div>

          <div className="space-y-4 border-l border-white/10 pl-6">
            <Feature icon={<Clock size={16}/>} text="Quantify your 'Overthinking Tax'" />
            <Feature icon={<TrendingDown size={16}/>} text="Visualize Lifetime Wealth Decay" />
            <Feature icon={<Zap size={16}/>} text="Generate your Sovereign Action Plan" />
          </div>
        </div>

        {/* Right Side: The Engine */}
        <div className="bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 lg:p-12 shadow-2xl relative">
          {!result ? (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <Input label="Biological Age" name="age" type="number" placeholder="25" onChange={setData} />
                <Input label="Hesitation (Months)" name="delay" type="number" placeholder="6" onChange={setData} />
              </div>
              <Input label="Current Focus" name="decision" placeholder="e.g. Corporate Manager" onChange={setData} />
              <div className="grid grid-cols-2 gap-4">
                <Input label="Current Monthly ($)" name="incomeNow" type="number" placeholder="5000" onChange={setData} />
                <Input label="Target Monthly ($)" name="incomeAlt" type="number" placeholder="12000" onChange={setData} />
              </div>
              
              <button 
                onClick={runSimulation}
                className="w-full py-5 bg-white text-black font-bold rounded-2xl hover:bg-red-600 hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                {simulating ? "ANALYZING TRAJECTORY..." : "CALCULATE COST OF DELAY"}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 text-center">
               <div className="space-y-2">
                  <p className="text-[10px] uppercase tracking-[0.3em] text-red-500 font-bold">Total Opportunity Hemorrhage</p>
                  <p className="text-7xl font-black tracking-tighter">${result.immediateLoss.toLocaleString()}</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Lifetime Delta</p>
                    <p className="text-xl font-bold italic">${Math.round(result.lifetimeLoss/1000)}k</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                    <p className="text-[8px] text-gray-500 uppercase mb-1">Sovereign Score</p>
                    <p className="text-xl font-bold italic">{result.score}/100</p>
                  </div>
               </div>

               <div className="p-6 bg-blue-600/10 border border-blue-600/20 rounded-3xl text-sm text-blue-200 leading-relaxed italic">
                 "By delaying this choice for {data.delay} months, you aren't playing it safe. 
                 You are effectively burning ${result.immediateLoss.toLocaleString()} today to avoid a temporary discomfort."
               </div>

               <button className="w-full py-4 bg-blue-600 rounded-2xl font-bold hover:bg-blue-500 transition-all">
                  GET THE 5-STEP RECOVERY ROADMAP
               </button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="text-center py-10 opacity-20 hover:opacity-100 transition-opacity">
        <p className="text-[10px] tracking-[0.5em] uppercase font-bold">LifeOS Protocol v1.4 // Built for the Sovereign Individual</p>
      </footer>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold flex items-center gap-1">
        {label} <Info size={10} className="opacity-50" />
      </label>
      <input 
        {...props}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-white/30 transition-all font-mono text-sm"
        onChange={(e) => props.onChange(prev => ({ ...prev, [props.name]: e.target.value }))}
      />
    </div>
  );
}

function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3 text-gray-400">
      <div className="p-2 bg-white/5 rounded-lg text-white">{icon}</div>
      <span className="text-sm font-medium uppercase tracking-wider">{text}</span>
    </div>
  )
}
