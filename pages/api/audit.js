import nodemailer from "nodemailer"

// This endpoint receives Gumroad webhook after payment
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { buyer_email, product_name } = req.body

  if (!buyer_email) {
    return res.status(400).json({ error: "No buyer email provided" })
  }

  try {
    // Step 1 — Send email with pre-made PDF (replace with your file if ready)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUDIT_EMAIL,
        pass: process.env.AUDIT_EMAIL_PASS,
      },
    })

    await transporter.sendMail({
      from: `"LifeOS Intelligence" <${process.env.AUDIT_EMAIL}>`,
      to: buyer_email,
      subject: "Your LifeOS Sovereign Action Roadmap",
      text: `Thank you for purchasing the ${product_name}! Your roadmap is attached.`,
      attachments: [
        {
          filename: "LifeOS_Sovereign_Action_Roadmap.pdf",
          path: "./public/LifeOS_Sovereign_Action_Roadmap.pdf", // pre-made PDF
        },
      ],
    })

    res.status(200).json({ success: true })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to send email" })
  }
}
