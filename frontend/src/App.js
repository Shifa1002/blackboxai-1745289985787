import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />
        <Route
          path="/user"
          element={
            <Layout>
              <UserDashboard />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
