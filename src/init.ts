import Vue from 'vue';
import i18n from '@/lang';
import store from './store';
import InsInform from '@/components/base/InsInform.vue';
import InsNotice from '@/components/base/InsNotice.vue';
import InsConfirm from '@/components/base/InsConfirm.vue';
import InsLayer from '@/components/service/InsLayer.vue';
import InstoreSdk from './sdk/InstoreSdk';
import InLogin from '@/components/business/login/InsLoginFlow';
import storage from '@/sdk/common/Storage';
import message from 'element-ui/lib/message';
import language from '@/lang/index';
import { FrontE } from '@/sdk/common/SysConst';
import LoadScript from './sdk/common/LoadScript';
const util = {
  info: function (options, type) {
    if (options === undefined || options === null) {
      options = {
        Message: ''
      };
    } else if (typeof options === 'string' || typeof options === 'number') {
      options = {
        Message: options
      };
      if (type !== undefined && options != null) {
        options.Type = type;
      }
    }
    let instance = new InsInform({
      data: options
    }).$mount();
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      Vue.prototype.informCount++;
      instance.Visible = true;
    });
  },
  notice: function (options, content, type) {
    if (options === undefined || options === null) {
      options = {
        Title: ''
      };
    } else if (typeof options === 'string' || typeof options === 'number') {
      options = {
        Title: options
      };
      if (type !== undefined && options != null) {
        options.Type = type;
      }
      if (content !== undefined && options != null) {
        options.Content = content;
      }
    }
    let instance = new InsNotice({
      data: options
    }).$mount();
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      Vue.prototype.noticeCount++;
      instance.Visible = true;
    });
  },
  confirm: function (options, content, confirm, cancel) {
    if (options === undefined || options === null) {
      options = {
        Title: ''
      };
    } else if (typeof options === 'string' || typeof options === 'number') {
      options = {
        Title: options
      };
      if (content !== undefined && options != null) {
        options.Content = content;
      }
    } else if (typeof options === 'object') {
      if (!options.Title || !options.Content) {
        throw new Error();
      }
    }
    options.Confirm = confirm;
    options.Cancel = cancel;

    let instance = new InsConfirm({
      data: options,
      i18n,
      store
    }).$mount();
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      Vue.prototype.confirmCount++;
      instance.Visible = true;
    });
  },
  instanceConfirm: null as any,
  singtonConfirm: function (options, content, confirm, cancel) {
    if (util.instanceConfirm !== null) return;
    if (options === undefined || options === null) {
      options = {
        Title: ''
      };
    } else if (typeof options === 'string' || typeof options === 'number') {
      options = {
        Title: options
      };
      if (content !== undefined && options != null) {
        options.Content = content;
      }
    } else if (typeof options === 'object') {
      if (!options.Title || !options.Content) {
        throw new Error();
      }
    }
    options.Confirm = confirm;
    options.Cancel = cancel;

    let instance = new InsConfirm({
      data: options,
      i18n
    }).$mount();
    util.instanceConfirm = instance;
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
      Vue.prototype.confirmCount++;
      instance.Visible = true;
    });
  },
  clearSingtonConfirm: function () {
    util.instanceConfirm = null;
  },
  showLayer: function (el) {
    el = el instanceof HTMLElement ? el : document.getElementById(el);
    if (!el) {
      el = document.getElementById('layer');
    }
    if (!el) {
      throw new Error(
        'Layer error:layer depend on a HTMLElement. param el must be a id(string) or a HTMLElement'
      );
    }
    let instance = util.getLayer(el);
    instance.showL();
  },
  hiddenLayer: function (el) {
    el = el instanceof HTMLElement ? el : document.getElementById(el);
    if (!el) {
      el = document.getElementById('layer');
    }
    if (!el) {
      throw new Error(
        'Layer error:layer depend on a HTMLElement. param el must be a id(string) or a HTMLElement'
      );
    }
    let instance = util.getLayer(el) as any;
    instance.hidden();
  },
  layer: InsLayer as any,
  getLayer: function (el) {
    if (this.layer instanceof InsLayer) {
      return this.layer;
    } else {
      this.layer = new InsLayer({ data: { show: true }, store }).$mount();
      el.appendChild(this.layer.$el);
      return this.layer;
    }
  },
  delay: 0,
  Shake (fn, d) {
    if (!(fn instanceof Function)) return;
    let timeout = d || 1000;
    if (this.delay === 0) { this.delay = setTimeout(fn, timeout); } else { clearTimeout(this.delay); this.delay = setTimeout(fn, timeout); }
  },
  login: undefined as any,
  Login: function (rollback, ...params) {
    if (this.login) this.login.showL();
    else {
      this.login = new InLogin({ i18n, store }).$mount();
      document.body.appendChild(this.login.$el);
    }
    this.login.setRollback(rollback, params);
    this.login.showL();
  },
  LoginClose: function () {
    if (this.login) this.login.hidden();
  },
  CheckMemberInfo (member) {
    if (!member) return;
    let keys = Object.keys(member);
    let lang = Vue.prototype.$Storage.get('locale');
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      if (element.match(/(FirstName)|(LastName)|(Mobile)|(BirthDate)/) && !member[element]) {
        // util.Shake(() => {
        //   Vue.prototype.$notify({
        //     title: (language.messages[lang].Message as any).Message,
        //     dangerouslyUseHTMLString: true,
        //     message: '<strong>' + (language.messages[lang].Message as any).MemberInfo + '</strong>'
        //   });
        // }, 2000);
        break;
      }
    }
  },
  install: function (Vue) {
    Vue.prototype.$Inform = util.info;
    Vue.prototype.$Notice = util.notice;
    Vue.prototype.$Confirm = util.confirm;
    Vue.prototype.confirmCount = 0;
    Vue.prototype.informCount = 0;
    Vue.prototype.$ShowLayer = util.showLayer;
    Vue.prototype.$HiddenLayer = util.hiddenLayer;
    Vue.prototype.$Api = InstoreSdk.api;
    Vue.prototype.$SingtonConfirm = util.singtonConfirm;
    Vue.prototype.$ClearSingtonConfirm = util.clearSingtonConfirm;
    Vue.prototype.$Login = util.Login;
    Vue.prototype.$LoginClose = util.LoginClose;
    Vue.prototype.$Storage = storage;
    Vue.prototype.Shake = util.Shake;
    Vue.prototype.FrontE = FrontE;
    Vue.prototype.CheckMemberInfo = util.CheckMemberInfo;
    // 掛載方法（引入外部js）到實例
    Vue.prototype.$LoadScript = LoadScript;
    Vue.prototype.Reload = function () {
      window.location.reload();
    };
  }
};
export default util;
