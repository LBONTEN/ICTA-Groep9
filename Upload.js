import { useAuth0 } from '@auth0/auth0-react';
import React, { useState } from 'react';
import './Upload.css';

const Upload = async () => {
    const { user } = useAuth0();
    const [baseURL, setBaseURL] = useState(null);
    const [showURL, setShowURL] = useState(false);
    
    async function post_get_Handler(file, user) {
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
            
            setBaseURL({ base_url: data.URL.url + data.URL.fields.key })

            // POST
            let form = new FormData();
            Object.keys(data.URL.fields).forEach(key => form.append(key, data.URL.fields[key]));
            form.append('file', file)
            form.append('user', user)
            
            //SEND POST
            const post_response = await fetch(data.URL.url, { method: 'POST', body: form });
            if (!post_response.ok) {
                console.log('Failed to upload via presigned POST');
            }
            console.log(`File uploaded via presigned POST with key: ${data.URL.key}`);
        }
    }

    function uploadFile (user) {
        console.log("upload file pressed...");
        const fileinput = document.getElementById('fileinput');


            console.log(fileinput)
            let file = fileinput.files[0];
            if(!(file === undefined)) {
                setShowURL(true)
                post_get_Handler(file, user);
            } else {
                setShowURL(false)
            }
     
    }


    let url;
    if(showURL)
    {
    url = 
    <div>
        <p>{baseURL}</p>
    </div>
    }

    return(
        <div>
            <form>
                <div className="field">
                    <label htmlFor="file" >File: </label>
                    <input type="file" name="file" id="fileinput"/>
                </div>
                <input type="button" value="Upload" onClick={uploadFile(user.name)} />
                <input type="reset" value="Reset the file"/>
            </form>
            {url}
        </div>
    );
}
export default Upload;