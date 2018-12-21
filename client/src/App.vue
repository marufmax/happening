<template>
  <div id="app">
    <base-nav> </base-nav>
    <router-view/>
  </div>
</template>

<script>
import BaseNav from '@/components/BaseNav'

export default {
  name: 'app',
  components: {
    BaseNav
  },
  data() {
    return {}
  }
}
</script>

<style>
</style>
