<template>
  <div id="container" class="home">
    <ins-banner :page="'Home'" :initSwiper="true" />
    <ins-about-us />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
@Component({
  components: {
    InsBanner: () => import('@/components/base/InsBanner.vue'),
    InsAboutUs: () => import('@/components/business/home/InsAboutUs.vue')
  }
})
export default class InsHome extends Vue {
  swiperOption: object = {
    loop: true,
    autoplay: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    autoHeight: true, // 高度随内容变化
    observer: true, // 修改swiper自己或子元素时，自动初始化swiper
    observeParents: true // 修改swiper的父元素时，自动初始化swiper
  };

  get AreaCode () {
    return localStorage.getItem('AreaCode') || '';
  }

  mounted () {

  }
}
</script>

<style lang="less" scoped>
.pc {
  .home {
    /deep/ .banner {
      .swiper-pagination {
        bottom: 40px;

        .swiper-pagination-bullet {
          width: 18px;
          height: 18px;
          background: #e6e6e6;
        }

        .swiper-pagination-bullet-active {
          background: url('/static/images/pc/active.png') no-repeat center center;
          background-size: 20px;
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}

.mobile {
  .home {
    .banner{
      // min-height: 100vh;
      background-color: white;

      /deep/ .swiper-pagination {
        bottom: 12px;
        .swiper-pagination-bullet {
          width: 15px;
          height: 15px;
          background: #e6e6e6;
          opacity: 1;
        }

        .swiper-pagination-bullet-active {
          background: url('/static/images/pc/active.png') no-repeat center center;
          background-size: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>
