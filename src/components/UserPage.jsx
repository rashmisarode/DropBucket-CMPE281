import React, { PureComponent } from 'react'
import { Col, Form, Button, FormControl, Navbar, Table } from "react-bootstrap";
import { dataService } from '../services/dataService';
import FileUpload from './FileUpload';

class UserPage extends PureComponent {
    constructor(props) {
        super(props)

        const sessionToken = sessionStorage.getItem("token")
        // JWT DECODE 
        // Store decoded jwt in session storage
 
        this.state = {
            userDataDynamo: [],
        }
       

    }

    componentDidMount() {
         dataService.getUserData()
         .then(json=> {
             console.log(json);
             if(Array.isArray(json)) {
                 this.setState({
                    userDataDynamo: json
                 });    
             }
         })
         .catch(reason=> {
             console.log("Failed to fetch data from server, reason is : ", reason);
         });
    }

    // fetchListAgain




    render() {
        
        return (

            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand>Cloud Project 1</Navbar.Brand>
                </Navbar>
                <FileUpload user={null} refreshList={null}></FileUpload>
                <div className="App container" style={{ "margin": "20px" }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr key={0}>
                                <th>File Name</th>
                                <th>Description</th>
                                <th>File Created Time</th>
                                <th>File Updated Time</th>
                                <th>Download</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.userDataDynamo &&
                                this.state.userDataDynamo.map(item => {
                                    return(
                                        <tr key={item.userId.S}>
                                        <td>{item.fileName.S}</td>
                                        <td>{item.userId.S}</td>
                                        <td>{item.fileCreatedTime.N}</td>
                                        <td>{item.fileUpdatedTime.N}</td>
                                        <td>5</td>
                                        <td>6</td>
                                    </tr>

                                    );
                                })
                            }

                        </tbody>
                    </Table>
                </div>

            </div>



            /*  <div>
                 <Col md={{ span: 6, offset: 3 }}>
                     <Form style={{ "marginLeft": "20px" }} inline>
                         <FormControl type="text" placeholder="Search" id="searchquery" onChange={this.handleChange} className=" mr-sm-2" />
                         <Button type="submit" onClick={this.onClick}>Search</Button>
                     </Form>
                 </Col>
                 {this.state.tweets &&
                     this.state.tweets.map(tweet => {
                         return (<Tweet tweet={tweet} key={tweet.id} />);
                     })
                 }
 
             </div> */

        )
    }
}

export default UserPage