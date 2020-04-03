<template>
  <div>
    <nav>
      <router-link class="spacing" v-for="routes in links" 
      v-bind:key="routes.id"
      :to="`${routes.page}`">{{routes.text}}</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data() {
    return {
      links: [
        {
          id: 0,
          text: 'Home',
          page:'/'
        },
        {
          id: 1,
          text: 'CO2',
          page:'/co2'
        },
        {
          id: 2,
          text: 'Light',
          page:'/light'
        },
        {
          id: 3,
          text: 'Humidity',
          page:'/humidity'
        }
      ]
    }
  }
}
</script>

<style> 
  .spacing { 
    Margin-right: 50px; 
  } 
</style>