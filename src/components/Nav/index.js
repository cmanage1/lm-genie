import React from 'react';
import './nav.css'
import { Link } from 'react-router-dom';
import { Button} from '@material-ui/core';

const Nav = () => (

    <nav className="navbar" >
        <ul >
            <Link className="nav-link" to="/">
                <Button > Home </Button>
            </Link>

            <Link className="nav-link" to="/lsat">
                <Button> LSAT </Button>
            </Link>

            <Link className="nav-link" to="/mcat">
                <Button> Mcat </Button> 
            </Link>

            <Link className="nav-link" to="/about">
                <Button> About </Button>
            </Link>

            <Link className="nav-link" to="/privacy">
                <Button> Privacy</Button>
            </Link>
        </ul>
    </nav>
);


export default Nav;
