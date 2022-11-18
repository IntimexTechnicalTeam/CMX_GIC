<template>
<div class="MainContainer">
  <!-- AboutUs -->
  <div class="AboutUs">
       <p class="AboutUsHtml" v-html="AboutUs.Body"></p>
  </div>
    <!-- OurDentist -->
  <div class="OurDentist">
       <p class="OurDentistHtml" v-html="OurDentist.Body"></p>
  </div>
    <!-- OurServices -->
  <div class="OurServices">
       <p class="OurServicesHtml" v-html="OurServices.Body"></p>
  </div>
  <!-- FAQ -->
  <div class="FAQ">
    <!-- Mobile -->
    <div class="InnerBox" v-if="isMobile">
      <p class="Toptitle"><span class="greenFont"  :class="currentlang!=='E'?'chi':''">{{$t('Gic.FAQtitleA')}}</span><span class="blackFont" :class="currentlang!=='E'?'chi':''">{{$t('Gic.FAQtitleB')}}</span></p>
      <div class="perList">
          <router-link to="/cms/catDetail/40123" class="tp1"><span>{{$t('Gic.FAQtipsA')}}</span></router-link>
          <router-link to="/cms/catDetail/40124" class="tp2"><span>{{$t('Gic.FAQtipsB')}}</span></router-link>
          <router-link to="/cms/catDetail/40125" class="tp3"><span>{{$t('Gic.FAQtipsC')}}</span></router-link>
      </div>
      <p class="facebookHtml" v-html="Facebook.Body"></p>
    </div>
    <!-- PC -->
    <div class="InnerBox" v-else>
      <p class="Toptitle"><span class="greenFont"  :class="currentlang!=='E'?'chi':''">{{$t('Gic.FAQtitleA')}}</span><span class="blackFont" :class="currentlang!=='E'?'chi':''">{{$t('Gic.FAQtitleB')}}</span></p>
      <div class="PcInner">
        <div class="left">
            <p class="facebookHtml" v-html="Facebook.Body"></p>
        </div>
        <div class="right">
             <div class="perList">
              <router-link to="/cms/catDetail/40123" class="tp1"><span>{{$t('Gic.FAQtipsA')}}</span></router-link>
              <router-link to="/cms/catDetail/40124" class="tp2"><span>{{$t('Gic.FAQtipsB')}}</span></router-link>
              <router-link to="/cms/catDetail/40125" class="tp3"><span>{{$t('Gic.FAQtipsC')}}</span></router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class CmxAboutUs extends Vue {
  AboutUs: object = {};
  OurDentist:object = {};
  OurServices:object = {};
  Facebook:object ={};

  // 获取自定义内容
  getContent () {
    /* 关于我们 */
    this.$Api.cms.getContentByDevice({ key: 'AboutUs', IsMobile: this.isMobile }).then(result => {
      this.AboutUs = result.CMS;
      this.$nextTick(() => {
        var url = window.location.toString().split('#')[1];
        if (url) {
          setTimeout(() => { (document.getElementById(url) as HTMLElement).scrollIntoView(true); }, 1);
          setTimeout(() => { window.scrollBy(0, 0); });
          this.$store.dispatch('isShowMenu', false);
        }
        this.$HiddenLayer();
      });
    });
    /* 我們的牙醫 */
    this.$Api.cms.getContentByDevice({ key: 'OurDentist', IsMobile: this.isMobile }).then(result => {
      this.OurDentist = result.CMS;
      this.$nextTick(() => {
        var url = window.location.toString().split('#')[1];
        if (url) {
          setTimeout(() => { (document.getElementById(url) as HTMLElement).scrollIntoView(true); }, 1);
          setTimeout(() => { window.scrollBy(0, 0); });
          this.$store.dispatch('isShowMenu', false);
        }
        this.$HiddenLayer();
      });
    });
    /* 服務提供 */
    this.$Api.cms.getContentByDevice({ key: 'OurServices', IsMobile: this.isMobile }).then(result => {
      this.OurServices = result.CMS;
      this.$nextTick(() => {
        var url = window.location.toString().split('#')[1];
        if (url) {
          setTimeout(() => { (document.getElementById(url) as HTMLElement).scrollIntoView(true); }, 1);
          setTimeout(() => { window.scrollBy(0, 0); });
          this.$store.dispatch('isShowMenu', false);
        }
        this.$HiddenLayer();
      });
    });
    /* Facebook */
    this.$Api.cms.getContentByDevice({ key: 'Facebook', IsMobile: this.isMobile }).then(result => {
      this.Facebook = result.CMS;
      console.log(this.Facebook, 'this.Facebook');
    });
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }
  get currentlang () {
    return this.$i18n.locale;
  }
  mounted () {
    this.getContent();
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getContent();
  }
}
</script>

