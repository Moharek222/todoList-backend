import fs from "fs/promises";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { MailOptions } from "nodemailer/lib/json-transport";

dotenv.config();
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


async function sendEmail(options: {
    to: string;
    subject: string;
    html: string;
}) {
    const mailOptions: MailOptions = {
        from: process.env.EMAIL_USER,
        ...options,
    };
    const info = await transporter.sendMail(mailOptions);

    console.log("email sent to ", info.accepted);
}

async function sendEmailVerificationLink(email: string, token: string) {
    const url = `http://localhost:3000/api/auth/verify/${email}/${token}`;

    let emailTemplate = await fs.readFile(
        "./src/templates/email.template.html",
        "utf-8"
    );

    emailTemplate = emailTemplate.replace("{url}", url);

    await sendEmail({
        to: email,
        subject: "Email verification",
        html: emailTemplate,
    });
}

export const emailService = {
    sendEmail,
    sendEmailVerificationLink,
};
