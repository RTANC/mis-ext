<template>
  <v-app>
    <v-toolbar app dark>
      <v-toolbar-title class="headline text-uppercase">
        <span class="font-weight-light"> ระบบสารสนเทศเพื่อการตัดสินใจ</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>

      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  }
}
</script>
