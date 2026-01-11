import { useState } from "react"
import { motion } from "framer-motion"

export default function CommandCenter() {
  const [form, setForm] = useState({
    age: "",
    delay: "",
    dilemma: "",
    currentIncome: "",
    futureIncome: ""
  })

  const [result, setResult] = useState(null)

  const calculate = () => {
    const age = Number(form.age)
    const delay = Number(form.delay)
    const current = Number(form.currentIncome)
    const future = Number(form.futureIncome)

    if (!age || !delay || !current || !future) return alert("Incomplete decision dataset.")

    const delta = future - current
    const loss = delta * delay
    const remainingYears = 80 - age
    const lifetime = Math.round(loss * Math.pow(1.08, remainingYears))

    setResult({
      monthlyLeak: delta,
      hesitationLoss: loss,
      lifetimeLoss: lifetime
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-16">

      <div className="max-w-5xl w-full">

        {/* Header */}
        <div className="border border-white/10 rounded-xl p-8 mb-12">
          <div className="text-xs text-red-500 mb-2">SECURE DECISION ENVIRONMENT</div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">SOVEREIGN MIRROR</h1>
          <p className="text-gray-400 max-w-2xl">
            Your hesitation is not free. This system calculates the structural cost of delay and exposes
            the opportunity decay embedded in your current life trajectory.
          </p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">

          <Input label="Biological Age" name="age" value={form.age} setForm={setForm} />
          <Input label="Months Delayed" name="delay" value={form.delay} setForm={setForm} />
          <Input label="Current Monthly Income ($)" name="currentIncome" value={form.currentIncome} setForm={setForm} />
          <Input label="Potential Monthly Income ($)" name="futureIncome" value={form.futureIncome} setForm={setForm} />

          <div className="md:col-span-2">
            <Input label="Current Dilemma" name="dilemma" value={form.dilemma} setForm={setForm} />
          </div>

        </div>

        {/* Execute */}
        <button
          onClick={calculate}
          className="w-full py-6 bg-white text-black font-bold uppercase tracking-widest hover:bg-gray-200 transition rounded-xl"
        >
          Run Sovereign Simulation
        </button>

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 border border-red-500/20 bg-red-500/5 rounded-xl p-10"
          >
            <h2 className="text-red-500 text-xs tracking-widest uppercase mb-4">Life Audit Report</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              <Metric title="Monthly Opportunity Leak" value={`$${result.monthlyLeak.toLocaleString()}`} />
              <Metric title="Hesitation Cost" value={`$${result.hesitationLoss.toLocaleString()}`} />
              <Metric title="Lifetime Wealth Destruction" value={`$${result.lifetimeLoss.toLocaleString()}`} />

            </div>

           <p className="mt-10 text-gray-400 leading-relaxed">
  Your decision delay is not neutral. It is an active extraction of future wealth, autonomy,
  and leverage. This protocol has now made the cost visible. What you do next is a character decision.
</p>

<div className="mt-10 grid gap-4">

  <a
    href="https://yourname.gumroad.com/l/decisionaudit"
    target="_blank"
    rel="noopener noreferrer"
    className="w-full py-6 bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-500 transition rounded-xl text-center"
  >
    Unlock Sovereign Action Roadmap — $29
  </a>

  <input
    placeholder="Or enter email to receive your Sovereign Action Brief"
    className="w-full bg-black border border-white/10 px-6 py-4 rounded-lg outline-none focus:border-red-500 transition"
  />

</div>


          </motion.div>
        )}

        {/* Footer */}
        <div className="mt-24 text-center text-xs text-gray-600">
          LifeOS Protocol v1.4.2 — Personal Decision Infrastructure
        </div>

      </div>
    </div>
  )
}

function Input({ label, name, value, setForm }) {
  return (
    <div>
      <div className="text-xs text-gray-500 mb-2">{label}</div>
      <input
        className="w-full bg-black border border-white/10 px-5 py-4 rounded-lg outline-none focus:border-white transition"
        value={value}
        onChange={(e) => setForm(prev => ({ ...prev, [name]: e.target.value }))}
      />
    </div>
  )
}

function Metric({ title, value }) {
  return (
    <div className="border border-white/10 rounded-lg p-6">
      <div className="text-xs text-gray-500 mb-2">{title}</div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}
