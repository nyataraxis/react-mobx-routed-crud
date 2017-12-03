import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";

import DataWrapper from "./DataWrapper";
import Protected from "./Protected";

@inject("store")
@observer
export default class User extends Component {

	constructor(props) {
		super(props);
		this.store = this.props.store;

	}
	componentDidMount() {
			console.log(this.props);
			let pathname = this.props.match.url;
			let id = this.props.match.params.id ? this.props.match.params.id : null;
			this.store.appState.initUser(id);
		}

		componentWillUnmount() {
			this.store.appState.clearItems();
		}
	render() {
		const { item, uid } = this.store.appState;
		const { id } = this.props.match.params;
		const db = window.db;
		const curU = db[id];
 		return (
			<div className="page post">
				<Link to="/users">← Back to </Link>
				{!!item &&
					<article>
						<h1>{item.name && item.name.first} {item.name && item.name.last}</h1>
						<p>email: {item.email}</p>
                        <p>GUID: {item.guid}</p>
                        <p>Age: {item.age}</p>
						<p>hih</p>
						<button>Save</button>
					</article>}


			</div>
		);
	}
}
