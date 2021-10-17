<template>
    <div>
        <nav-header />
        <div class="container">
        <div class="row justify-content-center py-25">
          <div class="col-lg-4">
            <div class="main-block">
              <div class="form-title text-center">
                <h4 class="title gr-text-4 mb-9">Create new password</h4>
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
             <el-form class="login-form" :model="ruleForm" :rules="rules" ref="form" @submit.native.prevent="resetPassword">
                <el-form-item prop="email">
                    <div class="sub-title">Email address</div>
                    <el-input v-model="ruleForm.email" placeholder="Email address" type="email" prefix-icon="fa fa-envelope" clearable></el-input>
                </el-form-item>

                <el-form-item prop="password">
                    <div class="sub-title">New Password</div>
                    <el-input v-model="ruleForm.password" placeholder="New Password" type="password" prefix-icon="fa fa-lock" show-password clearable></el-input>
                </el-form-item>

                <el-form-item prop="password_confirmation">
                    <div class="sub-title">Confirm Password</div>
                    <el-input v-model="ruleForm.password_confirmation" placeholder="Confirm Password" type="password" prefix-icon="fa fa-lock" show-password clearable></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button :loading="loading" class="btn-block text-uppercase mb-2 mt-4" size="small" native-type="submit" type="primary" block>Reset Password</el-button>
                </el-form-item>
              </el-form>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your new password'))
      } else {
        if (this.ruleForm.password_confirmation !== '') {
          this.$refs.form.validateField('password_confirmation')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your confirm password'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('Password confirmation does not match'))
      } else {
        callback()
      }
    }
    return {
      token: null,
      loading: false,
      ruleForm: {
        email: '',
        password: '',
        password_confirmation: ''
      },
      errorMessage: false,
      rules: {
        email: [{
          required: true,
          message: 'Please enter you email address',
          trigger: 'blur'
        },
        {
          type: 'email',
          message: 'Please enter a valid email address',
          trigger: 'blur'
        }
        ],
        password: [{
          required: true,
          message: 'Please enter your new password',
          validator: validatePass,
          trigger: 'blur'
        },
        {
          min: 6,
          message: 'Password should not be less than 6 characters'
        }
        ],
        password_confirmation: [
          { validator: validatePass2, trigger: 'blur' },
          { required: true, message: 'Please enter your confirm password' },
          { min: 6, message: 'Password should not be less than 6 characters' }
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
    async resetPassword () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      }

      if (this.ruleForm.email.length > 0) {
        this.$store.dispatch('resetPassword', {
          email: this.ruleForm.email,
          password: this.ruleForm.password,
          password_confirmation: this.ruleForm.password_confirmation
        })
          .then(() => {
            this.loading = false
            this.$router.push('/login')
            this.$notify({
              title: 'Success',
              message: 'Your Password was changed successfully',
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
