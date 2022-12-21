
import { Navbar, Container, Nav } from 'react-bootstrap';

function TopMenu(props: any) {
    return (<Navbar variant="dark" bg="dark" expand="sm">
        <Container fluid>
            <Navbar.Brand>CHAdmin</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link >Home</Nav.Link>
            </Nav>
            <Nav className="me-2">
                {/* TODO Show the list of discovered servers */}
                <Nav.Link onClick={async e => {
                    await fetch("/api/v1/disconnect").then(e => props.setCHDisconnected(true));
                }
                }>Disconnect</Nav.Link>
            </Nav>
        </Container>
    </Navbar>)
}
export default TopMenu;