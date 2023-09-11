<template>
  <div>
    <ins-header />
    <router-view></router-view>
    <ins-copyright />
    <ins-slide-menu :direction="'right'" v-if="isMobile">
      <ins-menu-layout />
    </ins-slide-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component({
  components: {
    InsHeader: () => import('@/components/business/header/InsHeader.vue'),
    InsSlideMenu: () => import('@/components/business/header/InsSlideMenu.vue'),
    InsMenuLayout: () => import('@/components/business/header/InsMenuLayout.vue'),
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class RNPLayout extends Vue {
  get isMobile () {
    return this.$store.state.isMobile;
  }
}
</script>

<style lang="less">
.pc {
  min-width: 1200px;
}
</style>
