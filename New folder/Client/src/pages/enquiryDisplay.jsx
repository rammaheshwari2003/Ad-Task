import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const EnquiryDisplay = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    fetchEnquiries();
  }, []);

  
  const fetchEnquiries = async () => {
    try {
      const response = await fetch('http://localhost:8080/enquiry/alldisplay');
      if (!response.ok) {
        throw new Error('Failed to fetch enquiries');
      }

      const data = await response.json();
      console.log('Fetched enquiries:', data);

      const enquiriesArray = Array.isArray(data) ? data : data.data || [];
      setEnquiries(enquiriesArray);
      toast.success('Enquiries loaded successfully');
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error('Error fetching enquiries: ' + err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm('Are you sure you want to delete this enquiry?');
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:8080/enquiry/alldelete/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete enquiry');
      }

      setEnquiries(prev => prev.filter(enquiry => enquiry.id !== id && enquiry._id !== id));
      toast.success('Enquiry deleted successfully');
    } catch (err) {
      setError(err.message);
      toast.error('Error deleting enquiry: ' + err.message);
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone,
    },
    {
      name: 'Subject',
      selector: row => row.subject,
    },
    {
      name: 'Message',
      selector: row => row.message,
    },
    {
      name: 'Product Name',
      selector: row => row.productName,
      grow: 2,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <button
          onClick={() => handleDelete(row.id || row._id)}
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaTrash />
        </button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredEnquiries = Array.isArray(enquiries)
    ? enquiries.filter(
        item =>
          item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
          item.subject?.toLowerCase().includes(filterText.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-gray-700">Loading enquiries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Enquiries</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by Name, Email, or Subject..."
            className="w-full p-2 border rounded-md shadow-sm focus:ring focus:ring-indigo-200"
            value={filterText}
            onChange={e => setFilterText(e.target.value)}
          />
        </div>

        <DataTable
          columns={columns}
          data={filteredEnquiries}
          pagination
          highlightOnHover
          striped
          responsive
          noDataComponent="No enquiries found."
        />
      </div>
    </div>
  );
};

export default EnquiryDisplay;
