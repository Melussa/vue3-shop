<template>
  <div class="page-order">
    <header class="page-header">
      <span class="btn-left" @click="$router.go(-1)">
        <svg-icon icon-class="white-btn"></svg-icon>
      </span>
      <div class="header-content">我的店铺</div>
    </header>
    <router-link to="/myShop/appeal" class="option-item" tag="li">
      <div class="item-info">
        <svg-icon class="incon" icon-class="add"></svg-icon>
        <span>发布商品</span>
      </div>
    </router-link>
    <section class="may-like">
      <ul class="like-list">
        <span class="like-title">已发布商品</span>
        <li class="like-item">
          <img class="item-picture" />
          <div class="item-detail">
<!--            <p class="store-info">-->
<!--              <img src="../../assets/image/product/store-headerM.png" class="header-img" />-->
<!--              <label>店铺名称</label>-->
<!--            </p>-->
            <p class="item-title">娜扎新装LOOK</p>
            <p class="item-count">
              <i>$248</i>
              <span>月销:888</span>
            </p>
          </div>
        </li>
        <li class="like-item">
          <img class="item-picture" />
          <div class="item-detail">
<!--            <p class="store-info">-->
<!--              <img src="../../assets/image/product/store-headerM.png" class="header-img" />-->
<!--              <label>店铺名称</label>-->
<!--            </p>-->
            <p class="item-title">娜扎新装LOOK</p>
            <p class="item-count">
              <i>$248</i>
              <span>月销:888</span>
            </p>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
import ListScroll from "../../components/scroll/ListScroll";
export default {
  name: "Order",
  components: {
    ListScroll
  },
  data() {
    return {
      orderType: 1,
      categoryData: []
    };
  },
  created() {},
  mounted() {
    this.setSearchWrapWidth();
    this.$eventBus.$emit("changeTag", 1);
  },
  methods: {
    setSearchWrapWidth() {
      // let $screenWidth = document.documentElement.clientWidth;
      // this.$refs.searchWrap.style.width = $screenWidth + 100 + "px";
    },
    selectTag(e) {
      let $type = parseInt(e.currentTarget.getAttribute("data-type"));
      this.orderType = $type;
      // this.$router.replace('./order-list?orderType='+$type)
      // this.orderList = []
      // this.emptyMsg = ''
      // this.getOrderList()
    }
  }
};
</script>

<style scoped lang="scss">
.page-order {
  padding: 0 16px;
  height: 100%;
  .scroll-wrapper {
    height: 40px;
  }
  .page-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;

    .header-content {
      text-align: center;
      font-size: 18px;
      color: #3a3a3a;
      font-weight: 600;
      flex: 1;
    }
  }
  .order-tag {
    display: flex;
    justify-content: space-between;
    width: 100%;
    flex-wrap: nowrap;
    overflow-y: scroll;
    span {
      height: 40px;
      line-height: 40px;
      font-size: 13px;
      width: 100%;
      display: inline-block;
      color: #949497;
      text-align: center;
      &.active {
        color: red;
        border-bottom: 2px solid red;
      }
    }
  }
  .order-card {
    background-color: #fff;
    border-radius: 5px;
    padding: 10px 20px;
    margin-top: 20px;
    .order-list {
      .order-item {
        display: flex;
        justify-content: space-between;
        & > span {
          color: #D8182D;
          font-size: 11px;
        }
        .store-info {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-size: 10px;
          .header-img {
            width: 24px;
            height: 24px;
          }
          span {
            color: #3a3a3a;
            padding-left: 3px;
            font-size: 11px;
          }
        }
      }
      .order-info {
        padding-top: 10px;
        display: flex;
        justify-content: space-between;
        img {
          width: 80px;
          height: 80px;
          display: inline-block;
          background-color: #D8182D;
          border-radius: 4px;
        }
        .order-detail {
          flex: 1;
          padding-left: 16px;
          padding-bottom: 4px;
          .info-one,
          .info-two {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
          }
          .info-one {
            color: #3a3a3a;
            padding-bottom: 5px;
          }
          .info-two {
            color: #949497;
          }
        }
      }
      .order-count {
        display: flex;
        justify-content: flex-end;
        i {
          color: #D8182D;
          font-size: 14px;
          padding-left: 5px;
        }
        span {
          color: #3a3a3a;
          font-size: 11px;
        }
      }
      .order-btn {
        display: flex;
        justify-content: flex-end;
        padding-top: 14px;
        span {
          height: 26px;
          line-height: 20px;
          border: 1px solid #949497;
          color: #949497;
          font-size: 11px;
          padding: 2px 15px;
          border-radius: 2px;
          margin-left: 10px;
        }
      }
    }
  }
  .may-like {
    padding-bottom: 20px;
    padding-top: 40px;
    .like-list {
      .like-title {
        color: #D8182D;
        font-size: 18px;
      }
      .like-item {
        background-color: #fff;
        margin-top: 8px;
        border-radius: 4px;
        padding: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .item-picture {
          width: 80px;
          height: 80px;
          display: inline-block;
          background-color: #D8182D;
          border-radius: 4px;
        }
        .item-detail {
          padding-left: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-start;
          flex: 1px;
          .store-info {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            img {
              width: 24px;
              height: 24px;
            }
            label {
              color: #3a3a3a;
              font-size: 11px;
              padding-left: 4px;
            }
          }
          .item-title {
            color: #3a3a3a;
            font-size: 14px;
            padding-top: 10px;
            margin-bottom: 18px;
          }
          .item-count {
            padding-top: 4px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            i {
              color: #D8182D;
              font-size: 14px;
            }
            span {
              font-size: 11px;
              color: #949497;
            }
          }
        }
      }
    }
  }
}

.option-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding-bottom: 22px;
  position: absolute;
  right: 20px;
  top: 60px;
  .item-info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    color: #888;
    .incon {
      padding-right: 16px;
    }
    .header-img {
      width: 50px;
      height: 50px;
      padding-right: 16px;
    }
  }
}
</style>
