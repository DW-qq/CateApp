<template>
    <div>
        <div class="carRight">
            <div class="carCenter">
                <slot name="carImg"></slot>
            </div>
            <div style="padding-top: 0.5rem">
               <slot name="right"></slot>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "MyListItem"
    }
</script>

<style scoped>
    .carRight {
        background-color: white;
        height: 6rem;
        margin-bottom: 0.5rem;
        /*border: 1px solid red;*/
        width: 93%;
        display: flex;
        margin-left: 1rem;
    }
</style>