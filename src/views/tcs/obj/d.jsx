const tcsd = {
	'background-color': 'green',
	display: 'inline-block',
	position: 'absolute',
	'z-index': 1,
}
const D = props => {
	const { cons, data } = props
	return (
		<div
			style={[
				tcsd,
				{
					width: cons.value + 'px',
					height: cons.value + 'px',
					left: data.x + 'px',
					top: data.y + 'px',
				},
			]}
		>
			🐷
		</div>
	)
}

export default D
