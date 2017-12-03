import React, { Component } from "react";
import { Route, Link, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import LazyRoute from "lazy-route";
import DevTools from "mobx-react-devtools";

import TopBar from "./TopBar";

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
	authenticate(e) {
		if (e) e.preventDefault();
		this.store.appState.authenticate();
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
				<TopBar />

				<Route
					exact
					path="/"
					render={props => (
						<LazyRoute {...props} component={import("./Home")} />
					)}
				/>
				<Route
					exact
					path="/posts"
					render={props => (
						<LazyRoute {...props} component={import("./SubPage")} />
					)}
				/>

				<Route
					exact
					path="/posts/:id"
					render={props => (
						<LazyRoute {...props} component={import("./SubItem")} />
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
				
				<Route
					exact
					path="/login"
					render={props => (
						<LazyRoute {...props} component={import("./Login")} />
					)}
				/>
				<footer>
					{testval}
					<a href="https://twitter.com/mhaagens" target="_blank">
						@mhaagens
					</a>
					{" "}
					| github:
					{" "}
					<a href="https://github.com/mhaagens" target="_blank">
						mhaagens
					</a>
				</footer>
			</div>
		);
	}
}
