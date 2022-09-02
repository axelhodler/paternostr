<template>
  <div>
    <div class="d-flex w-100 justify-content-between">
      <div class="flex-column">
        <img v-if="follower.picture" :src="follower.picture" class="picture"/>
        <div v-else>
          <PuSkeleton width="50px" height="50px" circle></PuSkeleton>
        </div>
        <p class="mb-1">{{ follower.name }}</p>
        <small v-if="follower.about">
          {{ follower.about }}
        </small>
        <small v-if="!follower.about">
          -
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Follower",
  props: ['follower'],
}
</script>

<style scoped>
.picture {
  height: 50px;
  width: 50px;
  border-radius: 25px;
}
</style>
