import React, { PureComponent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { dataService } from '../services/dataService';
import { Card, Button } from 'react-bootstrap';
var jwt = require('jsonwebtoken');
// rfc

class FileUpload extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            files: [],
            descr: "",
            result: ""
        }
        this.uploadFile = this.uploadFile.bind(this);
    }

    uploadFile() {
        const userData = this.props.user
        console.log(`userData: ${userData}`);
        const files = this.state.files;
        if (files.length > 0) {
            dataService.uploadFile(files[0], userData, this.state.descr)
                .then(json => {
                    console.log(json);
                    this.setState({
                        result: "File Uploaded successfully"
                    }); 
                    setTimeout(()=> {
                        this.props.refreshList();
                    }, 500);

                })
                .catch(reason => {
                    console.log(reason);
                    this.props.refreshList();
                });
        }
    }

    render() {
        return (
            <div>
                <Card>
                    <Card.Header> File Upload Result: {this.state.result} </Card.Header>
                    <Card.Body>
                        <input type="file" onChange={e => this.setState({
                            files: e.target.files
                        })}> 
                        </input>
                        <input
                            value={this.state.desc}
                            onChange={e => this.setState({
                                descr: e.target.value
                            })}
                            placeholder="Description"
                            type="text"
                            name="Description"
                        />
                        <Button onClick={this.uploadFile}>Upload</Button>
                    </Card.Body>
                </Card>

            </div>
        )
    }
}

export default FileUpload