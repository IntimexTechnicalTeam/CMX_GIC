<template>
    <div class="header-box">
        <!-- PC头部 -->
        <div class="pcHeader" v-if="!isMobile">
            <div class="flex-box">
              <ins-logo />
               <ins-menu/>
            </div>
            <ins-lang-switch  />
        </div>
        <!-- Mobile头部 -->
        <div class="mobileHeader" v-else>
           <div class="topbar">
              <div class="left"><img src="/static/images/pc/pc_36.png"><a class="text" href="tel:85237039230">3703 9230</a></div>
              <div class="right">
                  <img src="/static/images/pc/pc_37.png">
                  <span class="text">1408 Melbourne Plaza, 33 Queen’s Road Central, Hong Kong</span>
              </div>
           </div>
           <div class="flex-box">
            <ins-logo />
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
    InsMenu: () => import('@/components/business/header/InsMenu.vue')
  }
})
export default class DefaultHeader extends Vue {
  @Prop() private showInFixed!: boolean;

  key: string = '';

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
      background-color: @base_color;
      width: 86.5%;
      min-width:1100px;
      margin: 0 auto;
      position: relative;

      .flex-box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: 120px;
        padding: 0 1.6% 0 4.2%;
        box-sizing: border-box;

        .logo {
          width: 13%;
          min-width: 170px;
        }
      }

      /deep/ .langSwitch {
        position: absolute;
        font-size: 17px;
        color: #fff;
        top: 10px;
        right: 20px;
        p {
          &.active {
            color: #d5ee1f;
            font-weight: bold;
          }
        }
      }

      /deep/ .nav_menu {
        padding-top: 70px;
        max-width: 75%;
        >ul {
          >li {
            width: auto;
            padding: 18px 42px;

            a {
              color: #fff;
              font-size: 18px;
              padding: 0;
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
        background-color:#fff;
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 5rem;
        width: 100%;
        .logo {
          width: 20rem;
          position: absolute;
          bottom: -2rem;
          left: 0px;
          z-index: 999999;
        }

        .slide-menu {
          cursor: pointer;
          position: absolute;
          top: 1rem;
          right:1rem;
          z-index: 99999;
          outline: 0;
        }
      }
    }
}
</style>
