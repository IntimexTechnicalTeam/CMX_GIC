<template>
    <div class="InsCatLayout2">
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
         <p class="CateTitle">{{CateTitle}}</p>
         <div class="BodyContent">
            <p class="titleFont" v-show="!isMobile">{{Description}}</p>
            <p class="pcImg"><img :src="PCimg"></p>
            <div class="perData" v-for="(v,index) in contentList" :key="index">
                <p class="perTitle"><em class="icon"></em>{{v.Title}}</p>
                <p class="perContent" v-html="v.Body"></p>
            </div>
            <p class="bottmBody" v-html="BottomContent"></p>
         </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsCatLayout2 extends Vue {
    ImagePath:string='';
    MeunList:any=[];
    Description:string='';
    CateTitle:string='';
    BottomContent:string='';
    PCimg:string='';
    contentList:any=[];
    currentPage:number= 1; // 当前页
    pageSize:number= 12; // 每页显示条目个数
    totalRecord: number= 0; // 总条目数
    getCategoryByDevice () {
      this.$Api.cms.getCategoryByDevice({ CatId: '40121', IsMobile: this.isMobile }).then((result) => {
        this.ImagePath = result.ImagePath;
        this.MeunList = result.Children;
      });
    }
    getCategoryByDeviceVoid (val) {
      this.$Api.cms.getCategoryByDevice({ CatId: val, IsMobile: this.isMobile }).then((result) => {
        this.Description = result.Description;
        this.CateTitle = result.Name;
        this.BottomContent = result.Content;
        this.PCimg = result.ImagePath;
      });
    }
    // 获取cms该id下所有的cms
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
  .InsCatLayout2 {
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
    .pcImg {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 1rem;
    }
    .CateTitle {
        width: 1200px;
        margin: 0 auto;
        font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
        font-size: 30px;
        text-transform: uppercase;
        text-align: center;
        color: #393e46;
        margin-top: 3rem;
    }
    .BodyContent {
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 3rem;
        border-radius: 30px;
        border: 1px solid @base_color;
        margin-top: 1rem;
        .titleFont {
                border-radius: 30px;
                background: @base_color;
                color: #fff;
                text-align: center;
                font-size: 24px;
                line-height:30px;
                display: flex;
                width: calc(100% - 2rem);
                padding: 1rem 1rem;
                align-items: center;
                justify-content: center;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                margin-bottom: 2rem;
        }
        .perData {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 2rem;
            .perTitle {
                color: @base_color;
                font-size: 24px;
                line-height:40px;
                display: flex;
                justify-content: flex-start;
                font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    background: url('/static/images/pc/active.png') no-repeat center center;
                    background-size: 1.5rem;
                    display: inline-block;
                    margin-right: .5rem;
                }
            }
            .perContent {
                /deep/ p{
                    font-size: 20px;
                    line-height: 26px;
                    text-align: left;
                    color: #666666;
                }
            }
        }
        .bottmBody {
            width: 90%;
            margin: 0 auto;
            /deep/ .QuestionsC {
                .normalText {
                    font-size: 20px;
                    line-height: 26px;
                    text-align: center;
                    color: #666666;
                    margin-bottom: 2rem;
                    font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                    .colortext {
                        color: @base_color;
                        cursor: pointer;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
                .bottomImg {
                    width: 100%;
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
  .InsCatLayout2 {
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
    .CateTitle {
        width: 90%;
        margin: 0 auto;
        font-family: 'Baloo2-ExtraBold', 'Microsoft YaHei' !important;
        font-size: 1.8rem;
        text-transform: uppercase;
        text-align: center;
        color: #393e46;
        margin-top: 2rem;
    }
    .BodyContent {
        width: 90%;
        margin: 0 auto;
        padding-bottom: 3rem;
        border-radius: 30px;
        border: 1px solid @base_color;
        margin-top: 1rem;
        .titleFont {
                border-radius: 30px;
                background: @base_color;
                color: #fff;
                text-align: center;
                font-size: 1.3rem;
                line-height:1.6rem;
                display: flex;
                width: calc(100% - 2rem);
                padding: .5rem 1rem;
                align-items: center;
                justify-content: center;
                font-family: 'Baloo2-Bold', 'Microsoft YaHei' !important;
                margin-bottom: 2rem;
        }
        .perData {
            width: 90%;
            margin: 0 auto;
            margin-bottom: 2rem;
            .perTitle {
                color: @base_color;
                font-size: 1.4rem;
                line-height:1.8rem;
                display: flex;
                justify-content: flex-start;
                font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                .icon {
                    width: 1.5rem;
                    height: 1.5rem;
                    background: url('/static/images/pc/active.png') no-repeat center center;
                    background-size: 1.5rem;
                    display: inline-block;
                    margin-right: .5rem;
                }
            }
            .perContent {
                /deep/ p{
                    font-size: 1.4rem;
                    line-height: 1.8rem;
                    text-align: left;
                    color: #666666;
                }
            }
        }
        .bottmBody {
            width: 90%;
            margin: 0 auto;
            /deep/ .QuestionsC {
                .normalText {
                    font-size: 1.4rem;
                    line-height: 1.8rem;
                    text-align: center;
                    color: #666666;
                    margin-bottom: 2rem;
                    font-family: 'Baloo2-Medium', 'Microsoft YaHei' !important;
                    .colortext {
                        color: @base_color;
                    }
                }
                .bottomImg {
                    width: 100%;
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
