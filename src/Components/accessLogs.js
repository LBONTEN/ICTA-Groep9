import React, {Component} from 'react';
import LogFile from './LogFile';
import { nanoid } from 'nanoid';
import fuzzysearch from 'fuzzysearch'


export default class Logs extends Component
{
    constructor(props) {
        super(props);
        this.state = {
                logs: [],
                filteredLogs: []
            };
    }

    componentDidMount() {
        this.getAccessLogs()
    }

    async getAccessLogs () {
        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/accesslogs`);
        const data = await response.json()
        const datajson = JSON.parse(data.items)
        this.setState({logs: datajson})
        this.setState({filteredLogs: this.state.logs})
    }

    filterUser(user) {
        if(user !== "") {
            const filtered = this.state.logs.filter(logs => fuzzysearch(user, logs.username))
            this.setState({ filteredLogs: filtered })
        } else {
            this.setState({ filteredLogs : this.state.logs })
        }
    }

    filterUserEmpty() {
        const filteredUser = document.getElementById("filterUser").value
        this.filterUser(filteredUser);
    }

    renderLogs = () => 
    {
        return(
            this.state.filteredLogs.map((log) => {
                return <LogFile filename={log.filename} user={log.username} date={log.date} key={nanoid()}/>
            })
        )
    }   
    

    render() {
        return(
            <div>
                <h1>Log files</h1>
                <form>
                    <div className="field">
                        <input type="text" placeholder="Filter on username" className="custom-input" id="filterUser" onChange={() => this.filterUserEmpty()}/>
                    </div>
                    <div>
                        <input type="reset" value="Reset the logs" className="input-button hoverable" onClick={() => this.filterUser("")}/>
                    </div> 
                </form>
                <div className="logs-list">
                    <this.renderLogs/>
                </div>
            </div>
        )
    }








}