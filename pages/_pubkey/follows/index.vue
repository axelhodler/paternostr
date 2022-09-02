<template>
  <div>
    <h1>Follows</h1>
    <b-list-group v-if="!loading">
      <b-list-group-item v-for="contact in contacts" :key="contact.pubkey">
        <NuxtLink class="link-to-user" :to="'/' + contact.pubkey">
          <Follower :follower="contact"/>
        </NuxtLink>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-if="loading">
      <b-list-group-item>
        <PuSkeleton width="100" height="100px"></PuSkeleton>
      </b-list-group-item>
      <b-list-group-item>
        <PuSkeleton width="100" height="100px"></PuSkeleton>
      </b-list-group-item>
      <b-list-group-item>
        <PuSkeleton width="100" height="100px"></PuSkeleton>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      following: [],
      contacts: [],
      loading: true
    }
  },
  created() {
    const pool = this.$store.getters.getPool

    this.profile = this.$route.params.pubkey
    const alreadyFetchedFollowers = this.$store.getters.getFollows[this.profile]

    const gotFollowedUserMetadata = (event) => {
      const content = JSON.parse(event.content)
      this.contacts.push({
        pubkey: event.pubkey,
        name: content.name,
        about: content.about,
        picture: content.picture
      })
      this.loading = false
    }

    if (!alreadyFetchedFollowers) {
      const fetchFollowersSub = pool.sub({
        cb: (event) => {
          this.following = event.tags.map(item => item[1])
          this.$store.commit("setFollows", {pubkey: this.profile, following: this.following})
          fetchFollowersSub.unsub()
          pool.sub({
            cb: gotFollowedUserMetadata,
            filter: {kinds: [0], authors: this.following}
          })
          this.loading = false
        }, filter: {kinds: [3], authors: [this.profile]}
      })
    } else {
      this.following = alreadyFetchedFollowers
      pool.sub({
        cb: gotFollowedUserMetadata,
        filter: {kinds: [0], authors: this.following}
      })
    }
  }
}
</script>

<style scoped>
.link-to-user {
  color: black;
  text-decoration: none !important; /* no underline */
}
</style>
