const http = require('http');
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const server = http.createServer().listen(3000, err => {
  if (err) throw err;
  console.log('> Read on http://localhost:3000');
});

server.on('request', (req, res) => {
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
      body = JSON.parse(body);
      const { name, email, subject, message } = body;
      console.log(name, email, subject, message);

      const msg = {
        to: 'jason.zinn@texasjusticeinitiative.org',
        from: 'info@texasjusticeinitiative.org',
        subject: `TJI Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `Name: ${name}<br>Email: ${email}<br>Message: ${message}`,
      };

      sgMail
        .send(msg)
        .then(() => {
          res.end('success');
        })
        .catch(error => {
          // Log friendly error
          console.error(error.toString());
        });
    });
  }
});
