import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Match, Link } from "react-router-dom";
import ReactTable from "react-table";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
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
			/*this.store.fetchData(pathname, id);*/
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
				<p className="subheader">
					Posts are fetched from jsonplaceholder.typicode.com
				</p>
				<p>{url}</p>

				<Link to={`${url}/new`}>
										<h5>
						    				new
						  				</h5>
										</Link>
				<hr />
				
				<ReactTable
				data={items}
				columns={
					[ 
					{
						Header: "ID",
						Cell:row => <span>{row.index}</span>,
						maxWidth: 80

					},
					{
						Header: "GUID",
						accessor: "guid",
						minWidth: 250
					},
					{
						Header: "Name",
						id: 'first',
						accessor: d => d.name.first,
						
						maxWidth: 250
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
        					Header: "Edit",
   						    Cell: row =>
										<Link to={`${url}/${row.index}`}>
										<h5>
						    				Edit
						  				</h5>
										</Link>
      					},
      					{
        					Header: "Delete",
        					Cell: row =>
        					<button onClick={this.delName.bind(this, row.index)}> x </button>
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
