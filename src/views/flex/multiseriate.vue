<template>
    <div class="mian">
        <div class="left">
            <p>left</p>
        </div>
        <div class="right">
            <p>right</p>
            <p>right</p>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mian{
    display: flex;
    background-color: red;
    .left{
        flex: 20;
        background-color: #555555;
        margin-right: 24px;
    }
    .right {
        flex: 4;
        background-color: #181515;
    }
}
</style>