import React from 'react'
import ReactDOM from 'react-dom'
import Progress from '../src/main'

class Application extends React.Component {
	render() {
		return (
			<div className="application">
				<Progress.Component refreshTimeout={3000} className="my-progress" />
				<button onClick={this.showProgress}>Show progress</button>
				<button onClick={this.hideProgress}>Hide progress</button>
			</div>
		)
	}

	showProgress() {
		Progress.show()
	}

	hideProgress() {
		Progress.hide()
	}
}

ReactDOM.render(<Application />, document.getElementById('root'))