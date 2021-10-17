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
                        <div class="row">
                          <div class="col-md-6 mb-9 pr-xl-12 mb-lg-15">
                            <div class="single-faq media">
                              <div class="count circle-xs bg-green mr-8">
                                <i class="fas fa-question text-white"></i>
                              </div>
                              <div class="faq-text">
                                <h3 class="faq-title mb-7 gr-text-7 gr-text-color">Personal Details</h3>
                                 <p class="gr-text-9 gr-text-color-opacity">Name: {{ user.name }}</p>
                                 <p class="gr-text-9 gr-text-color-opacity">Phone: {{ user.phone_number }}</p>
                              </div>
                            </div>
                          </div>
                          <div class="col-md-6 mb-9 pr-xl-12 mb-lg-15">
                            <div class="single-faq media">
                              <div class="count circle-xs bg-green mr-8">
                                <i class="fas fa-question text-white"></i>
                              </div>
                              <div class="faq-text">
                                <h3 class="faq-title mb-7 gr-text-7 gr-text-color">My Hobbies</h3>
                                <p class="gr-text-9 gr-text-color-opacity">
                                <ul v-for="(hobby, index) in user.hobbies" :key="index">
                                    <li>{{ hobby.name }}</li>
                                </ul>
                                </p>
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
        </div>
      <Footer />
    </div>
</template>

<script>
import navHeader from '@/components/headers/navHeader.vue'
import Footer from '@/components/footers/Footer.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Profile',
  components: {
    navHeader,
    Footer
  },
  data () {
    return {
      avatar: 'https://cdn.icon-icons.com/icons2/1736/PNG/512/4043260-avatar-male-man-portrait_113269.png',
      userPhoneNumber: localStorage.getItem('retrieveUserPhoneNumber')
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
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
