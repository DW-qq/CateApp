<template>
    <div class="myDetail">
        <nav-tab class="nav_tab">
            <div slot="left" class="back" @click="backOf"> <i class="el-icon-arrow-left"></i> </div>
        </nav-tab>
        <div class="neir">
            <input class="content" v-model="$store.state.userInfo[0].petname" v-show="$store.state.userShow.petname"/>

            <input class="content" type="date" v-model="$store.state.userInfo[0].ubirthday" v-show="$store.state.userShow.ubirthday"/>

            <input class="content" v-model="$store.state.userInfo[0].uadderss" v-show="$store.state.userShow.uadderss"/>

            <input class="content" v-model="$store.state.userInfo[0].utelephone" v-show="$store.state.userShow.utelephone"/>

           <!-- <form action="" method="post" enctype="multipart/form-data">
                <el-image :src="require('assets/img/my/'+$store.state.userInfo[0].uphoto)" v-show="$store.state.userShow.uphoto"></el-image>
                <div class="updateTx" v-show="$store.state.userShow.uphoto">
                    <input type="file" name="file"><br>
                    <button type="submit">更换头像</button>
                </div>
            </form>-->

        </div>
    </div>
</template>

<script>
    import navTab from "../../../components/common/navTabBar/navTab";
    import {mapState} from 'vuex'
    export default {
        name: "MyDetail",
        ...mapState(["userShow"]),
        components:{
            navTab
        },
        methods:{
            backOf(){
                this.$router.go(-1);
                this.$store.state.userShow.petname=false;
                this.$store.state.userShow.uadderss=false;
                this.$store.state.userShow.ubirthday=false;
                this.$store.state.userShow.uphoto=false;
                this.$store.state.userShow.utelephone=false;
            }
        }
    }
</script>

<style scoped>
.nav_tab{
    background-color: #fdce41;
    color: #e8e8e8;

}
    .myDetail{
        position: fixed;
        z-index: 11;
        height: 740px;
        background-color: #f1f1f1;
        width: 100%;
    }
    .neir{
        width: 100%;
        height: 3rem;
        margin-top: 0.1rem;
    }
    .content{
        width: 100%;
        border-top: 0;
        border-right: 0;
        border-left: 0;
        height: 3rem;
        border-bottom: 0.05rem solid #e0e2dd;
        outline: none;
        padding-left: 2rem;
        padding-right: 1rem;
    }
input:focus {
    color: #8b8791;
    border-bottom:  0.05rem solid #ff2f1b;
}
.updateTx{

    background-color: #e6e6e6;
    opacity: 0.6;
    width: 100%;
    height: 10rem;
    position: relative;
    top: 10rem;
}
</style>