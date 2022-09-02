<template>
  <div>
    <div v-if="event">
      <b-list-group>
        <div v-if="referencedEvents.length > 0">
          <h1>Thread</h1>
          <b-list-group-item v-for="referencedEvent in referencedEvents" :key="referencedEvent.id">
            <FeedEntry :message="referencedEvent"/>
          </b-list-group-item>
        </div>
        <div v-else>
          <h1>Message</h1>
        </div>
        <b-list-group-item>
          <div v-if="referencedEvents.length > 0">
            ↑
          </div>
          <FeedEntry :message="event"/>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>

<script>
export default {
  name: "index.vue",
  data() {
    return {
      eventid: undefined,
      event: undefined,
      referencedEvents: [],
    }
  },
  created() {
    this.eventid = this.$route.params.eventid
    const pool = this.$store.getters.getPool

    const otherEventsInThread = (event) => {
      const referencedEvent = {
        id: event.id,
        content: event.content,
        author: event.pubkey,
        created_at: event.created_at,
        tags: event.tags,
      }
      if (!this.referencedEvents.find(item => item.id === referencedEvent.id)) {
        this.referencedEvents.push(referencedEvent)
      }
    }

    const gotUsersMetadata = (event) => {
      const content = JSON.parse(event.content)
      this.$store.commit("addUserMetadata", {
        pubkey: event.pubkey,
        name: content.name,
        picture: content.picture
      })
    }

    const getCurrentEvent = pool.sub({
      cb: (event) => {
        this.event = {
          id: event.id,
          content: event.content,
          author: event.pubkey,
          created_at: event.created_at,
          tags: event.tags
        }
        const referredToEvents = event.tags
          .filter(tag => tag[0] === 'e')
          .map(tag => tag[1])
        const referredToUsers = event.tags
          .filter(tag => tag[0] === 'p')
          .map(tag => tag[1])
        getCurrentEvent.unsub()
        pool.sub({
          cb: gotUsersMetadata,
          filter: {kinds: [0], authors: referredToUsers.concat(event.pubkey)}
        })
        pool.sub({cb: otherEventsInThread, filter: {kinds: [1], ids: referredToEvents}})

      }, filter: {kinds: [1], ids: [this.eventid]}
    })
  }
}
</script>

<style scoped>

</style>
