const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const axios = require("axios");
const nodemailer = require("nodemailer");

router.post('/send', async(req, res, next) => {
  const {name, mail, asunto, message } = req.body;
  try {
      let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_KEY, 
          },
      });
      let info = await transporter.sendMail({
          from: `Desde Nudotropia.com 👻`,
          to: `${mail}`,
          subject: `${name} ✔`,
          html: `
          <h1>${asunto}</h1>
          <p>${message}</p>
          `,
      });
  } catch (error) {
      console.log(error)
  }
});

module.exports = router;