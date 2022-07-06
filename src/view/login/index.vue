<template>
  <section class="section">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" class="demo-ruleForm">
      <el-form-item>
        <div class="title">食品经营单位疫情精准防控管理系统</div>
      </el-form-item>
      <el-form-item prop="name">
        <el-input prefix-icon="UserFilled" placeholder="请输入账号" v-model.trim="ruleForm.name" style="height: 50px" @keyup.enter="submitForm" />
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item prop="password">
        <el-input show-password prefix-icon="Lock" placeholder="请输入密码" v-model.trim="ruleForm.password" type="password" @keyup.enter="submitForm" style="height: 50px" />
      </el-form-item>
      <el-form-item></el-form-item>
      <el-form-item>
        <el-button @click="submitForm" :loading="loading" style="height: 40px; width: 100%" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script setup name="login">
import uesrinfo from "@/pinia/userInfo.js";
const router = useRouter();
const route = useRoute();
const uesrinfos = uesrinfo();
const ruleFormRef = ref(null);
const loading = ref(false);
const ruleForm = reactive({
  name: "",
  password: "",
});
function validator(rule, value, callback) {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else if (/.*[\u4e00-\u9fa5]+.*$/.test(value)) {
    callback(new Error("请输入不包含汉字的密码"));
  } else {
    callback();
  }
}
const rules = reactive({
  name: [{ required: true, trigger: "blur", message: "请填写账号" }],
  password: [{ validator, trigger: "blur", required: true }],
});
function submitForm() {
  if (!ruleFormRef) return;
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      uesrinfos
        .login(ruleForm)
        .then(() => {
          router.replace({
            path: route.query.redirect ? route.query.redirect : "/",
          });
        })
        .catch((err) => {
          ElMessage({
            type: "warning",
            grouping: true,
            message: err.msg,
          });
        });
    } else {
      return false;
    }
  });
}
</script>

<style lang="scss" scoped>
.section {
  width: 100%;
  height: 100%;
  background-color: #132054;
}
.demo-ruleForm {
  position: relative;
  width: 520px;
  max-width: 100%;
  padding: 162px 35px 0;
  margin: 0 auto;
  overflow: hidden;
}
.title {
  height: 50px;
  width: 100%;
  font-size: 26px;
  color: var(--el-color-white);
  text-align: center;
}
</style>
