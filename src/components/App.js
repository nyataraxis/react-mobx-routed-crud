import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

@withRouter
@inject("store")
@observer
export default class App extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	componentDidMount() {
		let pathname = this.props.match.url;
			let id = this.props.match.params.id ? this.props.match.params.id : null;
			this.store.appState.fetchData(pathname, id);
	}
	
	render() {
		const {
			authenticated,
			authenticating,
			timeToRefresh,
			refreshToken,
			testval
		} = this.store.appState;

		return (
			<div className="wrapper">
				<DevTools />

				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Home")} />
					)}
				/>
				
				<Route 
					exact
					path="/users"
					render={props => (
						<LazyRoute {...props} component={import("./Users")} />
					)}
				/>
				<Route 
					exact
					path="/users/:id"
					render={props => (
						<LazyRoute {...props} component={import("./User")} />
					)}
				/>
				
				
			</div>
		);
	}
}
