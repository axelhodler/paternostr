import Vue from 'vue'

export const formatTimestamp = (timestamp) =>
  new Date(timestamp * 1000)
    .toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .replace(',', ' -')

export const shortenAddress = (address) => {
  return address.replace(/(.{5}).{50}(.{4})/, "$1…");
}

Vue.filter('shortenAddress', shortenAddress)
Vue.filter('formatTimestamp', formatTimestamp)
