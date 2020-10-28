<template>
    <div class="detailsIntro">
        <p class="titleInfo">商品简介</p>
        <p>主要材料：{{materials}}</p>
        <p>价格说明：无</p>
    </div>
</template>

<script>
    export default {
        name: "DetailsIntro",
        data(){
            return{
                textarea: ''
            }
        },
        props:{
            materials:{
                type:String
            }
        }
    }
</script>

<style scoped>
    .detailsIntro{
        background-color: white;
        padding-left: 1rem;
        margin-top: 1.5rem;
        padding-top: 1rem;
        line-height: 2.5rem;

    }

</style>