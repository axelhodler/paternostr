<template>
  <div>
    <NavBar/>
    <b-container class="mt-3">
      <Nuxt/>
    </b-container>
  </div>
</template>

<script>
import {relayPool} from "nostr-tools";

export default {
  name: "default",
  created() {
    const pool = relayPool()

    const damus = 'wss://relay.damus.io'
    pool.addRelay(damus, {read: true, write: false})

    this.$store.commit('setPool', pool)
  }
}
</script>

<style scoped>
</style>
