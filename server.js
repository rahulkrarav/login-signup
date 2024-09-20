const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialize Express app
const app = express();
app.use(bodyParser.json());
app.use(cors());
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '/')));
app.use(express.urlencoded());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rahulkrarav:7Nov%402000@atlascluster.pdsd6zf.mongodb.net/rahuldb?retryWrites=true&w=majority&appName=AtlasCluster', {
   
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a User schema and model
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Routes
app.post('/signup', async (req, res) => {
    const data = req.body;
    console.log(data);
    console.log({email : data.email,username : data.txt,password : data.pswd});
    const newUser = new User({ username : data.txt, email : data.email, password : data.pswd});
    try {
        await newUser.save();
        res.writeHead(201,"created");
        res.write("user created successfully");
        res.end();
    } catch (error) {
        console.log(error);
        res.status(400);
        res.end();
    }
});



app.post('/login', async (req, res) => {
    const body = req.body;
    try {
        const user = await User.findOne({ email : body.email, password : body.pswd });
        if (user) {
            res.status(200).send('Login successful');
        } else {
            res.status(400).send('Invalid email or password');
        }
    } catch (error) {
        res.status(400).send('Error logging in');
    }

    
});


// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