<style lang="less" scoped>
.pc {
  .MainContainer {
    width: 100%;
    display: inline-block;
    .AboutUs {
      width: 100%;
      display: inline-block;
      margin-top: 2rem;
      .AboutUsHtml {
        width: 1200px;
        margin: 0 auto;
        /deep/ .HomeAboutMain {
          width: 100%;
          display: inline-block;
          background: url('/static/images/pc/pc_10.jpg') no-repeat center center;
          background-size: 100% 100%;
          height: 450px;
          .Innerbox {
            width: 48%;
            padding-top: 5rem;
            float: right;
            .title {
              font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
              font-size: 30px;
              text-transform: uppercase;
              color: #fff;
            }
            p{
              font-size: 22px;
              color: #fff;
              line-height: 28px;
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
    .OurDentist {
      width: 100%;
      display: inline-block;
      background: url('/static/images/pc/pc_11.jpg') no-repeat center center;
      background-size: 100% 100%;
      padding-bottom: 2rem;
      margin-top: 2rem;
      .OurDentistHtml {
        width: 810px;
        margin: 0 auto;
        background: @base_color;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 30px;
        margin-top: 2rem;
        /deep/ .OurDentistMain {
          background: #fafcf4;
          border-radius: 30px;
          padding-top: 2rem;
          .title {
            width: 100%;
            display: inline-block;
            text-align: center;
            span {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
            font-size: 30px;
            text-transform: uppercase;
            }
            .gcolor {
                color: #a4c02a;
              }
            .bcolor {
                color: #393e46;
              }
          }
          .Innerbox {
            width: 80%;
            margin: 0 auto;
            padding-top: 1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-bottom: 2rem;
            .left {
              width: 40%;
              img {
                width: 100%;
              }
            }
            .right {
              width: 57%;
              .HeadTitle {
                color: #393e46;
                font-size: 24px;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                line-height: 30px;
              }
              .ColorText {
                color: @base_color;
                font-size: 22px;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                line-height: 30px;
              }
              .NormalText {
                font-size: 20px;
                color: #666;
                line-height: 26px;
              }
              .bottom20 {
                margin-bottom: 1rem;
              }
            }
          }
        }
      }
    }
    .OurServices {
      width: 100%;
      display: inline-block;
      padding-top: 3rem;
      padding-bottom: 3rem;
      .OurServicesHtml {
        width: 1200px;
        display: flex;
        margin: 0 auto;
        flex-wrap: wrap;
        /deep/ .OurServicesMain {
          #OurServices{
            padding-top: 2rem;
          }
          .BigTitle {
            width: 100%;
            display: inline-block;
            text-align: center;
            margin-bottom: 2rem;
            span {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
            font-size: 30px;
            text-transform: uppercase;
            }
            .gcolor {
                color: #a4c02a;
              }
            .bcolor {
                color: #393e46;
              }
          }
          .InnerWarper {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .left {
              width: 52%;
                .titleBold {
                    font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                    font-size:24px;
                    text-transform: uppercase;
                    text-align: left;
                    margin-bottom: 0.5rem;
                }
                .perData {
                  width: 100%;
                  display: inline-block;
                  ul {
                    width: 100%;
                    display: flex;
                    flex-wrap: wrap;
                    li{
                      width: 18%;
                      float: left;
                      margin-right: 2.5%;
                      margin-bottom: 5%;
                      &:nth-child(5n) {
                        margin-right: 0px!important;
                      }
                      .imgs {
                        width: 100%;
                        display: inline-block;
                        img {
                          width: 80%;
                          margin: 0 auto;
                          display: block;
                        }
                      }
                      .desc {
                        text-align: center;
                        font-size: 18px;
                        line-height: 26px;
                        color: #666666;
                      }
                    }
                  }
                }
            }
            .right {
                  width: 46%;
                  .topTips {
                  color: #666;
                  font-size: 20px;
                  line-height: 26px;
                  text-align: left;
                  margin-top: 1rem;
                  margin-bottom: 1rem;
                }
                .bottomTips {
                  font-size: 20px;
                  color: #333333;
                  line-height: 26px;
                  text-align: left;
                    .colortext {
                      color: @base_color;
                      &:hover {
                        text-decoration: underline;
                      }
                    }
                }
            }
          }
        }
      }
    }
    .FAQ {
      width: 100%;
      display: inline-block;
      background: url('/static/images/pc/pc_31.jpg') no-repeat center center;
      background-size: cover;
      padding-top: 2rem;
      padding-bottom: 2rem;
      .InnerBox {
        width: 1200px;
        margin: 0 auto;
        .PcInner {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          .left {
            width: 48%;
            .facebookHtml {
              width: 100%;
              display: inline-block;
              margin-top: 2rem;
            }
         }
         .right {
          width: 48%;
          padding-top: 3rem;
            .perList {
              width: 100%;
              display: inline-block;
              a{
                &:hover {
                  span{
                    text-decoration: underline;
                  }
                }
              }
              .tp1 {
                width: 100%;
                display: inline-block;
                background: url('/static/images/pc/pc_12.png') no-repeat center center;
                height: 8rem;
                background-size: contain;
                margin-bottom: 1rem;
                span {
                  width: 80%;
                  float: left;
                  height: 8rem;
                  line-height: 8rem;
                  color: #fff;
                  font-size: 26px;
                  margin-left: 30%;
                }
              }
              .tp2 {
                width: 100%;
                display: inline-block;
                background: url('/static/images/pc/pc_14.png') no-repeat center center;
                height: 8rem;
                background-size: contain;
                margin-bottom: 1rem;
                span {
                  width: 80%;
                  float: left;
                  height: 8rem;
                  line-height: 8rem;
                  color: #fff;
                  font-size: 26px;
                  margin-left: 30%;
                }
              }
            .tp3 {
                width: 100%;
                display: inline-block;
                background: url('/static/images/pc/pc_16.png') no-repeat center center;
                height: 8rem;
                background-size: contain;
                margin-bottom: 1rem;
                span {
                  width: 80%;
                  float: left;
                  height: 8rem;
                  line-height: 8rem;
                  color: #fff;
                  font-size: 26px;
                  margin-left: 30%;
                }
              }
            }
         }
        }
        .Toptitle {
          width: 100%;
          display: inline-block;
          text-align: center;
          margin-bottom: 2rem;
          span {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
            font-size: 30px;
            text-transform: uppercase;
          }
          .greenFont {
            color: @base_color;
            -webkit-text-stroke: 1px #fff;
          }
          .blackFont {
            color: #000;
             -webkit-text-stroke: 1px #fff;
          }
          .chi {
            font-size: 40px!important;
            font-weight: 700;
          }

        }
      }

    }
  }
}

.mobile {
  .MainContainer {
    width: 100%;
    display: inline-block;
    .AboutUs {
      width: 100%;
      display: inline-block;
      margin-top: 2rem;
      .AboutUsHtml {
        width: 90%;
        margin: 0 auto;
        /deep/ .HomeAboutMain {
          width: 100%;
          display: inline-block;
          background: url('/static/images/mobile/mobile_05.jpg') no-repeat center center;
          background-size: 100% 100%;
          height: 40rem;
          .Innerbox {
            width: 90%;
            margin: 0 auto;
            padding-top: 19rem;
            .title {
              font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
              font-size: 1.8rem;
              text-transform: uppercase;
              color: #fff;
            }
            p{
              font-size: 1.4rem;
              color: #fff;
              line-height: 1.6rem;
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
    .OurDentist {
      width: 100%;
      display: inline-block;
      background: url('/static/images/mobile/mobile_06.jpg') no-repeat center center;
      background-size: 100% 100%;
      padding-bottom: 2rem;
      margin-top: 2rem;
      .OurDentistHtml {
        width: 90%;
        margin: 0 auto;
        background: @base_color;
        padding-left: 10px;
        padding-right: 10px;
        border-radius: 30px;
        margin-top: 2rem;
        /deep/ .OurDentistMain {
          background: #fafcf4;
          border-radius: 30px;
          padding-top: 2rem;
          .title {
            width: 100%;
            display: inline-block;
            text-align: center;
            span {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
            font-size: 1.8rem;
            text-transform: uppercase;
            }
            .gcolor {
                color: #a4c02a;
              }
            .bcolor {
                color: #393e46;
              }
          }
          .Innerbox {
            padding: 1rem;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            padding-bottom: 2rem;
            .left {
              width: 40%;
              img {
                width: 100%;
              }
            }
            .right {
              width: 57%;
              .HeadTitle {
                color: #393e46;
                font-size: 1.4rem;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                line-height: 1.8rem;
              }
              .ColorText {
                color: @base_color;
                font-size: 1.4rem;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                line-height: 1.8rem;
              }
              .NormalText {
                font-size: 1.4rem;
                color: #666;
                line-height: 1.8rem;
              }
              .bottom20 {
                margin-bottom: 1rem;
              }
            }
          }
        }
      }
    }
    .OurServices {
      width: 100%;
      display: inline-block;
      padding-top: 3rem;
      padding-bottom: 3rem;
      .OurServicesHtml {
        width: 90%;
        display: flex;
        margin: 0 auto;
        flex-wrap: wrap;
        /deep/ .OurServicesMain {
          #OurServices{
            padding-top: 2rem;
          }
          .topbg {
            width: 100%;
            display: inline-block;
            background: url('/static/images/mobile/mobile_08.jpg') no-repeat center center;
            height: 15rem;
            background-size: contain;
            position: relative;
            .innerText {
              position: absolute;
              left: 50%;
              transform: translate(-50%,-50%);
              top: 0rem;
                span {
                font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
                font-size: 1.8rem;
                text-transform: uppercase;
                }
                .gcolor {
                    color: #a4c02a;
                  }
                .bcolor {
                    color: #393e46;
                  }
            }
          }
          .topTips {
            color: #666;
            font-size: 1.4rem;
            text-align: center;
          }
          .titleBold {
              font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
              font-size: 1.8rem;
              text-transform: uppercase;
              text-align: center;
              margin-top: 1rem;
              margin-bottom: 1rem;
          }
        .perData {
          width: 100%;
          display: inline-block;
          ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            flex-direction: row;
            li{
              width: 28%;
              margin-bottom: 5%;
              .imgs {
                width: 100%;
                display: inline-block;
                img {
                  width: 100%;
                  display: inline-block;
                }
              }
              .desc {
                text-align: center;
                font-size: 1.4rem;
                line-height: 1.6rem;
                color: #666666;
              }
            }
          }
        }
        .bottomTips {
          font-size: 1.4rem;
          color: #333333;
          line-height: 1.6rem;
          text-align: center;
            .colortext {
              color: @base_color;
            }
        }
        }
      }
    }
    .FAQ {
      width: 100%;
      display: inline-block;
      background: url('/static/images/mobile/mobile_10.jpg') no-repeat center center;
      background-size: cover;
      padding-top: 2rem;
      padding-bottom: 2rem;
      .InnerBox {
        width: 90%;
        margin: 0 auto;
        .Toptitle {
          width: 100%;
          display: inline-block;
          text-align: center;
          margin-bottom: 2rem;
          span {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
            font-size: 1.8rem;
            text-transform: uppercase;
          }
          .greenFont {
            color: @base_color;
            -webkit-text-stroke: 1px #fff;
          }
          .blackFont {
            color: #000;
             -webkit-text-stroke: 1px #fff;
          }
          .chi {
            font-size: 2.4rem!important;
            font-weight: 700;
          }

        }
        .perList {
          width: 100%;
          display: inline-block;
          .tp1 {
            width: 100%;
            display: inline-block;
            background: url('/static/images/pc/pc_12.png') no-repeat center center;
            height: 8rem;
            background-size: contain;
            span {
              width: 80%;
              float: left;
              height: 8rem;
              line-height: 8rem;
              color: #fff;
              font-size: 1.5rem;
              margin-left: 28%;
            }
          }
          .tp2 {
            width: 100%;
            display: inline-block;
            background: url('/static/images/pc/pc_14.png') no-repeat center center;
            height: 8rem;
            background-size: contain;
            span {
              width: 80%;
              float: left;
              height: 8rem;
              line-height: 8rem;
              color: #fff;
              font-size: 1.5rem;
              margin-left: 28%;
            }
          }
         .tp3 {
            width: 100%;
            display: inline-block;
            background: url('/static/images/pc/pc_16.png') no-repeat center center;
            height: 8rem;
            background-size: contain;
            span {
              width: 80%;
              float: left;
              height: 8rem;
              line-height: 8rem;
              color: #fff;
              font-size: 1.5rem;
              margin-left: 28%;
            }
          }
        }
        .facebookHtml {
          width: 100%;
          display: inline-block;
          margin-top: 2rem;
        }
      }

    }
  }
}
</style>
