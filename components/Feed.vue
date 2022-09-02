<template>
  <div>
    <h3>
      Feed for {{ user | shortenAddress }}
    </h3>
    <b-list-group v-if="!loading">
      <b-list-group-item v-for="message in sortedMessagesLatestFirst" :key="message.id">
        <FeedEntry :message="message"/>
      </b-list-group-item>
    </b-list-group>
    <b-list-group v-if="loading">
      <b-list-group-item>
        <PuSkeleton width="100" height="120px"></PuSkeleton>
      </b-list-group-item>
      <b-list-group-item>
        <PuSkeleton width="100" height="120px"></PuSkeleton>
      </b-list-group-item>
      <b-list-group-item>
        <PuSkeleton width="100" height="120px"></PuSkeleton>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  name: "Feed",
  props: ['user'],
  data() {
    return {
      messages: [],
      loading: true
    }
  },
  watch: {
    '$store.state.contacts'() {
      this.messages = []
      this.fetchFeed()
    },
  },
  computed: {
    sortedMessagesLatestFirst() {
      return this.messages.sort((a, b) => b.created_at - a.created_at)
    }
  },
  methods: {
    fetchFeed() {
      const pool = this.$store.getters.getPool

      this.loading = true
      const onPublicMessageEvent = (event) => {
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
        this.loading = false
      }

      const contacts = this.$store.getters.getContacts
      pool.sub({cb: onPublicMessageEvent, filter: {kinds: [1], authors: contacts, limit: 100}})
    }
  }
}
</script>

<style scoped>

</style>
