<template>
    <div>
    <!-- Header Area -->
    <header class="site-header site-header--menu-right dark-mode-texts site-header--absolute">
      <div class="container">
        <nav class="navbar site-navbar offcanvas-active navbar-expand-lg  px-0">
          <!-- Brand Logo-->
          <div class="brand-logo"><router-link to="/">
              <!-- light version logo (logo must be black)-->
              <img src="image/logo-main-black.png" alt="" class="light-version-logo ">
              <!-- Dark version logo (logo must be White)-->
              <img src="image/logo-main-white.png" alt="" class="dark-version-logo">
            </router-link></div>
          <div class="collapse navbar-collapse" id="mobile-menu">
            <div class="navbar-nav-wrapper">
              <ul class="navbar-nav main-menu">
                <li v-if="loggedIn" class="nav-item">
                  <router-link class="nav-link" to="/profile" role="button" aria-expanded="false">Profile</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="#" role="button" aria-expanded="false">Buddies</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="#" role="button" aria-expanded="false">Discover</router-link>
                </li>
                <li v-if="loggedIn" class="nav-item dropdown">
                  <router-link class="nav-link dropdown-toggle gr-toggle-arrow" id="navbarDropdown" to="#features" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Setting &amp; Privacy <i class="icon icon-small-down"></i></router-link>
                  <ul class="gr-menu-dropdown dropdown-menu" aria-labelledby="navbarDropdown">
                    <li class="drop-menu-item"><router-link to="/change-password">Change Password</router-link></li>
                    <li class="drop-menu-item"><router-link to="/update-email">Update Email</router-link></li>
                    <li class="drop-menu-item"><router-link to="/update-username">Update Username</router-link></li>
                    <li class="drop-menu-item" @click="logout"><a>Logout</a></li>
                  </ul>
                </li>
                <li v-if="!loggedIn" class="nav-item">
                  <router-link class="nav-link" to="/login" role="button" aria-expanded="false">Login</router-link>
                </li>
              </ul>
            </div>
            <button class="d-block d-lg-none offcanvas-btn-close" type="button" data-toggle="collapse" data-target="#mobile-menu" aria-controls="mobile-menu" aria-expanded="true" aria-label="Toggle navigation">
              <i class="gr-cross-icon"></i>
            </button>
          </div>
          <div v-if="!loggedIn" class="header-btn  ml-auto ml-lg-5 mr-6 mr-lg-0 d-none d-xs-block">
            <router-link class="btn btn-primary gr-text-9 d-none d-xs-inline-flex " to="/register">
              Register
            </router-link>
          </div>
          <!-- Mobile Menu Hamburger-->
          <button class="navbar-toggler btn-close-off-canvas  hamburger-icon border-0" type="button" data-toggle="collapse" data-target="#mobile-menu" aria-controls="mobile-menu" aria-expanded="false" aria-label="Toggle navigation">
            <!-- <i class="icon icon-simple-remove icon-close"></i> -->
            <span class="hamburger hamburger--squeeze js-hamburger">
          <span class="hamburger-box">
            <span class="hamburger-inner"></span>
            </span>
            </span>
          </button>
          <!--/.Mobile Menu Hamburger Ends-->
        </nav>
      </div>
    </header>
    <!-- navbar-dark -->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'navHeader',
  computed: {
    ...mapGetters(['loggedIn'])
  },
  methods: {
    logout () {
      this.$store.dispatch('logoutToken')
        .then(() => {
          this.$router.push('/')
          this.$notify({
            title: 'Success',
            message: 'You\'ve successfully logged out',
            type: 'success',
            position: 'top-right',
            duration: 4500
          })
        })
    }
  }

}
</script>

<style scoped>
a:hover {
 cursor:pointer;
}
</style>
