<template>
    <div class="InsCatLayout1">
         <div class="TopBanner"
         v-bind:style="{backgroundImage:'url(' + ImagePath + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'cover'}"
         >
            <div class="InnerBox">
                <ul>
                    <li v-for="(v,index) in MeunList" :key="index" :class="{'ActiveBg':v.Id==id}">
                        <router-link :to="'/cms/catDetail/'+v.Id">
                        <span v-if="v.Id=='40123'"><img :src="v.Id==id?'/static/images/pc/pc_52.png':'/static/images/pc/pc_47.png'"></span>
                        <span v-if="v.Id=='40124'"><img :src="v.Id==id?'/static/images/pc/pc_48.png':'/static/images/pc/pc_50.png'"></span>
                        <span v-if="v.Id=='40125'"><img :src="v.Id==id?'/static/images/pc/pc_51.png':'/static/images/pc/pc_49.png'"></span>
                        {{v.Name}}
                    </router-link>
                    </li>
                </ul>
            </div>
         </div>
         <div v-if="isMobile">
            <div class="BodyContent">
                <p class="titleFont">{{CateTitle}}</p>
                <div class="perData" v-for="(v,index) in contentList" :key="index">
                    <p class="perTitle">{{v.Title}}</p>
                    <p class="perContent" v-html="v.Body"></p>
                </div>
            </div>
         </div>
         <div v-else>
           <p class="titleFont">{{CateTitle}}</p>
            <div class="BodyContent">
                <div class="perData" v-for="(v,index) in contentList" :key="index">
                    <p class="perTitle">{{v.Title}}</p>
                    <p class="perContent" v-html="v.Body"></p>
                </div>
            </div>
         </div>

    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCatLayout1 extends Vue {
    ImagePath:string='';
    MeunList:any=[];
    CateTitle:string='';
    contentList:any=[];
    currentPage:number= 1; // ?????????
    pageSize:number= 12; // ????????????????????????
    totalRecord: number= 0; // ????????????
    getCategoryByDevice () {
      this.$Api.cms.getCategoryByDevice({ CatId: '40121', IsMobile: this.isMobile }).then((result) => {
        this.ImagePath = result.ImagePath;
        this.MeunList = result.Children;
      });
    }
    getCategoryByDeviceVoid (val) {
      this.$Api.cms.getCategoryByDevice({ CatId: val, IsMobile: this.isMobile }).then((result) => {
        this.CateTitle = result.Name;
      });
    }
    // ??????cms???id????????????cms
    getContentsByCatId () {
      var params = {
        catId: this.id,
        page: this.currentPage,
        pageSize: this.pageSize,
        SortName: 'ContentDateTime',
        SortOrder: 'DESC'
      };
      this.$Api.cms.getContentsByCatKeyEx(params).then((result) => {
        this.contentList = result.Data;
        console.log(this.contentList, 'this.contentList');
        this.getCategoryByDeviceVoid(this.id);
        this.totalRecord = result.TotalRecord;
      });
    }
    get id () {
      return this.$route.params.id;
    }
    get isMobile () {
      return this.$store.state.isMobile;
    }
    mounted () {
      this.getCategoryByDevice();
      this.getContentsByCatId();
      setTimeout(() => { window.scrollTo(0, 0); }, 50);
    }
}
</script>

