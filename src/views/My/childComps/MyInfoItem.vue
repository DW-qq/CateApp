<template>
    <div>
            <ul>
                <li>
                    <div style="display: flex;align-content: center;align-items: center;padding-left: 1rem">
                        <slot name="title"></slot>
                        <slot name="info"></slot>
                        <i class="el-icon-arrow-right"></i>
                    </div>
                </li>
            </ul>
    </div>
</template>

<script>
    export default {
        name: "MyInfoItem"
    }
</script>

<style scoped>
    ul li{
        list-style-type: none;
        background-color: white;
        border-bottom: 1px solid #e4e4e4;
        align-items: center;
        text-align: right;
        line-height: 3.5rem;
    }
    .el-icon-arrow-right{
        font-size: 1.3rem;
        color: #d9d9d9;
        position: absolute;
        left: 23.5rem;
    }
    .info{
    }

</style>