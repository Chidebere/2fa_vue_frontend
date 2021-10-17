<template>
    <div>
        <nav-header />
        <div class="container">
        <div class="row justify-content-center py-25">
          <div class="col-lg-4">
            <div class="main-block">
              <div class="form-title text-center">
                <h4 class="title gr-text-4 mb-9">Create account</h4>
                <p class="gr-text-8 mb-13">To get started, you need to sign up here.</p>
              </div>
              <div class="bg-white border rounded-10 px-8 py-8 shadow-1 mb-11">
              <!-- <div class="mb-4">
              <div v-if="errorMessage" class="alert alert-danger" role="alert">
                <p class="m-2"> Your Email or password is incorrect..</p>
              </div>
            </div> -->
              <el-form class="register-form" :model="ruleForm" :rules="rules" ref="form" @submit.native.prevent="register">
                  <el-form-item prop="name">
                      <el-input v-model="ruleForm.name" placeholder="Full name" type="text" autocomplete="on" prefix-icon="fa fa-user" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="email">
                      <el-input v-model="ruleForm.email" placeholder="Email address" type="email" autocomplete="on" prefix-icon="fa fa-envelope" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="password">
                      <el-input v-model="ruleForm.password" placeholder="Password" type="password" prefix-icon="fa fa-lock" show-password></el-input>
                  </el-form-item>

                  <!-- <div style="margin-top: 15px;">
                      <el-input v-model="ruleForm.phone_number" class="input-with-select" placeholder="Phone Number" type="number"  clearable>
                      <el-select v-model="ruleForm.countryCodexx" slot="prepend" placeholder="Code">
                        <el-option label="+213" value="213">Algeria (+213)</el-option>
                        <el-option label="+376" value="376">Andorra (+376)</el-option>
                        <el-option label="+244" value="244">Angola (+244)</el-option>
                      </el-select>
                    </el-input>
                  </div> -->

                  <el-form-item prop="phone_number">
                      <el-input v-model="ruleForm.phone_number" style="width: 100%" placeholder="Phone Number: +2348034632755" type="text" prefix-icon="fa fa-phone" clearable></el-input>
                  </el-form-item>
                  <el-form-item prop="hobbies">
                    <el-select v-model="ruleForm.hobbies" style="width: 100%" multiple filterable placeholder="Select Area of Interest">
                      <el-option label="Football" value="Football"> Football</el-option>
                      <el-option label="Basketball" value="Basketball"> Basketball</el-option>
                      <el-option label="Ice Hockey" value="Ice Hockey"> Ice Hockey</el-option>
                      <el-option label="Motorsports" value="Motorsports"> Motorsports</el-option>
                      <el-option label="Bandy" value="Bandy"> Bandy</el-option>
                      <el-option label="Rugby" value="Rugby"> Rugby</el-option>
                      <el-option label="Skiing" value="Skiing"> Skiing</el-option>
                      <el-option label="Shooting" value="Shooting"> Shooting</el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                  <span style="color: #000;">How would you like to be verified?</span>
                  <el-radio-group v-model="ruleForm.verification_channel">
                    <el-radio label="SMS" value="SMS">Recieve a token via SMS</el-radio>
                    <el-radio label="MAIL" value="MAIL">Recieve a token via Email</el-radio>
                  </el-radio-group>
                </el-form-item>

                  <div class="form-group button-block mb-2">
                    <button :loading="loading" class="form-btn btn btn-primary gr-hover-y w-100">Create an account</button>
                  </div>
              </el-form>
              </div>
              <div class="form-bottom excerpt text-center">
                <p class="sign-up-text gr-text-9 gr-text-color">Already have an account? <router-link to="/login" class="text-primary">Sign in now</router-link></p>
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
export default {
  name: 'Register',
  components: {
    navHeader,
    Footer
  },
  data () {
    return {
      ruleForm: {
        name: '',
        email: '',
        password: '',
        phone_number: '',
        hobbies: '',
        verification_channel: 'SMS'
      },
      errorMessage: false,
      loading: false,
      rules: {
        name: [{
          required: true,
          message: 'Please enter your full name',
          trigger: 'blur'
        }],
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
          message: 'Please enter your password',
          trigger: 'blur'
        },
        {
          min: 6,
          message: 'Your password is too short!'
        }
        ],
        phone_number: [{
          required: true,
          message: 'Please enter your phone number',
          trigger: 'blur'
        }],
        hobbies: [{
          required: true,
          message: 'Please select your hobbies',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    async register () {
      const valid = await this.$refs.form.validate()
      if (!valid) {
        return false
      } else {
        // if (this.ruleForm.password.length > 0) {
        this.$store.dispatch('userRegister', {
          name: this.ruleForm.name,
          email: this.ruleForm.email,
          password: this.ruleForm.password,
          phone_number: this.ruleForm.phone_number,
          hobbies: this.ruleForm.hobbies,
          verification_channel: this.ruleForm.verification_channel
        })
          .then(response => {
            this.loading = false
            this.$router.push('/verify')
            // this.$router.push({ name: 'Verify', params: { phone_number: response.user.phone_number } })
            this.$message({
              message: 'Registration was successful..Continue by verifying your account',
              type: 'success',
              duration: 4500,
              offset: 50
            })
          })
          .catch(() => {
            this.errorMessage = true
          })
      }
    }
  }
}
</script>
<style>
  /* .el-select .el-input {
    width: 110px;
  } */
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
    width: 30%;
  }
</style>
