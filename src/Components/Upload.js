import React, {Component} from 'react';
import './Upload.css';

export default class Upload extends Component {    
    constructor(props) {
        super(props);
        this.state= {
            base_url: null,
            showUrl: false,
            user: props.user,
        };
    }

    async post_get_Handler(file, count) {
        var fullPath = document.getElementById('fileinput').value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
        
            // SEND GET
            console.log(this.props.user.user.name);
            console.log(count)
            const user_name = this.props.user.user.name
            const response = await fetch(
                `https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/upload
                    ?file=${filename}
                    &user=${user_name}
                    &count=${count}`);

            const data = await response.json();
            
            this.setState({ base_url: data.URL.url + data.URL.fields.key })

            // POST
            let form = new FormData();
            Object.keys(data.URL.fields).forEach(key => form.append(key, data.URL.fields[key]));
            form.append('file', file)
            form.append('user', this.props.user.user.name)
            form.append('count', count)
            
            //SEND POST
            const post_response = await fetch(data.URL.url, { method: 'POST', body: form });
            if (!post_response.ok) {
                console.log('Failed to upload via presigned POST');
            }
            console.log(`File uploaded via presigned POST with key: ${data.URL.fields.key}`);
        }
    }

    uploadFile = () => {

        console.log("upload file pressed...");
        const fileinput = document.getElementById('fileinput');
        const count = document.getElementById('countInput').value;
        let file = fileinput.files[0];
        if(!(file === undefined)) {
            this.setState({showUrl: true})
            this.post_get_Handler(file, count);
        } else {
            this.setState({showUrl: false})
        }
        
    }

    render() {
        let url;
        if(this.state.showUrl)
        {
        url = 
        <div>
            <p>{this.state.base_url}</p>
        </div>
        }
        return(
            <div>
                <form>
                    <div className="field">
                        <label htmlFor="file" >File: </label>
                        <input type="file" name="file" id="fileinput"/>
                        <label htmlFor="count">Count:</label>
                        <input type="text" name="count" id="countInput"/>
                    </div>
                    <input type="button" value="Upload" onClick={this.uploadFile} />
                    <input type="reset" value="Reset the file"/>
                </form>
                {url}
        </div>
        );
    }
}