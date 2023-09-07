export const vDebounce = {
	mounted: function (el, binding) {
		let timer
		let flag = true
		el.$handler = () => {
			if (timer) {
				clearTimeout(timer)
			}
			if (flag) {
				binding.value()
				flag = false
			}
			timer = setTimeout(() => {
				flag = true
			}, 1000)
		}
		el.addEventListener('click', el.$handler)
	},
    unMounted() {
		el.addEventListener('click', el.$handler)
    }
}
