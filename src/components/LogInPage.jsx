import React, { PureComponent } from 'react'
import { Button, ButtonToolbar, Navbar} from "react-bootstrap";
import { useParams, useRouteMatch } from 'react-router-dom';

// rfc
function LogInPage() {
    let { path, url, location } = useRouteMatch();
    console.log(location);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Cloud Project 1</Navbar.Brand>
            </Navbar>

            <Button variant="primary" href="https://projectapp.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=6du6tkbf7lvqhdl5evnn6vc7sm&redirect_uri=http://localhost:3000">
                LogIn  {/* <a href="https://projectapp.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=6du6tkbf7lvqhdl5evnn6vc7sm&redirect_uri=http://localhost:3000"> LOGIN</a> */}
            </Button>
        </div>

    )
}

export default LogInPage
