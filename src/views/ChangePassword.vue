<template>
    <div>
        <nav-header />
        <div class="single-preview" style="margin-top: 100px;">
          <div class="premium-clients mb-13">
            <div class="container container-1600">
              <div class="etement-tab-head border rounded-top-15 pl-9 pr-7 py-6">
                  <div style="background-image: url('https://assets.digitalocean.com/articles/how-to-build-a-website-with-html/small-profile-unstyled-1.png');background-size: cover; height: 300px;">
                  <div class="block container-block">
                  <div class="centered">
                    <el-avatar :size="150" :src="avatar"></el-avatar>
                    <p class="title">{{ user.name }}</p>
                  </div>
                  </div>
                    </div>
              </div>
            </div>
            <div class="container container-1600">
              <!-- Element Tab Content -->
              <div class="tab-content border border-top-0 rounded-bottom-15" id="element-tab-content-1">
                <!-- Element View Tab Pane -->
                <div class="tab-pane fade show active" id="tab-pane-1-1" role="tabpanel" aria-labelledby="tab-nav-1-1">
                  <div class="position-relative ">
                    <div class="faq-section pt-12 pt-lg-24 pb-12 pb-lg-24 bg-default-1">
                      <div class="container">
                          <div class="form-title text-center">
                                <h4 class="title gr-text-4 mb-9">Change Password</h4>
                            </div>
                        <div class="row">
                          <div class="col-md-12 mb-9 pr-xl-12 mb-lg-15">
                            <div class="cart-product cart-item bg-white p-8 rounded-10 mb-5 overflow-hidden position-relative">
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
                        <el-form class="register-form" :model="userBio" :rules="rules" ref="form" @submit.native.prevent="updatePassword">
                                <el-input v-model="userBio.email" type="hidden"></el-input>
                            <el-form-item prop="password">
                                <el-input v-model="userBio.password" placeholder="New Password" type="password" prefix-icon="fa fa-lock" show-password></el-input>
                            </el-form-item>
                            <el-form-item prop="confirm_password">
                                <el-input v-model="userBio.confirm_password" placeholder="Confirm Password" type="password" prefix-icon="fa fa-lock" show-password></el-input>
                            </el-form-item>
                            <div class="form-group button-block mb-2 col-md-6">
                                <button :loading="loading" class="form-btn btn btn-primary gr-hover-y w-50">Change Password</button>
                            </div>
                        </el-form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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
      userBio: {},
      avatar: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
      userPhoneNumber: localStorage.getItem('retrieveUserPhoneNumber'),
      loading: false,
      rules: {
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
        confirm_password: [{
          required: true,
          message: 'Please enter your confirm password',
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
  created () {
    this.userBio = Object.assign({}, this.$store.getters.user)
  },
  computed: {
    ...mapGetters([
      'successStatus',
      'errorStatus',
      'user'
    ])
  },
  methods: {
    simulatePassword () {
      return new Promise(resolve => {
        setTimeout(resolve, 800)
      })
    },
    async updatePassword () {
      if (this.userBio.password === this.userBio.confirm_password) {
        const valid = await this.$refs.form.validate()
        if (!valid) {
          return false
        }
        this.loading = true
        await this.simulatePassword()
        this.loading = false
        this.$store.dispatch('updateUserPassword', {
          id: this.userBio.id,
          email: this.userBio.email,
          password: this.userBio.password
        })
          .then(() => {
            this.$notify({
              title: 'Success',
              message: 'Password changed successful',
              type: 'success',
              position: 'top-right',
              duration: 4500,
              offset: 50
            })
          })
      } else {
        this.$notify({
          title: 'Password Mismatched',
          message: 'Password does not match',
          type: 'error',
          position: 'top-right',
          duration: 4500,
          offset: 50
        })
      }
    }
  }
}
</script>

<style scoped>
.container-block {
  display: flex;
  justify-content: center;
}
.centered {
  margin: 0 auto;
  position: absolute;
  top: 30%;
  /* left: 0%; */
  /* margin: -25px 0 0 -25px; */
}
</style>
