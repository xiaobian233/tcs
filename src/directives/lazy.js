export const vLazy = {
	mounted: function (el, binding) {
		// 判断浏览器是否支持Intersection Observer API
		if ('IntersectionObserver' in window) {
			// 创建一个Intersection Observer实例
			const observer = new IntersectionObserver(function (entries) {
				entries.forEach(function (entry) {
					// 判断图片是否进入可视区域
					if (entry.isIntersecting) {
						// 加载图片
						el.setAttribute('src', binding.value)
						// 停止观察
						observer.unobserve(el)
					}
				})
			})
			// 开始观察图片元素
			observer.observe(el)
		} else {
			// 不支持Intersection Observer API的浏览器，直接加载图片
			el.setAttribute('src', binding.value)
		}
	},
}
