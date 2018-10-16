require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/css', express.static('css'));
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// The views directory is set ('./views')
// where the template files will be located
app.set('views', './views');

// The default engine is set to ejs
app.set('view engine', 'ejs');

// home page
app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Robert',
            lastName: 'Barnett',
        }
    }
    res.render('pages/index', data);
});

// about page
app.get('/about', (req, res) => {
    res.render('pages/about');
});

// developer portfolio page
app.get('/developer', (req, res) => {
    res.render('pages/developer');
});

// // resume
// app.get('/resume', (req, res) => {
//     res.render('resume.pdf');
// });

// contact page
app.get('/contact', (req, res) => {
    res.render('pages/contact');
});

app.post('/thanks', (req, res) => {
    const msg = {
        to: 'robertmakes@gmail.com',
        from: req.body.email,
        subject: `Message from ${req.body.name} via RobertWrithe.com`,
        text: `${req.body.message} (Message from ${req.body.name})`,
        html: `<strong>${req.body.message} (Message from ${req.body.name})</strong>`,
    };
    sgMail.send(msg);
    res.render('pages/thanks', { contact: req.body })
});

// catch invalid routes (404 error)
app.get('*', function (req, res) {
    res.render('pages/e404');
    // res.send('Whoops, page not found 404').status(404);
})

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));