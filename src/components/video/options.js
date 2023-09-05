export const options = {
	bigPlayButton: true, // 是否显示播放按钮
	posterImage: true, // 封面图
	controls: true, // 是否显示底部控制栏
	preload: 'auto', // 加载<video>标签后是否加载视频
	autoplay: 'muted', // 静音播放
	playbackRates: [0.5, 1, 1.5, 2],// 倍速播放
	width: "100%",
	height: '500',
	// loop: "loop",
	controlBar: {
		// 自定义按钮的位置
		children: [
			{
				name: 'playToggle',
			},
			{
				name: 'progressControl',
			},
			{
				name: 'currentTimeDisplay',
			},
			{
				name: 'timeDivider',
			},
			{
				name: 'durationDisplay',
			},

			{
				name: 'volumePanel', // 音量调整方式横线条变为竖线条
				inline: false,
			},
			{
				name: 'pictureInPictureToggle', //画中画播放模式
			},
			{
				name: 'fullscreenToggle',
			},
		],
	},
}
