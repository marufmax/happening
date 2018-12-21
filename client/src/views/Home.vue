<template>
  <div class="home">
    <b-container>
        <b-jumbotron header="What is happening??!" lead="See what is happening around you" >
           <localtion-picker></localtion-picker>
      </b-jumbotron>

    </b-container>

  </div>
</template>

<script>
// @ is an alias to /src
import LocaltionPicker from '@/components/LocaltionPicker.vue'

export default {
  name: 'home',
  components: {
    LocaltionPicker
  }
}
</script>

<style>
.home {
  padding-top: 50px;
}
</style>
