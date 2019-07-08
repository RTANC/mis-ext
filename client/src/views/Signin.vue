<template>
  <v-container grid-list-md fluid fill-height>
    <v-layout row wrap justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar color="deep-purple" dark>
            <v-toolbar-title>ลงชื่อเข้าใช้</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
              <p class="display-3 font-weight-black">NCX-RTANC</p>
              <google-signin-button @sign="onSigned" client_id="86808832530-8iq9hla0o0qhq7225ltn8rvog1ei9plo.apps.googleusercontent.com"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">{{card.title}}</v-card-title>
        <v-card-text>{{card.text}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="card.type == 0">
            <v-btn color="error" @click="dialog = false;">ทราบ</v-btn>
          </div>
          <div v-else-if="card.type == 1">
            <v-btn flat @click="dialog = false;signOut();">ไม่ต้องการ</v-btn>
            <v-btn color="primary" @click="dialog = false" :to="{ path: '/register' }">ต้องการ</v-btn>
          </div>
          <div v-else>
            <v-btn color="primary" @click="dialog = false;signOut();">ทราบ</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'
import api from '@/services'
import GoogleSigninButton from '@/components/GoogleSigninButton'
export default {
  name: 'SigninTeacher',
  components: { GoogleSigninButton },
  data () {
    return {
      dialog: false,
      card: {
        title: null,
        text: null,
        type: null
      }
    }
  },
  methods: {
    async onSigned (googleUser) {
      try {
        const profile = googleUser.getBasicProfile()
        const user = {
        id_token: googleUser.getAuthResponse().id_token,
        avatar: profile.getImageUrl(),
        fullname: profile.getName(),
        email: profile.getEmail(),
        userId: null,
        role: null,
        deptId: null,
        stdId: null,
        token: null
      }
      this.$store.dispatch('signin', user)
      const resp = await api.signin(user.id_token)
      user.userId = resp.data.userId
      user.role = resp.data.role
      user.deptId = resp.data.deptId
      user.stdId = resp.data.stdId
      user.token = 'Bearer ' + resp.data.token
      this.$store.dispatch('signin', user)
      if (user.role == 2) {
        // Student go to Test Page
        axios.defaults.headers.common['Authorization'] = this.$store.getters.user.token
        this.$router.push('Test')
      } else if (user.role == 1) {
        if (user.deptId == null) {
          //none validate account by admin
          this.card.title = 'แจ้งทราบ'
          this.card.text = 'Account ของท่านอยู่ในระหว่างการตรวจสอบจากผู้ดูแลระบบ'
          this.card.type = 2
          this.dialog = true
        } else{
          axios.defaults.headers.common['Authorization'] = this.$store.getters.user.token
          this.$router.push('Subject')
        }
      } else if (user.role == 0) {
        axios.defaults.headers.common['Authorization'] = this.$store.getters.user.token
        this.$router.push('Admin')
      }
      } catch (error) {
        if (error.response) {
          if (error.response.status == 401) {
            this.card.title = 'การเข้าสู่ระบบล้มเหลว'
            this.card.text = 'ไม่พบ Account ของท่านในระบบ, ท่านต้องการลงทะเบียนเข้าใช้ระบบหรือไม่?'
            this.card.type = 1
          }
        } else {
          this.card.title = 'ระบบผิดพลาด'
          this.card.text = 'ไม่สามารถเชื่อมต่อระบบได้ กรุณาลองใหม่อีกครั้ง หรือติดต่อผู้ดูแลระบบ'
          this.card.type = 0
        }
        this.dialog = true
      }
    },
    signOut () {
      var auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(x => {
        this.$store.dispatch('signout')
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>