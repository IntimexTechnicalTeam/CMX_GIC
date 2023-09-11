<template>
    <div class="MainBar">
        <div class="topBar">
            <div class="left">
                 <ins-lang-switch />
            </div>
            <div class="center">
                <span class="loginBtn"><MobileInsLogin/></span>
            </div>
            <div class="right">
                <a href="https://www.facebook.com/gicdental/" target="_blank"><img src="/static/images/mobile/t02.jpg"></a>
            </div>
        </div>
        <div id="menu">
            <Menu :backColor="'@base_color'" :textColor="'#fff'" :uniqueOpened="true" />
        </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({
  components: {
    InsLogo: () => import('@/components/base/InsLogo.vue'),
    Menu: () => import('@/components/business/header/InsElMenu.vue'),
    InsLangSwitch: () => import('@/components/business/header/InsLangSwitch.vue'),
    MobileInsLogin: () => import('@/components/business/header/MobileInsLogin.vue')
  }
})
export default class InsMenuLayout extends Vue {
  showMemNav: boolean = false;
  searchKey: string = '';

  handleOpen (key, keyPath) {
    console.log(key, keyPath);
  }
  handleClose (key, keyPath) {
    console.log(key, keyPath);
  }

  closeSlideMenu () {
    this.$store.dispatch('isShowMenu', false);
  }

  search () {
    this.closeSlideMenu();
    this.$router.push({ path: `/product/search/${this.searchKey}` });
    this.searchKey = '';
  }

  get user () {
    return this.$store.state.user;
  }

  get isLogin () {
    return this.$store.state.isLogin;
  }
}
</script>

<style lang="less">
.sidebar-container {
    background-color: #fff !important;
}
.MainBar {
    padding-top: 2rem;
    .topBar {
        width: 90%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        height: 2.5rem;
        margin-top: 2rem;
        .left {
            width: calc(33.3% - 1px);
            display: flex;
            justify-content: center;
            align-items: center;
        }
       .center {
            width: calc(33.3% - 1px);
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #eee;
        }
        .right {
            width: calc(33.3% - 1px);
            display: flex;
            justify-content: center;
            align-items: center;
            border-left: 1px solid #eee;
            img {
                width: 35px;
            }
        }
    }
}
#menu {
    margin-top: 2rem;
    margin-bottom: 3.8rem;
    .el-submenu__icon-arrow {
        display: none;
    }

    .el-submenu__title {
        height: auto;
        line-height: unset;
        padding: 0 !important;
    }

    > .el-menu {
        background-color: transparent;
        border: 0;

        .el-submenu__icon-arrow {
            display: none;
        }

        > li {
            // border-top: 1px solid #eee;
            // margin-bottom: 1rem;
            background-color: #f5f5f5 !important;
            height: auto;
            line-height: unset;
            width: 90%;
            margin: 0 auto;
            margin-bottom: 1rem;
            border-radius: 20px;
            >.el-submenu__title {
                background-color: #f5f5f5 !important;
            }

            > a {
                color: #4c4c4c!important;
            }

            span, a {
                padding: 1rem 2rem;
                display: block;
                font-size: 1.5rem;
                text-align: center;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei'!important;
                text-transform: uppercase;
                img {
                    width: 1.5rem;
                    margin-right: 1rem;
                }
            }

            a {
                text-decoration: none;
            }

            > ul[role="menu"] {
                li {
                    background-color: #434343 !important;
                    .el-submenu__title{
                        position: relative;

                        &:after {
                            content: "";
                            width: 1rem;
                            height: 100%;
                            background-color: @base_color;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                    }
                }

                >li {
                    > ul {
                        >li {
                            > .el-submenu__title{
                                background-color: #313131 !important;
                            }

                            > ul {
                                li {
                                    background-color: #313131 !important;
                                }
                            }

                            > a {
                                background-color: #313131;
                            }
                        }
                    }

                    > .el-submenu__title{
                        background-color: #434343 !important;
                    }
                }
            }
        }

        .opened {
            &.is-opened {
                >.el-submenu__title {
                    border-bottom: 0;
                    span {
                        color: #fff !important;
                    }
                }
            }
        }

        ul[role="menu"] {
            li {
                .opened();
            }

        }

        li {
            line-height: unset;
            padding: 0 !important;
            min-width: unset;
            height: auto;
            .opened();

            i {
                color: #fff;
            }
        }
    }

    li[aria-haspopup="true"] {
        >.el-submenu__title {
            background-image: url(/static/Images/minus-arrow-down-w.png);
            background-repeat: no-repeat;
            background-position: right 1.5rem center;
            background-size: 1.2rem;
        }

        &.is-opened {
            >.el-submenu__title {
                background-image: url(/static/Images/close-w.png);
            }
        }
    }
}
</style>

<style scoped lang="less">
.header_logo {
    height: 7rem;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem 0 1.5rem;
    border-bottom: 4px solid #acbd30;
    background-color: #fff;

    .el-icon-close {
        color: #777777;
        font-size: 2.8rem;
    }

    a {
        width: 12rem;
    }

    .slide-menu {
        cursor: pointer;
    }
}
.loginBtn {
    position: relative;
}
/deep/ .langSwitch {
    font-size: 1.5rem;
    color: #106919;
    text-align: center;
    p {
        font-size: 1.5rem;
        display: inline-block;
        color: #fff;
        margin: 0 0.8rem;

        &.active {
            color: #127437;
            font-weight: bold;
        }
    }
}
</style>
