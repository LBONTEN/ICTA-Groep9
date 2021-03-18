import React, {Component} from 'react';
import { nanoid } from 'nanoid';
import DownloadCard from './DownloadCard';

export default class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            downloads: [],
            presigned_download_url: null,
        };
    }

    componentDidMount() {
        this.setState({downloads: [{"name":"test1"},{"name":"test2"}]});
        console.log(this.state.downloads);
    }

    async generatePresignedURL(){

        var file_uuid = document.getElementById('uuid-input').value;

        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/download?file=${file_uuid}`);
        const data = await response.json();
        console.log(data);
        this.setState({ presigned_download_url: data.URL })
        
    } 

    render() {
        return this.state.downloads.map((item) => {
            return <DownloadCard name={item.name} key={nanoid()}/>
        });
    }
}