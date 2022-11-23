import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './UserForm.scss';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserById, saveUser } from '../../../utils/services/user-requests';

export function UserForm() {

    const params = useParams();
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

    useEffect(() => {
        if(params.id){
            getUserById(params.id).then(response => {
                setUser(response.data);
            });
        }    
    },[params.id])

    const onFormSubmit = (event) => {
        event.preventDefault();

        saveUser(user).then(() =>{
            navigate('/users-list');
        })
    }

    const onInputChange = (event) => {

        let value = event.target.value;
        if(event.target.name === 'isAdmin' || event.target.name === 'isVIP'){
            value = event.target.checked;
        }

        setUser((prevState) =>{
            return{
                ...prevState,
                [event.target.name]: value
            }
        })
    }

    return(
        <div className="user-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" name="name" value={user.name} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password" name="password" value={user.password} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" value={user.email} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPicture">
                    <Form.Label>Picture</Form.Label>
                    <Form.Control type="text" placeholder="Enter picture url" name="picture" value={user.picture} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="tel" placeholder="Enter phone" name="phone" value={user.phone} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address" name="address" value={user.address} onChange={onInputChange}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Admin" name="isAdmin" checked={user.isAdmin} onChange={onInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="VIP" name="isVIP" checked={user.isVIP} onChange={onInputChange}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit 
                </Button>
            </Form>
        </div>
    );
}