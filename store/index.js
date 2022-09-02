export const state = () => ({
  contacts: [],
  follows: {},
  contactMetadata: [],
  pool: undefined,
  activeUserPubkey: '3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d' // fiatjaf
})

export const mutations = {
  setContacts(state, contacts) {
    state.contacts = contacts
  },
  setActiveUserPubkey(state, pubkey) {
    state.activeUserPubkey = pubkey
  },
  addUserMetadata(state, metadata) {
    state.contactMetadata.push(metadata)
  },
  setFollows(state, entry) {
    state.follows[entry.pubkey] = entry.following
  },
  setPool(state, pool) {
    state.pool = pool
  }
}

export const getters = {
  getActiveUserPubkey(state) {
    return state.activeUserPubkey
  },
  getContacts(state) {
    return state.contacts
  },
  getContactMetadata(state) {
    return state.contactMetadata
  },
  getFollows(state) {
    return state.follows
  },
  getPool(state) {
    return state.pool
  }
}
