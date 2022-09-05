# paternostr

The client for consoomers. No need to paste your private key into a webapp or generate it there.
See the [awesome-nostr list](https://github.com/aljazceru/awesome-nostr#clients) for better clients
who offer that functionality.

## Configuration

When bookmarking the page add some query parameters, `pubkey` and `relay` to the URL.
In most cases `pubkey` will be the pubkey you use to post with.

For example to choose both a public key (e.g. `3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d`) and a favorite relay (`wss://relay.nostr.info`)

[url.com?relay=wss://relay.nostr.info&pubkey=3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d](url.com?relay=wss://relay.nostr.info&pubkey=3bf0c63fcb93463407af97a5e5ee64fa883d107ef9e558472c4eb9aaaefa459d)

## Run

Install the dependencies and run on your machine

```
yarn install
yarn run
```

## Deploy to gh-pages

```
yarn generate
yarn deploy
```
