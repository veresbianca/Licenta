const nodemailer = require("nodemailer");

let transport = null;
const host = "sandbox.smtp.mailtrap.io";
const user = "02ef03ad886f39";
const pass = "303e09923eeeed";

const getTransport = async () => {
  if (transport) return transport;

  transport = nodemailer.createTransport({
    host: host,
    port: 2525,
    secure: process.env.NODE_ENV === "production",
    auth: {
      user: user,
      pass: pass,
    },
  });

  return transport;
};

module.exports = { getTransport };
