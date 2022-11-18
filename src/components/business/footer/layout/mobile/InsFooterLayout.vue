<template>
  <div id="footer">
    <div class="ContactBox">
        <p class="BigTitle"><span class="color">{{$t('Gic.Contact')}}</span><span class="normal">{{$t('Gic.Us')}}</span></p>
        <p class="Contact" v-html="footerContact.Body"></p>
        <p class="footerBtn">
           <router-link to="/cms/content/20321">{{$t('Gic.OnlineEnquiry')}}</router-link>
        </p>
    </div>
    <div class="footer-box">
        <div class="footer-menu">
          <Menu type="footer" :backColor="'#535353'" :textColor="'#fff'" :uniqueOpened="true" />
        </div>
      <ins-copyright />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    Menu: () => import('@/components/business/header/InsElMenu.vue'),
    InsCopyright: () => import('@/components/business/footer/InsCopyright.vue')
  }
})
export default class InsFooterLayout extends Vue {
  currentYear: number = 0;
  footerContact:string='';
  getContent () {
    this.$Api.cms.getContentByDevice({ key: 'ContactUs', IsMobile: true }).then(result => {
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

<style lang="less">
#footer {
  .footer-menu {
    padding-top: 2rem;
    padding-bottom: 2rem;
    >ul.el-menu {
      border: 0 !important;
      width: 90%;
      margin: 0 auto;
      >li.el-menu-item {
        // margin-bottom: 1rem;
        height: auto;
        line-height: unset;
        padding: 0 !important;
        background: #fff!important;
        border-bottom: 1px solid #eee!important;
        &:last-child {
          border-bottom: 0px!important;
        }
        > a {
          display: block;
          font-size: 1.5rem;
          text-align: left;
          color: #333333!important;
          padding-top: 1rem;
          padding-bottom: 1rem;
          position: relative;
          &::after {
            content: '';
            width: 25px;
            height: 25px;
            background: url('/static/images/pc/pc_54.jpg') no-repeat center center;
            background-size: 20px;
            position: absolute;
            top: 1rem;
            right: 1rem;
          }
        }

        &:last-child {
          border-bottom: 1px solid #e5e5e5;
        }
      }

      >li.el-submenu{
        >.el-submenu__title {
          margin-bottom: 1rem;
          height: auto;
          line-height: unset;
          padding: 0 !important;
          >.name {
            display: block;
            padding: 0.8rem 1.5rem;
            font-size: 1.1rem;
          }
        }

        .el-menu {
          margin-bottom: 1rem;
          .el-submenu__title {
            padding: 0 !important;
            height: auto;
            line-height: unset;
            text-align: center;

            .name {
              display: block;
              padding: 0.7rem 1.5rem;
              font-size: 1rem;
            }
          }

          .el-menu-item {
            padding: 0 !important;
            height: auto;
            line-height: unset;
            text-align: center;
            .name {
              display: block;
              padding: 0.7rem 1.5rem;
              font-size: 1rem;
            }
          }
        }
      }
    }

    a {
      text-decoration: none;
    }

    .el-submenu__icon-arrow {
      font-size: 0;
      width: 1.5rem;
      height: 1.3rem;
      background-image: url(/static/Images/plus-arrow-down.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    .el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
      font-size: 0;
      width: 1.5rem;
      height: 1.3rem;
      background-image: url(/static/Images/minus-arrow-up.png);
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
      transform: unset;
    }
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#footer {
  width: 100%;
  display: inline-block;
  padding-top: 2rem;
  .ContactBox {
    width: 90%;
    margin: 0 auto;
    .BigTitle {
      width: 100%;
      display: inline-block;
       text-align: center;
       margin-bottom: 1rem;
       span {
         font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei'!important;
         font-size: 1.8rem;
         text-transform: uppercase;
       }
       .color {
        color: @base_color;
       }
       .normal {
        color: #393e46;
       }
    }
    .Contact {
      width: 100%;
      display: inline-block;
      /deep/ .footerContact {
        width: 100%;
        display: inline-block;
        .Map {
          width: 100%;
          display: inline-block;
          margin-bottom: 2rem;
            img {
              width: 100%;
            }
          }
        .ContactInfo {
          width: 100%;
          display: inline-block;
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
                font-size: 1.4rem;
                text-transform: uppercase;
            }
          }
          .NormalText {
            font-size: 1.4rem;
            text-align: center;
            color: #666666;
          }
          .colorText {
            font-size: 1.4rem;
            text-align: center;
            color: @base_color;
          }
          .bottom20 {
            margin-bottom: 2rem;
          }
        }
      }
    }
    .footerBtn {
      width: 100%;
      display: inline-block;
      margin-top: 2rem;
      a {
        width: 100%;
        height: 4rem;
        display: inline-block;
        border-radius: 2rem;
        font-size: 1.6rem;
        line-height: 4rem;
        color: #fff;
        text-align: center;
        background: -webkit-linear-gradient(left , rgb(207, 215, 1) , rgb(138, 179, 67) 100%);
      }
    }
  }
 .footer-box {

 }
}
</style>
