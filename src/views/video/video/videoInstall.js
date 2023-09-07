import 'video.js/dist/video-js.css'
import videojs from 'video.js'
import { onMounted, ref } from 'vue'
export const useVideoInstall = (elName, options = {}) => {
	const player = ref(null)
	const onPlayerReady = ref(() => {})
	onMounted(() => {
		player.value = videojs(elName, options, onPlayerReady.value)
	})

	return { player, onPlayerReady }
}
