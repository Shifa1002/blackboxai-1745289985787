import React from 'react';
import { FaFileInvoiceDollar } from 'react-icons/fa';

const UserDashboard = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900">User Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your invoices efficiently and effortlessly.</p>
      </header>
      <section className="bg-white p-6 rounded-lg shadow-lg transition-shadow hover:shadow-xl">
        <div className="flex items-center mb-4">
          <FaFileInvoiceDollar className="text-blue-600 text-3xl mr-3" />
          <h2 className="text-2xl font-semibold text-gray-800">Invoices</h2>
        </div>
        {/* Invoice viewing and creation UI goes here */}
        <p className="text-gray-700">Users can view data and create invoices here.</p>
      </section>
    </div>
  );
};

export default UserDashboard;
