<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>    
  </div>
</template>

<script>
    import Home from '@/components/Home'
    import Co2 from '@/components/co2'
    import Humidity from '@/components/humidity'
    import Light from '@/components/light'
    import Temperature from '@/components/temperature'
    import Nav from '@/components/nav'

    export default {
        name: 'App',
        components: {
            Nav,
            Home,
            Co2,
            Humidity,
            Light,
            Temperature
        }
    }

</script>

<style>
    body {
        font-size: 18px;
        min-height: 100%;
    }
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding: 20px;
        min-height: 100%;
    }

</style>
