<template>
  <div>
    <b-form-select v-model="selected" :options="options" class="mb-3" />
    <div>Selected: <strong>{{ selected }}</strong></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        { value: null, text: 'Where do you want to go!', disabled: true },
        { value: 'dhaka-bd', text: 'Dhaka, Bangladesh' },
        { value: 'bangkok-th', text: 'Bangkok, Thailand' }
      ]
    }
  }
}
</script>

<style scoped>
</style>