<style scoped lang="less">
.pc {
  .InsCatLayout1 {
    width: 100%;
    display: inline-block;
    .TopBanner {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        height: 400px;
        .InnerBox {
          width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          ul {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            li{
                background: #fff;
                padding: 0px 1rem;
                margin-bottom: 1rem;
                border-radius: 30px;
                width: 29%;
                border: 2px solid #fff;
                a {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  color: @base_color;
                  font-size: 23px;
                    span {
                    width: 2.5rem;
                    display: inline-block;
                    margin-right: .5rem;
                        img {
                            width: 100%;
                        }
                   }
                }

            }
            .ActiveBg {
                background: @base_color;
                border: 2px solid #fff;
                a{
                    color: #fff;
                }
            }
          }
        }
    }
    .titleFont {
        font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
        font-size: 30px;
        text-transform: uppercase;
        text-align: center;
        color: #393e46;
        width: 1200px;
        margin: 0 auto;
        margin-bottom: 2rem;
        padding-top: 3rem;
    }
    .BodyContent {
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 3rem;
        display: flex;
        flex-wrap: wrap;
        .perData {
            border: 1px solid @base_color;
            border-radius: 30px;
            margin-bottom: 3rem;
            width: 48%;
            float: left;
            margin-right: 2%;
            display: flex;
            flex-wrap: wrap;
            &:nth-child(2n) {
              margin-right: 0px!important;
            }
            .perTitle {
                border-radius: 30px;
                height: 60px;
                background: @base_color;
                color: #fff;
                text-align: center;
                font-size: 24px;
                line-height:28px;
                display: flex;
                width: calc(100% - 4rem);
                padding: 0px 2rem;
                align-items: center;
                justify-content: center;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
            }
            .perContent {
                /deep/ .FaqMain {
                    padding: 1rem;
                    .picArry {
                        width: 100%;
                        display: inline-block;
                        .top {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            align-items: center;
                            .tp {
                                width: 49%;
                                display: flex;
                                font-size: 20px;
                                color: @base_color;
                                line-height: 26px;
                                align-items: center;
                                margin-bottom: 1rem;
                                em {
                                    width: 1.5rem;
                                    height: 1.5rem;
                                    background: url('/static/images/pc/active.png') no-repeat center center;
                                    background-size: 1.5rem;
                                    display: inline-block;
                                    margin-right: .5rem;
                                }

                            }
                        }
                         .bottom {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            margin-bottom: 1rem;
                            .tp {
                                width: 100%;
                                display: flex;
                                font-size: 20px;
                                color: @base_color;
                                line-height: 26px;
                                em {
                                  width: 1.5rem;
                                  height: 1.5rem;
                                  background: url('/static/images/pc/active.png') no-repeat center center;
                                  background-size: 1.5rem;
                                  display: inline-block;
                                  margin-right: .5rem;
                                }

                            }
                        }
                    }
                    .normalText {
                        font-size: 20px;
                        text-align: center;
                        line-height: 26px;
                        color: #666666;
                        margin-bottom: 2rem;
                       .clickHere {
                            color: @base_color;
                            &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                    .weightText {
                        font-size: 20px;
                        text-align: center;
                        line-height: 26px;
                        color: #666666;
                        margin-bottom: 2rem;
                        font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                        .clickHere {
                            color: @base_color;
                             &:hover {
                                text-decoration: underline;
                            }
                        }
                    }
                    .colorText {
                        font-size: 20px;
                        text-align: center;
                        line-height: 26px;
                        color:  @base_color;
                        margin-bottom: 1rem;
                        font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                    }
                    img {
                        width: 100%;
                    }
                }
            }
        }

    }
  }
}

.mobile {
  .InsCatLayout1 {
    width: 100%;
    display: inline-block;
    .TopBanner {
        width: 100%;
        display: inline-block;
        padding-top: 3rem;
        padding-bottom: 3rem;
        .InnerBox {
          width: 80%;
          margin: 0 auto;
          ul {
            width: 100%;
            display: inline-block;
            li{
                background: #fff;
                padding: 0px 1rem;
                margin-bottom: 1rem;
                border-radius: 30px;
                a {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: flex-start;
                  color: @base_color;
                  font-size: 1.4rem;
                    span {
                    width: 3rem;
                    display: inline-block;
                        img {
                            width: 100%;
                        }
                   }
                }

            }
            .ActiveBg {
                background: @base_color;
                a{
                    color: #fff;
                }
            }
          }
        }
    }
    .BodyContent {
        width: 90%;
        margin: 0 auto;
        padding-top: 3rem;
        padding-bottom: 3rem;
        .titleFont {
            font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
            font-size: 1.8rem;
            text-transform: uppercase;
            text-align: center;
            color: #393e46;
            margin-bottom: 2rem;
        }
        .perData {
            border: 1px solid @base_color;
            border-radius: 30px;
            margin-bottom: 3rem;
            .perTitle {
                border-radius: 30px;
                height: 4rem;
                background: @base_color;
                color: #fff;
                text-align: center;
                font-size: 1.4rem;
                line-height:1.8rem;
                display: flex;
                width: calc(100% - 4rem);
                padding: 0px 2rem;
                align-items: center;
                justify-content: center;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
            }
            .perContent {
                /deep/ .FaqMain {
                    padding: 1rem;
                    .picArry {
                        width: 100%;
                        display: inline-block;
                        .top {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            align-items: center;
                            .tp {
                                width: 49%;
                                display: flex;
                                font-size: 1.2rem;
                                color: @base_color;
                                line-height: 1.4rem;
                                align-items: center;
                                margin-bottom: 1rem;
                                em {
                                    width: 1.5rem;
                                    height: 1.5rem;
                                    background: url('/static/images/pc/active.png') no-repeat center center;
                                    background-size: 1.5rem;
                                    display: inline-block;
                                    margin-right: .5rem;
                                }

                            }
                        }
                         .bottom {
                            width: 100%;
                            display: flex;
                            flex-wrap: wrap;
                            justify-content: space-between;
                            margin-bottom: 1rem;
                            .tp {
                                width: 100%;
                                display: flex;
                                font-size: 1.2rem;
                                color: @base_color;
                                line-height: 1.4rem;
                                em {
                                  width: 1.5rem;
                                  height: 1.5rem;
                                  background: url('/static/images/pc/active.png') no-repeat center center;
                                  background-size: 1.5rem;
                                  display: inline-block;
                                  margin-right: .5rem;
                                }

                            }
                        }
                    }
                    .normalText {
                        font-size: 1.4rem;
                        text-align: center;
                        line-height: 1.8rem;
                        color: #666666;
                        margin-bottom: 2rem;
                       .clickHere {
                            color: @base_color;
                        }
                    }
                    .weightText {
                        font-size: 1.4rem;
                        text-align: center;
                        line-height: 1.8rem;
                        color: #666666;
                        margin-bottom: 2rem;
                        font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                        .clickHere {
                            color: @base_color;
                        }
                    }
                    .colorText {
                        font-size: 1.4rem;
                        text-align: center;
                        line-height: 1.8rem;
                        color:  @base_color;
                        margin-bottom: 1rem;
                        font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                    }
                    img {
                        width: 100%;
                    }
                }
            }
        }

    }
  }
}
</style>
