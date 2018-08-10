<!--供应商管理-新增供应商-->
<template>
  <div class="supplier-add">

    <h3>基本资料</h3>

    <el-form :model="detailForm" ref="detailForm" label-width="120px"
             label-position="right" size="medium">

      <el-form-item label="公司名称" prop="company" required>
        <el-input v-model="detailForm.company" placeholder="请输入公司名称"></el-input>
      </el-form-item>

      <el-form-item label="联系人" prop="contact" required>
        <el-input v-model="detailForm.contact" placeholder="请输入联系人名称"></el-input>
      </el-form-item>

      <el-form-item label="联系电话" prop="phone" required>
        <el-col :span="10">
          <el-input v-model="detailForm.phone" placeholder="请输入联系电话"></el-input>
        </el-col>
        <span>（使用电话号码作为登录账户）</span>
      </el-form-item>

      <el-form-item label="设置原始密码" prop="password" required>
        <el-col :span="10">
          <el-input v-model="detailForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-col>
        <span>（不填写默认不修改）</span>
      </el-form-item>

      <el-form-item label="确认密码" prop="confirmPassword" required>
        <el-col :span="10">
          <el-input v-model="detailForm.confirmPassword" placeholder="再次输入密码" type="password"></el-input>
        </el-col>
      </el-form-item>

      <el-form-item label="使用期限">
        <el-col :span="10">
          <el-col :span="11">
            <el-form-item prop="startDate">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="detailForm.startDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endDate">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="detailForm.endDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-col>
      </el-form-item>

      <el-form-item label="缴费记录" align="right">
        <el-col :lg="10" :md="12">
          <el-button type="primary" size="small">新增缴费记录/升级账号</el-button>
        </el-col>
      </el-form-item>

      <el-table
        ref="paymentRecords"
        :data="paymentRecords"
        tooltip-effect="dark">

        <el-table-column prop="id" label="序号" width="80">
        </el-table-column>

        <el-table-column prop="date" label="缴费日期" width="130">
        </el-table-column>

        <el-table-column prop="amount" label="缴费金额（元）" width="150">
        </el-table-column>

        <el-table-column prop="channel" label="缴费渠道" width="160">
        </el-table-column>

        <el-table-column label="缴费凭证" width="200">
          <template slot-scope="scope">
            <img v-if="scope.row.image" :src="scope.row.image" style="width: 160px; height: 90px"/>
          </template>
        </el-table-column>

        <el-table-column prop="seller" label="收银员" width="120">
        </el-table-column>

      </el-table>


      <h3>企业资料</h3>

      <el-form-item label="公司简介" prop="introduction">
        <el-input v-model="detailForm.introduction" placeholder="请填写公司简介" type="textarea" rows="5"></el-input>
      </el-form-item>

      <el-form-item label="地址">
        <el-col :span="5">
          <el-form-item prop="province">
            <el-select v-model="detailForm.province" placeholder="请选择省份">
              <el-option label="广东省" value="0"></el-option>
              <el-option label="广西省" value="1"></el-option>
              <el-option label="海南省" value="2"></el-option>
              <el-option label="湖南省" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="1">&nbsp;</el-col>

        <el-col :span="5">
          <el-form-item prop="city">
            <el-select v-model="detailForm.city" placeholder="请选择城市">
              <el-option label="广州" value="0"></el-option>
              <el-option label="深圳" value="1"></el-option>
              <el-option label="珠海" value="2"></el-option>
              <el-option label="江门" value="3"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="1">&nbsp;</el-col>

        <el-col :span="12">
          <el-form-item prop="address">
            <el-input v-model="detailForm.address" placeholder="请输入详细地址" type="text"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="座机">
        <el-col :span="8">
          <el-form-item prop="telephone">
            <el-input v-model="detailForm.telephone" placeholder="请输入固定电话" type="text"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="detailForm.email" placeholder="请输入电子邮箱地址" type="text"></el-input>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="主营商品" prop="products">
        <el-input v-model="detailForm.products" placeholder="请填写主营商品" type="textarea" rows="5"></el-input>
      </el-form-item>

      <el-form-item label="主营风格">
        <el-cascader
          placeholder="请选择主营风格"
          :options="productStyleOptions"
          filterable
          change-on-select
          @change="onChangeProductStyle"
        ></el-cascader>
        <el-button type="primary" @click="addProductStyle">添加</el-button>

        <ul class="product-style-list">
          <li v-for="style in detailForm.productStyle">
            <span>{{style.join(' -> ')}}</span> <el-button type="danger" icon="el-icon-delete" circle size="small" @click="deleteStyle(style)"></el-button>
          </li>
        </ul>
      </el-form-item>

      <el-form-item label="Logo" prop="logo">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="detailForm.logoUrl" :src="detailForm.logoUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <span style="color: red">（尺寸：200*200）</span>
      </el-form-item>

      <el-form-item>
        <el-col :span="16" align="center">
          <el-button type="primary" style="width: 120px" @click="submitForm(detailForm)">保存</el-button>
        </el-col>
      </el-form-item>

    </el-form>

  </div>
