<template>
    <div class="main">
        <div class="up flex">
            <div class="upitem"></div>
            <div class="upitem"></div>
            <div class="upitem"></div>
        </div>
        <div class="bottom flex">
            <div class="bottomitem1"></div>
            <div class="bottomitem2"></div>
        </div>
    </div>
    <button @click="$router.push('/flex/multiseriate')">
        多列 GO
    </button>
    <button @click="$router.push('/flex/aequilate')">
        等宽 GO
    </button>
    <div>
        <RouterView></RouterView>
    </div>
</template>

<style lang="scss" scoped>
.flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.main {
    /* height: 400px; */
    padding: 15px;
    background-color: silver;
}

.upitem {
    flex: 1;
    height: 100px;
    background-color: skyblue;
}

.up :nth-child(2) {
    margin: 0 15px;
}

.bottom {
    height: 100px;
    margin-top: 15px;
}

.bottomitem1 {
    /* 剩余空间占一份 */
    flex-grow: 1;
    /* 非剩余空间占0px */
    flex-basis: 0px;

    height: 100%;
    background-color: bisque;
}

.bottomitem2 {
    /* 剩余空间占两份 */
    flex-grow: 2;
    /* 非剩余空间占15px */
    flex-basis: 15px;
    /* margin设置为15px */
    margin-left: 15px;

    height: 100%;
    background-color: red;
}
</style>