import { Component } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

class ErrorBoundary extends Component {
	state = {
		error: false
	};

	componentDidCatch(error, errorInfo) {
		console.log(error, errorInfo);
		this.setState({
			error: true
		});
	}

	render() {
		if (this.state.error) {
			return <ErrorMessage/>
		}

		return this.props.children; // компонент, который был передан во внутрь
	};
};

export default ErrorBoundary;