  import express from "express";
  import cors from "cors";
  import dotenv from "dotenv";
  import { Resend } from "resend";

  dotenv.config(); 
  const app = express();
  app.use(cors());
  app.use(express.json());


  const resend = new Resend(process.env.RESEND_API_KEY);

  app.post("/api/send-contact-email", async (req, res) => {
    const { name, surname, email, phone, productName, country, state } = req.body;

    try {
      
      const adminEmail = await resend.emails.send({
        from: "RealTech <onboarding@resend.dev>", 
        to: process.env.ADMIN_EMAIL,
        subject: "New Contact Form Submission",
        html: `
          <h2>📩 New Contact Request</h2>
          <p><b>Name:</b> ${name} ${surname}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Phone:</b> ${phone}</p>
          <p><b>Country:</b> ${country}</p>
          <p><b>State:</b> ${state}</p>
          <p><b>Product:</b> ${productName}</p>
        `,
      });

      
      const customerEmail = await resend.emails.send({
        from: "RealTech <onboarding@resend.dev>", 
        to: email, 
        subject: " We received your request!",
        html: `
          <h2>Hello ${name},</h2>
          <p>Thank you for contacting <b>RealTech Pvt Ltd</b>. 
          We have received your request regarding <b>${productName}</b>.</p>
          <p>Our team will get back to you shortly at <b>${phone}</b> or <b>${email}</b>.</p>
          <br/>
          <p>Best regards,<br/>RealTech Pvt Ltd Team</p>
        `,
      });

      res.status(200).json({ 
        message: "Email sent to admin and customer successfully!", 
        adminEmail, 
        customerEmail 
      });
    } catch (error) {
      console.error("❌ Error sending email:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
  });
