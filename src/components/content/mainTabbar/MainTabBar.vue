<template>
<tab-bar>
      <tab-bar-item path="/home" >
        <img slot="item-icon" src="~assets/img/tab/home.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/tab/home@yel.png" alt=""  />
        <div slot="item-text">精选</div>
      </tab-bar-item>
      <tab-bar-item path="/hot">
        <img slot="item-icon" src="~assets/img/tab/hot.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/tab/hot@yel.png" alt=""  />
        <div slot="item-text">热门</div>
      </tab-bar-item>
      <tab-bar-item path="/my">
        <img slot="item-icon" src="~assets/img/tab/my.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/tab/my@yel.png" alt=""  />
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from "../../common/tabbar/TabBar";
import TabBarItem from "../../common/tabbar/TabBarItem";
export default {
  name:'MainTabBar',
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped="scoped">
</style>
