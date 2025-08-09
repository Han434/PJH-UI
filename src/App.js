import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/General/LogIn';
import Modules from './pages/General/Modules';
import UserList from './pages/User/UserList';
import UserDetail from './pages/User/UserDetail';
import RootLayout from './layout/RootLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/modules" element={<Modules />} />

        {/* Routes under RootLayout */}
        <Route element={<RootLayout />}>
          <Route path="/users" element={<UserList />} />
          {/* Dynamic route for user details */}
          <Route path="/users/:id" element={<UserDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
