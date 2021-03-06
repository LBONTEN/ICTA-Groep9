import React, {Component} from 'react';

export default class Upload extends Component {    
    constructor(props) {
        super(props);
        this.state= {
            base_url: null,
            user: props.user,
            showPasswordInput: false,
        };
    }

    async post_get_Handler(file, count, password) {
            // SEND GET
            const user_name = this.props.user.user.name
            const response = await fetch(
                `https://hek46ulrnc.execute-api.us-east-1.amazonaws.com/prod/upload?file=${file.name}&filetype=${file.type}&user=${user_name}&dlcounter=${count}&password=${password}`);

            const data = await response.json();
            
            this.setState({ base_url: data.URL.fields.key })

            // POST
            let form = new FormData();
            Object.keys(data.URL.fields).forEach(key => form.append(key, data.URL.fields[key]));
            form.append('file', file)
            form.append('user', this.props.user.user.name)
            form.append('dlcounter', count)
            form.append('password', password)
            
            //SEND POST
            const post_response = await fetch(data.URL.url, { method: 'POST', body: form });
            if (!post_response.ok) {
                console.log('Failed to upload via presigned POST');
            }
            console.log(`File uploaded via presigned POST with key: ${data.URL.fields.key}`);
        }

    uploadFile = () => {
        const fileinput = document.getElementById('fileinput');
        const password = document.getElementById('password').value;
        const count = document.getElementById('countInput').value;
        let file = fileinput.files[0];
        if(!(file === undefined)) {
            this.post_get_Handler(file, count, password);
        } else {
            this.setState({base_url: null})
        }
    }

    copyText() {  
        let element = document.getElementById("key");
        element.addEventListener("copy", function(event) {
            event.preventDefault();
            if(event.clipboardData) {
                event.clipboardData.setData("text/plain", element.textContent);
            }
        });

        document.execCommand("copy");
        let tooltip = document.getElementById("copyTooltip");
        tooltip.innerHTML = 'Copied to clipboard'
    }

    changeToolTip() {
        let tooltip = document.getElementById("copyTooltip");
        tooltip.innerHTML = "Copy link to clipboard";
    }

    changeChosenFile() {
        let fileinput = document.getElementById("fileinput");
        let filelabel = document.getElementById("filelabel");
        if(fileinput !== undefined){
            filelabel.innerHTML = `Chosen file: ${fileinput.files[0].name}`;
        } else {
            filelabel.innerHTML = `Chosen file: ${fileinput.files[0].name}`;
        }
    }

    resetFile() {
        let filelabel = document.getElementById("filelabel");
        filelabel.innerHTML = "Choose file";
    }

    togglePasswordInput(){
        this.setState({showPasswordInput: !this.state.showPasswordInput})
    }

    render() {
        let url;
        if(this.state.base_url != null)
        {
            url = 
            <div className="tooltip">
                <div onClick={this.copyText} onMouseOut={this.changeToolTip}>
                    <span className="tooltipText" id="copyTooltip">Copy link to clipboard</span>
                    <h1>Make sure to copy this link!</h1>
                    <h1 id="key">{this.state.base_url}</h1>
                </div>
            </div>
        }

        return(
        <div>
            <h1>File Upload</h1>
            <form>
                <div className="field">
                    <label>File: </label>
                    <label className="custom-input file-input input-button hoverable" htmlFor="fileinput" id="filelabel">Choose file</label>
                    <input type="file" name="file" id="fileinput" onChange={this.changeChosenFile}/>
                </div>
                <div className="row">
                    <div className="field">
                        <label htmlFor="count">Max download count:</label>
                        <input type="text" name="count" className="custom-input" id="countInput" placeholder="Default: 100"/>
                    </div>
                    <div className="field" style={{visibility: this.state.showPasswordInput ? 'visible' : 'hidden'}}>
                        <label htmlFor="password">File password: </label>
                        <input type="text" placeholder="Password: " id="password" className="custom-input"/>   
                    </div>
                </div>
                <div>
                    <input type="button" value="Upload" className="input-button hoverable" onClick={this.uploadFile} />
                    <input type="reset" value="Reset the file" className="input-button hoverable" onClick={this.resetFile} />
                    <input type="button" className="input-button hoverable" onClick={() => this.togglePasswordInput()} value="Show password input"/>
                </div>
            </form>
            {url}
        </div>
        );
    }
}