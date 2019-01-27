<template>
  <div class="home">
     <loading :active.sync="isLoading"
        :can-cancel="true"
        :is-full-page="false"></loading>

    <b-container>
        <b-jumbotron header="Free Fun evets for you!" lead="Find what's fun thing happening around you" >
            <!-- <b-form-select v-model="location" :options="options" class="mb-3" /> -->
            <vue-bootstrap-typeahead
              v-model="location"
              @hit="search(location)"
              placeholder="Type your location....."
              :data="address"
            />
      </b-jumbotron>

      <div class="mt-4">
        <b-row>
          <b-col>
            <b-card no-body class="mt-4" v-for="(event, index) in events" :key="index">
               <h4 slot="header"> <a :href="event.link"> {{ event.title }} </a>  <b-badge> Upcoming </b-badge> </h4>
              <b-card-body>
                  <p class="card-text">
                      Some quick example text to build on the card title and make up the bulk of the card's content.
                  </p>
              </b-card-body>
              <b-list-group flush>
                  <b-list-group-item> <v-icon name="plane-departure" /> <b> Location: </b>{{ event.location }}</b-list-group-item>
                  <b-list-group-item>  <v-icon name="clock" /> <b> Schedule </b> {{ filterDate(event.schedule) ||  event.schedule }} </b-list-group-item>
              </b-list-group>
              <b-card-body>
                  <a :href="event.link"
                    class="card-link">Details</a>
              </b-card-body>
              <b-card-footer>
                 <b-badge pill variant="primary"
                    v-for="(categories, index) in event.eventCategories"
                    class="mr-1"
                    :key="index">{{ categories }}</b-badge>
              </b-card-footer>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/config/api.js'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'
import cities from '../data/cities.js'

export default {
  name: 'home',
  data() {
    return {
      location: null,
      address: cities,
      events: [],
      isLoading: false,
      fullPage: true
    }
  },
  components: {
    Loading,
    VueBootstrapTypeahead
  },
  methods: {
    /**
     * Asyncronously Search events for this location
     *
     * @param string searchLocation
     * @returns json
     */
    async search(searchLocation) {
      if (searchLocation) {
        this.isLoading = true
        const ApiUrl = `events/${searchLocation}`
        await API.get(ApiUrl).then(response => {
          this.isLoading = false
          return (this.events = response.data)
        })
        return
      }
    },
    filterDate(date) {
      const pattern = /^.+( \d{4})(?=.+)/gi
      const matches = pattern.exec(date)
      if (matches) {
        return matches.toString()
      }
    }
  }
}
</script>

<style>
.home {
  padding-top: 50px;
}
</style>
