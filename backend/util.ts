import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

export const getToken = (user: any) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET, {
        expiresIn: '48h'
    });
}

export const isAuth = (req: any, res: any, next: any) => {
    const token = req.headers.authorization;
    if (token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, process.env.JWT_SECRET, (err: any, decode: any) => {
            if (err) {
                return res.status(401).send({
                    msg: 'Invalid token. Token expired!',
                    validToken: false,
                })
            }
            req.user = decode;
            next();
            return
        });
    } else {
        return res.status(401).send({
            msg: 'Token is not supplied.'
        });
    }
}

export const isAdmin = (req: any, res: any, next: any) => {
    if (req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({
        msg: 'Admin Token is not valid.',
        isValid: false
    })
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'test@gmail.com',
        pass: 'ftlfldjslj13e!jdhjf'
    }
});

export const sendOrderConfirmationEmail = (recipientEmail: any, name?: any, data?: any) => {
    const mailOptions = {
        from: 'test@gmail.com',
        to: 'info@test-ks.com',
        subject: 'Order Confirmation!',
        html: `
        <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
            <table>
                <tr>
                    <td class="header-text-m1" style="vertical-align: top; font-size: 28px; font-weight: 700; line-height: 40px; letter-spacing: 0em; text-align: center; color: #0F3253; font-family: system-ui,sans-serif;" valign="top" align="center">
                     Porosia u regjistrua me sukses
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       User Name: ${name}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       User Email: ${recipientEmail}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       Address: ${data.address}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       City: ${data.city}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       Phone: ${data.phone}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       Time: ${data.time}
                    </td>
                </tr>
            </table>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email from order:', error);
        } else {
            console.log('Email sent from order:', info.response);
        }
    });
};

//these to email to admin we need to send.
export const sendSignUpFromUserEmail = (user?: any) => {
    const mailOptions = {
        from: 'test@gmail.com',
        to: 'info@test-ks.com',
        subject: 'User Created an Account!',
        html: `
        <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
            <table>
                <tr>
                    <td class="header-text-m1" style="vertical-align: top; font-size: 28px; font-weight: 700; line-height: 40px; letter-spacing: 0em; text-align: center; color: #0F3253; font-family: system-ui,sans-serif;" valign="top" align="center">
                     Useri u regjistrua me sukses.
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       User Name: ${user.name}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       User Email: ${user.email}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       Phone: ${user.phone}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       Company: ${user.company}
                    </td>
                </tr>
            </table>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email from signup:', error);
        } else {
            console.log('Email sent from signup:', info.response);
        }
    });
};

//this we need to send to user.
export const sendAccountApproved = (user?: any) => {
    const mailOptions = {
        from: 'test@gmail.com',
        to: user.email,
        subject: 'Account Approved!',
        html: `
        <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
            <table>
                <tr>
                    <td class="header-text-m1" style="vertical-align: top; font-size: 28px; font-weight: 700; line-height: 40px; letter-spacing: 0em; text-align: center; color: #0F3253; font-family: system-ui,sans-serif;" valign="top" align="center">
                     Faleminderit për regjistrimin në web aplikacionin tonë.Llogaria është aprovuar me sukses.
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                       User Name: ${user.name}
                    </td>
                </tr>
                <tr>
                    <td class="paragraph-m1" style="font-family: sans-serif; vertical-align: top; color: #9CA0A8; text-align: center; font-size: 18px; padding-top: 1.2rem;" valign="top" align="center">
                        Email: ${user.email}
                    </td>
                </tr>
            </table>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email from account approved:', error);
        } else {
            console.log('Email sent from account approved:', info.response);
        }
    });
};