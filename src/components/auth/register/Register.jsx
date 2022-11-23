import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { saveUser } from '../../../utils/services/user-requests';
import './Register.scss';

export function Register () {

    const navigate = useNavigate();
    const [user, setUser] =useState({
        picture: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        address: '',
        isAdmin: false,
        isVIP: false
    });

    const [error, setError] = useState('');

    const onInputChange = (event) => {
        setUser((prevState) => {
            return {
               ...prevState,
               [event.target.name]: event.target.value
            }
        });

        setError('');
    }

    const onFormSubmit = (event) =>{
        event.preventDefault();

        saveUser(user).then(() => {
            navigate("/login");
        })
        .catch(error => setError(error.message));
    }

    return(
        <div className="register-form-wrapper">
            <Form onSubmit={onFormSubmit}>

                { error && <span className="text-danger">{ error }</span>}

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={user.picture} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange} required/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" name="address" value={user.address} onChange={onInputChange} required/>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Submit 
                </Button>
                <Link to='/login'>Alreday have an account?</Link>
            </Form>
        </div>
    );
}