import React, { PureComponent } from 'react'
import { Button, ButtonToolbar } from "react-bootstrap";
import {useParams, useRouteMatch} from 'react-router-dom'; 

// rfc
function LogInPage() {
    let { path, url, location } = useRouteMatch();
    console.log(location);
    return (
        <Button variant="outline-primary">
            <a href="https://projectapp.auth.us-west-2.amazoncognito.com/login?response_type=token&client_id=6du6tkbf7lvqhdl5evnn6vc7sm&redirect_uri=http://localhost:3000"> LOGIN</a>
        </Button>
    )
}

export default LogInPage
