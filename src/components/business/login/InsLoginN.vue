<template>
<div class="">
    <div class="insLogin_warrper mobileLogin" v-if="isMobile">
      <div class="insLogin_title" >
         <div class="fblogin" @touchstart="fbLogin">
          <img src="/static/facebook.png" />
          <span>{{$t('Login.FaceBookUse')}}</span>
         </div>
        <p class="or">{{$t('Register.or')}}</p>
      </div>
      <!-- <div class="insLogin_divide">
          <div class="divide"></div>
          <div class="divide_or">{{$t('Login.or')}}</div>
          <div class="divide"></div>
      </div> -->
      <div class="insLogin_main">
         <div class="tabs-basic">
            <ul>
              <li @click="toggleTab(1)" :class="{'active': tabIndex==1}">{{$t('Login.doLogin')}}</li>
              <li @click="toggleTab(2)" :class="{'active': tabIndex==2}">{{$t('Register.RegisterTitle')}}</li>
            </ul>
           <div class="clear"></div>
         </div>
          <div class="login" v-show="tabIndex === 1">
              <div>
                <div class="login_title">
                  <p>{{$t('Login.Already')}}</p>
                  <p>{{$t('Login.Signinnow')}}</p>
                </div>
                <InsForm ref="loginForm" v-model="loginForm">
                    <InsInput2 :placeholder="$t('Register.UserEmail')" width="100%" v-model="loginForm.email" />
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="loginForm.password" type="logopassword" />
                    <div class="remember_warpper">
                        <div class="remember">
                            <input
                                type="checkbox"
                                class="remember-btn"
                                name="remember-btn"
                                id="remember-btn"
                                value
                            />
                            <label for="remember-btn">{{$t('Login.RememberMe')}}</label>
                        </div>
                        <a class="forget" href="/account/forgetPassword">{{$t('Login.ForgetPwd')}}</a>
                    </div>
                </InsForm>
              </div>
              <InsButton :nama="$t('Login.Signin')" @click="login" size="huge" class="loginBtn" />
          </div>
          <div class="register" v-show="tabIndex === 2">
              <div>
                <div class="register_title">
                  <p>{{$t('Login.onlineaccount')}}</p>
                  <p>{{$t('Login.RegNow')}}</p>
                </div>
                <InsForm ref="registerForm" v-model="registerForm">
                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserFirstName')" width="100%" v-model="registerForm.firstName" />
                    <InsInput2 :placeholder="$t('Register.UserLastName')" width="100%" v-model="registerForm.lastName"/>
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="registerForm.password" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="registerForm.confirmPassword" type="password" :rule="registerForm.password" />
                </div>
                <div class="register_half">
                     <InsInput2 :placeholder="$t('DeliveryAddress.Mobile')" width="100%"  :must="false" v-model="registerForm.Mobile"  type="phone"/>
                </div>
                <InsInput2 :placeholder="$t('Register.UserEmail')" v-model="registerForm.email" width="100%" type="email" />
                </InsForm>
              </div>
              <InsButton :nama="$t('Register.Createanaccount')" @click="register" size="huge"  class="loginBtn" style="margin-top:2rem;"/>
          </div>
      </div>
  </div>
  <div class="insLogin_warrper pcLogin" v-else>
      <div>
        <div class="insLogin_title" v-if="!isIe">
          <div class="facebook_login" @click="fbLogin">
            <img src="/static/facebook.png" />
            <span>{{$t('Login.FaceBookUse')}}</span>
          </div>
        </div>
        <div class="insLogin_divide" v-if="!isIe">
            <div class="divide"></div>
            <div class="divide_or">{{$t('Register.or')}}</div>
            <div class="divide"></div>
        </div>
      </div>
      <div class="insLogin_main">
          <div class="login">
              <div>
                <div class="login_title">{{$t('Login.doLogin')}}</div>
                <InsForm ref="loginForm" v-model="loginForm">
                    <InsInput2 :placeholder="$t('Register.UserEmail')" width="100%" v-model="loginForm.email" />
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="loginForm.password" type="logopassword" />
                    <div class="remember_warpper">
                        <div class="remember">
                            <input
                                type="checkbox"
                                class="remember-btn"
                                name="remember-btn"
                                id="remember-btn"
                                value
                            />
                            <label for="remember-btn">{{$t('Login.RememberMe')}}</label>
                        </div>
                        <a class="forget" href="/account/forgetPassword">{{$t('Login.ForgetPwd')}}</a>
                    </div>
                </InsForm>
              </div>
              <InsButton :nama="$t('Login.doLogin')" @click="login" style="margin-top: 12rem;"/>
          </div>
          <div class="register">
              <div>
                <div class="register_title">{{$t('Register.RegisterBtn')}}</div>
                <InsForm ref="registerForm" v-model="registerForm">
                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserFirstName')" width="48%" v-model="registerForm.firstName" />
                    <InsInput2 :placeholder="$t('Register.UserLastName')" width="48%" v-model="registerForm.lastName"/>
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="registerForm.password" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="registerForm.confirmPassword" type="confirmpassword" :rule="registerForm.password" />
                </div>
                 <div class="register_half">
                     <InsInput2 :placeholder="$t('DeliveryAddress.Mobile')" width="100%"  :must="false" v-model="registerForm.Mobile"  type="phone"/>
                </div>
                <InsInput2 :placeholder="$t('Register.UserEmail')" v-model="registerForm.email" width="100%" type="email" />
                </InsForm>
              </div>
              <InsButton :nama="$t('Forgetpassword.NextStep')" @click="register"  style="margin-top: 2rem;"/>
          </div>
      </div>
  </div>

