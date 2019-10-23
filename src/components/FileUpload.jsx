import React, { PureComponent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { dataService } from '../services/dataService';

// rfc
function FileUpload(props) {
    var message
    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles);
        setGreeting('Upload File')
        if (acceptedFiles.length > 0) {

            dataService.uploadFile(acceptedFiles[0])
                .then(json => {
                    console.log(json);
                    setGreeting("File Uploaded successfully")
                  // register file in db with user details;  
                })
                .catch(reason => {
                    console.log(reason);
                });

        }

    }, []);

    const [greeting, setGreeting] = useState(
        'Upload File'
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    return (
        <div>
            <h1> File Upload Result: {greeting} </h1>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <p>Drag 'n' drop some files here, or click to select files</p>
                }
            </div>
        </div>

    );
}

export default FileUpload