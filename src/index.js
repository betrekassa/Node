require('./models/User');
require('./models/Track');
require('./models/Citiation');
require('./models/Driver');


const express = require('express');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const citiationRoutes = require('./routes/citiationRoutes');
const driverRoutes = require('./routes/driverRoutes');

const requireAuth = require('./middleware/requireAuth');



const app = express();

app.use(bodyParser.json()); // Make sure it before any parsing

app.use(authRoutes);
app.use(trackRoutes);
app.use(citiationRoutes);
app.use(driverRoutes);

//app.use(trackRoutes);

// db connection string 
const mongoUri = 'mongodb+srv://mussie_black:Mussie11%3F@cluster0.yxpwc.mongodb.net/<dbname>?retryWrites=true&w=majority';

//Remove Depricated functions
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

// Connect to MongoDB
mongoose.connect(mongoUri).then(() => console.log("MongoDB connected!")) .catch((err) => console.log("Error to Connect!",err));

// Get to Home if authenticated
app.get('/', requireAuth,(req,res) => {

    res.send(`Your Emaill :${req.user.email}`);

});

// Port to Listen @3000
app.listen(3000,() =>{
    console.log("Listening at port 3000!");
});
