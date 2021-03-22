import React, {Component} from 'react';
import LogFile from './LogFile';
import { nanoid } from 'nanoid';

export default class Logs extends Component
{
    constructor(props) {
    super(props);
    this.state = {
            logs: []
        };
    }

    componentDidMount() {
        this.getAccessLogs()
    }

    async getAccessLogs()
    {
        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/accesslogs`);
        const data = await response.json()
        console.log(JSON.parse(data.items))
        this.writeAccessLogs(JSON.parse(data.items))
    }

    writeAccessLogs(data)
    {
        this.setState({logs: data})
        console.log(data)
    }

    render() {
        return(
            <div>
                <h1>Log files</h1>
                <div className="logs-list">
                {
                    this.state.logs.map((log) => {
                        return <LogFile filename={log.filename} user={log.user} date={log.date} key={nanoid()}/>
                    })
                }
                </div>
            </div>
        )

    }








}