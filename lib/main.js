'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var Component = _react2['default'].createClass({
    displayName: 'Component',

    count: 0,
    runningTimerId: null,
    hidingTimerId: null,

    getInitialState: function getInitialState() {
        return {
            state: 'hidden'
        };
    },

    getDefaultProps: function getDefaultProps() {
        return {
            cls: ''
        };
    },

    render: function render() {
        var cls = 'loader-60devs ' + this.props.cls;

        return _react2['default'].createElement(
            'div',
            { className: cls, 'data-state': this.state.state, ref: 'element' },
            _react2['default'].createElement('div', { className: 'loader-60devs-progress' })
        );
    },

    show: function show() {
        if (++this.count > 1) return;

        clearTimeout(this.hidingTimerId);

        var element = this.refs.element;

        var progressEl = element.querySelector('.loader-60devs-progress');

        element.setAttribute('data-state', 'hidden');
        // the only working way to restart a transition on firefox
        progressEl.outerHTML = progressEl.outerHTML;
        element.offsetHeight;
        element.setAttribute('data-state', '');
        element.offsetHeight;
        element.setAttribute('data-state', 'running');
    },

    hide: function hide() {
        if (--this.count > 0) return;

        this.refs.element.setAttribute('data-state', 'finishing');
        this.hidingTimerId = setTimeout(this.toHiddenState, 500);
    },

    hideAll: function hideAll() {
        this.count = 1;
        this.hide();
    },

    toHiddenState: function toHiddenState() {
        if (this.refs.element) {
            this.refs.element.setAttribute('data-state', 'hidden');
        }
    },

    componentWillMount: function componentWillMount() {
        Component.instance = this;
    },

    componentWillUnmount: function componentWillUnmount() {
        delete Component.instance;
    },

    isVisible: function isVisible() {
        return this.refs.element.getAttribute('data-state') != 'hidden';
    }
});

exports['default'] = {
    Component: Component,
    show: function show() {
        Component.instance.show();
    },
    hide: function hide() {
        Component.instance.hide();
    },
    hideAll: function hideAll() {
        Component.instance.hideAll();
    },
    isVisible: function isVisible() {
        return Component.instance.isVisible();
    }
};
module.exports = exports['default'];
