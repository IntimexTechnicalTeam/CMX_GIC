<template>
    <div class="copyright">
        <p>Copyright© {{year}} JSW Dental Limited . Powered by Eventizer<a target="_blank" href="http://intimex.hk">
            <img src="/static/Images/mobile/footerlogo.png" />
        </a></p>
    </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
@Component
export default class InsCopyright extends Vue {
    year: number = 0;

    created () {
      let date = new Date();
      this.year = date.getFullYear();
    }
}
</script>
<style lang="less" scoped>
.copyright {
    background-color: #f0f0f0;
}

.pc {
    .copyright {
        text-align: center;
        padding: 20px 0;
        p {
            color: #fff;
            font-size: 14.8px;
            display: inline-block;
            vertical-align: middle;
        }

        img {
            vertical-align: middle;
            margin-left: 12px;
        }
    }
}

.mobile {
    .copyright {
        padding: 0.6rem 1rem 1rem;
        text-align: center;

        p {
            display: inline-block;
            color: #999999;
            font-size: 1.2rem;
            vertical-align: middle;
        }

        img {
            vertical-align: middle;
            margin-left: 0.5rem;
            width: 5rem;
        }
    }
}
</style>
