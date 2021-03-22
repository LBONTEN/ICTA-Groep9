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
            error: null,
            showPasswordInput: false
        };
    }

    async postAccessLog(file) {
        console.log(this.props.user)
        await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/accesslogs?filename=${file}&user=${this.props.user.user.name}`,
        { method:'POST'});
    }

    async generatePresignedURL() {
        var file_uuid = document.getElementById('uuid-input').value;
        var password = document.getElementById('password').value;
        console.log(password)

        password = md5(password)
        const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/download?file=${file_uuid}&password=${password}`)
        
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

    togglePasswordInput(){
        this.setState({showPasswordInput: !this.state.showPasswordInput})
    }

    render() {
        return (
        <div>
            <h1>File Download</h1>
            <form>
                <div className="row">
                    <div className="field">
                        <label htmlFor="uuid" >UUID: </label>
                        <input type="text" name="uuid" id="uuid-input" className="custom-input" placeholder="example: 3533827f-eeb6-4f96-96ca-d3d98b8a5bd4"/>
                    </div>
                    <div className="field" style={{visibility: this.state.showPasswordInput ? 'visible' : 'hidden' }}>
                        <label htmlFor="password" >File password: </label>
                        <input type="text" placeholder="password" id="password" className="custom-input"/>
                    </div>
                </div>
                <div className="form-buttons">
                    <input type="button" value="Download" className="input-button hoverable"  onClick={async() => {await this.generatePresignedURL();}} />
                    <input type="reset" value="Reset the text" className="input-button hoverable" />
                    <input type="button" className="input-button hoverable" onClick={() => this.togglePasswordInput()} value="Show password input"/>
                </div>
            </form>
            <p id="checksum" style={{visibility: this.state.checksum == null ? 'hidden' : 'visible'}}>{this.state.checksum}</p>
            <p id="error" style={{visibility: this.state.error == null ? 'hidden' : 'visible'}}>{this.state.error}</p>
        </div>
        );
    }
}