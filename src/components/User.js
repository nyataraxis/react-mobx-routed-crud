import React, { Component, setState } from "react";
import { inject, observer } from "mobx-react";
import { Link, Redirect } from "react-router-dom";
import { FormControl, FormGroup, ControlLabel, HelpBlock} from "react-bootstrap";

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

        onSave(e){

        	this.store.appState.saveUser();
        }
       
		componentWillUnmount() {
			this.store.appState.clearItems();
		}
		

  		handleChange(e) {
  			let id = this.props.match.params.id ? this.props.match.params.id : null;
		    this.store.appState.changeUser(e.target.name, e.target.value, id);
		    
		}
		handleChangeName(e) {
			let id = this.props.match.params.id ? this.props.match.params.id : null;
			this.store.appState.changeUserName(e.target.name, e.target.value, id);
		    
		} 

		



	render() {
		const { item, uid, saved, isNew } = this.store.appState;
		const { id } = this.props.match.params;
		const db = window.db;
 		return (
 			 
			<div className="page post">
				<Link to="/users">← Back to </Link>
				{!!item &&
					<form>
				        <FormGroup
				          controlId="formBasicText"
				        >
				        
				        <FormControl
				          type="text"
				          name="first"
				          value={item.name && item.name.first}
				          placeholder="First Name"
				          onChange={this.handleChangeName.bind(this)}
				        />

				        <FormControl
				          type="text"
				          name="last"
				          value={item.name && item.name.last}
				          placeholder="Last Name"
				          onChange={this.handleChangeName.bind(this)}
				        />
				        <FormControl
				          type="text"
				          name="email"
				          value={item.email}
				          placeholder="Email"
				          onChange={this.handleChange.bind(this)}
				        />
				
				        <FormControl
				          type="text"
				          name="age"
				          value={item.age}
				          placeholder="Age"
				          onChange={this.handleChange.bind(this)}
				        />
				        <button onClick={this.onSave.bind(this)}>Save</button>
        				<h1>{item.name && item.name.first} {item.name && item.name.last}</h1>
						<p>email: {item.email}</p>
                        <p>GUID: {item.guid}</p>
                        <p>Age: {item.age}</p>
						<p>hih</p>
        				</FormGroup>
        				        <FormGroup>
							      <ControlLabel>GUID</ControlLabel>
							      <FormControl.Static>
							        {item.guid}
							      </FormControl.Static>
							    </FormGroup>
      				</form>
				}

            {!!saved && <Redirect to="/users" />
				
           } 
		    
			</div>
			
		);
	}
}
