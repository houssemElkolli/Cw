import Contact from "../models/Contact.js";

import nodemailer from "nodemailer";

export const getContacts = async (req, res) => {
    console.log(req.query.pageNumber);
    const pageNumber = req.query.pageNumber || 0;
    const itemPerPage = 100;

    const contacts = await Contact.find({})
        .sort({ createdAt: -1 })
        .limit(itemPerPage)
        .skip(pageNumber * itemPerPage);

    res.status(200).json({ contacts });
};

export const getTotalNumber = async (req, res) => {
    try {
        const totalNumber = await Contact.find({}).count();
        if (Number.isInteger(totalNumber / 100)) {
            const numberOfPages = Math.floor(totalNumber / 100);
            res.status(200).json({ numberOfPages, totalNumber });
        } else {
            const numberOfPages = Math.floor(totalNumber / 100) + 1;
            res.status(200).json({ numberOfPages, totalNumber });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const addContactForm = async (req, res) => {
    const { firstName, lastName, email, subject,phoneNumber, companyName, message } =
        req.body;

    const contact = new Contact({
        firstName,
        lastName,
        email,
        subject,
        phoneNumber,
        companyName,
        message,
        code: Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000,
    });
    const savedContact = await contact.save();

    var transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
    var secondeTransporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USER,
            pass: process.env.PASS,
        },
    });
    var mailOptions = {
        from: process.env.FROM, // sender address
        to: process.env.TO, // list of receivers
        subject: `${subject}`, // Subject line
        html: `
        <div style="padding:10px;border-style: ridge">
        <p>You have a new contact request.</p>
        <h3>Contact Details</h3>
        <ul>
            <li>Email: ${firstName} </li>
            <li>Email: ${lastName} </li>
            <li>Email: ${email} </li>
            <li>Email: ${phoneNumber} </li>
            <li>Email: ${companyName} </li>
            <li>Message: ${message} </li>
        </ul>
        `,
    };
    var secondeMailOptions = {
        from: process.env.FROM, // sender address
        to: email, // list of receivers
        subject: "Email Verfication ", // Subject line
        html: `
        <!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>Email Confirmation</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style type="text/css">
  @media screen {
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 400;
      src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
    }
    @font-face {
      font-family: 'Source Sans Pro';
      font-style: normal;
      font-weight: 700;
      src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
    }
  }
  body,
  table,
  td,
  a {
    -ms-text-size-adjust: 100%; /* 1 */
    -webkit-text-size-adjust: 100%; /* 2 */
  }

  table,
  td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
  }
  img {
    -ms-interpolation-mode: bicubic;
  }

  a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
  }
  div[style*="margin: 16px 0;"] {
    margin: 0 !important;
  }
  body {
    width: 100% !important;
    height: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
  }
  table {
    border-collapse: collapse !important;
  }
  a {
    color: #1a82e2;
  }
  img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
  }
  </style>

</head>
<body style="background-color: #e9ecef;">
<!--   <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
    A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
  </div> -->

  <table border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" valign="top" style="padding: 36px 24px;">
              <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block;">
                <img src="http://localhost:3001/assets/tw.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
              <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
            <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">First , please do copy the following six digit code : <span style="margin : 10px; padding: 20px; color : #e0e0e0; background-color : #4d4c4c ; border-radius : 10px; "> ${savedContact.code} </span> </p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">Second, click the button below to confirm your email address. If you didn't try to Contact Us <a href="#">Creative World</a>, you can safely delete this email.</p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                    <table border="0" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center" bgcolor="#1a82e2" style="border-radius: 6px;">
                          <a href="http://localhost:5173/emailValidation" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Redirect</a>
                          // <a href="https://www.blogdesire.com" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; border-radius: 6px;">Redirect</a>

                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
              <p style="margin: 0;">If the button didn't work, please copy and paste the following link in your browser:</p>
              <p style="margin: 0;"><a href="http://localhost:5173/emailValidation" target="_blank">http://localhost:5173/emailValidation</a></p>
            </td>
          </tr>
          <tr>
            <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
              <p style="margin: 0;">Cheers,<br> Creative World</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
              <p style="margin: 0;">You received this email because we believe u tried to contact us through our web site. If you didn't try to contact Creative Wrold, you can safely delete this email.</p>
            </td>
          </tr>
          <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
<!--               <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p> -->
              <p style="margin: 0;">address</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
        `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("Email Sent Successfully");
        } else {
            console.log("Email Sent Unsuccessfully");

            // res.json({ status: true, respMesg: 'Email Sent Successfully' })
        }
    });

    secondeTransporter.sendMail(secondeMailOptions, function (error, info) {
        if (error) {
            console.log("Email Sent Successfully");
        } else {
            console.log("Email Sent Unsuccessfully");

            // res.json({ status: true, respMesg: 'Email Sent Successfully' })
        }
    });

    for (let i = 0; i < 120; i++) {
        const holla = new Contact({
            firstName : `houssem${i}`,
            lastName :`houssem${i}`,
            email : `houssem${i}@mail.com`,
            subject: 'houssem${i}',
            companyName : ``,
            message : `houssem${i}`,
            code: 333333,
        });
        await holla.save();
    }
    res.status(200).json({ email });
};

export const validateEmail = async (req, res) => {
    try {
        const { email, code } = req.body;

        const contactFound = await Contact.updateOne(
            { email, verified: false, code },
            { $set: { verified: true } }
        );
        if (contactFound.modifiedCount > 0) {
            res.status(200).json({ contactFound });
        } else {
            res.status(403).json({ message: "somthing went wrong" });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const items = req.body;
        const contactItems = await Contact.deleteMany({
            _id: { $in: [...items] },
        });
        res.status(200).json({ contactItems });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
