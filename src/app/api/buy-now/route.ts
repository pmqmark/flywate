import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, phone, productTitle, amount, quantity } =
      await req.json();

    const totalPrice = amount * quantity;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const generateEmailTemplate = (
      title: string,
      intro: string,
      footer: string
    ) => `
      <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
        <div style="max-width:600px; margin:0 auto; background:#ffffff; border:1px solid #e5e7eb; border-radius:8px; overflow:hidden;">
          
          <div style="background:#0f172a; padding:20px; text-align:center;">
            <h1 style="color:#ffffff; margin:0; font-size:20px;"> Flywate Shuttle Orders</h1>
          </div>

          <div style="padding:20px;">
            <h2 style="color:#111827; font-size:18px; margin-bottom:10px;">${title}</h2>
            <p style="color:#374151; font-size:14px; line-height:1.5;">${intro}</p>

            <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:14px;">
              <thead>
                <tr style="background:#f3f4f6; text-align:left;">
                  <th style="padding:10px; border:1px solid #e5e7eb;">Field</th>
                  <th style="padding:10px; border:1px solid #e5e7eb;">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb;">Name</td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb;">Email</td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${email}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb;">Phone</td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb;">Product</td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${productTitle}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb;">Quantity</td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">${quantity}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb;">Price (per unit)</td>
                  <td style="padding:10px; border:1px solid #e5e7eb;">₹${amount}</td>
                </tr>
                <tr>
                  <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">Total</td>
                  <td style="padding:10px; border:1px solid #e5e7eb; font-weight:bold;">₹${totalPrice}</td>
                </tr>
              </tbody>
            </table>

            <p style="color:#374151; font-size:14px; line-height:1.5;">${footer}</p>
          </div>

          <div style="background:#f3f4f6; text-align:center; padding:15px;">
            <p style="margin:0; font-size:12px; color:#6b7280;">© ${new Date().getFullYear()} Shuttle. All rights reserved.</p>
          </div>
        </div>
      </div>
    `;


    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: "service@flywate.com",
      subject: `🛒 New Order Received  Flywate - ${productTitle}`,
      html: generateEmailTemplate(
        "New Order Received",
        `You’ve got a new order request. Here are the details:`,
        `Please connect with the customer within 24 hours to confirm and process the order.`
      ),
    });

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `New Order Confirmation Flywate - ${productTitle}`,
      html: generateEmailTemplate(
        "Order Confirmation",
        `Hi ${name}, thank you for placing your order with Shuttle! Here’s your order summary:`,
        `Our sales team will contact you within 24 hours to complete the process.`
      ),
    });

    return NextResponse.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.error("Email sending failed", error);
    return NextResponse.json(
      { message: "Email sending failed" },
      { status: 500 }
    );
  }
}
