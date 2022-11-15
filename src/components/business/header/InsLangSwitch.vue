<template>
    <div class="langSwitch">
      <select  v-model="currentlang">
        <option :value="lang.value" v-for="(lang,index) in FrontE.langList" :key="index">{{lang.name}}</option>
      </select>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component
export default class InsLangSwitch extends Vue {
  get currentlang () {
    return this.$i18n.locale;
  }
  set currentlang (val) {
    this.changeLang(val);
  }
  changeLang (lang) {
    this.$Api.member.setUILanguage(lang).then((result) => {
      this.$i18n.locale = lang;
      localStorage.setItem('locale', lang);
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  }
}
</script>
<style scoped lang="less">
.langSwitch {
    select{
      width: 100%;
      border:none;
      box-sizing: border-box;
      color:#666666;
      appearance: none;
      -moz-appearance: none;
      -webkit-appearance: none;
      font-size: 16px;
      outline: none;
      padding-left: .5rem;
      width: 70px;
      cursor: pointer;
      background: #fff url('/static/images/mobile/mobile_09.jpg')  90% 40% no-repeat;
      background-size: 1rem;
      height: 2rem;
      line-height: 2rem;
      border-radius: 1rem;
      option{
        color:#666666;
        outline: none;
      }
    }
}
</style>
