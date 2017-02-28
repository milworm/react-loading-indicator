'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = _react2.default.createClass({
    count: 0,
    runningTimerId: null,
    refreshTimerId: null,
    hidingTimerId: null,

    getInitialState: function getInitialState() {
        return {
            state: 'hidden'
        };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            className: '',
            refreshTimeout: 0
        };
    },
    render: function render() {
        var className = 'loader-60devs ' + this.props.className;

        return _react2.default.createElement(
            'div',
            { className: className, 'data-state': this.state.state, ref: 'element' },
            _react2.default.createElement('div', { className: 'loader-60devs-progress' })
        );
    },
    show: function show() {
        if (++this.count > 1) return;

        clearTimeout(this.hidingTimerId);
        clearTimeout(this.refreshTimerId);
        var element = this.refs.element;

        var progressEl = element.querySelector('.loader-60devs-progress');

        element.setAttribute('data-state', 'hidden');
        // the only working way to restart a transition on firefox
        progressEl.outerHTML = progressEl.outerHTML;
        element.offsetHeight;
        element.setAttribute('data-state', '');
        element.offsetHeight;
        element.setAttribute('data-state', 'running');
        var that = this;
        if (this.props.refreshTimeout > 0) {
            this.refreshTimerId = setTimeout(function () {
                that.hide();
                that.show();
            }, this.props.refreshTimeout);
        }
    },
    hide: function hide() {
        if (--this.count > 0) return;
        clearTimeout(this.refreshTimerId);
        this.refs.element.setAttribute('data-state', 'finishing');
        this.hidingTimerId = setTimeout(this.toHiddenState, 500);
    },
    hideAll: function hideAll() {
        this.count = 1;
        this.hide();
    },
    toHiddenState: function toHiddenState() {
        this.refs.element && this.refs.element.setAttribute('data-state', 'hidden');
    },
    componentWillMount: function componentWillMount() {
        Component.instance = this;
    },
    componentWillUnmount: function componentWillUnmount() {
        delete Component.instance;
    },
    isVisible: function isVisible() {
        return this.refs.element && this.refs.element.getAttribute('data-state') != 'hidden';
    }
});

exports.default = {
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