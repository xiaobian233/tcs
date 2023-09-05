import { useVideoInstall } from './videoInstall'
import { options } from './options'
import { toRefs, ref } from 'vue'
const Video = {
	setup(props) {
		const { player, onPlayerReady } = useVideoInstall('my-player', options)
		onPlayerReady.value = function () {
			console.error('开启player')
			console.error(player.value, 'player')
			console.error(this)
			this.play()
		}

		const { src } = toRefs(props)

		return () => {
			return (
				<>
					<video
						id="my-player"
						class="video-js vjs-default-skin vjs-big-play-centered vjs-16-9"
						controls
						preload="auto"
						poster="//vjs.zencdn.net/v/oceans.png"
						data-setup="{}"
					>
						<source src={src.value} type="video/mp4"></source>
						<p class="vjs-no-js">暂不支持当前视频播放器</p>
					</video>
				</>
			)
		}
	},
	props: ['src'],
}

export default Video
