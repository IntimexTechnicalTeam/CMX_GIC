<template>
  <div class="insLogin_warrper NomralBg">
      <div class="headlogin">
        <div class="insLogin_title">
          <div class="facebook_login" @click="fbLogin">
            <img src="/static/facebook.png" />
            <span>{{$t('Login.FaceBookUse')}}</span>
          </div>
        </div>
        <div class="insLogin_divide">
            <div class="divide"></div>
            <div class="divide_or">{{$t('Register.or')}}</div>
            <div class="divide"></div>
        </div>
      </div>
      <div class="insLogin_main">
          <div class="login">
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
              <InsButton :nama="$t('Login.doLogin')" @click="login"  style="margin-top: 13.7rem;"/>
          </div>
          <div class="register">
              <div>
              <div class="register_title">
                  <p>{{$t('Login.onlineaccount')}}</p>
                  <p>{{$t('Login.RegNow')}}</p>
                </div>
                <InsForm ref="registerForm" v-model="registerForm">
                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserFirstName')" width="48%" v-model="registerForm.firstName" />
                    <InsInput2 :placeholder="$t('Register.UserLastName')" width="48%" v-model="registerForm.lastName"/>
                </div>

                <div class="register_half">
                    <InsInput2 :placeholder="$t('Register.UserRegPassword')" width="100%" v-model="registerForm.password" type="password"/>
                    <InsInput2 :placeholder="$t('Register.UserConfirmPassword')" width="100%" v-model="registerForm.confirmPassword" type="confirmpassword" :rule="registerForm.password" />
                     <InsInput2 :placeholder="$t('DeliveryAddress.Mobile')" width="100%" :must="false"  v-model="registerForm.Mobile"  type="phone"/>
                </div>
                <InsInput2 :placeholder="$t('Register.UserEmail')" v-model="registerForm.email" width="100%" type="email" />
                <div class="register_half" v-if="selectTypes===2">
                    <InsInput2 :placeholder="$t('Enquiry.Company')" width="48%" v-model="registerForm.Company" />
                    <InsInput2 :placeholder="$t('Enquiry.Title')" width="48%" v-model="registerForm.JobTitle"/>
                    <InsInput2 :placeholder="$t('Enquiry.Address')" width="100%" v-model="registerForm.CompanyAddress"/>
                </div>
                </InsForm>
              </div>
              <InsButton :nama="$t('Forgetpassword.NextStep')" @click="register" style="margin-top:2rem;" />
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';
import InsInput2 from '@/components/base/InsInput2.vue';
import InsButton from '@/components/base/InsButton.vue';
import InsForm from '@/components/base/InsForm.vue';
@Component({ components: { InsInput2, InsButton, InsForm } })
export default class InsLoginN extends Vue {
    private terms: boolean = true;
    faceBookLogin:string='';
    lang:string[] = ['E', 'C', 'S'];
    private loginForm = {
      email: '',
      password: ''
    }
    private types = [
      {
        name: '个人',
        value: 1
      },
      {
        name: '企业',
        value: 2
      }
    ]
    selectTypes:number=1
    private registerForm = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      confirmPassword: '',
      Language: '',
      Mobile: '',
      Company: '',
      CompanyAddress: '',
      JobTitle: '',
      OptOutReceiving: true
    }
    get currentlang () {
      return this.$Storage.get('locale');
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
              return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
            },
            function (response) {
              _this.$message({
                message: response.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
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
                    if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
                  } else {
                    _this.$store.dispatch('Logout');
                  }
                },
                function (data) {
                  _this.$message({
                    message: data,
                    type: 'error',
                    customClass: 'messageBoxMobile'
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
            console.log(this.registerForm, 'this.registerForm');
            if (result.Succeeded) {
              this.$Api.member.login(this.registerForm.email, this.registerForm.password, true).then(
                function (response) {
                  _this.$store.dispatch('doLogin');
                  return _this.$route.query && _this.$route.query.returnurl ? _this.$route.query.returnurl : undefined;
                },
                function (response) {
                  _this.$message({
                    message: response.Message,
                    type: 'error',
                    customClass: 'messageBoxMobile'
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
                        if (url) { window.location.href = (_this.$route.query.returnurl as string); } else { window.location.href = '/account/memberInfo'; }
                      } else {
                        _this.$store.dispatch('Logout');
                      }
                    },
                    function (data) {
                      _this.$message({
                        message: data,
                        type: 'error',
                        customClass: 'messageBoxMobile'
                      });
                    }
                  );
                }
              );
            } else {
              this.$message({
                message: result.Message,
                type: 'error',
                customClass: 'messageBoxMobile'
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
    fbLogin () {
      window['FB'].login(function (response) {
        window['checkLoginState']();
      }, { scope: 'email' });
    }
}
</script>
<style lang="less">
.messageBoxMobile{
      z-index: 100000!important;
}
</style>
<style lang="less" scoped>
/deep/ .input_warpper .input_main input {
  background: #fff;
  border: 1px solid #eee;
  &::placeholder {
    color: #cccccc;
  }
  &:focus {
    border: 1px solid @base_color;
  }
}
/deep/ .in_btn {
  span {
    font-size: 18px;
  }
}
/deep/ .input_outer {
  padding-top: 30px;
}
/deep/ .input_outer .error {
  font-size: 14px;
}
.insLogin_warrper{
    width: 100%;
    margin: 0 auto;
    padding-top: 5rem;
    padding-bottom: 5rem;
    .headlogin {
      width: 1060px;
      margin: 0 auto;
    }
    .insLogin_title{
        width: 1060px;
        margin: 0 auto;
        text-align: center;
        padding: 20px;
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
        margin: 20px auto;
        .divide{
            display: inline-block;
            width: 500px;
            margin: 20px 0;
            border-top: solid 1px #dbdbdb;
            vertical-align: bottom;
        }
        .divide_or{
            vertical-align: bottom;
            display: inline-block;
            line-height: 41px;
            margin: 0 20px;
            font-size: 20px;
            color: #ccc;
        }
    }
    .insLogin_main{
        width: 1060px;
        box-sizing: border-box;
        margin: 0 auto;
        padding: 40px;
        display: flex;
        .login{
          float: left;
          width: 47.5%;
          margin-right: 2.5%;
            .remember_warpper{
                margin: 10px 0 0 0;
                display: flex;
                justify-content: space-between;
            }
            .remember {
              input[type="checkbox"] {
                  border: 1px solid #eee;
                  margin: 0;
              }
              label {
                color: #999;
                margin-left: 5px;
              }
            }
            .forget {
              color: #666;
              text-decoration: underline;
            }
        }
      .login_title, .register_title{
          p{
            font-size: 24px;
            text-align: center;
            margin-bottom: 10px;
          }
        }
        .register{
            width: 47.5%;
            float: left;
            padding-left: 2.5%;
            border-left: solid 1px #dbdbdb;
            .register_half{
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
        }
    }
}
</style>
