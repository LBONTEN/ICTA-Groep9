import React, {Component} from 'react';

export default class LogFile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            lognr: 0,
            filename: '',
            user: '',
            date: ''
        }
    }

    render() {
        return(
            <div className="card">
                <h1>Log NR: {this.props.lognr + 1}</h1>
                <div className="card-body">
                    <p>Filename: {this.props.filename}</p>
                    <p>User: {this.props.user}</p>
                    <p>Date: {this.props.date}</p>
                </div>
            </div>
        )
    }
}
