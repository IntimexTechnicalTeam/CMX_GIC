<template>
 <div class="VrContentMain">
    <iframe :src="VrUrl" width="100%" height="100%" frameborder="0"></iframe>
 </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
})
export default class InsCmsContent extends Vue {
  VrUrl:string='';
  get key () {
    return this.$route.params.key;
  }
  get isMobile () {
    return this.$store.state.isMobile;
  }
  getContent () {
    this.$Api.cms.getContentByDevice({ Key: this.key, ContentId: this.key, IsMobile: this.isMobile }).then(result => {
      this.VrUrl = result.CMS.Url;
      console.log(this.VrUrl, 'VrUrl');
      if (result.CMS.Title) document.title = result.CMS.Title;
    });
  }
  mounted () {
    this.getContent();
  }
}
</script>
<style scoped lang="less">
.VrContentMain {
    width: 100%;
    height: 100vh;
}
</style>
