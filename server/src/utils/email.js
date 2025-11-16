const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");

// Load OAuth2 credentials
const credentials = JSON.parse(process.env.GOOGLE_OAUTH_CREDENTIALS);
const token = JSON.parse(process.env.GOOGLE_OAUTH_TOKEN);

const { client_id, client_secret, redirect_uris } = credentials.installed;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

oAuth2Client.setCredentials(token);

const gmail = google.gmail({ version: "v1", auth: oAuth2Client });

function makeEmail(to, subject, html) {
  const messageParts = [
    `To: ${to}`,
    "Content-Type: text/html; charset=utf-8",
    `Subject: ${subject}`,
    "",
    html,
  ];

  const message = messageParts.join("\n");

  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

const otpEmail = async (to, subject = "Login OTP - PALS PAINT", otp) => {
  const mailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">🎨 PALS PAINT</h1>
        <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Adding Colors to Your World</p>
      </div>

      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 15px; color: #333; line-height: 1.6;">
        You are trying to log in to your <strong>PALS PAINT</strong> account.  
        Please use the following One-Time Password (OTP) to complete your login:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <div style="display: inline-block; background: #28a745; color: white; font-size: 22px; font-weight: bold; letter-spacing: 2px; padding: 12px 25px; border-radius: 6px;">
          ${otp}
        </div>
      </div>

      <p style="font-size: 14px; color: #666; line-height: 1.6; text-align: center;">
        <strong>Do not share this OTP</strong> with anyone for security reasons.
      </p>

      <p style="font-size: 14px; color: #333; margin-top: 25px;">
        Regards,<br/>
        <strong>Team PALS PAINT</strong>
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
      © 2023 PALS PAINT. All rights reserved.<br/>
        If this login attempt was not made by you, write us at palspaint923@gmail.com.
      </p>
    </div>
  `;

  const rawEmail = makeEmail(to, subject, mailContent);

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: rawEmail },
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error sending OTP email:", error);
    throw error;
  }
};

const registrationConfirmationEmail = async (to, name) => {
  const subject = "Registration Confirmation from PALS PAINT";
  const mailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px; padding: 20px; background: #ffffff;">
      <div style="text-align: center; border-bottom: 2px solid #f5f5f5; padding-bottom: 15px; margin-bottom: 20px;">
        <h1 style="color: #2c3e50; margin: 0;">🎨 PALS PAINT</h1>
        <p style="color: #888; font-size: 14px; margin: 5px 0 0;">Adding Colors to Your World</p>
      </div>

      <p style="font-size: 16px; color: #333;">Hello <strong>${name}</strong>,</p>
      <p style="font-size: 15px; color: #333; line-height: 1.6;">
      You have been registered with <strong>PALS PAINT</strong>. We're excited to have you with us!.
      </p>

      <p style="font-size: 14px; color: #333; margin-top: 25px;">
        Regards,<br/>
        <strong>Team PALS PAINT</strong>
      </p>

      <hr style="margin: 25px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999; text-align: center;">
      © 2023 PALS PAINT. All rights reserved.<br/>
        If you didn’t request this, write us at palspaint923@gmail.com.
      </p>
    </div>
  `;

  const rawEmail = makeEmail(to, subject, mailContent);

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: rawEmail },
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error sending registration email:", error);
    throw error;
  }
};

const sendContactUsEmail = async (
  subject = "Customer wants to connect - PALS PAINT",
  mailContent = "Hey, Let's connect!",
  to = process.env.MAILER_EMAIL
) => {
  const rawEmail = makeEmail(to, subject, mailContent);

  try {
    const res = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: rawEmail },
    });

    return res.data;
  } catch (error) {
    console.error("❌ Error sending registration email:", error);
    throw error;
  }
};

module.exports = {
  otpEmail: otpEmail,
  registrationConfirmationEmail: registrationConfirmationEmail,
  sendContactUsEmail: sendContactUsEmail,
};
