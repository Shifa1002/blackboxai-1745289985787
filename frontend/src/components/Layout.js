import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { name: 'User Dashboard', path: '/user', roles: ['user'] },
    { name: 'Admin Dashboard', path: '/admin', roles: ['admin'] },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">
            Invoice Manager
          </Link>
          <nav className="space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-gray-700 hover:text-blue-600 font-medium transition ${
                  location.pathname === item.path ? 'text-blue-600 underline' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-6 py-8 flex-grow">
        {children}
      </main>
      <footer className="bg-white shadow-inner text-center py-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Invoice Manager. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
