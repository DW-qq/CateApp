<template>
    <div class="check-button" :class="{check:isChecked}">
      <img src="~assets/img/my/tick.svg">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
        props:{
          isChecked: {
            type:Boolean,
            default:false
          }
        }
    }
</script>

<style scoped>
  .check-button{
    border: 2px solid #aaa;
    border-radius: 50%;
      width: 1.5rem;
  }
  .check{
    background-color: #fdce41;
    border-color: #fdce41;
  }
</style>
