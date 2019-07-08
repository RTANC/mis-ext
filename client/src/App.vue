<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span>Vuetify</span>
        <span class="font-weight-light">MATERIAL DESIGN</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn color="error" flat v-if="$store.getters.user.userId && $route.path != '/'" @click="onSignOut">ลงชื่อออก</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-img :src="require('../public/bg.png')" contain>
        <router-view/>
      </v-img>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    onSignOut () {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(x => {
        this.$store.dispatch('signout')
        this.$router.push('/')
        console.log('Signout')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
