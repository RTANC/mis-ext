import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import th from 'vuetify/es5/locale/th'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    locales: { th },
    current: 'th'
  },
})
