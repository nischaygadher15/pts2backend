import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

let sentMailRouter = express.Router();

sentMailRouter.post("/", async (req, res) => {
  try {
    // Gmail Service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"Mail from ${req.body.email} @ nkgpts.metlify.app`, // sender address
      to: "nkgdevs@gmail.com  ", // list of receivers
      subject: `${req.body.subject}`, // Subject line
      text: `
      Username: ${req.body.username}
      Message:${req.body.msg}`, // plain text body
      // html: "<b>Hello  world?</b>", // html body
    });
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(`Mail sent. Message Id:${info.messageId}`);
    res.send();
  } catch (error) {
    console.log(error.message);
  }
});

export default sentMailRouter;