</template>

<script>
  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  export default {
    name: "AddSupplier",
    data() {
      return {
        curProductStyle: [],
        detailForm: {
          company: '', // 公司名称
          contact: '', // 联系人名称
          phone: '', // 联系电话
          password: '', // 原始密码
          confirmPassword: '', // 确认密码
          startDate: '', // 使用期限 - 开始日期
          endDate: '', // 使用期限 - 结束日期
          introduction: '', // 公司简介
          province: '', // 省份
          city: '', // 城市
          address: '', // 详细地址
          products: '', // 主营商品
          productStyle: [], // 主营风格
          telephone: '', // 座机，固定电话
          email: '', // 电子邮箱
          category: '', // 一级分类
          subCategory: '', // 二级分类
          logoUrl: '' // logo地址
        },
        paymentRecords: [
          {
            id: '001', // 序号
            date: '2018-07-03', // 缴费日期
            amount: '5000', // 缴费金额
            channel: '在线|微信支付', // 渠道
            image: '', // 缴费凭证
            seller: '李思思' // 收银员
          },
          {
            id: '001', // 序号
            date: '2018-07-06', // 缴费日期
            amount: '3000', // 缴费金额
            channel: '线下|现金支付', // 渠道
            image: '', // 缴费凭证
            seller: '' // 收银员
          }
        ], // 缴费记录
        productStyleOptions: [
          {
            value: '欧式',
            label: '欧式',
            children: [
              {
                value: '吸顶灯',
                label: '吸顶灯',
              },
              {
                value: '吊灯',
                label: '吊灯',
                children: [
                  {
                    value: '水晶灯',
                    label: '水晶灯'
                  },
                  {
                    value: '全铜灯',
                    label: '全铜灯'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {
      handleAvatarSuccess(res, file) { // TODO 头像上传成功
        this.logoUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) { // TODO 头像上传之前
        let isJPG = file.type === 'image/jpeg';
        let isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      onChangeProductStyle(valueArray) { // TODO 主营风格下拉框的值修改时触发
        this.curProductStyle = valueArray;
      },
      addProductStyle() { // TODO 添加主营风格
        this.detailForm.productStyle.push(this.curProductStyle);
      },
      submitForm(form) { // TODO 提交表单

      },
      deleteStyle(style) { // TODO 主营风格 - 删除已选风格
        this.detailForm.productStyle.remove(style);
      }
    }
  }
</script>

<style scoped>
  .el-button--small.is-circle {
    padding: 6px;
  }
  .el-table {
    margin-left: 60px;
  }
  .avatar-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 200px;
    height: 200px;
    display: inline-block;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 200px;
    height: 200px;
    line-height: 200px;
    text-align: center;
  }
  .avatar {
    width: 200px;
    height: 200px;
    display: block;
  }
  .product-style-list {
    padding: 0px;
  }
  .product-style-list li {
    list-style: none;
  }
  .product-style-list li span {
    margin-right: 15px;
  }
</style>
