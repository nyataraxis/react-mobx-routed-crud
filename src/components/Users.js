import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Match, Link } from "react-router-dom";
import ReactTable from "react-table";
import "react-table/react-table.css";

@inject("store")
@observer
class Users extends Component {
	constructor(props) {
		super(props);
		this.store = this.props.store;
	}
	componentDidMount() {
         	console.log(this.props);
			this.store.appState.initUsers();
		}

		componentWillUnmount() {
		}
		delName(id, e) {
			this.store.appState.delItem(id);
		}
		updUsers(e) {
			this.store.appState.initUsers();
		}

	render() {
		const { items } = this.store.appState;
		const {path,url}=this.props.match;
		const db = window.db;

		
		
		return (
			<div className="page posts">
				<h1>Users</h1>
				<hr />
				<Link className="button" to={`${url}/new`}>new</Link>
				<br />
				<ReactTable
				data={items}
				columns={
					[ 
					{
						Header: "ID",
						Cell:row => <span className="maincell"><h5>{row.index}</h5></span>,
						maxWidth: 30


					},
					{
						Header: "GUID",
						accessor: "guid",
						minWidth: 250
					},
					{
						Header: "First name",
						id: 'first',
						accessor: d => d.name.first,
						Cell:row => <span className="maincell"><h5>{row.value}</h5></span>,
						
						maxWidth: 200
					},
					{
						Header: "Last name",
						id: 'last',
						accessor: d => d.name.last,
						Cell:row => <span className="maincell"><h5>{row.value}</h5></span>,
						
						maxWidth: 200
					},
					{
						Header: "Email",
						accessor: "email",
						minWidth: 200
					},
					{
    					Header: "Actions",
    					columns: [
      					{
        					Header: "",
   						    Cell: row =>
										<Link className="maincell" to={`${url}/${row.index}`}>
										<h5>
						    				Edit
						  				</h5>
										</Link>,
							maxWidth: 40
      					},
      					{
        					Header: "",
        					Cell: row =>
        					<span className="maincell"><button onClick={this.delName.bind(this, row.index)}> x </button></span>,
        					maxWidth: 30
      					}
    					]	
  					}
					
				]
				}
				 // Display the loading overlay when we need it
          onFetchData={this.updUsers.bind(this)}
				/>
				
				
			</div>
		);
	}
}

export default Users;
