<template>
  <div>
    <router-view />
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    mounted() {
      this.load();
      
      if (!this.isAuth) {
        this.$router.push('login')
      }
    },
    methods: {
      ...mapActions({
        load: 'load',
      })
    },
    computed: {
      ...mapState({
        isAuth: state => state.isAuth
      }),
    }
  }
</script>

<style>

</style>