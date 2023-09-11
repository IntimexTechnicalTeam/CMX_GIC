<template>
  <div id="container">
    <div class="CmsContent">
        <!-- 联络我们页面 -->
        <div v-if="content.Key=='NewContactUs'">
         <div class="TopBanner"
         v-bind:style="{backgroundImage:'url(' + content.Cover + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'cover'}"
         >
         <div class="BottomText">{{content.Title}}</div>
         </div>
          <div v-html="content.Body"></div>
          <div class="Form">
            <RNPForm formKey="ContactUs" />
          </div>
        </div>

        <!-- 其他页面 -->
        <div class="Normalpage" v-else>
          <h1 class="CmsContentTitle">{{content.Title}}</h1>
          <h1 class="CmsContentDesc">{{content.Desc}}</h1>
          <p v-html="content.Body" class="otherpage"></p>
        </div>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    Location: () => import('@/components/base/InsLocation.vue'),
    RNPForm: () => import('@/views/regNPay/regNPayForm.vue')
  }
})
export default class InsCmsContent extends Vue {
  content: object={};

  // 获取关于我们cms内容
  getContent () {
    this.$Api.cms.getContentByDevice({ ContentId: this.id, IsMobile: this.isMobile }).then(result => {
      this.content = result.CMS;
      // this.$HiddenLayer();
      console.log(this.content, 'this.contentthis.content');
      this.$nextTick(() => {
        if (result.CMS.Title) document.title = result.CMS.Title;
        (document.getElementsByName('keywords')[0] as any).content = result.CMS.SeoKeyword;
        (document.getElementsByName('description')[0] as any).content = result.CMS.SeoDesc;
        (document.getElementsByName('twitter:description')[0] as any).content = result.CMS.SeoDesc;
        (document.getElementsByName('twitter:title')[0] as any).content = result.CMS.Title;
      });
    });
  }

  get id () {
    return this.$route.params.id;
  }

  get isMobile () {
    return this.$store.state.isMobile;
  }

  mounted () {
    this.getContent();
    setTimeout(() => { window.scrollTo(0, 0); }, 50);
  }

  @Watch('isMobile', { deep: true })
  onMediaChange () {
    this.getContent();
  }

  @Watch('id', { deep: true })
  onKeyChange () {
    this.content = {};
    this.getContent();
  }
}
</script>
<style scoped lang="less">
.pc {
  #container {
    margin-top: -30px;
  }
  .Normalpage {
    width: 1200px;
    margin: 0 auto;
    .CmsContentTitle {
      font-size:30px;
      font-weight: 700;
      text-align: center;
      margin-top: 100px;
    }
    .CmsContentDesc {
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 20px;
      text-align: center;
    }
    .otherpage {
      /deep/ p {
        font-size: 20px;
        line-height: 26px;
      }
    }
  }

  .CmsContent {
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    .TopBanner {
      height: 500px;
      position: relative;
      .BottomText {
        position: absolute;
        bottom: -3rem;
        border: 2px solid #fff;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: .5rem 3rem;
        letter-spacing: 1px;
        font-size: 28px;
        color: #fff;
        border-radius: 2rem;
        text-transform: uppercase;
        font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
        background-image: linear-gradient(to right, rgb(207, 215, 1) , rgb(138, 179, 67));
      }
    }
  }

  .Form {
    /deep/ .RNPForm.default {
      background-color: #fff;
      .FormMain {
        width: 600px;
        min-width: auto;
        margin-top: 2rem;
        #content {
          .btn.save {
            border: 0;
            width: 100%;
           background-image: linear-gradient(to right, rgb(207, 215, 1) , rgb(138, 179, 67));
            border-radius: 0;
            font-size: 24px;
            height: 55px;
            margin: 0;
            border-radius: 3rem;
            font-weight: 500!important;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .form-group {
              padding: 0;
              border: 0;
              width: 100%;
              .checkbox {
                span {
                  font-size: 18px;
                  color: #666;
                }
              }
              .control-label {
                margin-bottom:.5rem!important;
                color: #666;
                font-size: 18px;
                font-weight: 500;
                span {
                  color: @base_color!important;
                }
              }
              .control-label-remark {
                display: none;
              }

              ::-webkit-input-placeholder{
                color: #000000;
              }
              ::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #000000;
              }
              :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #000000;
              }
              :-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #000000;
              }

              fieldset {
                &.text {
                  input[type="text"] {
                    border: 1px solid #e6e6e6;
                    height: 50px;
                    line-height: 50px;
                    padding-left: 1rem;
                    font-size: 18px;
                    box-sizing: border-box;
                    border-radius: 3px;
                    &:focus {
                      border: 1px solid @base_color;
                    }
                  }
                }

                &.email {
                  input[type="email"] {
                    border: 1px solid #e6e6e6;
                    height: 50px;
                    line-height: 50px;
                    padding-left: 1rem;
                    font-size: 18px;
                    box-sizing: border-box;
                    border-radius: 3px;
                    &:focus {
                      border: 1px solid @base_color;
                    }
                  }
                }

                &.textarea {
                  textarea {
                    height: 9rem;
                    border: 1px solid #e6e6e6;
                    padding: 1.3rem;
                    font-size: 1.2rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                    &:focus {
                      border: 1px solid @base_color;
                    }
                  }
                }
              }
            }
            p[name="error"] {
              color: @base_color;
            }
            .only_tilte {
              .control-label {
                color: @base_color;
                font-size: 20px;
                font-weight: 500;
              }
            }
          }
        }

        #preview {
          padding: 0;

          input[type="button"] {
            font-size: 1.1rem;
            height: 3.2rem;

            &:first-of-type {
              margin-top: 2rem;
            }
          }
        }
      }
    }
  }

  .clear {
    clear: both;
  }
}

