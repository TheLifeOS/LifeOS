import { useRouter } from 'next/router';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Record() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-mono p-8 flex items-center justify-center">
      <Head><title>RECORD // {id}</title></Head>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full border border-white/10 p-12 rounded-[3rem] bg-white/5 backdrop-blur-3xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-6 text-[10px] text-gray-600 tracking-tighter">
          PROTOCOL_V1.0.0
        </div>
        
        <h1 className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-8">Sovereign_Commitment_Record</h1>
        
        <div className="space-y-6">
          <div className="border-l-2 border-red-500 pl-6">
            <p className="text-gray-400 text-xs uppercase tracking-widest">Decision_ID</p>
            <p className="text-2xl font-black tracking-tighter">{id}</p>
          </div>

          <div className="py-8 border-y border-white/5">
            <p className="text-sm text-gray-300 leading-relaxed italic">
              "This record serves as a permanent mirror of a trajectory choice. 
              The Shadow Network will monitor the delta between this commitment and the reality of the next 12 months."
            </p>
          </div>

          <div className="pt-4 flex justify-between items-center">
            <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Status: <span className="text-red-500">MONITORED</span></div>
            <button onClick={() => window.print()} className="text-[10px] border border-white/20 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-all">
              EXPORT_PDF
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
