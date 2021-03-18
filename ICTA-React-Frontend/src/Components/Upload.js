import React, {Component} from 'react';
import './Upload.css';

export default class Upload extends Component {    
    constructor(props) {
        super(props);
        this.state= {
            base_url: null,
        };
    }

    async post_get_Handler(file) {
        var fullPath = document.getElementById('fileinput').value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
        
            // SEND GET
            const response = await fetch(`https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/upload?file=${filename}`);
            const data = await response.json();
            
            this.setState({ base_url: data.URL.url + data.URL.fields.key })

            // POST
            let form = new FormData();
            Object.keys(data.URL.fields).forEach(key => form.append(key, data.URL.fields[key]));
            form.append('file', file)
            
            //SEND POST
            const post_response = await fetch(data.URL.url, { method: 'POST', body: form });
            if (!post_response.ok) {
                console.log('Failed to upload via presigned POST');
            }
            console.log(`File uploaded via presigned POST with key: ${data.URL.key}`);
        }
    }

    uploadFile = () => {
        console.log("upload file pressed...");
        const fileinput = document.getElementById('fileinput');
        let file = fileinput.files[0];
        this.post_get_Handler(file);
    }

    render() {
        return(
        <form action="/download" onSubmit={this.uploadFile}>
            <div class="field">
                <label for="file" id="fileinput">File: </label>
                <input type="file" name="file"/>
            </div>
            <input type="submit" value="Upload" />
            <input type="reset" value="Reset the file"/>
        </form>
        );
    }
}