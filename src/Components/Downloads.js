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
        console.log(file_uuid)

        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/download?file=${file_uuid}`);
        const data = await response.json();
        this.setState({ presigned_download_url: data.URL })
    } 

    render() {
        let url;
        if(this.state.presigned_download_url != null) {
            url = 
            <a href={this.state.presigned_download_url}>Download</a>
        }
        return (
        <div>
            <form>
                <div className="field">
                    <label htmlFor="uuid" >UUID: </label>
                    <input type="text" name="uuid" id="uuid-input" className="custom-input"/>
                </div>
                <input type="button" value="Download" className="input-button hoverable"  onClick={async() => {await this.generatePresignedURL();}} />
                <input type="reset" value="Reset the text" className="input-button hoverable" />
            </form>
            {url}
        </div>
        );
    }
}