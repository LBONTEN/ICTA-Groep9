import React, {Component} from 'react';
import md5 from 'md5';

export default class Downloads extends Component {
    constructor(props) {
        super(props);
        this.state = {
            presigned_download_url: null,
            checksum: null,
            hash_password: null,
            user: props.user,
            error: null
        };
    }

    async postAccessLog(file) {
        await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/accesslogs?filename=${file}&user=${this.props.user.user.name}`,
        { method:'POST'});
    }

    async generatePresignedURL() {
        var file_uuid = document.getElementById('uuid-input').value;
        var password = document.getElementById('password').value;

        password = md5(password)
        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/download?file=${file_uuid}&password=${password}`);
        
        const data = await response.json();
        const serverside_checksum = "Checksum: " + data.checksum_value;
        this.setState({checksum: serverside_checksum})
        this.setState({ presigned_download_url: data.URL })
        this.openDownloadWindow()
        this.postAccessLog(file_uuid)     
    }   

    openDownloadWindow (){
        try{
        if (this.state.presigned_download_url != null){
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
                    <input type="text" name="uuid" id="uuid-input" className="custom-input" placeholder="example: 3533827f-eeb6-4f96-96ca-d3d98b8a5bd4"/>
                </div>
                <input type="button" value="Download" className="input-button hoverable"  onClick={async() => {await this.generatePresignedURL();}} />
                <input type="reset" value="Reset the text" className="input-button hoverable" />
                <input type="text" placeholder="password" id="password"/>
            </form>
            <p>{this.state.checksum}</p>
            <p>{this.state.error}</p>
        </div>
        );
    }
}