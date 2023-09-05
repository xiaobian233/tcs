import { onMounted, ref, reactive, toRefs, onUnmounted, nextTick } from 'vue'
import C from '../obj/c.jsx'
import D from '../obj/d.jsx'
let TCSKEY = ''
let timer = null
let timerDeep = 500
const clearT = () => clearTimeout(timer)
const deepClone = val => JSON.parse(JSON.stringify(val))
const THEN = fn => Promise.resolve().then(fn)
// 初始化方法
export const init = (tState, dState, iview, cons, bol = false) => {
	// 开启一个贪吃蛇对象
	S(tState, iview, cons)
	// 开启一个像素对象
	XS(dState, iview, cons, tState)
	// 注册一个调度事件
	bol && keyCodeFn(tState, iview, cons, dState)
}
// 开启一个贪吃蛇对象
export const S = (tState, iview, cons) => {
	let item = {}
	if (tState.data.length > 0) {
		;[item] = deepClone(tState.data).slice(tState.data.length - 1)
	}
	tState.data.push({
		x: item.x ? item.x : 0,
		y: item.y ? item.y : 0,
		width: cons.value + 'px',
		height: cons.value + 'px',
	})
}
// 开启一个像素对象
let xsOld = null
export const XS = async (dState, iview, cons, tState) => {
	const xArr = tState.data.map(item => item.x)
	const yArr = tState.data.map(item => item.y)
	const oldXSLength = (xArr.length + yArr.length) * 10
	const createXS = async (min, max, cons) => {
		let val = (Math.floor(Math.random() * (max - min)) + min) * cons
		return xArr.includes(val) && yArr.includes(val)
			? await createXS(min, max, cons)
			: val
	}
	const oldXS = async () => {
		THEN(async _ => {
			// 一口气生成多个值
			let xArrSet = new Set()
			let yArrSet = new Set()
			for (let index = 0; index < oldXSLength; index++) {
				xArrSet.add(
					await createXS(
						iview.value.xOffsetMin,
						iview.value.xOffsetMax / cons.value,
						cons.value
					)
				)
				yArrSet.add(
					await createXS(
						iview.value.yOffsetMin,
						iview.value.yOffsetMax / cons.value,
						cons.value
					)
				)
			}
			xsOld = { xArrSet, yArrSet }
		})
	}
	// 性能优化 生成点数old
	if (xsOld) {
		let { xArrSet, yArrSet } = xsOld
		let x = 0,
			y = 0
		let bol = xArr.some(left => {
			if (!xArrSet.has(left)) {
				x = left
				return true
			}
		})
		if (!bol) {
			x = await createXS(
				iview.value.xOffsetMin,
				iview.value.xOffsetMax / cons.value,
				cons.value
			)
		}
		bol = yArr.some(top => {
			if (!xArrSet.has(top)) {
				x = top
				return true
			}
		})
		if (!bol) {
			y = await createXS(
				iview.value.yOffsetMin,
				iview.value.yOffsetMax / cons.value,
				cons.value
			)
		}
		dState.x = x
		dState.y = y
		oldXS()
	}
	// 初始化
	THEN(async () => {
		dState.x = await createXS(
			iview.value.xOffsetMin,
			iview.value.xOffsetMax / cons.value,
			cons.value
		)

		dState.y = await createXS(
			iview.value.yOffsetMin,
			iview.value.yOffsetMax / cons.value,
			cons.value
		)
		oldXS()
	})
}
// 更新事件
export const updateS = (tState, iview, cons, dState) => {
	if (!TCSKEY) return
	const [item] = deepClone(tState.data)
	let x = item.x
	let y = item.y
	const update = {
		ArrowUp() {
			y -= cons.value
		},
		ArrowRight() {
			x += cons.value
		},
		ArrowDown() {
			y += cons.value
		},
		ArrowLeft() {
			x -= cons.value
		},
	}
	// 更新位置
	update[TCSKEY]()
	// 渲染位置
	tState.data.forEach(item => {
		let oldx = item.x
		let oldy = item.y
		item.x = x
		item.y = y
		x = oldx
		y = oldy
	})
	// 是否重叠
	hasChangeXS(tState, iview, cons, dState)
	// 是否游戏结束
	gameOver(tState, iview, cons, dState)
	// 是否继续前进
	timer = setTimeout(() => updateS(tState, iview, cons, dState), timerDeep)
}
// 注册一个调度事件
export const keyCodeFn = (tState, iview, cons, dState) => {
	const handler = e => {
		const arr = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight']
		if (!arr.includes(e.code) || e.code == TCSKEY) return
		if (
			(e.code == 'ArrowUp' && TCSKEY != 'ArrowDown') ||
			(e.code == 'ArrowLeft' && TCSKEY != 'ArrowRight') ||
			(e.code == 'ArrowRight' && TCSKEY != 'ArrowLeft') ||
			(e.code == 'ArrowDown' && TCSKEY != 'ArrowUp')
		) {
			clearT()
			TCSKEY = e.code
			updateS(tState, iview, cons, dState)
		}
	}
	document.addEventListener('keyup', handler)
	onUnmounted(() => {
		document.removeEventListener('keyup', handler)
	})
}
// 盒体边界处理
export const gameOver = (tState, iview, cons, dState) => {
	let [item] = tState.data
	if (item.x < 0 || item.y < 0) TCSKEY = ''
	if (
		item.x > iview.value.xOffsetMax - cons.value ||
		item.y > iview.value.yOffsetMax - cons.value
	) {
		TCSKEY = ''
	}
	if (!TCSKEY) {
		alert('游戏结束! ')
		// 初始化 停止循环
		clearT()
		tState.data = []
		init(tState, dState, iview, cons)
	}
}
// 判断是否重叠进行重置操作
export const hasChangeXS = async (tState, iview, cons, dState) => {
	const [item] = tState.data
	const d = dState
	if (
		Math.abs(d.x - item.x) < cons.value &&
		Math.abs(d.y - item.y) < cons.value
	) {
		await nextTick()
		XS(dState, iview, cons, tState)
		S(tState, iview, cons)
	}
}
// 初始化
const createTCS = (id, opt) => {
	const { cons, view, time } = toRefs(opt)
	const iState = reactive({ time: time.value })
	const tState = reactive({ data: [] })
	const dState = reactive({})
	const iview = ref({})
	onMounted(() => {
		const tId = document.querySelector(id)
		// 重置width and height
		if (view) {
			tId.style.width = view.value + 'px'
			tId.style.height = view.value + 'px'
		}
		if (time) {
			timerDeep = time.value
		}
		const opt = tId.getBoundingClientRect()
		opt.xOffsetMin = 0
		opt.xOffsetMax = opt.width
		opt.yOffsetMin = 0
		opt.yOffsetMax = opt.height
		iview.value = opt
		// 事件初始化
		init(tState, dState, iview, cons, true)
	})
	const render = () => {
		return (
			<>
				{tState.data.map((x, index) => (
					<C data={x} index={index} cons={x.cons} />
				))}
				<D data={dState} cons={cons} />
			</>
		)
	}
	const stop = () => {
		clearT()
	}
	const play = () => {
		updateS(tState, iview, cons, dState)
	}
	const setTime = (timeNum = opt.time) => {
		timerDeep = timeNum
		iState.time = timeNum
	}
	return {
		render,
		...toRefs(tState),
		dState,
		iview,
		stop,
		play,
		setTime,
		options: opt,
		TCSKEY,
		iState,
	}
}
export default createTCS
