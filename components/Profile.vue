<template>
  <div>
    <div class="d-flex w-100 justify-content-between">
      <div class="flex-column" v-if="metadata">
        <img v-if="metadata.picture" :src="metadata.picture" class="picture"/>
        <p class="mb-1">{{ metadata.name }}</p>
        <small>
          {{ metadata.about }}
        </small>
        <b-badge v-if="openedProfileIsContact">Followed by active key</b-badge>
        <small>
          <NuxtLink :to="pubkey + '/follows'">
            <p v-if="follower_count > 0" class="mb-1">Following: {{ follower_count }}</p>
          </NuxtLink>
        </small>
      </div>
      <div class="justify-content-around">
        <b-button v-show="false"
                  variant="primary"
                  v-if="!openedProfileIsContact"
                  @click="followThisUser">Follow
        </b-button>
      </div>
    </div>

  </div>
</template>

<script>
import {getPublicKey} from 'nostr-tools'

export default {
  name: "Profile",
  props: ['metadata', 'pubkey', 'follower_count'],
  data() {
    return {
      openedProfileIsContact: false
    }
  },
  created() {
    this.openedProfileIsContact = this.$store.getters.getContacts.includes(this.pubkey)
  },
  methods: {
    followThisUser() {
      const pool = this.$store.getters.getPool

      const pk = 'TBD'

      pool.setPrivateKey(pk)

      pool.publish({
        pubkey: getPublicKey(pk),
        created_at: Math.floor(new Date() / 1000),
        kind: 3,
        tags: [['p', this.pubkey]],
        content: JSON.stringify(pool.relays)
      })
    }
  }
}
</script>

<style scoped>
.picture {
  height: 100px;
  width: 100px;
  border-radius: 50px;
}
</style>
