<template>
  <div class="home">
    <b-container>
        <b-jumbotron header="What is happening??!" lead="See what is happening around you" >
            <b-form-select v-model="selected" :options="options" class="mb-3" @change="search"/>
      </b-jumbotron>


      <div class="mt-4">
        <b-row>
          <b-col>
            <b-card-group deck>
                <b-card header="featured"
                        header-tag="header"
                        footer="Card Footer"
                        footer-tag="footer"
                        title="Title">
                    <p class="card-text">Header and footers using props.</p>
                    <b-button href="#"
                              variant="primary">Go somewhere</b-button>
                </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </div>

      <div class="mt-4">
        <b-row>
          <b-col>
            <b-card-group deck>
                <b-card header="featured"
                        header-tag="header"
                        footer="Card Footer"
                        footer-tag="footer"
                        title="Title">
                    <p class="card-text">Header and footers using props.</p>
                    <b-button href="#"
                              variant="primary">Go somewhere</b-button>
                </b-card>
            </b-card-group>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import API from '@/config/api.js'

export default {
  name: 'home',
  data() {
    return {
      selected: null,
      options: [
        {
          value: null,
          text: 'Where do you want to go!',
          disabled: true,
          selected: true
        },
        { value: 'dhaka-bd', text: 'Dhaka, Bangladesh' },
        { value: 'bangkok-th', text: 'Bangkok, Thailand' }
      ],
      events: []
    }
  },
  methods: {
    search() {
      console.log(this.selected)
      const ApiUrl = `events/${this.selected}`
      API.get(ApiUrl).then(response => {
        this.events = response.data
      })
    }
  }
}
</script>

<style>
.home {
  padding-top: 50px;
}
</style>
