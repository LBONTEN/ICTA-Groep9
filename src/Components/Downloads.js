import React, {Component} from 'react';

export default class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presigned_download_url: null,
        };
    }

    async generatePresignedURL() {
        var file_uuid = document.getElementById('uuid-input').value;

        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/download?file=${file_uuid}`);
        const data = await response.json();
        console.log(data);
        this.setState({ presigned_download_url: data.URL })
    } 

    render() {
        let url;
        if(this.state.presigned_download_url != null) {
            url = 
            <div>
                <a href={this.state.presigned_download_url}>Download</a>
            </div>
        }
        return (
        <div>
            <form>
                <div className="field">
                    <label htmlFor="uuid" >UUID: </label>
                    <input type="text" name="uuid" id="uuid-input"/>
                </div>
                <input type="button" value="Download" onClick={async() => {await this.generatePresignedURL();}} />
                <input type="reset" value="Reset the text"/>
            </form>
            {url}
        </div>
        );
    }
}