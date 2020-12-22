import React, { Component } from 'react';

export class TableRow extends Component {
	render() {
		return (
			<tr>
				<td className="text-center">
					<input type="checkbox" className="js-table-row"/>
				</td>
				<td>{this.props.data.id}</td>
				<td>{this.props.data.username}</td>
				<td>{this.props.data.email}</td>
				<td>{new Date(this.props.data.last_login).toLocaleString()}</td>
				<td>{new Date(this.props.data.registration_date).toLocaleString()}</td>
				{this.props.data.status ? <td className="table-danger">Banned</td> : <td className="table-success">Not banned</td>}
			</tr>
		);
	}
}
