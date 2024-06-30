const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } = require('firebase/auth');

const app = express();
const port = 3003; // Ensure no other services are using this port

const firebaseConfig = {
    apiKey: "AIzaSyCq31oKhaj3DTJHqMALn-mr7KZylhw6Rpk",
    authDomain: "full-stack-91ccb.firebaseapp.com",
    projectId: "full-stack-91ccb",
    storageBucket: "full-stack-91ccb.appspot.com",
    messagingSenderId: "1042436062668",
    appId: "1:1042436062668:web:e9757f978d137bc15b3169",
    measurementId: "G-33DQZDLK7Y"
  };

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.redirect('/dashboard'); // Redirect to dashboard on successful login
        })
        .catch((error) => {
            res.status(400).send(`Login Error: ${error.message}`);
        });
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.post('/signup', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            res.send('User signed up successfully');
        })
        .catch((error) => {
            res.status(400).send(`Signup Error: ${error.message}`);
        });
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard'); // Render the dashboard view
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
