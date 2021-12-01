const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMTP_HOST,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOption = {
    from: process.env.SMTP_USER,
    to: options.email,
    subject: options.subject,
    text: options.message
  };
  await transporter.sendMail(mailOption);
};

module.exports = sendEmail;
