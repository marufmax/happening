const fetch =  require('node-fetch');
const cheerio =  require('cheerio');

const baseUrl = 'https://10times.com/';

// Fake user agent
const headers = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36'
}

// Caching the result for faster loading
const allEventsCache = {};

/**
 * Scrap all the events from the base url
 * @returns object
 */
function allEvents(location) {

  return fetch(`${baseUrl}${location}`, {
    method: 'GET',
    headers: headers
  })
      .then(response => response.text())
      .then(body => {
          const events = [];
          const $ = cheerio.load(body);
          // Scrapping with the result
          $('tr.box').each(function (i, element) {
            const $element = $(element);
            const $title = $element.find('h2 a');
            const $schedule = $element.find('.text-drkr').not('span');
            const $location = $element.find('span.venue');
            // const $image = $element.find('.float-r')

            // Valid Title
            // const validTitle = new RegExp('/^.+( \d{4})(?=.+)/', 'ig');

            const eventCategories = [];
            const $categories = $element.find('.label').not('.label-success').each(function (i, element) {
                    const category = $(element).text();
                    eventCategories.push(category);
            });

            const event = {
              title: $title.text(),
              schedule: $schedule.text(),
              link: $title.attr('href'),
              location: $location.text().trim(),
              eventCategories
            };
            events.push(event);
          });

          return events;
        });
}

/**
 * Showing details of a single event
 *
 * Route: /events/details /:slug
 * @param eventUrl
 * @returns (object) event
 */
function getEvent(slug) {
  return fetch(`${baseUrl}${slug}`, {
    method: 'GET',
    headers: headers
  }).then(response => response.text())
   .then( body => {
        const $ = cheerio.load(body);
        const $title = $('h1');
        const $date = $('ul[class="lead"] span');
        const $location = $('section h3').children("a").not("#org-name");
        const $organizer = $('#org-name');

        // Grabing the text
        const title = $title.first().text();
        const date = $date.first().text().trim();
        const location = $location.text().trim();
        const organizer = $organizer.text();
        const event = {
            title,
            date,
            location,
            organizer
        };
       return event;

   });
}

module.exports = {
  allEvents,
  getEvent
}