
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

function TopMenu(props: any) {
    return (<Navbar variant="dark" bg="dark" expand="sm">
        <Container fluid>
            <Navbar.Brand>CHAdmin</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link >Home</Nav.Link>
            </Nav>
            <Nav className="me-2">
                {/* TODO Show the list of discovered servers */}
                {/* <NavDropdown title="Servers" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                </NavDropdown> */}
                <Nav.Link onClick={async e => {
                    await fetch("/api/v1/disconnect").then(e => props.setCHDisconnected(true));
                }
                }>Disconnect</Nav.Link>
            </Nav>
        </Container>
    </Navbar>)
}
export default TopMenu;