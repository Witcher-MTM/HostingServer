const nodemailer = require("nodemailer");
class MailController {

    async generateCode() {
        const code = Math.floor(100000 + Math.random() * 900000);
        return code.toString();
    }

    async sendEmailWithCode(req,res) {
        const email = req.body.email;
        console.log("user email:",email)
        console.log("Email:",process.env.APP_EMAIL,"\nemail pass:",process.env.APP_EMAIL_PASS)
        // Конфігурації для відправки електронної пошти
        const transporter = await nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: 'nextwallet1@gmail.com', 
                pass: `mxbwlkodwtmpylrj` 
            }
        });

        const code = await this.generateCode();

        // Підготовка відправки електронної пошти
        const mailOptions = {
            from: `${process.env.APP_EMAIL}`, 
            to: email, 
            subject: 'Підтвердження електронної адреси',
            text: `Ваш унікальний код підтвердження: ${code}`
        };

        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Електронний лист надіслано: ', info.response);
            return res.status(200).send({code:code});
        } catch (error) {
            console.error('Помилка при відправці електронної пошти: ', error);
            return res.status(400).send(error);;
        }
    }
}

module.exports = new MailController();