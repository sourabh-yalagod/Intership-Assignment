import nodemailer from "nodemailer";
import { ApiError } from "../utils/ApiError";
import { config } from "dotenv";
config();

interface MailPayload {
  userId: string;
  email: string;
  subject?: string;
  message: string;
  scheduledTime: Date;
}

export const sendMail = async (mailPayload: MailPayload) => {
  // Validate required env vars
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASSWORD;

  if (!smtpUser || !smtpPass) {
    throw new ApiError(
      500,
      "SMTP credentials are not set in environment variables"
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const mailOptions = {
    from: `"Message Scheduler" <${smtpUser}>`,
    to: mailPayload.email,
    subject: mailPayload.subject || "⏰ Your Scheduled Message Has Arrived!",
    html: `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <tr>
            <td style="background-color: #4CAF50; padding: 20px; text-align: center; color: #ffffff;">
              <h2 style="margin: 0;">📩 Message Scheduler</h2>
              <p style="margin: 5px 0 0;">Your scheduled message has been sent</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <h3 style="color: #333;">Hello,</h3>
              <p style="color: #555; line-height: 1.6;">
                We're sending you the message you scheduled with us. Below are the details:
              </p>
              <table cellpadding="5" cellspacing="0" style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="font-weight: bold; color: #333;">🧑 User ID:</td>
                  <td style="color: #555;">${mailPayload.userId}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #333;">📅 Scheduled Time:</td>
                  <td style="color: #555;">${new Date(
                    mailPayload.scheduledTime
                  ).toLocaleString()}</td>
                </tr>
                <tr>
                  <td style="font-weight: bold; color: #333;">📨 Message:</td>
                  <td style="color: #555;">${
                    mailPayload.message || "No custom message provided."
                  }</td>
                </tr>
              </table>
              <p style="margin-top: 30px; color: #888; font-size: 14px;">
                Thank you for using Message Scheduler!<br/>
                — The Scheduler Team
              </p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #999;">
              &copy; ${new Date().getFullYear()} Message Scheduler. All rights reserved.
            </td>
          </tr>
        </table>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email successfully sent to ${mailPayload.email}`);
  } catch (error) {
    console.error("❌ Email send failed:", error);
    throw new ApiError(501, `Mail failed to send to ${mailPayload.email}`);
  }
};
