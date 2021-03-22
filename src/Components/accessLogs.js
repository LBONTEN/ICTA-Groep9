import React, {Component} from 'react';

export default class Logs extends Component
{
    constructor(props) {
    super(props);
    this.state = {
        };
    }

    async getAccessLogs()
    {
        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/accesslogs?`,
        { method:'GET'});
        console.log (response.body)
        this.writeAccessLogs(response.json)
    }

    writeAccessLogs(data)
    {
        console.log(data)
    }

    render()
    {
        return (
            <div>
                <h1>Access Logs</h1>
                <div className="form-buttons">
                     <input type="button" className="input-button hoverable" onClick={() => this.getAccessLogs()} value="Show Access Logs"/>
                </div>

                <div id="logsContainer">

                </div>
            </div>
            );
    }








}