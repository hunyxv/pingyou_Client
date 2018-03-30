<template>
        <div class="spinner" :class="{ show: show }" v-show="show">
                <img src="../../static/timg.gif" alt="">
        </div>
</template>

<script>
export default {
        name: 'spinner',
        props: ['show'],
        serverCacheKey: props => props.show
}
</script>

<style scoped>
.spinner{
        position: fixed;
        width: 90%;
        height: 98%;
        margin: 0 1%;
        background: rgba(255,255,255,.8);
        z-index: 998;
}
.spinner img{
        position: absolute;
        top:30%;
        left: 50%;
        width:200px;
        margin-left: -200px;
        z-index: 999;
}
</style>