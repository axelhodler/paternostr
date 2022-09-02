<template>
  <div>
    <NuxtLink class="link-to-event"
              :to="'/' + message.author + '/status/' + message.id">
      <div>
        <div class="d-flex flex-row">
          <div v-if="userMetadata">
            <img class="picture" :src="userMetadata.picture"/>
          </div>
          <div v-else>
            <PuSkeleton class="picture" width="50px" height="50px" circle></PuSkeleton>
          </div>
          <div class="d-flex w-100 justify-content-between flex-column">
            <div class="d-flex justify-content-between flex-row">
              <NuxtLink :to="'/' + message.author">
                <div v-if="userMetadata">
                  <p class="mb-0">
                    {{ userMetadata.name }}
                  </p>
                </div>
                <div v-else>
                  <p class="mb-0">{{ message.author | shortenAddress }}</p>
                </div>
              </NuxtLink>
              <div>
                <small>{{ message.created_at | formatTimestamp }}</small>
              </div>
            </div>

            <div class="d-flex w-100 justify-content-between flex-row">
              <div v-if="replyingTo.length > 0">
                <small>Replying to
                  <span v-for="reply in replyingTo">
                    <NuxtLink :to="'/' + reply">
                      {{ reply | shortenAddress }}
                    </NuxtLink>
                  </span>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <p class="mt-1 mb-1">
          {{ message.content }}
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: "FeedEntry",
  props: ['message'],
  data() {
    return {
      replyingTo: [],
    }
  },
  computed: {
    userMetadata() {
      return this.$store.getters.getContactMetadata.find(item => item.pubkey === this.message.author)
    }
  },
  created() {
    const meta = this.$store.state.contactMetadata[this.message.author]
    if (!meta) {
      // fetch
    }
    this.replyingTo = this.message.tags
      .filter(tag => tag[0] === 'p')
      .map(tag => tag[1])
  }
}
</script>

<style scoped>
.link-to-event {
  color: black;
  text-decoration: none !important; /* no underline */
}

.picture {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  margin: 0 15px 0 0;
}
</style>
