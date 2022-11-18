<template>
  <div id="footer">
        <div class="ContactBox">
          <p class="Contact" v-html="footerContact.Body"></p>
      </div>
      <ins-copyright />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class InsFooterLayout extends Vue {
  currentYear: number = 0;
  footerContact:string='';
  getContent () {
    this.$Api.cms.getContentByDevice({ key: 'ContactUs', IsMobile: false }).then(result => {
      this.footerContact = result.CMS;
      console.log(this.footerContact, 'this.footerContact');
    });
  }
  created () {
    var date = new Date();
    this.currentYear = date.getFullYear();
    this.getContent();
  }

  mounted () {}
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#footer {
  width: 100%;
  display: inline-block;
  padding-top: 2rem;
  .ContactBox {
    width: 100%;
    padding-top: 2rem;
    border-top: 1px solid #eee;
    .Contact {
      width: 1200px;
      margin: 0 auto;
      /deep/ .footerContact {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding-bottom: 2rem;
          .footerBtn {
            width: 60%;
            margin: 0 auto;
            margin-top: .5rem;
            a {
              width: 100%;
              height: 55px;
              display: inline-block;
              border-radius: 2rem;
              font-size: 20px;
              line-height: 55px;
              color: #fff;
              text-align: center;
              background: -webkit-linear-gradient(left , rgb(207, 215, 1) , rgb(138, 179, 67) 100%);
            }
          }
        .BigTitle {
          width: 100%;
          display: inline-block;
          text-align: center;
          span {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei'!important;
            font-size: 30px;
            text-transform: uppercase;
          }
          .color {
            color: @base_color;
          }
          .normal {
            color: #393e46;
          }
        }
        .Map {
          width: 55%;
            img {
              width: 100%;
            }
          }
        .ContactInfo {
          width: 43%;
          .HeadTitle {
            width: 100%;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            align-items: center;
            em {
              font-style: normal;
            }
            .Tpa {
              width: 2rem;
              height: 2rem;
              display: inline-block;
              background: url('/static/images/pc/pc_37.png') no-repeat center center;
              background-size: 2rem;
            }
            .fontTitle {
                font-family: 'Baloo2-Bold', 'Microsoft YaHei'!important;
                font-size: 20px;
                text-transform: uppercase;
            }
          }
          .NormalText {
            font-size: 18px;
            text-align: center;
            color: #666666;
          }
          .colorText {
            font-size: 18px;
            text-align: center;
            color: @base_color;
          }
          .bottom20 {
            margin-bottom: .5rem;
          }
        }
      }
    }
  }
}
</style>
