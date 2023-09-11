<template>
    <div class="header-box">
        <!-- PC头部 -->
        <div class="pcHeader" v-if="!isMobile">
           <div class="topbar">
              <div class="left">
                <div class="perlist">
                    <img src="/static/images/pc/pc_36.png"><a class="text" href="tel:85237039230">3703 9230</a>
                </div>
                <div class="perlist">
                  <img src="/static/images/pc/pc_37.png">
                  <a class="text" :href="googleAddress" target="_blank">{{$t('Gic.topAddress')}}</a>
                </div>
              </div>
              <div class="right">
                    <ins-lang-switch  />
                    <a href="https://www.facebook.com/gicdental/" class="fb"  target="_blank"><img src="/static/images/pc/pc_35.png"></a>
                    <span class="loginBtn"><InsLogin/></span>
              </div>
           </div>
            <div class="flex-box">
              <div class="left">
                <a href="/" class="toplogo"><img src="/static/images/pc/pc_38.png"></a>
              </div>
              <div class="right">
                  <ins-menu/>
              </div>
            </div>
        </div>
        <!-- Mobile头部 -->
        <div class="mobileHeader" v-else>
           <div class="topbar">
              <div class="left"><img src="/static/images/pc/pc_36.png"><a class="text" href="tel:85237039230">3703 9230</a></div>
              <div class="right">
                  <img src="/static/images/pc/pc_37.png">
                  <a class="text" :href="googleAddress" target="_blank">{{$t('Gic.topAddress')}}</a>
              </div>
           </div>
           <div class="flex-box">
              <a href="/" class="toplogo"><img src="/static/images/pc/pc_38.png"></a>
            <img class="slide-menu" :src="menuShow?'/static/Images/mobile/mobile_01.jpg':'/static/Images/mobile/meun.jpg'" @click="showSlideMenu" />
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/InsLogo.vue'),
    InsLangSwitch: () => import('@/components/business/header/InsLangSwitch.vue'),
    InsMenu: () => import('@/components/business/header/InsMenu.vue'),
    InsLogin: () => import('@/components/business/header/InsLogin.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;

  key: string = '';
  googleAddress='https://www.google.com/maps/place/Gum+%26+Implant+Dental+Center/@22.28224,114.156599,15z/data=!4m5!3m4!1s0x0:0x94efd9375593a318!8m2!3d22.28224!4d114.156599?hl=zh-HK';
  showSlideMenu () {
    let isShow = !JSON.parse(JSON.stringify(this.menuShow));
    this.$store.dispatch('isShowMenu', isShow);
  }

  searchKeyChange () {
    // alert('search!');
    this.$store.dispatch('isShowMenu', false);
    this.$router.push({
      path: '/cms/search',
      name: 'search',
      params: {
        key: this.key
      }
    });
  }

  get menuShow () {
    return this.$store.state.isShowMenu;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  @Watch('$route', { deep: true })
  onRouteChange () {
    this.$store.dispatch('isShowMenu', false);
  }
}
</script>

<style scoped lang="less">
.pc {
    .header-box {
      background-size: cover;
      width: 100%;
      margin: 0 auto;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, .25);
      z-index: 99999;
      .topbar {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 10px;
        .left {
          width: 75%;
          padding-top: 10px;
          .perlist {
            display: flex;
            align-items: center;
            float: left;
            margin-right: 10px;
            font-size: 18px;
            color: #999999;
            a{
              font-size: 18px;
              color: #999999;
            }
          }
        }
        .right {
          width: 20%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          /deep/ .langSwitch {
            display: inline-block;
            margin-right: 20px;
          }
          .loginBtn {
            position: relative;
          }
          .fb {
            display: inline-block;
          }
        }
      }
      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        width: 1200px;
        margin: 0 auto;
        .left {
          width: 313px;
          position: relative;
          .toplogo {
            position: absolute;
            bottom: -55px;
            z-index: 99;
            padding: 10px;
            background: url(/static/images/pc/logobg.png) no-repeat center center;
            background-size: cover;
            img {
              width: 100%;
            }
          }
        }
        .right {
          display: flex;
        }
      }
      /deep/ .nav_menu {
        max-width: 100%;
        >ul {
          margin-bottom: .5rem;
          >li {
            width: auto;

            a {
              color: #4c4c4c;
              font-size: 18px;
              padding: .5rem 2rem;
              font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
              text-transform: uppercase;
              &:hover {
               background-image: linear-gradient(to right, rgb(207, 215, 1) , rgb(138, 179, 67));
                border-radius: 3rem;
                color: #fff;
              }
            }

            > ul {
              left: calc(50% - 120px);
            }

            ul {
              width: 240px;
              border: 0;
              box-shadow: 0 0 10px 0 @base_color;
              li {
                > a {
                  padding: 15px;
                  color: #676767;
                  font-size: 16px;
                }

                &:hover {
                  background-color: @menu_hover;
                  > a {
                    color: #fff;
                  }
                }
              }
            }
          }
        }
      }
    }
}

.mobile {
    .header-box {
      background-size: cover;
      width: 100%;
      margin: 0 auto;
      position: relative;
      background: #fff;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, .25);
      z-index: 99999;
      .topbar {
        width: 90%;
        margin: 0 auto;
        display: flex;
        padding-top: 1rem;
        .left {
          display: flex;
          align-items: flex-start;
          float: left;
          .text {
            font-size: 1.3rem;
            line-height: 1.3rem;
            white-space: nowrap;
            color: #333333;
          }
          img {
            width: 2rem;
          }
        }
        .right {
          float: left;
          width: 80%;
          margin-left: 2%;
          text-align: left;
          align-items: flex-start;
          display: flex;
          img {
            width: 2rem;
          }
          .text {
            font-size: 1.3rem;
            line-height: 1.3rem;
            color: #333333;
          }
        }
      }
      .flex-box {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
        width: 100%;
       .toplogo {
            position: absolute;
            bottom: -2.2rem;
            z-index: 99;
            padding: 10px;
            background: url(/static/images/pc/logobg.png) no-repeat center center;
            background-size: cover;
            width: 20rem;
            img {
              width: 100%;
            }
          }
        .slide-menu {
          cursor: pointer;
          position: absolute;
          top: 1rem;
          right:1.5rem;
          z-index: 99999;
          outline: 0;
        }
      }
    }
}
</style>
