<template>
  <div>
    <h1>Profile</h1>
    <Profile :metadata="metadata" :pubkey="profile" :follower_count="following.length"/>
    <b-list-group>
      <b-list-group-item v-for="message in sortedMessagesLatestFirst" :key="message.id">
        <FeedEntry :message="message"/>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>

export default {
  name: "index.vue",
  data() {
    return {
      profile: undefined,
      messages: [],
      following: [],
      metadata: {}
    }
  },
  computed: {
    sortedMessagesLatestFirst() {
      return this.messages.sort((a, b) => b.created_at - a.created_at)
    }
  },
  created() {
    this.profile = this.$route.params.pubkey
    const pool = this.$store.getters.getPool

    const onPublicMessageEvent = (event) => {
      if (event.kind === 1) {
        const message = {
          id: event.id,
          content: event.content,
          author: event.pubkey,
          created_at: event.created_at,
          tags: event.tags
        }
        if (!this.messages.find(item => item.id === message.id)) {
          this.messages.push(message)
        }
      } else if (event.kind === 0) {
        this.metadata = JSON.parse(event.content)
        this.$store.commit("addUserMetadata", {
          pubkey: event.pubkey,
          name: this.metadata.name,
          picture: this.metadata.picture
        })
      } else { // contacts
        this.following = event.tags.map(item => item[1])
        this.$store.commit("setFollows", {pubkey: this.profile, following: this.following})
      }
    }

    pool.sub({cb: onPublicMessageEvent, filter: {kinds: [1], authors: [this.profile], limit: 10}})
    pool.sub({cb: onPublicMessageEvent, filter: {kinds: [0, 3], authors: [this.profile]}})
  }
}
</script>

<style scoped>

</style>
