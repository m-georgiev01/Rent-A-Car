import './App.css';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { UsersList } from './components/users/users-list/UsersList';
import { User } from './components/users/user/User';
import { UserForm } from './components/users/user-form/UserForm';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { NonAuthenticatedRoute } from './utils/guards/NonAuthenticatedRoute';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { VehiclesList } from './components/vehicles/vehicles-list/VehiclesList';
import { VehicleForm } from './components/vehicles/vehicle-form/VehicleForm';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={ <NonAuthenticatedRoute> <Login /> </NonAuthenticatedRoute> } />
        <Route exact path="/register" element={<NonAuthenticatedRoute> <Register /> </NonAuthenticatedRoute>} />
        <Route exact path="/" element={ <AuthenticatedRoute> <Layout /> </AuthenticatedRoute> } >
          <Route path="/users-list" element={ <UsersList /> } />
          <Route path="/user/:id" element={ <User /> } />
          <Route path="/user/create" element={ <UserForm /> } />
          <Route path="/user/edit/:id" element={ <UserForm /> } />

          <Route path="/vehicles-list" element={ <VehiclesList /> } />
          <Route path="/vehicle/create" element={ <VehicleForm /> } />
          <Route path="/vehicle/edit/:id" element={ <VehicleForm /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
