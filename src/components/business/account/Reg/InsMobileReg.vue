<template>
<div id="container" class="mobileIndexBg">
  <div class="insLogin_warrper">
      <div class="insLogin_main">
            <div class="tabs-basic">
              <ul>
                <li>{{$t('Register.RegisterBtn')}}</li>
              </ul>
            <div class="clear"></div>
          </div>
         <p class="ExistingMembersTips">{{$t('Register.ExistingMembers')}}</p>
          <div class="register">
              <div>
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
                <InsInput2 :placeholder="$t('MembershipApplicationForm.MembershipNumber')" v-model="registerForm.ClientCode" width="100%" />
                </InsForm>
                <!-- <div></div> -->
                <CheckboxGroup v-model="terms" style="margin: 20px 0 20px 0">
                    <Checkbox name="type"></Checkbox><span><a style="font-size: 14px;padding-left: 14px;color: #666666;text-decoration: none;" href="javascript:;">{{$t('Register.RegisterAgree')}}</a></span>
                </CheckboxGroup>
              </div>
              <InsButton :nama="$t('Forgetpassword.NextStep')" @click="register" size="huge"  class="loginBtn"/>
          </div>
      </div>
  </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator';
import InsInput2 from '@/components/base/InsInput2.vue';
import InsButton from '@/components/base/InsButton.vue';
import InsForm from '@/components/base/InsForm.vue';
import { Checkbox, CheckboxGroup } from 'element-ui';
@Component({ components: { InsInput2, InsButton, InsForm, Checkbox, CheckboxGroup } })
export default class InsLoginN extends Vue {
    private terms: boolean = true;
    tabIndex: number = 1;
    faceBookLogin:string='';
    lang:string[] = ['E', 'C', 'S'];
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
      ClientCode: ''
    }
    toggleTab (index) {
      this.tabIndex = index;
    }
    get currentlang () {
      return this.$Storage.get('locale');
    }
    register () {
      let _this = this;
      (this.$refs.registerForm as InsForm).validate((valid) => {
        if (valid && this.terms) {
          this.$Api.member.register(this.registerForm).then((result) => {
            if (result.Succeeded) {
              window.location.href = '/account/RegisterSuccess';
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
}
</script>
<style lang="less">
.insLogin_warrper .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
    background-color: @base_color;
    border-color: @base_color;
}
</style>
<style lang="less" scoped>
 /deep/ .input_warpper .input_main input{
   background: #fff;
   border:1px solid #e5e5e5;
   border-radius: 2px;
}

.loginBtn{
    padding: 1rem;
    font-size: 1.4rem;
    text-transform: uppercase;
    border-radius: 2px;
}
.insLogin_warrper{
    width: 100%;
    margin: 0 auto;
    margin-top: 2rem;
    .insLogin_title{
    padding: 0rem 2rem;
    text-align: center;
    margin-top: 2rem;
    }
    .insLogin_title .fblogin {
    text-align: center;
    color: #fff;
    background-color: #3975ea;
    display: inline-block;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
    height: 4rem;
    line-height: 4rem;
    img{
      width: 2.8rem;
      vertical-align: middle;
      margin-right: 1.4rem;
    }
    span{
      vertical-align: middle;
      text-transform: uppercase;
      font-size: 1.4rem;
    }
}
.insLogin_title .or {
    text-align: center;
    font-size: 1.6rem;
    position: relative;
    color: #666666;
    margin: 2rem 0;
    text-transform: uppercase;
}
.insLogin_title .or::before {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #cccccc;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
}
.insLogin_title .or::after {
    content: '';
    width: 40%;
    height: 1px;
    background-color: #cccccc;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
}

   .tabs-basic {
       padding: 0rem 2rem 0rem 2rem;
      ul{
        display: inline-block;
        width: 100%;
      }
      li {
        width: 50%;
        float: left;
        color: #333;
        border-right: none;
        text-align: left;
        cursor: pointer;
        font-size: 2rem;
        box-sizing: border-box;
        list-style: none;
        background: #fff;
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
                    color: #999;
                    text-decoration: underline;
                  }
                .remember{
                  color: #999;

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
                      border: 1px solid #e5e5e5;
                      background: #fff;
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
    }
}
.ExistingMembersTips {
  margin-top: 10px;
  color: #333;
  font-size: 1.4rem;
  padding: 0rem 2rem 0rem 2rem
}
</style>
