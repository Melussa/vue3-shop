<template>
  <div class="home">
    <header class="home-header" :class="{'active' : headerActive}">
      <div class="header-search">
        <svg-icon class="search-icon" icon-class="search"></svg-icon>
        <router-link tag="span" class="search-title" to="./search">推荐搜索 关键词</router-link>
      </div>
      <svg-icon class="customer-service-icon" icon-class="customer-service"></svg-icon>
    </header>
    <div class="content-tabs">
<!--      <van-tabs-->
<!--        :swipe-threshold="5"-->
<!--        title-inactive-color="#3a3a3a"-->
<!--        title-active-color="#D8182D"-->
<!--        background="transparent"-->
<!--        v-model="active"-->
<!--        animated-->
<!--      >-->
        <section
          v-for="(list,index) in tabArray.value"
          :title="list.describe"
          :name="list.type"
          :key="index"
        >
<!--          <div slot="title" class="slot-title">-->
<!--            <b class="tab-title">{{list.title}}</b>-->
            <!-- <span class="tab-name">{{list.describe}}</span> -->
<!--            <span class="tab-name">{{list.name}}</span>-->
<!--          </div>-->

          <section class="goods-box search-wrap">
            <ul class="goods-content">
              <li v-for="(item,index) in list.list" :key="index">
                <router-link class="goods-img" tag="div" to="/classify/product">
                  <div class="want-buy" v-if="item.isWantBuy">
                    <svg-icon icon-class="chain-cat-member"></svg-icon>
                    <span  class="want-buy-text">{{item.isWantBuy}}</span>
                  </div>
                  <img :src="item.img" />
                </router-link>
                <div class="goods-layout">
                  <div class="goods-title">{{item.productName}}</div>
                  <div class="goods-div">
                    <img src="../../assets/image/product/store-headerM.png" class="header-img" />
                    <span class="name-txt">{{item.username}}</span>
                    <span class="position">{{item.position}}</span>
                  </div>
                  <div class="goods-desc">
                    <span class="goods-price">
                      <i>{{item.price}}</i>
                    </span>
                    <span class="add-icon" @click="addToCart($event,item)">订阅
<!--                      <svg-icon icon-class="add"></svg-icon>-->
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </section>
<!--      </van-tabs>-->
    </div>
    <div class="ballWrap">
      <transition @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
        <div class="ball" v-if="show">
          <li class="inner">
            <span class="cubeic-add" @click="addToCart($event,item)">
              <svg-icon class="add-icon" icon-class="add"></svg-icon>
            </span>
          </li>
        </div>
      </transition>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  watch,
  getCurrentInstance,
  onMounted,
  computed,
  toRefs
} from "@vue/composition-api";
export default {
  name: "home",
  setup(props, { attrs, slots, parent, root, emit, refs }) {
    const active = ref("");
    const timeData = ref(36000000);
    const tabArray = reactive({ value: [] });
    const headerActive = ref(false);
    const homeImgs = reactive({
      value: []
    });
    const tabImgs = reactive({
      value: []
    });
    const ball = reactive({
      show: false,
      el: ""
    });
    const swiperOption = {
      loop: true,
      autoplay: false,
      width: 480,
      loadOnTransitionStart: true,
      notNextTick: true, //notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
      direction: "horizontal", //水平方向移动
      grabCursor: true, //鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
      setWrapperSize: true, //Swiper使用flexbox布局(display: flex)，开启这个设定会在Wrapper上添加等于slides相加的宽或高，在对flexbox布局的支持不是很好的浏览器中可能需要用到。
      autoHeight: true, //自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化
      mousewheel: false, //开启鼠标滚轮控制Swiper切换。可设置鼠标选项，默认值false
      mousewheelControl: false, //同上
      height: window.innerHeight, // 高度设置，占满设备高度
      resistanceRatio: 0, //抵抗率。边缘抵抗力的大小比例。值越小抵抗越大越难将slide拖离边缘，0时完全无法拖离。本业务需要
      observeParents: true, //将observe应用于Swiper的父元素。当Swiper的父元素变化时，例如window.resize，Swiper更新
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      touchRatio: 1, // 默认为1，按照1:1的触摸比例滑动。设置为0时，完全无法滑动
      // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
      debugger: true,
      slidesPerView: 2 //设置slider容器能够同时显示的slides数量(carousel模式)。可以设置为数字（可为小数，小数不可loop），或者 'auto'则自动根据slides的宽度来设定数量。loop模式下如果设置为'auto'还需要设置另外一个参数loopedSlides。
    };
    root.$http.get("http://test.happymmall.com/home/homeData").then(res => {
      const { images, images2, tabList } = res.data;
      tabArray.value = tabList;
      homeImgs.value = images;
      tabImgs.value = images2;
    });
    onMounted(() => {
      root.$eventBus.$emit("changeTag", 0);
      window.addEventListener("scroll", pageScroll);
    });
    const addToCart = (event, tag) => {
      root.$store.commit("cart/addToCart", tag);
      ball.show = true;
      ball.el = event.target;
    };
    const beforeEnter = el => {
      const dom = ball.el;
      const rect = dom.getBoundingClientRect();
      const x = rect.left - window.innerWidth * 0.6;
      const y = -(window.innerHeight - rect.top);
      el.style.display = "block";
      el.style.transform = `translate3d(0,${y}px,0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(${x}px,0,0)`;
    };
    const enter = (el, done) => {
      document.body.offsetHeight;
      el.style.transform = `translate3d(0,0,0)`;
      const inner = el.querySelector(".inner");
      inner.style.transform = `translate3d(0,0,0)`;
      el.addEventListener("transitionend", done);
    };
    const afterEnter = el => {
      ball.show = false;
      el.style.display = "none";
    };
    const handleClick = linkUrl => {
      root.$router.push("/classify/product");
    };
    const pageScroll = () => {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      scrollTop > 100
        ? (headerActive.value = true)
        : (headerActive.value = false);
    };
    return {
      active,
      timeData,
      tabArray,
      headerActive,
      homeImgs,
      tabImgs,
      ...toRefs(ball),
      swiperOption,
      addToCart,
      beforeEnter,
      enter,
      afterEnter,
      handleClick,
      pageScroll
    };
  }
};
</script>

<style scoped lang="scss" src='./index.scss'>

</style>
