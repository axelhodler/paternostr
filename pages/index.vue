<template>
  <div>
    <Feed :user="user"/>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      followers: [],
      user: undefined
    }
  },
  watch: {
    '$store.state.activeUserPubkey'() {
      this.initUser()
    },
  },
  created() {
    this.initUser()
    const pubkeyParam = this.$route.query.pubkey
    // validate these
    if (pubkeyParam) {
      this.$store.commit("setActiveUserPubkey", pubkeyParam)
    }
  },
  methods: {
    initUser() {
      const pool = this.$store.getters.getPool
      const onGettingContactsMetadata = (event) => {
        const metadata = JSON.parse(event.content)
        this.$store.commit("addUserMetadata", {
          pubkey: event.pubkey,
          name: metadata.name,
          picture: metadata.picture
        })
      }

      const onGettingContacts = (event) => {
        this.followers = event.tags.map(item => item[1])
        this.$store.commit("setContacts", this.followers)
        pool.sub({cb: onGettingContactsMetadata, filter: {kinds: [0], authors: this.followers}})
      }

      this.user = this.$store.getters.getActiveUserPubkey
      pool.sub({cb: onGettingContacts, filter: {kinds: [3], authors: [this.user]}})
    }
  }
}
</script>
