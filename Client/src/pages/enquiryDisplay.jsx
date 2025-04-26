  // import React, { useState, useEffect } from 'react';

  // const EnquiryDisplay = () => {
  //   const [enquiries, setEnquiries] = useState([]);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchEnquiries = async () => {
  //       try {
  //         const response = await fetch('http://localhost:8080/enquiry/alldisplay');
  //         if (!response.ok) {
  //           throw new Error('Failed to fetch enquiries');
  //         }
  //         const data = await response.json();
  //         setEnquiries(data);
  //         setLoading(false);
  //       } catch (err) {
  //         setError(err.message);
  //         setLoading(false);
  //       }
  //     };

  //     fetchEnquiries();
  //   }, []);

  //   if (loading) {
  //     return (
  //       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
  //         <p className="text-gray-700">Loading enquiries...</p>
  //       </div>
  //     );
  //   }

  //   if (error) {
  //     return (
  //       <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
  //         <p className="text-red-500">Error: {error}</p>
  //       </div>
  //     );
  //   }

  //   return (
  //     <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden ">
  //       <div className="max-w-4xl mx-auto">
  //         <h1 className="text-3xl font-bold text-gray-900 mb-6">Enquiries</h1>
  //         <div className="bg-white shadow-md rounded-lg overflow-hidden">
  //           {enquiries.length === 0 ? (
  //             <div className="p-6 text-center text-gray-700">
  //               No enquiries found.
  //             </div>
  //           ) : (
  //             <table className=" divide-y divide-gray-200">
  //               <thead className="bg-gray-100">
  //                 <tr>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
  //                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
  //                 </tr>
  //               </thead>
  //               <tbody className="bg-white divide-y divide-gray-200">
  //                 {enquiries.map((enquiry, index) => (
  //                   <tr key={index}>
  //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.name}</td>
  //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.email}</td>
  //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.phone}</td>
  //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.subject}</td>
  //                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.message}</td>
  //                   </tr>
  //                 ))}
  //               </tbody>
  //             </table>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // export default EnquiryDisplay;


  import React, { useState, useEffect } from 'react';

  const EnquiryDisplay = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchEnquiries = async () => {
        try {
          const response = await fetch('http://localhost:8080/enquiry/alldisplay');
          if (!response.ok) {
            throw new Error('Failed to fetch enquiries');
          }
          const data = await response.json();
          console.log("API Response:", data); // This will help debug the structure
          setEnquiries(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
  
      fetchEnquiries();
    }, []);
  
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <p className="text-gray-700">Loading enquiries...</p>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      );
    }
  
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Enquiries</h1>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {enquiries.length === 0 ? (
              <div className="p-6 text-center text-gray-700">
                No enquiries found.
              </div>
            ) : (
              <table className="divide-y divide-gray-200 w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {enquiries.map((enquiry, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.id?.name || enquiry.name || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.subject}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{enquiry.message}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.userid.name || enquiry.productName || 'N/A'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    );
  };
  
  export default EnquiryDisplay;