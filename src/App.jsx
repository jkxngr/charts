import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardLayout from './components/Dashboard';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css'
function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>

  );
}

export default App;
