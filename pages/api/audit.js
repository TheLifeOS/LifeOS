import OpenAI from "openai"
import PDFDocument from "pdfkit"
import nodemailer from "nodemailer"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { email, age, delay, dilemma, currentIncome, futureIncome } = req.body

  if (!email || !dilemma) {
    return res.status(400).json({ error: "Incomplete audit data" })
  }

  // Step 1 — Generate Audit from AI
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `
You are LifeOS Sovereign Intelligence.
Generate a brutal, elite-level Decision Clarity Audit.
Tone: High-IQ, direct, surgical.
No fluff. No motivation talk.
`
      },
      {
        role: "user",
        content: `
Dilemma: ${dilemma}
Age: ${age}
Delay: ${delay} months
Current Income: $${currentIncome}
Target Income: $${futureIncome}

Generate a 2-page decision audit:
1. Strategic diagnosis
2. Opportunity cost analysis
3. Risk profile
4. Action roadmap
`
      }
    ]
  })

  const auditText = completion.choices[0].message.content

  // Step 2 — Generate PDF
  const doc = new PDFDocument()
  let buffers = []
  doc.on("data", buffers.push.bind(buffers))
  doc.on("end", async () => {
    const pdfData = Buffer.concat(buffers)

    // Step 3 — Send Email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUDIT_EMAIL,
        pass: process.env.AUDIT_EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"LifeOS Intelligence" <${process.env.AUDIT_EMAIL}>`,
      to: email,
      subject: "Your LifeOS Sovereign Decision Audit",
      text: "Your audit is attached.",
      attachments: [
        {
          filename: "LifeOS_Decision_Audit.pdf",
          content: pdfData,
        },
      ],
    })

    res.status(200).json({ success: true })
  })

  doc.fontSize(20).text("LifeOS Sovereign Decision Audit", { align: "center" })
  doc.moveDown()
  doc.fontSize(12).text(auditText)
  doc.end()
}
