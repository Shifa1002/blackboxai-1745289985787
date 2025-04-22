import React from 'react';
import { FaBox, FaBuilding, FaFileAlt } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">Admin Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage products, companies, and contracts efficiently.</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
          <div className="flex items-center mb-4">
            <FaBox className="text-green-600 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Manage Products</h2>
          </div>
          {/* Product management UI goes here */}
          <p className="text-gray-700">Product CRUD operations will be implemented here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
          <div className="flex items-center mb-4">
            <FaBuilding className="text-yellow-600 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Manage Companies</h2>
          </div>
          {/* Company management UI goes here */}
          <p className="text-gray-700">Company CRUD operations will be implemented here.</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
          <div className="flex items-center mb-4">
            <FaFileAlt className="text-purple-600 text-3xl mr-3" />
            <h2 className="text-2xl font-semibold text-gray-800">Manage Contracts</h2>
          </div>
          {/* Contract management UI goes here */}
          <p className="text-gray-700">Contract CRUD operations will be implemented here.</p>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
