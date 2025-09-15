import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, GST_number, address, productTitle, amount, quantity } =
      await req.json();

    const totalPrice = amount * quantity;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Admin Mail Template (Full details)
    const generateAdminTemplate = () => `
  <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
    <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
      
      <!-- Header -->
      <div style="background:#0f172a; padding:20px; text-align:center;">
        <h1 style="color:#ffffff; margin:0; font-size:20px;">Flywate Shuttle Orders</h1>
      </div>

      <!-- Intro Message -->
      <div style="padding:20px;">
        <h2 style="color:#111827; font-size:18px; margin-bottom:10px;"> New Order Alert</h2>
        <p style="color:#374151; font-size:14px; line-height:1.6; margin-bottom:20px;">
          A customer is trying to purchase a product from <b>Flywate Shuttle</b>.  
          Please <b>reach out to them as soon as possible</b> to confirm the order and proceed with the next steps.  
        </p>

        <!-- Order Details -->
        <p style="color:#111827; font-size:15px; font-weight:600; margin-bottom:8px;">Order Details:</p>
        <table style="width:100%; border-collapse:collapse; margin:10px 0 20px 0; font-size:14px;">
          <tbody>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Name</td><td style="padding:10px;border:1px solid #e5e7eb;">${name}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Email</td><td style="padding:10px;border:1px solid #e5e7eb;">${email}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Phone</td><td style="padding:10px;border:1px solid #e5e7eb;">${phone}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">GST Number</td><td style="padding:10px;border:1px solid #e5e7eb;">${GST_number}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Address</td><td style="padding:10px;border:1px solid #e5e7eb;">${address}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Product</td><td style="padding:10px;border:1px solid #e5e7eb;">${productTitle}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Quantity</td><td style="padding:10px;border:1px solid #e5e7eb;">${quantity}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb;">Unit Price</td><td style="padding:10px;border:1px solid #e5e7eb;">₹${amount}</td></tr>
            <tr><td style="padding:10px;border:1px solid #e5e7eb; font-weight:bold;">Total</td><td style="padding:10px;border:1px solid #e5e7eb; font-weight:bold;">₹${totalPrice}</td></tr>
          </tbody>
        </table>

        <!-- Footer message -->
        <p style="color:#374151; font-size:14px; line-height:1.6; margin-top:20px;">
          Please ensure timely follow-up with the customer to confirm and process this order.  
        </p>
      </div>

      <!-- Footer -->
      <div style="background:#f3f4f6; text-align:center; padding:15px;">
        <p style="margin:0; font-size:12px; color:#6b7280;">
          © ${new Date().getFullYear()} Flywate Shuttle. All rights reserved.
        </p>
      </div>
    </div>
  </div>
`;

    //Customer Mail Template (Simpler)
    const generateUserTemplate = () => `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px;">
          <div style="background:#0f172a; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:20px;">Order Confirmation</h1>
          </div>
          <div style="padding:20px;">
            <p style="font-size:14px; color:#374151;">Hi <b>${name}</b>,<br/>Thank you for your order with <b>Flywate Shuttle</b>! Here’s your summary:</p>
            <ul style="font-size:14px; color:#374151; line-height:1.6;">
              <li><b>Product:</b> ${productTitle}</li>
              <li><b>Quantity:</b> ${quantity}</li>
              <li><b>Total:</b> ₹${totalPrice}</li>
            </ul>
            <h3 style="margin-top:20px;">Your Details:</h3>
            <p style="font-size:14px; color:#374151; line-height:1.6;">
              <b>Name:</b> ${name}<br/>
              <b>Email:</b> ${email}<br/>
              <b>Phone:</b> ${phone}<br/>
              <b>GST:</b> ${GST_number}<br/>
              <b>Address:</b> ${address}
            </p>
            <h3 style="margin-top:20px;">Flywate Shuttle Contact:</h3>
            <p style="font-size:14px; color:#374151; line-height:1.6;">
              <b>Phone:</b> +91 7012022315<br/>
              <b>Email:</b> service@flywate.com<br/>
              <b>Address:</b> Flywate India Sports Private Limited<br/>
                              Door no : VIII/232 new road,<br/>
                              Eroor North Post, Thripunithura,<br/>
            </p>
            <p style="margin-top:20px; font-size:13px; color:#6b7280;">We’ll contact you within 24 hours to confirm your order.</p>
          </div>
        </div>
      </div>
    `;

    // Send to Admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "qmarktechnolabs@gmail.com",
      // to: "service@flywate.com",
      subject: `🛒 New Order Received - ${productTitle}`,
      html: generateAdminTemplate(),
    });

    // Send to Customer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Order Confirmation - ${productTitle}`,
      html: generateUserTemplate(),
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending failed", error);
    return NextResponse.json({ message: "Email sending failed" }, { status: 500 });
  }
}
