<template>
  <div class="appeal-page">
    <header class="page-header">
      <span class="btn-left" @click="$router.go(-1)">
        <svg-icon icon-class="white-btn"></svg-icon>
      </span>
      <div class="header-content">发布商品</div>
    </header>
    <section class="info-form">
      <van-cell-group>
        <van-field v-model="username" clearable label="商品名称" placeholder="请输入诱人的名称吧" />
        <van-field v-model="phone" label="商品价格" placeholder="请输入合理价格" />
        <section></section>
        <section class="radio-box">
          <div class="label">商品类型：</div>
          <van-radio-group v-model="radio" class="radio-group">
            <van-radio name="1" class="radio-item">悬赏（求购）</van-radio>
            <van-radio name="2" class="radio-item">卖出</van-radio>
          </van-radio-group>
        </section>
        <van-field
          v-model="content"
          :autosize="{ minHeight: 150 }"
          type="textarea"
          label="商品描述"
          placeholder="请输入商品的详细描述"
        />
        <van-field label-width="200px" disabled label="图片上传（最多可上传5张）" />
      </van-cell-group>
      <van-uploader v-model="fileList" multiple :max-count="5" />
    </section>
    <div class="pay-btn">
      <van-button type="danger" size="large" @click="onSubmitEvent">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Appeal",
  data() {
    return {
      username: "",
      phone: "",
      content: "",
      radio: "1",
      fileList: []
    };
  },
  created() {},
  methods: {
    onSubmitEvent() {
      this.$router.push('/myShop/appeal')
    }
  }
};
</script>

<style scoped lang="scss">
.appeal-page {
  height: 100%;
  padding: 0 16px;
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
    .appeal-record {
      color: #D8182D;
      font-size: 13px;
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
            i {
              font-weight: 700;
            }
          }
          .info-two {
            color: #949497;
          }
        }
      }
      .order-count {
        display: flex;
        justify-content: flex-end;
        font-size: 13px;
        i {
          color: #D8182D;
          padding-left: 5px;
          font-weight: 700;
        }
        span {
          color: #3a3a3a;
        }
      }
    }
  }
  .info-form {
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    background-color: #fff;
    /deep/ .van-cell {
      padding-left: 0;
      padding-right: 0;
    }
    /deep/ .van-image img {
      border-radius: 8px;
    }
  }
  .pay-btn {
    width: 100%;
    padding: 0 16px;
    padding-top: 50px;
    padding-bottom: 10px;
    /deep/ .van-button--danger {
      background-color: #D8182D;
      line-height: 44px;
      font-size: 18px;
    }
  }
}
.radio-box{
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  .radio-group{
    float: left;
    margin-left: 20px;
  }
  .label{
    float: left;
  }
  .radio-item{
    float: left;
    margin-right: 10px;
  }

}
</style>