</div>

</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import InsInput2 from '@/components/base/InsInput2.vue';
import InsButton from '@/components/base/InsButton.vue';
import InsForm from '@/components/base/InsForm.vue';
import { CheckboxGroup, Checkbox } from 'element-ui';
@Component({ components: { InsInput2, InsButton, InsForm, CheckboxGroup, Checkbox } })
export default class InsLoginN extends Vue {
    private terms: boolean = true;
    faceBookLogin:string='';
    lang:string[] = ['E', 'C', 'S'];
    tabIndex: number = 1;
    private loginForm = {
      email: '',
      password: ''
    }
    private registerForm = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      Language: '',
      Mobile: '',
      OptOutReceiving: true
    }
    get currentlang () {
      return this.$Storage.get('locale');
    }
    toggleTab (index) {
      this.tabIndex = index;
    }
    toURL (val) {
      window.location.href = val;
    }
    login () {
      let _this = this;
      (this.$refs.loginForm as InsForm).validate((valid) => {
        if (valid) {
          this.$Api.member.login(this.loginForm.email, this.loginForm.password, true).then(
            function (response) {
              _this.$store.dispatch('doLogin');
              _this.$emit('succeed');
            },
            function (response) {
              _this.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageboxNoraml'
              });
            }
          ).then(
            (url) => {
              this.$Api.member.getProfile().then(
                function (data) {
                  if (data) {
                    _this.loginForm = data;
                    _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                    _this.$i18n.locale = _this.lang[data.Language];
                    _this.$store.dispatch('setLang', _this.lang[data.Language]);
                    _this.$Storage.set('locale', _this.lang[data.Language]);
                    _this.$store.dispatch('setMemberInfo', data);
                    _this.getShopCart();
                  } else {
                    _this.$store.dispatch('Logout');
                  }
                },
                function (data) {
                  _this.$message({
                    message: data,
                    type: 'error',
                    customClass: 'messageboxNoraml'
                  });
                }
              );
            }
          );
        } else {
          return false;
        }
      });
    }
    register () {
      let _this = this;
      let l = this.$Storage.get('locale');
      this.lang.forEach((element, index) => {
        if (l === element) this.registerForm.Language = '' + index;
      });
      (this.$refs.registerForm as InsForm).validate((valid) => {
        if (valid && this.terms) {
          this.$Api.member.register(this.registerForm).then((result) => {
            if (result.Succeeded) {
              this.$Api.member.login(this.registerForm.email, this.registerForm.password, true).then(
                function (response) {
                  _this.$store.dispatch('doLogin');
                  _this.$emit('succeed');
                  // return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
                },
                function (response) {
                  _this.$message({
                    message: response.Message,
                    type: 'error',
                    customClass: 'messageboxNoraml'
                  });
                }
              ).then(
                (url) => {
                  this.$Api.member.getProfile().then(
                    function (data) {
                      if (data) {
                      // _this.registerForm = data;
                        _this.$store.dispatch('setUser', (data.FirstName + ' ' + data.LastName).toUpperCase());
                        _this.$i18n.locale = _this.lang[data.Language];
                        _this.$store.dispatch('setLang', _this.lang[data.Language]);
                        _this.$Storage.set('locale', _this.lang[data.Language]);
                        _this.$store.dispatch('setMemberInfo', data);
                        // if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
                      } else {
                        _this.$store.dispatch('Logout');
                      }
                    },
                    function (data) {
                      _this.$message({
                        message: data,
                        type: 'error',
                        customClass: 'messageboxNoraml'
                      });
                    }
                  );
                }
              );
            } else {
              this.$message({
                message: result.Message,
                type: 'error',
                customClass: 'messageboxNoraml'
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
    getShopCart () {
      this.$store.dispatch('setShopCart', this.$Api.shoppingCart.getShoppingCart());
    }
    isIe = true;
    created () {
      if (window.navigator.userAgent.indexOf('Trident') !== -1) this.isIe = true;
      else this.isIe = false;
    }
    mounted () {
      window.dispatchEvent(new Event('faceBookLoad'));
    }
    get isMobile () {
      return this.$store.state.isMobile;
    }
    fbLogin () {
      window['FB'].login(function (response) {
        window['checkLoginState']();
      }, { scope: 'email' });
    }
}
</script>
<style lang="less">
.messageboxNoraml{
  z-index: 1000000000!important;
}
</style>
<style lang="less" scoped>
.pcLogin{
    width: 1200px;
    margin: 0rem auto;
    padding-bottom: 10px;
    .insLogin_title{
        width: 1060px;
        margin: 0 auto;
        text-align: center;
        padding: 5px;
        box-sizing: border-box;
        .facebook_login{
          display: inline-block;
          background-color: #3975ea;
          color: white;
          padding: 8px 16px;
          cursor: pointer;
          border-radius: 8px;
          font-weight: bold;
          user-select: none;
          span{
            vertical-align: middle;
          }
          img{
            height: 32px;
            vertical-align: middle;
            padding-right: 16px;
          }
        }
    }
    .insLogin_divide{
        white-space: nowrap;
        width: 1060px;
        margin: 0px auto;
        .divide{
            display: inline-block;
            width: 500px;
            margin: 20px 0;
            border-top: solid 1px rgba(0, 0, 0, .2);
            vertical-align: bottom;
        }
        .divide_or{
            vertical-align: bottom;
            display: inline-block;
            line-height: 41px;
            margin: 0 20px;
            font-size: 20px;
        }
    }
    .insLogin_main{
        width: 1060px;
        box-sizing: border-box;
        margin: 0 auto;
        display: flex;
        .login{
          float: left;
          width: 47.5%;
          margin-right: 2.5%;
            .remember_warpper{
                padding: 0 0 0 20px;
                margin: 30px 0 0 0;
                display: flex;
                justify-content: space-between;
            }
        }
        .register{
            width: 47.5%;
            float: left;
            padding-left: 2.5%;
            border-left: solid 1px rgba(0, 0, 0, .2);
            .register_half{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
    }
}
.mobileLogin{
    width: 100%;
    margin: 0 auto;
    height: 100vh;
    overflow: auto;
    .insLogin_title{
       padding: 24px 1rem;
       text-align: center;
    }
    .insLogin_title .fblogin {
      text-align: center;
      font-size: 1.4rem;
      padding: 0.7rem 1.4rem;
      color: #fff;
      background-color: #4267b2;
      display: inline-block;
      border-radius: 0.7rem;
    img{
      width: 2.8rem;
      vertical-align: middle;
      margin-right: 1.4rem;
    }
    span{
      vertical-align: middle;
    }
}
.loginBtn {
  height: 45px;
  line-height: 45px;
  font-size: 1.6rem;
}
.insLogin_title .or {
    text-align: center;
    font-size: 2rem;
    position: relative;
    color: #333333;
    margin: 1rem 0;
}
.insLogin_title .or::before {
    content: '';
    width: 45%;
    height: 1px;
    background-color: #999999;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
.insLogin_title .or::after {
    content: '';
    width: 45%;
    height: 1px;
    background-color: #999999;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
}

   .tabs-basic {
      padding: 1rem 0;

      li {
        width: 50%;
        float: left;
        color: #666666;
        border-right: none;
        text-align: center;
        cursor: pointer;
        font-size: 1.4rem;
        box-sizing: border-box;
        list-style: none;
        font-family: 'Arial';
        padding: 1rem 0;
        background: #f5f5f5;

        &:first-child {
          border-left: 0;
        }

        &.active {
          background: @base_color;
          color: #fff;
        }
      }
    }
    .insLogin_main{
        width: 100%;
        box-sizing: border-box;
        margin: 0 auto;
        padding-bottom: 50px;
        .login{
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            width: 100%;
             padding: 0rem 2rem 2rem 2rem;
            box-sizing: border-box;
            vertical-align: top;
            .remember_warpper{
                padding: 0 0 0 0px;
                margin: 20px  0;
                display: flex;
                justify-content: space-between;
                a{
                    color: #666666;
                    text-decoration: none;
                  }
                .remember{
                  color: #666666;

                 input[type=checkbox] {
                      background: none;
                      width: 15px;
                      height: 15px;
                      -moz-appearance: none;
                      appearance: none;
                      -webkit-appearance: none;
                      -webkit-box-sizing: border-box;
                      box-sizing: border-box;
                      outline: none;
                      vertical-align: sub;
                      margin: 0;
                      margin-right: 3px;
                      border: 1px solid #e0e0e0;
                      position: relative;
                  }
                  input[type=checkbox]:checked {
                      border: 1.5px solid @base_color;
                      background-color: @base_color;
                  }
                   input[type=checkbox]:checked::after {
                         position: absolute;
                        content: "";
                        width: 5px;
                        height: 10px;
                        top: -1px;
                        left: 2px;
                        border: 1px solid #fff;
                        border-top: none;
                        border-left: none;
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                   }
                }
            }
        }
        .register{
            box-sizing: border-box;
            width: 100%;
            padding: 0rem 2rem 2rem 2rem;
            display: inline-flex;
            justify-content: space-between;
            flex-direction: column;
            vertical-align: top;
            .register_half{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
        .login_title, .register_title{
          p{
            font-size: 1.6rem;
            text-align: center;
            margin-top: 1rem;
          }
        }
    }
}
</style>
