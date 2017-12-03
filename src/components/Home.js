import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { inject, observer } from "mobx-react";

@inject("store")
@observer
export default class Home extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}

	render() {
		const store = this.store;
		return (
			<div className="page home">
				<Redirect to="/users" />
			</div>
		);
	}
}