.mobile {
  #container {
    margin-top: -30px;
  }
  .Normalpage {
    width: 90%;
    margin: 0 auto;
    .CmsContentTitle {
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-top: 6rem;
    }
    .CmsContentDesc {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 1rem;
      text-align: center;
    }
    .otherpage {
      /deep/ p {
        font-size: 1.4rem;
        line-height: 1.8rem;
      }
    }
  }

  .CmsContent {
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    .TopBanner {
      height: 22rem;
      position: relative;
      .BottomText {
        position: absolute;
        bottom: -3rem;
        border: 2px solid #fff;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: .5rem 2rem;
        letter-spacing: 1px;
        font-size: 1.6rem;
        color: #fff;
        border-radius: 2rem;
        text-transform: uppercase;
        font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
       background-image: linear-gradient(to right, rgb(207, 215, 1) , rgb(138, 179, 67));
      }
    }
  }

  .Form {
    /deep/ .RNPForm.default {
      background-color: #fff;
      .FormMain {
        width: 90%;

        #content {
          .btn.save {
            border: 0;
            width: 100%;
           background-image: linear-gradient(to right, rgb(207, 215, 1) , rgb(138, 179, 67));
            border-radius: 0;
            font-size: 1.6rem;
            height: 3.5rem;
            margin: 0;
            border-radius: 3rem;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            .form-group {
              padding: 0;
              border: 0;
              width: 100%;
              .control-label {
                margin-bottom: 1rem;
                color: #666;
                span {
                  color: @base_color!important;
                }
              }
            .checkbox {
                span {
                  font-size: 1.5rem;
                  color: #666;
                }
              }
              .control-label-remark {
                display: none;
              }

              ::-webkit-input-placeholder{
                color: #000000;
              }
              ::-moz-placeholder{   /* Mozilla Firefox 19+ */
                color: #000000;
              }
              :-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
                color: #000000;
              }
              :-ms-input-placeholder{  /* Internet Explorer 10-11 */
                color: #000000;
              }

              fieldset {
                &.text {
                  input[type="text"] {
                    border: 1px solid #e6e6e6;
                    padding: 1rem 1.3rem;
                    font-size: 1.2rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                    &:focus {
                      border: 1px solid @base_color;
                    }
                  }
                }

                &.email {
                  input[type="email"] {
                    border: 1px solid #e6e6e6;
                    padding: 1rem 1.3rem;
                    font-size: 1.2rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                    &:focus {
                      border: 1px solid @base_color;
                    }
                  }
                }

                &.textarea {
                  textarea {
                    height: 9rem;
                    border: 1px solid #e6e6e6;
                    padding: 1.3rem;
                    font-size: 1.2rem;
                    box-sizing: border-box;
                    border-radius: 3px;
                    &:focus {
                      border: 1px solid @base_color;
                    }
                  }
                }
              }
            }
            p[name="error"] {
              color: @base_color;
            }
            .only_tilte {
              .control-label {
                color: @base_color;
              }
            }
          }
        }

        #preview {
          padding: 0;

          input[type="button"] {
            font-size: 1.1rem;
            height: 3.2rem;

            &:first-of-type {
              margin-top: 2rem;
            }
          }
        }
      }
    }
  }

  .clear {
    clear: both;
  }
}
</style>
