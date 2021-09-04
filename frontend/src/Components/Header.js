import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'

const Header = () => {
    return (
        
        <Navbar bg="dark" variant="dark">
            <Container>
            <Navbar.Brand href="#home">PureDB</Navbar.Brand>
            <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            </Nav>
            </Container>
        </Navbar>
        
    )
}

export default Header
