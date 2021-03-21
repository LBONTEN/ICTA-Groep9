import React, {Component} from 'react';
import md5 from 'md5'

export default class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presigned_download_url: null,
            checksum_match: false,
            error: null
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
        this.openDownloadWindow()

        
    } 

    openDownloadWindow (){
        console.log("OpenDownloadWindow")
        console.log(this.state.checksum_match)
        try{
        if (this.state.checksum_match === true && this.state.presigned_download_url != null){
            console.log("yes")
            window.open(this.state.presigned_download_url, '_blank')
        }
        } catch(err)  {
            this.setState({error: err})
        }
    }

    render() {
        return (
        <div>
            <h1>File Download</h1>
            <form>
                <div className="field">
                    <label htmlFor="uuid" >UUID: </label>
                    <input type="text" name="uuid" id="uuid-input" className="custom-input" placeholder="example: 3533827f-eeb6-4f96-96ca-d3d98b8a5bd4.png"/>
                </div>
                <input type="button" value="Download" className="input-button hoverable"  onClick={async() => {await this.generatePresignedURL();}} />
                <input type="reset" value="Reset the text" className="input-button hoverable" />
            </form>
            {this.state.error}
        </div>
        );
    }
}