import React from 'react'

class Component extends React.Component {
	count = 0
	runningTimerId = null
	hidingTimerId = null

	static defaultProps = {
		cls: '',
		style: {},
		thumbStyle: {}
	}

	constructor (props) {
		super(props)
		this.state = {
			state: 'hidden'
		}
	}

	initElement = (el) => {
		this.element = el
	}

	render () {
		let { cls, style, thumbStyle } = this.props
		let className = `loader-60devs ${cls}`

		return (
			<div className={className} style={style} data-state={this.state.state} ref={this.initElement}>
				<div className="loader-60devs-progress" style={thumbStyle}></div>
			</div>
		)
	}

	show () {
		if(++this.count > 1)
			return 

		clearTimeout(this.hidingTimerId)

		var {element} = this
		let progressEl = element.querySelector('.loader-60devs-progress')

		element.setAttribute('data-state', 'hidden')
		// the only working way to restart a transition on firefox
		progressEl.outerHTML = progressEl.outerHTML
		element.offsetHeight
		element.setAttribute('data-state', '')
		element.offsetHeight
		element.setAttribute('data-state', 'running')
	}

	hide () {
		if(--this.count > 0)
			return 

		this.element.setAttribute('data-state', 'finishing')
		this.hidingTimerId = setTimeout(this.toHiddenState, 500)
	}

	hideAll () {
		this.count = 1
		this.hide()
	}

	toHiddenState = () => {
		this.element.setAttribute('data-state', 'hidden')
	}

	componentWillMount () {
		Component.instance = this
	}

	componentWillUnmount () {
		clearTimeout(this.hidingTimerId);
		delete Component.instance
	}

	isVisible () {
		return this.element.getAttribute('data-state') != 'hidden'
	}
}

export default {
	Component: Component,
	show() {
		Component.instance.show()
	},
	hide() {
		Component.instance.hide()
	},
	hideAll() {
		Component.instance.hideAll()
	},
	isVisible() {
		return Component.instance.isVisible()
	}
}
