<template>
    <div>
        <nav-header />
        <div class="container">
        <div class="row justify-content-center py-25">
          <div class="col-lg-4">
            <div class="main-block">
              <div class="form-title text-center">
                <h4 class="title gr-text-4 mb-9">Reset Password</h4>
                <p class="gr-text-8 mb-13">Enter your email address and we'll send you a reset link </p>
              </div>
              <div class="bg-white border rounded-10 px-8 py-8 shadow-1 mb-11">
                <div style="margin: 10px 0 20px 0;">
                    <el-alert
                        v-if="successStatus"
                        :title="successStatus"
                        type="success">
                    </el-alert>
                    <el-alert
                        v-if="errorStatus"
                        :title="errorStatus"
                        type="error">
                    </el-alert>
                </div>
              <el-form class="register-form" :model="ruleForm" :rules="rules" ref="form" @submit.native.prevent="ForgotPassword">
                  <el-form-item prop="email">
                      <el-input v-model="ruleForm.email" placeholder="Enter your email address" type="email" autocomplete="on" prefix-icon="fa fa-envelope" clearable></el-input>
                  </el-form-item>
                  <div class="form-group button-block mb-2">
                    <button :loading="loading" class="form-btn btn btn-primary gr-hover-y w-100">Reset Password</button>
                  </div>
              </el-form>
              </div>
              <div class="form-bottom excerpt text-center">
                <p class="sign-up-text gr-text-9 gr-text-color">Don’t have an account? <router-link to="/register" class="text-primary">Create account</router-link></p>
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
      ruleForm: {
        email: ''
      },
      loading: false,
      rules: {
        email: [{
          required: true,
          message: 'Please enter your email address to reset',
          trigger: 'blur'
        }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'successStatus',
      'errorStatus'
    ])
  },
  methods: {
    async ForgotPassword () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }

      if (this.ruleForm.email.length > 0) {
        this.$store.dispatch('ForgotPassword', {
          email: this.ruleForm.email
        })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Login into your email and click a reset link',
              type: 'success',
              position: 'top-right',
              duration: 4500,
              offset: 50
            })
          })
          .catch(() => {})
      }
    }
  }
}
</script>
