import React from 'react'

let Component = React.createClass({
    count: 0,
    runningTimerId: null,
    hidingTimerId: null,

    getInitialState() {
        return {
            state: 'hidden'
        }
    },

    getDefaultProps() {
        return {
            cls: ''
        }
    },

    render() {
        let cls = `loader-60devs ${this.props.cls}`

        return (
            <div className={cls} data-state={this.state.state} ref="element">
                <div className="loader-60devs-progress"></div>
            </div>
        )
    },

    show() {
        if(++ this.count > 1)
            return 

        clearTimeout(this.hidingTimerId)

        var {element} = this.refs
        let progressEl = element.querySelector('.loader-60devs-progress')

        element.setAttribute('data-state', 'hidden')
        // the only working way to restart a transition on firefox
        progressEl.outerHTML = progressEl.outerHTML
        element.offsetHeight
        element.setAttribute('data-state', '')
        element.offsetHeight
        element.setAttribute('data-state', 'running')
    },

    hide() {
        if(-- this.count > 0)
            return 

        this.refs.element.setAttribute('data-state', 'finishing')
        this.hidingTimerId = setTimeout(this.toHiddenState, 500)
    },

    hideAll() {
        this.count = 1
        this.hide()
    },

    toHiddenState() {
        if (this.refs.element) {
            this.refs.element.setAttribute('data-state', 'hidden')
        }
    },

    componentWillMount() {
        Component.instance = this
    },

    componentWillUnmount() {
        delete Component.instance
    },

    isVisible() {
        return this.refs.element.getAttribute('data-state') != 'hidden'
    }
})

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