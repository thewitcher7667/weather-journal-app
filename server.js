// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require(`express`);
const app = express();
const bodyParser = require(`body-parser`)
const cors = require(`cors`)
const port = 3000;
// Start up an instance of app
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));
app.listen(port, () => {console.log(`server is running at ${port}`)})

// Setup Server
/* post data to server*/
app.post(`/api`, (req, res) => {
        projectData.temp = req.body.data.main.temp;
        projectData.name= req.body.data.name;
        projectData.humidity = req.body.data.main.humidity;
        projectData.country = req.body.data.sys.country;
        projectData.feelings = req.body.feeling;
        projectData.date = req.body.date;
})

/*send data to client server by GET*/

app.get(`/all`, (req, res) => {
    res.send(projectData)
})