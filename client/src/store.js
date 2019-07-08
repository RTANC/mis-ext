import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      id_token: null,
      avatar: null,
      fullname: null,
      email: null,
      userId: null,
      role: null,
      deptId: null,
      stdId: null,
      token: null
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    signin (state, payload) {
      state.user = {
        id_token: payload.id_token,
        avatar: payload.avatar,
        fullname: payload.fullname,
        email: payload.email,
        userId: payload.userId,
        role: payload.role,
        deptId: payload.deptId,
        stdId: payload.stdId,
        token: payload.token
      }
    },
    signout (state) {
      state.user = {
        id_token: null,
        avatar: null,
        fullname: null,
        email: null,
        userId: null,
        role: null,
        deptId: null,
        stdId: null,
        token: null
      }
    }
  },
  actions: {
    signin (context, payload) {
      context.commit('signin', payload)
    },
    signout (context) {
      context.commit('signout')
    }
  }
})
