const express = require('express');
const eventScrapper = require('./eventScrapper.js');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 3000;

// Home page route
app.get('/', (req, res) => {
  res.send("Welcome");
});

/**
 * Getting events based on a location
 * Ex: http: //host/events/dhaka-bd
 */
app.get('/events/:location', (req, res) => {
  eventScrapper.allEvents(req.params.location)
        .then(events => {
          res.json(events)
        })
});

/**
 * Getting a single event
 * Ex: http: //host/events/details/networking-systems-and-security
 */
app.get('/events/details/:slug', (req, res) => {
  eventScrapper.getEvent(req.params.slug)
    .then(event => {
      res.json(event)
    })
});



// Listening the port
app.listen(port, () => {
  console.log(`Listening on ${port}`);
})