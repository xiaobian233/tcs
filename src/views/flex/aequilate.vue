<template>
    <div class="mian">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
    </div>
</template>

<style lang="scss" scoped>
.mian {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: red;

    .column {
        width: 25%;
        background-color: green;
        height: 100px;
    }

    .column+.column {
        margin-left: 24px;
    }
}
</style>