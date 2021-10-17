import axios from 'axios'

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('access_token') || null,
  errorStatus: '',
  successStatus: ''
}

const getters = {
  loggedIn (state) {
    return state.token !== null
  },
  user: (state) => state.user,
  errorStatus: state => state.errorStatus,
  successStatus: state => state.successStatus
}

const actions = {
  userRegister (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'create-new-account', {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        phone_number: payload.phone_number,
        hobbies: payload.hobbies,
        verification_channel: payload.verification_channel
      })
        .then(response => {
          localStorage.setItem('retrieveUserPhoneNumber', response.data)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  verifyUserToken (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'verify-token', {
        verification_code: payload.verification_code,
        phone_number: payload.phone_number
      })
        .then(response => {
          if (response.data.error !== null) {
            context.commit('ERROR_STATUS', response.data.error)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  userLoginToken (context, credentials) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'login-account', {
        email_phone: credentials.email_phone,
        password: credentials.password
      })
        .then(response => {
          const token = response.data.access_token
          const user = response.data.user
          if (token) {
            localStorage.setItem('access_token', token)
            localStorage.setItem('user', JSON.stringify(user))

            // update our store with:
            context.commit('userLoginToken', token)
            context.commit('retrieveUser', user)
            resolve(response)
          } else {
            context.commit('ERROR_STATUS', response.data.error)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateUserEmail (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'update_user_email', {
        userId: payload.id,
        email: payload.email
      })
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            context.commit('retrieveUser', response.data.user)
            context.commit('SUCCESS_STATUS', response.data.success)
          }
          if (response.data.error) {
            context.commit('ERROR_STATUS', response.data.error)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateUsername (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'update_username', {
        userId: payload.id,
        name: payload.name
      })
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            context.commit('retrieveUser', response.data.user)
            context.commit('SUCCESS_STATUS', response.data.success)
          }
          if (response.data.error) {
            context.commit('ERROR_STATUS', response.data.error)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  updateUserPassword (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'change_user_password', {
        userId: payload.id,
        email: payload.email,
        password: payload.password
      })
        .then(response => {
          if (response.data.success !== null) {
            localStorage.setItem('user', JSON.stringify(response.data.user))
            context.commit('retrieveUser', response.data.user)
            context.commit('SUCCESS_STATUS', response.data.success)
          }
          if (response.data.error !== null) {
            context.commit('ERROR_STATUS', response.data.error)
          }
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  ForgotPassword (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'password/email', {
        email: payload.email
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  resetPassword (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(process.env.VUE_APP_API_URL + 'password/reset', {
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation
      })
        .then(response => {
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  logoutToken (context) {
    if (context.getters.loggedIn) {
      return new Promise((resolve, reject) => {
        axios.post(process.env.VUE_APP_API_URL + 'logout')
          .then(response => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')

            context.commit('logoutToken')
            resolve(response)
          })
          .catch(error => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            context.commit('logoutToken')
            reject(error)
          })
      })
    }
  }
}

const mutations = {
  userLoginToken (state, token) {
    state.token = token
  },
  retrieveUser (state, user) {
    state.user = user
  },
  logoutToken (state) {
    state.token = null
  },
  ERROR_STATUS (state, errorStatus) {
    state.errorStatus = errorStatus
  },
  SUCCESS_STATUS (state, successStatus) {
    state.successStatus = successStatus
  }
  // retrieveUserPhoneNumber (state, userPhoneNumber) {
  //   state.userPhoneNumber = userPhoneNumber
  // }
  // updateUserPhoto (state, user) {
  //   state.user = user
  // },
  // updateUserPassword (state, user) {
  //   state.user = user
  // }
}

export default {
  state,
  getters,
  actions,
  mutations
}
