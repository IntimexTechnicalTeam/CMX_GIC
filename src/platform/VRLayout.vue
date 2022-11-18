<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import $ from 'jquery';
@Component({
  components: {

  }
})
export default class VRLayout extends Vue {
  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>

<style lang="less">

</style>
