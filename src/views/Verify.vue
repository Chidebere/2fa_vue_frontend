<template>
    <div>
        <nav-header />
        <div class="container">
        <div class="row justify-content-center py-25">
          <div class="col-lg-4">
            <div class="main-block">
              <div class="form-title text-center">
                <h4 class="title gr-text-4 mb-9">Token Verification</h4>
              </div>
              <div class="bg-white border rounded-10 px-8 py-8 shadow-1 mb-11">
                  <div style="margin: 10px 0 20px 0;">
                    <el-alert
                        v-if="errorStatus"
                        :title="errorStatus"
                        type="error">
                    </el-alert>
                  </div>
              <el-form class="register-form" :model="ruleForm" :rules="rules" ref="form" @submit.native.prevent="verifyToken">
                  <el-form-item prop="verification_code">
                      <el-input v-model="ruleForm.verification_code" placeholder="Enter your verification token" type="text" autocomplete="on" prefix-icon="fa fa-envelope" clearable></el-input>
                  </el-form-item>
                      <!-- <el-input v-model="userPhoneNumber" type="text" ></el-input> -->

                  <div class="form-group button-block mb-2 mt-5">
                    <button :loading="loading" class="form-btn btn btn-primary gr-hover-y w-100">Verify Token</button>
                  </div>
              </el-form>
              </div>
              <div class="form-bottom excerpt text-center">
                <p class="sign-up-text gr-text-9 gr-text-color">Don’t have an account? <router-link to="/register" class="text-primary">Create account now</router-link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
</template>

<script>
import navHeader from '@/components/headers/navHeader.vue'
import Footer from '@/components/footers/Footer.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Login',
  components: {
    navHeader,
    Footer
  },
  data () {
    return {
      userPhoneNumber: localStorage.getItem('retrieveUserPhoneNumber'),
      ruleForm: {
        verification_code: ''
      },
      loading: false,
      rules: {
        verification_code: [{
          required: true,
          message: 'Please enter your token for verification',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapGetters([
      'errorStatus'
    ])
  },
  methods: {
    simulateToken () {
      return new Promise(resolve => {
        setTimeout(resolve, 800)
      })
    },
    async verifyToken () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }
      this.loading = true
      await this.simulateToken()
      this.loading = false
      this.$store.dispatch('verifyUserToken', {
        verification_code: this.ruleForm.verification_code,
        phone_number: this.userPhoneNumber
      })
        .then(response => {
          this.loading = false
          if (response.data.success.length > 0) {
            localStorage.removeItem('retrieveUserPhoneNumber')
            this.$router.push('/login')
            this.$message({
              message: 'You\'ve successfully verified your phone',
              type: 'success',
              duration: 4500
            })
          }
        }).catch(() => {})
    }
  }
}
</script>
