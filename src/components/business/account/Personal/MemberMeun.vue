<template>
  <div class="MemberMeun">
     <accountHeader/>
      <div class="MeunMain">
          <ul>
              <li><a @click="goUrl('/account/PersonalInformation')" href="javascript:;">{{$t('MemberLogin.MyPersonalInformation')}}</a></li>
              <li><a @click="goUrl('/account/MyCPDRecords')" href="javascript:;">{{$t('MemberLogin.MyCPDRecords')}}</a></li>
              <li><a @click="goUrl('/account/MyApplications')" href="javascript:;">{{$t('MemberLogin.MyApplications')}}</a></li>
              <li><a @click="goUrl('/account/MyMailBox')" href="javascript:;">{{$t('MemberLogin.MyMailBox')}}</a></li>
              <li><a @click="goUrl('/account/ModifyPassword')" href="javascript:;">{{$t('MemberLogin.ModifyPassword')}}</a></li>
          </ul>
      </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component({
  components: {
    accountHeader: () => import('@/components/business/account/accountHeader.vue')
  }
})
export default class MemberMeun extends Vue {
  goUrl (val) {
    window.location.href = val;
  }
}
</script>
<style lang="less" scoped>
.pc {
    .MemberMeun {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        .MeunMain {
          width: 600px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
          ul{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            li{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              a{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                height: 50px;
                color: #fff;
                background: @base_color;
                font-size: 20px;
                margin-bottom: 30px;
               transition: all .3s;
                &:hover {
                  background: #977c2b;
                }
              }
            }
          }
        }
    }
}
.mobile {
    .MemberMeun {
        width: 100%;
        margin: 0 auto;
        .MeunMain {
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 30px;
          ul{
            width: 90%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            margin-top: 30px;
            li{
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              a{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                justify-content: center;
                height: 50px;
                color: #fff;
                background: @base_color;
                font-size: 1.6rem;
                margin-bottom: 30px;
              }
            }
          }
        }
    }
}
</style>
