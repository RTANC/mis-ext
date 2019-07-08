<template>
  <div id="my-signin2" class="g-signin2"></div>
</template>

<script>
export default {
  name: 'GoogleSigninButton',
  props: {
    client_id: {
      type: String,
      required: true
    }
  },
  methods: {
    onSuccess (user) {
      this.$emit('sign', user)
    },
    onFailure (error) {
      console.log(error)
    }
  },
  mounted () {
    gapi.load('auth2', () => {
      const auth2 = gapi.auth2.init({
        client_id: this.client_id,
        scope: 'profile email openid',
        fetch_basic_profile: false
      })
      gapi.signin2.render('my-signin2', {
        theme: 'dark',
        longtitle: true,
        onsuccess: this.onSuccess,
        onfailure: this.onFailure
      })
    })
  }
}
</script>
