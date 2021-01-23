<template>
  <header class="navbar" v-if="visible">
    <h3>Freelance</h3>
    <ul class="navbar-menu">
      <li><router-link to="/tasks">Главная</router-link></li>
      <li>
        <router-link to="/new" castom v-slot="{novigate, href}">
          <a href="#" @click="novigate" :class="{
            active: $route.path.indexOf(href) !== -1
          }">Создать</a>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: true
    }
  }
}
</script>
