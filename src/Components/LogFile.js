import React, {Component} from 'react';

export default class LogFile extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            filename: '',
            user: '',
            date: ''
        }
    }

    render() {
        return(
            <div className="card">
                <div className="card-body">
                    <p>Filename: {this.props.filename}</p>
                    <p>User: {this.props.user}</p>
                    <p>Date: {this.props.date}</p>
                </div>
            </div>
        )
    }
}
