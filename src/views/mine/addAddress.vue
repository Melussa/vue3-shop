<template>
  <div class="add-address">
    <header class="page-header">
      <span class="btn-left" @click="$router.go(-1)">
        <svg-icon icon-class="green-btn"></svg-icon>
      </span>
      <div class="header-content">新增所在地区</div>
      <!-- <router-link class="appeal-record" to="/order/appealRecord" tag="span">删除</router-link> -->
    </header>
    <section class="address-content">
      <ul class="address-list">
        <li class="address-item">
          <van-cell title="联系人" />
          <div class="address-name">
            <van-field v-model="value" placeholder="请输入姓名" />
            <div class="gender-tags">
              <van-tag color="#E96258" plain>女士</van-tag>
              <van-tag color="#3A3A3A" plain>男士</van-tag>
            </div>
          </div>
        </li>
        <li class="address-item">
          <van-cell title="电话" />
          <div class="address-name">
            <van-field v-model="value" placeholder="手机号码" />
          </div>
        </li>
<!--        <li class="address-item">-->
<!--          <van-cell title="所在位置" />-->
<!--          <div class="address-name" @click="show = true">-->
<!--            <van-field v-model="value" disabled placeholder="请选择省市区" />-->
<!--            <div>-->
<!--              <svg-icon icon-class="arrow"></svg-icon>-->
<!--            </div>-->
<!--          </div>-->
<!--        </li>-->
        <li class="address-item">
          <van-cell title="所在位置" />
          <div class="address-name">
            <van-field v-model="value" placeholder="如：武汉3楼-3A16-7" />
          </div>
        </li>
        <li class="address-item">
          <van-cell title="标签" />
          <div class="address-tags">
            <van-tag color="#E96258" plain>工位</van-tag>
<!--            <van-tag color="#E96258" plain>学校</van-tag>-->
<!--            <van-tag color="#E96258" plain>公司</van-tag>-->
          </div>
        </li>
      </ul>
    </section>

    <div class="address-btn">
      <router-link to="/mine/addAddress">
        <van-button type="danger" size="large">保存</van-button>
      </router-link>
    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
      <van-area
        :area-list="areaList"
        @cancel="handleCancel"
        @confirm="handleConfirm"
        value="110101"
      />
    </van-popup>
  </div>
</template>

<script>
import areaList from "../../mock/area";
export default {
  name: "addAddress",
  data() {
    return {
      value: "",
      show: false,
      parentAreaId: 0,
      areaList: areaList
      // areaList: []
    };
  },
  created() {
    this.getAreas();
  },
  methods: {
    // 分层获取中国地址信息
    getAreas() {
      this.$http.get(`/api/address/getCnAreaList?parentAreaId=${this.parentAreaId}`).then(response =>{
        console.log('=====response.data==>',response.data.content);
        // this.areaList = response.data.content
      });
    },
    handleCancel() {
      this.show = false;
    },
    handleConfirm() {
      this.show = false;
    }
  }
};
</script>

<style scoped lang="scss">
.add-address {
  height: 100%;
  padding: 0 16px;
  padding-bottom: 45px;
  .page-header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 10px;
    .btn-left {
      background-color: white;
      width: 24px;
      height: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 12px;
    }
    .header-content {
      text-align: center;
      font-size: 18px;
      font-weight: 600;
      color: #3a3a3a;
      flex: 1;
    }
    .appeal-record {
      color: #d8182d;
      font-size: 13px;
    }
  }
  .address-content {
    margin-top: 20px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    .address-list {
      .address-item {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        /deep/ .van-cell {
          padding-left: 0;
        }
        /deep/ .van-cell__title span {
          font-size: 14px;
          color: #3a3a3a;
        }
        /deep/ .van-cell:not(:last-child)::after {
          border: none;
        }
        .address-name {
          display: flex;
          justify-content: space-between;
          width: 100%;
          .gender-tags {
            display: flex;
            flex: 1;
            justify-content: center;
            align-items: center;
            /deep/ .van-tag::after {
              border-radius: 8px;
            }
            /deep/ .van-tag {
              width: 40px;
              text-align: center;
              height: 22px;
              margin-right: 10px;
            }
          }
        }
        .address-tags {
          /deep/ .van-tag {
            margin-right: 20px;
            width: 40px;
            text-align: center;
          }
        }
      }
    }
  }
  .address-btn {
    position: fixed;
    bottom: 10px;
    width: 92%;
    color: #fff;

    /deep/ .van-button--large {
      height: 44px;
      line-height: 44px;
    }
    /deep/ .van-button--danger {
      background-color: #d8182d;
    }
    /deep/ .van-button__text {
      color: #fff;
    }
  }
}
</style>
