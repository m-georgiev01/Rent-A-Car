import './App.css';
import { Layout } from './components/layout/Layout';
import { Routes, Route } from 'react-router-dom';
import { UsersList } from './components/users/users-list/UsersList';
import { User } from './components/users/user/User';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={ <Layout /> } >
          <Route path="/users-list" element={ <UsersList /> } />
          <Route path="/user/:id" element={ <User /> } />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
