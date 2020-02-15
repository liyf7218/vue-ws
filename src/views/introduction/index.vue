<template>
<section>
  <el-row>
    <el-col :span="24">
      <el-divider content-position="right">Introduction</el-divider>
      <div class="us-title">Unit Studio</div>
      <el-divider></el-divider>
    </el-col>
  </el-row>
  <el-row :gutter="20">
    <el-col :span="18">
      <div class="block">
        <el-timeline>
          <el-timeline-item timestamp="2020/1/3" placement="top">
            <el-card>
              <h2>使用Koa框架构建后台服务程序</h2>
              <p>李叶飞 提交于 2020/1/3 00:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2020/1/2" placement="top">
            <el-card>
              <h2>开始使用Vue进行页面的开发</h2>
              <p>李叶飞 提交于 2020/1/2 00:00</p>
            </el-card>
          </el-timeline-item>
          <el-timeline-item timestamp="2020/1/1" placement="top">
            <el-card>
              <h2>创建 Unit-Studio</h2>
              <p>李叶飞 提交于 2020/1/1 00:00</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-col>
    <el-col :span="6">
      <div class="us-intro">
        通过不断的总结和实践,归纳自己的经历,提升自己的认知
        <el-divider></el-divider>
        戒骄戒躁,稳步前行
        <el-divider><i class="el-icon-warning-outline"></i></el-divider>
        {{`${name} ${email}`}}
        <el-divider></el-divider>
      </div>
    </el-col>
  </el-row>
</section>
</template>

<script type="text/javascript">
export default {
  name: 'introduction',
  data() {
    return {
      name: '',
      email: ''
    }
  },
  mounted(){
    this.$axios.post('http://localhost:7001/people').then(res => {
      let { name, email }= res[0];
      this.name = name;
      this.email = email;
    })
  }
}
</script>

<style type="text/css" scoped>
.us-title {
  font-size: 30px;
  margin-left: 20px;
}

.us-intro {
  text-align: center;
  padding-left: 20px;
  border-left: 1px solid lightgray;
  min-height: 500px;
}

.el-card p {
  width: 100%;
  text-align: right;
}
</style>
