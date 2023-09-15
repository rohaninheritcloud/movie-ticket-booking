const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;


// Use bodyParser.json() for parsing JSON data
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/register', (req, res) => {
    console.log(req.headers)
  //const { username, mail, password } = req.body;
  
  //const { client_id, client_secret } = config.headers;
  
  
  res.status(201).json({ message: 'Registration successful' });
});

// Define a route for user login
app.post('/api/login', (req, res) => {
  //const { username, mail, password } = req.body;
  
  //const { client_id, client_secret } = config.headers;
  
  
  res.status(201).json({ message: 'Login successful' });
  res.status(400).json({message: "Invalid Credentials"})
});
app.post('/api/booked', (req, res) => {  
    const { phone_number, email,noOfSeats,screen } = req.body;
    const {client_id,client_secret}= req.headers
    console.log("Received Data:");
  console.log("phone_number:", phone_number);
  console.log("email:", email);
  console.log("screen:", screen);
  console.log("noOfSeats", noOfSeats)
  
    res.status(200).json({ message: "success" });
  });

  app.post("/event", (req, res) => {
    const { start, end, attendees, summary, description, location, dataversion, calendarid } = req.body;
  
    // Handle the data as needed, e.g., logging it
    console.log("Received Event Data:");
    console.log("start:", start);
    console.log("end:", end);
    console.log("attendees:", attendees);
    console.log("summary:", summary);
    console.log("description:", description);
    console.log("location:", location);
    console.log("dataversion:", dataversion);
    console.log("calendarid:", calendarid);
  
    // Respond with a success message
    res.status(200).json({ message: "success" });
  });
  
  
app.get('/api/screen1', (req, res) => {
  
    res.json(res);
  });
  
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
