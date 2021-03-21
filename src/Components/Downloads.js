import React, {Component} from 'react';
import md5 from 'md5'

export default class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presigned_download_url: null,
            checksum_match: false,
        };
    }

    async generatePresignedURL() {
        var file_uuid = document.getElementById('uuid-input').value;
        console.log(file_uuid)

        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/download?file=${file_uuid}`);
        
        const data = await response.json();
        const clientside_checksum = md5(file_uuid)
        const serverside_checksum = data.checksum_value;
        if (clientside_checksum === serverside_checksum) this.setState({checksum_match: true})

        this.setState({ presigned_download_url: data.URL })
    } 

    render() {
        let url;
        if(this.state.presigned_download_url != null && this.state.checksum_match) {
            url = 
            <h1>
                <a href={this.state.presigned_download_url}>Download</a>
                <p>Checksums match!</p>
            </h1>
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