<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="/">paternostr - read only nostr client</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit="setActiveUserPubkey">
            <b-form-input v-model="activeUserPubkey" size="sm"
                          class="mr-sm-2 pubkey-field"
                          placeholder="Enter public key to use"></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" @click="setActiveUserPubkey">Set active</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      activeUserPubkey: undefined
    }
  },
  methods: {
    setActiveUserPubkey(event) {
      event.preventDefault()
      this.$store.commit("setActiveUserPubkey", this.activeUserPubkey)
    }
  }
}
</script>

<style scoped>
.pubkey-field {
  width: 600px;
}
</style>
