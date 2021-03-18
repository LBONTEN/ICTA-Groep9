import React, {Component} from 'react';

export default class DownloadCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        }
    }

    render() {
        return(
        <div>
            <p>Name: {this.props.name}</p>
        </div>);
    }
}