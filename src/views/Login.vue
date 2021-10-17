<template>
    <div>
        <nav-header />
        <div class="container">
        <div class="row justify-content-center py-25">
          <div class="col-lg-4">
            <div class="main-block">
              <div class="form-title text-center">
                <h4 class="title gr-text-4 mb-9">Sign-In</h4>
                <p class="gr-text-8 mb-13">To get started, you need to sign-in here.</p>
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
              <el-form class="register-form" :model="ruleForm" :rules="rules" ref="form" @submit.native.prevent="login">
                  <el-form-item prop="email_phone">
                      <el-input v-model="ruleForm.email_phone" placeholder="Email / Phone number" type="text" autocomplete="on" prefix-icon="fa fa-envelope" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                      <el-input v-model="ruleForm.password" placeholder="Password" type="password" prefix-icon="fa fa-lock" show-password></el-input>
                  </el-form-item>
                    <div class="custom-control" style="margin: 5px 0 20px 0;">
                        <span style="float: right;" class="text-muted">
                            <router-link to="/reset-password">Forgot password?</router-link>
                        </span>
                    </div>
                  <div class="form-group button-block mb-2">
                    <button :loading="loading" class="form-btn btn btn-primary gr-hover-y w-100">Sign-In</button>
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
        email_phone: '',
        password: ''
      },
      loading: false,
      rules: {
        email_phone: [{
          required: true,
          message: 'Please enter your email address or phone number',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: 'Please enter your password',
          trigger: 'blur'
        },
        {
          min: 6,
          message: 'Your password is too short!'
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
    async login () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }

      if (this.ruleForm.password.length > 0) {
        this.$store.dispatch('userLoginToken', {
          email_phone: this.ruleForm.email_phone,
          password: this.ruleForm.password
        })
          .then(response => {
            this.loading = false
            this.$router.push('/profile')
            this.$notify({
              title: 'Success',
              message: 'Welcome to your Profile',
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
