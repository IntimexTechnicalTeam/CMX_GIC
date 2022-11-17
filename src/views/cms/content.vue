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
        <div v-else>
          <h1 class="CmsContentTitle">{{content.Title}}</h1>
          <p v-html="content.Body"></p>
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
  .CmsContent {
    width: 1200px;
    margin: 0 auto;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .CmsContentTitle {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
  }
  .rightContent {
    // width: 70%;
    // float: left;
    // position: relative;
    margin-bottom: 30px;
    min-height: 700px;
  }

  .Form {
    width: 80%;
    margin: 0 auto;

    /deep/ .RNPForm.default {
      background-color: #fff;
      .FormMain {
        min-width: auto;

        #content {
          .btn.save {
            border: 0;
            width: 100%;
            background-color: @base_color;
            border-radius: 0;
          }

          #Anwers {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .form-group {
              padding: 0;
              border: 0;
              width: 100%;

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
                    border: 1px solid #ccc;
                    padding: 10px 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                  }
                }

                &.email {
                  input[type="email"] {
                    border: 1px solid #ccc;
                    padding: 10px 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                  }
                }

                &.textarea {
                  textarea {
                    height: 165px;
                    border: 1px solid #ccc;
                    padding: 15px;
                    font-size: 15px;
                    box-sizing: border-box;
                  }
                }
              }
            }
          }
        }

        #preview {
          padding: 0;
        }
      }
    }
  }

  .clear {
    clear: both;
  }
}

.mobile {
  .CmsContentTitle {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 30px;
    text-align: center;
    margin-top: 30px;
  }
  .CmsContent {
    width: 100%;
    position: relative;
    margin-bottom: 30px;
    .TopBanner {
      height: 20rem;
      position: relative;
      .BottomText {
        position: absolute;
        bottom: -3rem;
        border: 1px solid #fff;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: .5rem 3rem;
        letter-spacing: 1px;
        font-size: 1.6rem;
        color: #fff;
        border-radius: 2rem;
        text-transform: uppercase;
        font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
        background: -webkit-linear-gradient(left, #cfd701, #8ab343 100%);
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
            background: -webkit-linear-gradient(left, #cfd701, #8ab343 100%);
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
                margin-bottom: 0px;
                color: #666;
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
