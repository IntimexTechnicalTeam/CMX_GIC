import pc from '@/components/business/login/InsLoginFlow.vue';
import mobile from '@/components/business/login/MoibleInsLoginFlow.vue';
import Vue from 'vue';
const ep = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? mobile : pc;
export default ep;
console.log((/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)));
