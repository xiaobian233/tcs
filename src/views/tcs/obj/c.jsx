const tcs = {
	display: 'inline-block',
	'background-color': 'pink',
	position: 'absolute',
	'z-index': 10,
	border: '1px solid #ff5722',
	'box-sizing': 'border-box',
	'padding-right': '1px',
}
const C = props => {
	const { data, index } = props
	return (
		<div
			style={[
				tcs,
				{
					...data,
					left: data.x + 'px',
					top: data.y + 'px',
					zIndex: index == 0 ? 11 : 10,
				},
			]}
		>
			{index == 0 ? '😡' : ''}
		</div>
	)
}
export default C
