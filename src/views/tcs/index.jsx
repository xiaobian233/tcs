const tBox = {
	'box-shadow': ' 1px 1px 5px #9fa0a2',
	margin: '100px 0 0 200px',
	position: ' relative',
}
import createTCS from './methods/index'
export default {
	setup() {
		const TCS = createTCS('#tBox', {
			cons: 20,
			view: 200,
			time: 500,
		})
		return () => {
			return (
				<>
					<div id="tBox" style={tBox}>
						<TCS.render></TCS.render>
					</div>
					<div
						style={{ width: TCS.options.view + 'px', margin: '24px 0 0 200px' }}
					>
						<button style={{ marginRight: '16px' }} onClick={() => TCS.stop()}>
							暂停
						</button>
						<button style={{ marginRight: '16px' }} onClick={() => TCS.play()}>
							继续
						</button>
						<button onClick={() => TCS.setTime(TCS.iState.time + 50)}>
							倍速++: {TCS.iState.time}
						</button>
					</div>
				</>
			)
		}
	},
}
