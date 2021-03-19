import React, {Component} from 'react';

export default class Upload extends Component {    
    constructor(props) {
        super(props);
        this.state= {
            base_url: null,
            showUrl: false,
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
            
            this.setState({ base_url: data.URL.fields.key })

            // POST
            let form = new FormData();
            Object.keys(data.URL.fields).forEach(key => form.append(key, data.URL.fields[key]));
            form.append('file', file)
            
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
        let file = fileinput.files[0];
        if(!(file === undefined)) {
            this.setState({showUrl: true})
            this.post_get_Handler(file);
        } else {
            this.setState({showUrl: false})
        }
        
    }

    copyText() {  
        let element = document.getElementById("key");
        document.execCommand("copy");
        element.addEventListener("copy", function(event) {
            event.preventDefault();
            if(event.clipboardData) {
                event.clipboardData.setData("text/plain", element.textContent);
            }
        });

        let tooltip = document.getElementById("copyTooltip");
        tooltip.innerHTML = 'Copied to clipboard'
    }

    changeToolTip() {
        let tooltip = document.getElementById("copyTooltip");
        tooltip.innerHTML = "Copy to clipboard";
    }

    changeChosenFile() {
        let fileinput = document.getElementById("fileinput");
        let filelabel = document.getElementById("filelabel");
        filelabel.innerHTML = `Chosen file: ${fileinput.files[0].name}`;
    }

    resetFile() {
        let filelabel = document.getElementById("filelabel");
        filelabel.innerHTML = "Choose file";
    }

    render() {
        let url;
        if(this.state.showUrl)
        {
        url = 
        <div class="tooltip">
            <h1 onClick={this.copyText} onMouseOut={this.changeToolTip} id="key">
                <span class="tooltipText" id="copyTooltip">Copy to clipboard</span>
                {this.state.base_url}
            </h1>
        </div>
        }
        return(
            <div>
                <form>
                    <div className="field">
                        <label>File: </label>
                        <label class="custom-input file-input input-button" for="fileinput" id="filelabel">Choose file</label>
                        <input type="file" name="file" id="fileinput" onChange={this.changeChosenFile}/>
                    </div>
                    <input type="button" value="Upload" class="input-button" onClick={this.uploadFile} />
                    <input type="reset" value="Reset the file" class="input-button" onClick={this.resetFile} />
                </form>
                {url}
        </div>
        );
    }
}