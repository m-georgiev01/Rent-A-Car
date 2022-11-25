import  Navbar  from 'react-bootstrap/Navbar';
import  Container  from 'react-bootstrap/Container';
import  Nav  from 'react-bootstrap/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { getLoggedUser, logout } from '../../utils/services/user-requests';

export function Header () {

    const loggedUser = getLoggedUser();
    const navigate = useNavigate();
    const logoutHandler = () => {
        logout().then(() => {
            navigate('/login');
        });
    }

    return (
        <div className="header">
           <Navbar bg="dark" expand="lg" variant='dark'>
                <Container>
                    <Navbar.Brand href="/vehicles-list">Rent-a-car</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">                  
                        { loggedUser.isAdmin ? <Link className='nav-link' to="/users-list">Users</Link> : '' }
                        { loggedUser.isAdmin ? <Link className='nav-link' to="/user/create">Create User</Link> : '' }

                        <Link className='nav-link' to="/vehicles-list">Vehilces</Link>
                        { loggedUser.isAdmin ? <Link className='nav-link' to="/vehicle/create">Add Vehicle</Link> : '' }

                        
                        <Link className='nav-link' to={`/user/${loggedUser.id}`}>My profile</Link>
                    </Nav>
                    <Nav className="logoutBtn">
                        <Link className="nav-link" onClick={logoutHandler}> Logout </Link>
                    </Nav>                   
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}