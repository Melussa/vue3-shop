<template>
  <div class="classify">
    <header class="home-header">商品分类</header>
    <section class="search-wrap" ref="searchWrap">
      <list-scroll class="nav-side-wrapper">
        <ul class="nav-side">
          <li
            v-for="(item,index) in categoryDatas.value"
            :key="index"
            :class="{'active' : currentIndex === index}"
            @click="selectMenu(index)"
          >
            <span>{{item.name.slice(0,2)}}</span>
            <span>{{item.name.slice(2)}}</span>
          </li>
        </ul>
      </list-scroll>
      <list-scroll class="search-content">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <template v-for="(category,index) in categoryDatas.value">
              <div class="swiper-slide" :key="index" v-if="currentIndex === index">
                <img
                  @click="selectProduct(category.value)"
                  class="category-main-img"
                  :src="category.imgUrl"
                  v-if="category.imgUrl"
                />
                <div v-for="(products,index) in category.list" :key="index">
                  <p class="goods-title">{{products.title}}</p>
                  <div class="category-list">
                    <div
                      class="product-item"
                      @click="selectProduct(product.value)"
                      v-for="(product,index) in products.productList"
                      :key="index"
                    >
                      <img class="item-img" :src="product.imgUrl" />
                      <p class="product-title">{{product.title}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </list-scroll>
    </section>
    <tabbar></tabbar>
  </div>
</template>

<script>
import ListScroll from "@/components/scroll/ListScroll";
import {
  ref,
  reactive,
  onMounted,
  computed,
  toRefs
} from "@vue/composition-api";
export default {
  name: "classify",
  components: {
    ListScroll
  },
  setup(props, { root }) {
    const tags = ref([]);
    const currentIndex = ref(0);
    const categoryDatas = reactive({
      value:[]
    });
    const searchWrap = ref(null);
    root.$http.get("http://test.happymmall.com/category/categoryData")
      .then(res => {
        const { categoryData } = res.data;
        categoryDatas.value = categoryData;
      });
    //左侧菜单和右侧区域联动
    const selectMenu = index => {
      currentIndex.value = index;
    };
    //动态设置searc-wrap的高
    const setSearchWrapHeight = () => {
      let $screenHeight = document.documentElement.clientHeight;
      searchWrap.value.style.height = $screenHeight - 100 + "px";
    };
    const selectProduct = sku => {
      root.$router.push({ path: "/classify/recommend", query: { sku: sku } });
    };
    onMounted(() => {
      setSearchWrapHeight();
      root.$eventBus.$emit("changeTag", 1);
    });
    return {
      tags,
      currentIndex,
      searchWrap,
      categoryDatas,
      selectProduct,
      selectMenu
    };
  }
};
</script>

<style scoped lang="scss" src='./index.scss'>
</style>
