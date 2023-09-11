<template>
    <div class="memberlogin">
        <div class="menberCentral" @click.stop="menberCentral">
                  <img class="showMenberCentral" src="/static/images/pc/pc_55.png">
                    <div class="lang_flow" v-show="showMenberCentral" @click="memberCentral">
                          <div @click="goUrl('/account/memberInfo')"  class="ii">{{$t('Account.MemberInformation')}}</div>
                          <div @click="goUrl('/account/notification')"  class="ii">{{$t('Account.MyMessages')}}</div>
                          <div @click="goUrl('/account/modifyPassword')"  class="ii">{{$t('MemberInfo.ModifyPassword')}}</div>
                          <div @click="logout">{{$t('Account.Logout')}}</div>
                    </div>
          </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import storage from '@/sdk/common/Storage';
import Auth from '@/sdk/common/Auth';
import sdk from '@/sdk/InstoreSdk';
import Cookie from 'js-cookie';
@Component
export default class InsLangSwitch extends Vue {
  private showMenberCentral:boolean = false;
  menberCentral () {
    if (!this.$Storage.get('isLogin')) {
      window.location.href = '/account/login';
    } else {
      this.showMenberCentral = !this.showMenberCentral;
    }
  }
  goUrl (val) {
    window.location.href = val;
  }
  memberCentral (e) {
    let target = e.target as HTMLElement;
    if (target.className === 'ii' && target.dataset.to) {
      this.$router.push({
        path: target.dataset.to
      });
    }
  }
  mounted () {
    var _this = this;
    $('body').on('click', function () {
      _this.showMenberCentral = false;
    });
  }
  logout () {
    let _this = this;
    sdk.api.member.logout().then(
      function (data) {
        if (data) _this.$message(_this.$t('Message.SucceedInOperating') as string);
        _this.$store.dispatch('Logout');
        window.location.href = '/';
        Cookie.remove('access_token');
        Auth.GetToken();
      }
    );
  }
}
</script>
<style scoped lang="less">
.memberlogin {
  display: inline-block;
}
  .menberCentral{
    padding-left: .5rem;
    padding-right: .5rem;
    float: left;
    display: flex;
    align-items: center;
    justify-content: center;
    .lang_flow{
      position: absolute;
      top: 3rem;
      left:50%;
      transform: translate(-50%);
      width: 200px;
      background: #FFF;
      z-index: 999;
    >div{
      color:#000;
      font-size: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding-top: .5rem;
      padding-bottom: .5rem;
      cursor: pointer;
      &:hover {
        color: @base_color;
      }
      &:first-child {
        border-top: 1px solid #eee;
      }
    }
    }
    img{
      width:35px;
      height: 40px;
      margin: 0 auto;
      display: block;
      cursor: pointer;
    }
  }
</style>
