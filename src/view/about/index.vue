<template>
  <el-button @click="tableToExcel">导出表格</el-button>
  <el-button @click="logout">请求</el-button>
  <el-button @click="obj++">加1</el-button>

  <el-card class="box-card" :body-style="{ padding: '0px' }" @keyup.enter="Submit">
    <template #header> <div style="text-align: center">聊天室</div> </template>
    <el-scrollbar noresize wrap-class="scroll" height="300px" ref="scrollbarRef">
      <div class="contetn" ref="contetn">
        <div :class="['left', item.TOKEN === TOKEN ? 'right' : '']" v-for="item in list" :key="item.text">
          <div>{{ item.tirm }}</div>
          <div class="item">
            <span>{{ item.text }}</span>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <div class="submit">
      <el-input class="input" v-model="obj.text" placeholder="请输入要发送的内容" size="large" clearable></el-input>
      <el-button type="primary" @click="Submit" size="large">发送</el-button>
    </div>
  </el-card>
</template>

<script setup>
// import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const userInfo = getCurrentInstance().proxy.$api.userInfo;
const list = ref([]);
const TOKEN = Math.random();
const scrollbarRef = ref(null);
const contetn = ref(null);
// const socket = io("http://192.168.168.145:3010");

const obj = reactive({
  text: "",
  date: "",
});

// function Submit() {
//   if (!obj.text) return;
//   socket.emit("howdy", obj.text, TOKEN);
//   obj.text = "";
// }

// socket.on("hello", (arg) => {
//   list.value.push(arg);
//   nextTick(() => {
//     if (contetn.value?.getBoundingClientRect().height > 300) {
//       scrollbarRef.value.setScrollTop(contetn.value?.getBoundingClientRect().height);
//     }
//   });
// });

function scroll() {}

// 通过组合式API
onBeforeMount(() => {
  console.log("onBeforeMount1");
});
onMounted(() => {
  console.log("onMounted2");
});
onBeforeUpdate(() => {
  console.log("onBeforeUpdate3");
});
onUpdated(() => {
  console.log("onUpdated4");
});
onBeforeUnmount(() => {
  console.log("onBeforeUnmount5");
});
onUnmounted(() => {
  console.log("onUnmounted6");
});

onActivated(() => {
  console.log("命中缓存");
});

onDeactivated(() => {
  console.log("缓存");
});

function logout() {
  userInfo.logout();
}
const tableToExcel = () => {
  // 要导出的json数据
  const jsonData = [
    {
      name: "路人甲",
      phone: "123456789",
      email: "000@123456.com",
    },
    {
      name: "炮灰乙",
      phone: "123456789",
      email: "000@123456.com",
    },
    {
      name: "土匪丙",
      phone: "123456789",
      email: "000@123456.com",
    },
    {
      name: "流氓丁",
      phone: "123456789",
      email: "000@123456.com",
    },
  ];
  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = `姓名,电话,邮箱\n`;
  // 增加\t为了不让表格显示科学计数法或者其他格式
  for (let i = 0; i < jsonData.length; i++) {
    for (const key in jsonData[i]) {
      str += `${jsonData[i][key] + "\t"},`;
    }
    str += "\n";
  }
  // encodeURIComponent解决中文乱码
  const uri = "data:text/xls;charset=utf-8,\ufeff" + encodeURIComponent(str);
  // 通过创建a标签实现
  const link = document.createElement("a");
  link.href = uri;
  link.style.display = "none";
  // 对下载的文件命名
  link.download = "数据表.xls";

  link.click();
};
</script>

<style lang="scss" scoped>
.box-card {
  width: 480px;
  margin-top: 20px;
}
.contetn {
  width: 100%;
  .left {
    padding: 0 10px 5px 10px;
    box-sizing: border-box;
    width: 100%;
    .item {
      width: 90%;
      display: inline-block;
      span {
        display: inline-block;
        background: rgba(59, 87, 212, 0.144);
        padding: 5px;
        border-radius: 10px;
        text-align: left;
        word-wrap: break-word;
        word-break: break-all;
        white-space: pre-wrap;
      }
    }
  }
  .right {
    text-align: right;
    .item {
      // text-align: left;
    }
  }
}
.submit {
  display: flex;
  align-items: center;
}
</style>
