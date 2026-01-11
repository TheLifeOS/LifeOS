import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, TrendingDown, Zap, Clock, ArrowRight } from 'lucide-react';

export default function SovereignTerminal() {
  const [data, setData] = useState({ age: '', incomeNow: '', incomeAlt: '', delay: '', decision: '' });
  const [simulating, setSimulating] = useState(false);
  const [result, setResult] = useState(null);
  const [ticker, setTicker] = useState(0);

  // Real-time Hemorrhage Ticker (Value of a second)
  useEffect(() => {
    if (data.incomeNow && data.incomeAlt) {
      const monthlyGap = parseInt(data.incomeAlt) - parseInt(data.incomeNow);
      const secondValue = monthlyGap / 30 / 24 / 60 / 60;
      const interval = setInterval(() => {
        setTicker((prev) => prev + secondValue);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [data.incomeNow, data.incomeAlt]);

  const executeSimulation = () => {
    setSimulating(true);
    setTimeout(() => {
      const remainingYears = 80 - parseInt(data.age);
      const monthlyLoss = parseInt(data.incomeAlt) - parseInt(data.incomeNow);
      const decay = monthlyLoss * parseInt(data.delay);
      const lifetimeDelta = decay * Math.pow(1.08, remainingYears);
      const sovereignScore = Math.max(12, 100 - (parseInt(data.delay) * 2.5));

      setResult({ decay, lifetimeDelta, sovereignScore });
      setSimulating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#fafafa] font-mono selection:bg-red-500">
      <Head>
        <title>TERMINAL // SOVEREIGN_MIRROR</title>
      </Head>

      <main className="max-w-4xl mx-auto p-6 py-20">
        {/* Real-time Awareness Bar */}
        <div className="fixed top-0 left-0 w-full border-b border-white/5 bg-black/80 backdrop-blur-md p-3 z-50 flex justify-between px-10 text-[10px] tracking-widest text-gray-500">
          <div>SYSTEM_STATUS: <span className="text-green-500">ACTIVE</span></div>
          <div>HEMORRHAGE_CLEARENCE: <span className="text-red-500">-${ticker.toFixed(4)}</span></div>
        </div>

        <header className="mb-20 space-y-2">
          <h1 className="text-5xl font-black italic tracking-tighter glow">SOVEREIGN MIRROR</h1>
          <p className="text-gray-500 uppercase text-[10px] tracking-[0.5em]">The Universal Protocol for Life Trajectory Optimization</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Interface */}
          <section className="space-y-8 bg-white/5 p-8 rounded-3xl border border-white/10">
            <div className="space-y-6">
              <TerminalInput label="Biological Age" name="age" type="number" onChange={setData} />
              <TerminalInput label="Dilemma (The Choice)" name="decision" placeholder="Quit job / Relocate" onChange={setData} />
              <div className="grid grid-cols-2 gap-4">
                <TerminalInput label="Current Income" name="incomeNow" type="number" onChange={setData} />
                <TerminalInput label="Target Income" name="incomeAlt" type="number" onChange={setData} />
              </div>
              <TerminalInput label="Months Delayed" name="delay" type="number" onChange={setData} />
            </div>

            <button 
              onClick={executeSimulation}
              className="w-full py-5 bg-white text-black font-black uppercase tracking-widest text-xs hover:invert transition-all"
            >
              {simulating ? "PROCESING_PROBABILITIES..." : "RUN_SIMULATION"}
            </button>
          </section>

          {/* Results Output */}
          <section className="relative min-h-[400px]">
            <AnimatePresence>
              {!result && !simulating && (
                <div className="absolute inset-0 flex items-center justify-center border border-dashed border-white/10 rounded-3xl text-gray-600 text-xs text-center p-10">
                  AWAITING_INPUTDATA: <br/> The mirror reflects nothing until the truth is provided.
                </div>
              )}

              {simulating && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[10px] uppercase tracking-widest">Scanning Shadow Network...</p>
                </motion.div>
              )}

              {result && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                  <div className="bg-red-600/10 border border-red-600/20 p-8 rounded-3xl">
                    <p className="text-[10px] uppercase text-red-500 mb-2 font-bold tracking-[0.3em]">Hemorrhage Detected</p>
                    <p className="text-6xl font-black tracking-tighter">-${result.decay.toLocaleString()}</p>
                    <p className="mt-4 text-xs text-gray-400 leading-relaxed uppercase">
                      This is the direct cost of your delay. It is gone forever.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <StatBox label="Sovereign Score" value={result.sovereignScore} sub="Efficiency Index" />
                    <StatBox label="Wealth Delta" value={`$${Math.round(result.lifetimeDelta / 1000)}k`} sub="Lifetime Impact" />
                  </div>

                  {/* MONETIZATION BUTTON */}
                  <div className="pt-6">
                    <a href="YOUR_UPSELL_LINK" target="_blank" className="group flex items-center justify-between w-full p-6 bg-blue-600 text-white rounded-3xl hover:bg-blue-500 transition-all">
                      <div className="text-left">
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Stop the bleeding</p>
                        <p className="text-lg font-black italic">GET_THE_ROADMAP</p>
                      </div>
                      <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        </div>
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
        className="w-full bg-transparent border-b border-white/10 py-3 text-lg outline-none focus:border-white transition-all font-sans"
        onChange={(e) => onChange(prev => ({ ...prev, [props.name]: e.target.value }))}
      />
    </div>
  );
}

function StatBox({ label, value, sub }) {
  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
      <p className="text-[8px] uppercase tracking-widest text-gray-500 mb-1">{label}</p>
      <p className="text-3xl font-black tracking-tighter">{value}</p>
      <p className="text-[8px] uppercase tracking-widest text-gray-600 mt-2">{sub}</p>
    </div>
  );
}
