import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP (App Password recommended)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Use a Gmail App Password, NOT your login password
      },
    });

    // ---------- Email to YOU (notification) ----------
    const ownerMail = {
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `📬 New Contact: ${name}${company ? ` from ${company}` : ""}`,
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:16px;max-width:600px;margin:auto">
          <h2 style="color:#60a5fa;margin-bottom:4px;font-size:22px">New Message from Portfolio</h2>
          <hr style="border:none;border-top:1px solid #1e3a5f;margin:16px 0"/>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:8px 0;color:#94a3b8;width:130px">Name</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#94a3b8">Email</td><td style="padding:8px 0"><a href="mailto:${email}" style="color:#60a5fa">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding:8px 0;color:#94a3b8">Phone</td><td style="padding:8px 0">${phone}</td></tr>` : ""}
            ${company ? `<tr><td style="padding:8px 0;color:#94a3b8">Company</td><td style="padding:8px 0">${company}</td></tr>` : ""}
          </table>
          <hr style="border:none;border-top:1px solid #1e3a5f;margin:16px 0"/>
          <p style="color:#94a3b8;margin-bottom:8px;font-size:13px;text-transform:uppercase;letter-spacing:1px">Message</p>
          <p style="background:#1e293b;border-left:3px solid #3b82f6;padding:16px;border-radius:8px;line-height:1.7;white-space:pre-wrap">${message}</p>
          <p style="margin-top:24px;color:#475569;font-size:12px">Sent via your Portfolio Contact Form</p>
        </div>
      `,
    };

    // ---------- Auto-reply to SENDER ----------
    const autoReply = {
      from: `"Joydev Halder" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Thanks for reaching out! I'll get back to you soon 👋",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;background:#0f172a;color:#e2e8f0;padding:32px;border-radius:16px;max-width:600px;margin:auto">
          <h2 style="color:#60a5fa;font-size:22px;margin-bottom:4px">Hey ${name}! 👋</h2>
          <p style="color:#94a3b8;margin-top:0">Thanks for getting in touch through my portfolio.</p>
          <p style="line-height:1.7">I've received your message and will get back to you as soon as possible — usually within <strong style="color:#60a5fa">24–48 hours</strong>.</p>
          <hr style="border:none;border-top:1px solid #1e3a5f;margin:24px 0"/>
          <p style="color:#94a3b8;font-size:13px;text-transform:uppercase;letter-spacing:1px">Your message</p>
          <p style="background:#1e293b;border-left:3px solid #3b82f6;padding:16px;border-radius:8px;line-height:1.7;white-space:pre-wrap">${message}</p>
          <hr style="border:none;border-top:1px solid #1e3a5f;margin:24px 0"/>
          <p style="font-size:14px;color:#64748b">Best regards,<br/><strong style="color:#e2e8f0">Joydev Halder</strong><br/>Frontend Developer</p>
        </div>
      `,
    };

    await transporter.sendMail(ownerMail);
    await transporter.sendMail(autoReply);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
