import React from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';

const NavMenu = () => {
    return (
        <Navbar expand="lg">
            <Navbar.Brand href="/">HomeCare</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/available-days">Available Days</Nav.Link>
                    <NavDropdown title="Services" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/services/general-care">General Care</NavDropdown.Item>
                        <NavDropdown.Item href="/services/specialized-care">Specialized Care</NavDropdown.Item>
                        <NavDropdown.Item href="/services/palliative-care">Palliative Care</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavMenu;
