<template>
 <div class="accountHeader">
   <div class="accountBg" v-show="isMobile">
      <p class="memberCenterTitle">{{ $t("Account.MemberCenter") }}</p>
      <p class="accountUser">{{MemberName}}</p>
      <div class="accountMeun">
          <p><router-link to="/account/memberInfo">{{$t('Account.MemberInformation')}}</router-link></p>
          <p><router-link to="/account/modifyPassword">{{$t('MemberInfo.ModifyPassword')}}</router-link></p>
          <p><router-link to="/account/notification">{{$t('Account.MyMessages')}}</router-link></p>
      </div>
   </div>
    <div class="accountBg" v-show="!isMobile">
    <div class="memberBg">
      <div class="innerBox">
        <p class="memberCenter">{{ $t("Account.MemberCenter") }}</p>
        <div class="leftside">
          <p>{{ MemberName }}</p>
          <div class="leftnav">
            <router-link to="/account/memberInfo" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("Account.MemberInformation") }}</span>
                <i class="iconRight el-icon-arrow-right"></i>
              </div>
            </router-link>
             <router-link to="/account/modifyPassword" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("MemberInfo.ModifyPassword") }}</span>
                <i class="iconRight el-icon-arrow-right"></i>
              </div>
            </router-link>
            <router-link to="/account/notification" class="iconBg">
              <div class="innerStyle">
                <span>{{ $t("Account.MyMessages") }}</span>
                <i class="iconRight el-icon-arrow-right"></i>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
   </div>
 </div>
</template>
<script lang="ts" scoped>
import { Component, Prop, Vue } from 'vue-property-decorator';
import sdk from '@/sdk/InstoreSdk';
@Component
export default class accountHeader extends Vue {
   MemberName:string='';
   TotalPoints:string='';
   // 获取会员信息
   getMemberInfo () {
     let _this = this;
     sdk.api.member.getProfile().then(
       function (data) {
         console.log(data, 'datadata');
         _this.MemberName = data.FirstName + '  ' + data.LastName;
       }
     );
   }
   // 获取会员总积分
   getMemberTotal () {
     this.$Api.points.getMemberTotalPoints().then((result) => {
       this.TotalPoints = result.TotalPoints;
     });
   }
   get currentlang () {
     return this.$Storage.get('locale');
   }
   get isMobile () {
     return this.$store.state.isMobile;
   }
   mounted () {
     this.getMemberInfo();
     this.getMemberTotal();
   }
}
</script>

<style scoped lang="less">
.mobile {
  .accountHeader {
  width: 100%;
  display:inline-block;
  .memberCenterTitle{
    font-size: 2rem;
    text-align: center;
    display: block;
    padding-top: 2rem;
    color:#FFF;
    text-transform:uppercase;
  }
  .accountBg{
    width:100%;
    background: url('/static/images/mobile/mobile_06.jpg') no-repeat center center;
    background-size: 100% 100%;
    display: inline-block;
    box-sizing: border-box;
    padding-bottom: 2rem;
    padding-top: 4rem;
    margin-top: -20px;
    .accountMeun{
      width: 90%;
      margin: 0 auto;
      p{
        display: flex;
        margin-bottom: 1rem;
        border-radius: 3px;
        overflow: hidden;
        a{
          background: #fff;
          display: flex;
          width: calc(100% - 10px);
          align-items: center;
          justify-content: flex-start;
          color:#999999;
          font-size: 1.4rem;
          height: 3.5rem!important;
          height: 100%;
          text-transform:uppercase;
          padding-left: 10px;
        }
        .router-link-active {
          background: #fff;
          border: 1px solid @base_color;
          border-left: 5px solid @base_color;
          color: @base_color;
        }
      }
    }
    .accountUser{
      font-size: 2rem;
      text-align: center;
      color:#fff;
      padding-bottom: 2rem;
      text-align: center;
    }
    .accountTop{
      width: 70%;
      margin: 0 auto;
      img{
        width: 100%;
      }
    }
  }
  }
}
.pc {
  .accountHeader {
    width: 100%;
    display: inline-block;
    .memberCenter {
      font-size: 30px;
      color: #fff;
      text-align: center;
    }
  .memberBg {
    background: url("/static/images/pc/pc_11.jpg") no-repeat center center;
    background-size: cover;
    box-sizing: border-box;
    display: inline-block;
    width: 100%;
    padding-top: 50px;
    padding-bottom: 50px;
    .innerBox {
      width: 1200px;
      margin: 0 auto;
      .memberCenterTitle {
        font-weight: 700;
        font-size: 40px;
        text-align: center;
        padding-top: 30px;
        color: #fff;
        text-transform: uppercase;
      }
      .leftside {
        width: 100%;
        .iconRight {
          color:@base_color;
          font-weight: 700;
        }
        p {
        font-size: 24px;
        color: #fff;
        text-align: center;
        margin-bottom: 30px;
        width: 100%;
        display: inline-block;
        }
        a {
          display: inline-block;
          margin-right: 15px;
          &:last-child {
            margin-right: 0px !important;
          }
          img {
            width: 100%;
          }
        }
      }

      .iconBg {
        float: left;
        width: 200px;
        height: 45px;
        line-height: 45px;
        text-align: left;
        .innerStyle {
          background: #fff;
          display: block;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
        }
        &:hover {
          transform: translateY(-3px);
        }
        span {
          width: 100%;
          display: inline-block;
          color: #999999;
          font-size: 18px;
          font-weight: 500;
          padding-left: 10px
        }
        strong {
          width: 100%;
          display: inline-block;
          color: #999999;
          font-size: 24px;
          font-weight: 600;
        }
        b {
          width: 100%;
          display: inline-block;
          color: #999999;
          font-size: 14px;
          font-weight: 600;
        }
      }

      .router-link-active {
        float: left;
        text-align: left;
        .innerStyle {
          background: #fff;
          display: block;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid @base_color;
          border-left: 5px solid @base_color;
        }
        span {
          color: @base_color;
        }
      }
    }
  }
  }
}
</style>
