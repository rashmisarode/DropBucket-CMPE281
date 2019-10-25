import React, { PureComponent } from 'react'
import { Col, Form, Button, FormControl, Navbar, Table, Card } from "react-bootstrap";
import { dataService } from '../services/dataService';
import FileUpload from './FileUpload';
import LogOut from './LogOut';
import LogInPage from './LogInPage';
var jwt = require('jsonwebtoken');

class UserPage extends PureComponent {
    constructor(props) {
        super(props)

        const sessionToken = sessionStorage.getItem("token")
        // JWT DECODE 
        // Store decoded jwt in session storage

        this.state = {
            userDataDynamo: [],
            userData: undefined,
            desc: "",
            isAdmin: false
        }
        this.setDescription = this.setDescription.bind(this)
        this.updateTable = this.updateTable.bind(this)
    }

    setDescription(d) {
        this.setState({
            desc: d
        })
    }

    updateTable() {
        console.log("Called Update Table");
        dataService.getUserData()
            .then(json => {
                console.log(json);
                if (Array.isArray(json)) {
                    this.setState({
                        userDataDynamo: json
                    });
                }
            })
            .catch(reason => {
                console.log("Failed to fetch data from server, reason is : ", reason);
            });
    }

    componentDidMount() {
        this.updateTable()

        var token = sessionStorage.getItem("token");
        var decoded = jwt.decode(token);
        // get the decoded payload and header
        var decoded = jwt.decode(token, { complete: true });
        console.log(decoded.header);
        console.log(decoded.payload);
        const userObj = decoded.payload;
        this.setState({
            userData: userObj
        })
        const isAdmin = userObj && userObj["cognito:groups"] && userObj["cognito:groups"].filter(g => g == "admin").length > 0;

        this.setState({ isAdmin });

        dataService.getUser()
    }

    onClickDownLoad(file) {
        window.open("https://d3k2ba7dd5osnx.cloudfront.net/" + file);
    }

    onClickDelete(fileName, id) {
        dataService.deleteFile(fileName, id)
            .then(json => {
                console.log(json);
                this.updateTable();
            })
            .catch(reason => {
                console.log("Failed to delete, reason is : ", reason);
            });
    }

    // fetchListAgain




    render() {

        const { isAdmin } = this.state;

        return (

            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Cloud Project 1</Navbar.Brand>
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            Signed in as: {this.state.userData &&
                                <a href="#login">{this.state.userData.email}</a>}


                            User Type: {
                                isAdmin && <b> "Administrator" </b>
                            }
                            {
                                !isAdmin && <b> "User (Non Admin)"</b>
                            }
                        </Navbar.Text>
                    </Navbar.Collapse>
                    {this.state.userData && <LogOut></LogOut>}
                    {!this.state.userData && <LogInPage></LogInPage>}
                </Navbar>
                {
                    this.state.userData &&
                    <FileUpload
                        user={this.state.userData.email}
                        desc={this.state.desc}
                        refreshList={e => this.updateTable()}
                    >
                    </FileUpload>
                }


                <div className="App container" style={{ "margin": "20px" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr key={0}>
                                {
                                    isAdmin &&
                                    <th>User Name</th>
                                }

                                <th>File Name</th>
                                <th>Description</th>
                                <th>File Upload Time</th>
                                <th>File Updated Time</th>
                                <th>Download</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userDataDynamo.map(item => {
                                    return (
                                        <tr key={item.userId.S}>
                                            {
                                                isAdmin &&
                                                <td>{item.userName.S}</td>
                                            }

                                            <td>{item.fileName.S}</td>
                                            <td>{item.description.S}</td>
                                            <td>{new Date(item.fileCreatedTime.S).toLocaleString()}</td>
                                            <td>{new Date(item.fileUpdatedTime.S).toLocaleString()}</td>
                                            <td><Button variant="outline-success" onClick={event => this.onClickDownLoad(item.fileName.S)}>
                                                <a href={"https://d3k2ba7dd5osnx.cloudfront.net/" + item.fileName.S} target="_blank" download={item.fileName.S}>DownLoad</a>
                                            </Button></td>
                                            <td><Button variant="outline-danger" onClick={event => this.onClickDelete(item.fileName.S, item.userId.S)}>
                                                Delete
                                            </Button></td>
                                        </tr>

                                    );
                                })
                            }

                        </tbody>
                    </Table>
                </div>

            </div>

        )
    }
}

export default UserPage