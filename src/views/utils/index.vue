<template>
    <h1>UTILS</h1>
    <h2 @click="setup1">怎么判断对象为空？</h2>
    <h2 @click="setup2">寻找字符串中出现最多的字符怎么实现？</h2>
    <h2 @click="setup3">知不知道最新的 url 参数获取的 API？</h2>
    <h2 @click="setup4">实现 Promise</h2>
    <h2 @click="setup5">新版本发布后，怎么用技术手段通知用户刷新页面？</h2>
    <h2 @click="setup6">实现一个数组打平方法，支持第二个参数(可指定打平层级)</h2>
    <h2 v-copy="'测试数据'">copy 测试数据</h2>
    <h2 v-longpress="longpress">longpress 长按</h2>
    <h2 v-debounce="debounce">debounce 防抖</h2>
    <div style="width:500px; height: 500px;"
        v-waterMarker="{ text: '测试', font: '16px Microsoft JhengHei', textColor: 'rgba(180, 180, 180, 0.4)' }">
        xzczxczczczczczczaww213131
        <br>
        <br>
        <br>
        zxczxczzxc
    </div>
    <h2 style="z-index: 10;" v-drag>拖拽功能测试</h2>
    <img v-lazy="'//vjs.zencdn.net/v/oceans.png'" v-drag alt="">
</template>

<script setup lang="js">
import { vCopy, vDebounce, vLongpress, vDrag, vLazy, vWaterMarker } from '@/directives/index.js'
const setup1 = () => {
    const obj = {}
    const isObject = val => typeof val === 'object' && !Array.isArray(val) && val !== null && Object.keys(val).length != 0
    console.error(obj, isObject(obj));
}

const setup2 = () => {
    const str = `absabszcsdaqqqqzz111231314zxcczxczada99999999`
    const mapStrLength = str => {
        const map = new Map()
        let length = 0;
        let lengthKey = '';
        [...str].map(i => {
            !map.has(i) && map.set(i, [])
            map.get(i).push(i)
        });
        for (let [i, arr] of map) {
            arr.length > length && (length = arr.length, lengthKey = i)
        }
        return lengthKey
    }
    console.error(str, mapStrLength(str));

}

const setup3 = () => {
    const query = (name) => {
        const search1 = location.search.substr(1); //截取第一个字符后的字符串 a=100&b=20&c=30
        const p = new URLSearchParams(search1)
        return p.get(name)
    }
    console.error(query('cc'))
}

const setup4 = () => {
    function PromiseNew(callback) {
        this.status = 'pending'
        this.rejCallbacks = []
        this.resCallbacks = []
        this.resData = null
        this.rejData = null
        this.res = function (data) {
            this.resData = data
        }.bind(this);
        this.rej = function (error) {
            this.rejData = error
        }.bind(this)
        callback && callback(this.res, this.rej)
        return this
    }
    PromiseNew.prototype.then = function (callback) {
        this.resCallbacks.push(callback)
        let val = null
        Object.defineProperty(this, 'resData', {
            set(v) {
                val = v
                this.status = 'success'
                this.resCallbacks.map(cb => {
                    val = cb(val)
                })
                return val
            }
        })
        return this
    }
    PromiseNew.prototype.catch = function (callback) {
        this.rejCallbacks.push(callback)
        let val = null
        Object.defineProperty(this, 'resData', {
            set(v) {
                val = v
                this.status = 'success'
                this.rejCallbacks.map(cb => {
                    val = cb(val)
                })
                return val
            }
        })
        return this
    }
    const p = new PromiseNew((res, rej) => {
        setTimeout(() => {
            res('success')
        }, 2000);
    })
    p.then(val => {
        console.error(val, 'val');
        return 9999
    }).then(val => {
        console.error(val, 'val22222222222222');
    })
    console.error(p, 'p');
}

const setup5 = () => {
    console.error('暂未实现');
}

const setup6 = () => {
    const array = [[0, 1], [2, [3, 4, 45, 66]], [5, 6], [7, [78, 99, [1, 56, 77, 11, [0, 2]]]]];
    const _ = {
        flatMap: new Map(),
        setFlatMap(arrs, float) {
            arrs.map((item) => {
                !this.flatMap.has(float) && this.flatMap.set(float, [])
                this.flatMap.get(float).push(...(Array.isArray(item) ? item : [item]))
            })
            let arr = this.flatMap.get(float)
            arr.some(nums => {
                if (Array.isArray(nums)) {
                    this.setFlatMap(arr, ++float)
                    return true
                }
            })
        },
        flat(arrs, float = null) {
            this.flatMap.clear()
            this.setFlatMap(arrs, 1)
            // console.error(this.flatMap, 'this.flatMap');
            if (!float) return this.flatMap.get(1)
            else if (this.flatMap.has(float)) return this.flatMap.get(float)
            else return this.flatMap.get(this.flatMap.size)
        }
    }
    Array.prototype.newFlat = function (float) {
        return _.flat(this, float)
    }
    console.error('1 and null:', array.newFlat(1));
    console.error('2:', array.newFlat(2));
    console.error('9:', array.newFlat(9));
}

const longpress = () => {
    alert('长按')
}
let index = 0
const debounce = (e) => {
    index++
    console.error('多次点击', index)
}
</script>
