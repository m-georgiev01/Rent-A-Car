import  Navbar  from 'react-bootstrap/Navbar';
import  Container  from 'react-bootstrap/Container';
import  Nav  from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

export function Header () {
    return (
        <div className="header">
           <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Rent-a-car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link className='nav-link' to="/users-list">Users List</Link>                      
                        <Link className='nav-link' to="/user/create">Create User</Link>                                                           
                    </Nav>
                    <Link className="nav-link" > Logout </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}