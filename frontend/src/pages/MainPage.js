import React, { Component } from 'react';
import * as Icon from 'react-bootstrap-icons';
import {TableRow} from '../components/TableRow'

const axios = require('axios');

export class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {data: []}
        this.banSelected = this.banSelected.bind(this)
        this.unbanSelected = this.unbanSelected.bind(this)
        this.deleteSelected = this.deleteSelected.bind(this)
        this.handleCheckChange = this.handleCheckChange.bind(this)
    }

    async componentDidMount() {
        let response = await axios.get('/api/table');
        let data = await response.data;
        this.setState({data: data, userId: JSON.parse(localStorage.getItem('userData')).userId});
    }

    getSelectedIds() {
        let checkBoxes = document.getElementsByClassName('js-table-row');
        let selectedIdsArray = []
        for (let i = 0; i < checkBoxes.length; i++){
            if (checkBoxes[i].checked) {
                selectedIdsArray.push(this.state.data[i].id)
            }
        }
        return selectedIdsArray;
    }

    makePostRequest(adr) {
        let selectedIdsArray = this.getSelectedIds()
        axios.post(adr, {"idArray":selectedIdsArray, "userId":this.state.userId})
        .catch(function (error) {})
        if (selectedIdsArray.includes(this.state.userId)) {
            return false;
        }
        return true;
    }

    banSelected() {
        const result = this.makePostRequest('/api/table/ban')
        if (!result) {
            localStorage.clear()
        }
        document.location.reload(false);

    }

    unbanSelected() {
        // eslint-disable-next-line
        const result = this.makePostRequest('/api/table/unban')
        document.location.reload(false);
    }

    deleteSelected() {
        const result = this.makePostRequest('/api/table/delete')
        if (!result) {
            localStorage.clear()
        }
        document.location.reload(false);
    }

    handleCheckChange(event) {
        let temp = Array.from(document.getElementsByClassName('js-table-row'));
        for (let i = 0; i < temp.length; i++){
            temp[i].checked = event.target.checked;
        }
    }

    render() {
    return (
            <div className="bg-light">
                <div className="my-2 bg-light px-1 py-1">
                    <button className=" btn btn-dark mx-1 btn-sm" onClick={this.banSelected}>
                        <Icon.LockFill color="white" className="mx-2"/>
                    </button>
                    <button className=" btn btn-dark mx-1 btn-sm" onClick={this.unbanSelected}>
                         <Icon.UnlockFill color="white" className="mx-2"/>
                     </button>
                    <button className=" btn btn-danger mx-1 btn-sm" onClick={this.deleteSelected}>
                        <Icon.TrashFill color="white" className="mx-2"/>
                     </button>
                </div>
                <table className="table table-hover table-sm">
                    <thead>
                        <tr>
                            <th className="text-center">
                                <input type="checkbox" onChange={this.handleCheckChange}/>
                            </th>
                            <th>ID</th>
                            <th>USERNAME</th>
                            <th>EMAIL</th>
                            <th>LAST LOGIN</th>
                            <th>REG DATE</th>
                            <th>STATUS</th>
                        </tr>
                        {this.state.data.map(item => <TableRow data={item} key={item.id}/>)}
                    </thead>
                    <tbody id="tableBody">
                    </tbody>
                </table>
            </div>
        );
}
}
