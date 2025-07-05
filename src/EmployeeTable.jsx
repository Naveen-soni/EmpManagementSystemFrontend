import React, { useState, useEffect } from 'react';
import EmployeeForm from './EmployeeForm';
import ChartPopup from './ChartPopup';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showChart, setShowChart] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' }); 

  const itemsPerPage = 5;
  const API_BASE_URL = 'https://localhost:5000/api/employee';

  const loadEmployees = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE_URL);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      console.error('Error loading employees:', err);
      setError('Failed to load employees. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (ids) => {
    const isBulk = Array.isArray(ids);
    const confirmMessage = isBulk
      ? `Are you sure you want to delete ${ids.length} selected employees?`
      : 'Are you sure you want to delete this employee?';

    const confirmDelete = window.confirm(confirmMessage);

    if (confirmDelete) {
      setError(null);
      try {
        let res;
        if (isBulk) {
          res = await fetch(`${API_BASE_URL}/bulk-delete`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ids)
          });
        } else {
          res = await fetch(`${API_BASE_URL}/${ids}`, { method: 'DELETE' });
        }

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        loadEmployees();
        setSelectedEmployeeIds([]); 
        alert(`Employee(s) deleted successfully!`);
      } catch (err) {
        console.error('Error deleting employee(s):', err);
        setError(`Failed to delete employee(s): ${err.message || ''}. Please try again.`);
        alert(`Failed to delete employee(s). Please try again.`);
      }
    }
  };

  const handleAddClick = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEditClick = (emp) => {
    setEditingEmployee(emp);
    setShowForm(true);
  };

  const handleSave = async (emp) => {
    setError(null);
    const method = emp.id ? 'PUT' : 'POST';
    const url = emp.id
      ? `${API_BASE_URL}/${emp.id}`
      : API_BASE_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emp)
      });

      if (!res.ok) {
        let errorData = null;
        let errorText = null;
        let errorMessage = `Failed to save employee. HTTP Status: ${res.status} ${res.statusText || 'Unknown Error'}.`;

        try {
          errorData = await res.json();
          console.error('Backend JSON Error Response:', errorData);
          if (errorData.message) {
            errorMessage = errorData.message;
          } else if (typeof errorData === 'string') {
            errorMessage = errorData;
          }
        } catch (jsonErr) {
          errorText = await res.text();
          console.error('Backend Raw Text Error Response:', errorText);
          if (errorText) {
            errorMessage = errorText;
          }
        }
        
        if (res.status === 409) {
          errorMessage = errorMessage.includes('Duplicate') ? errorMessage : `Duplicate entry detected: ${errorMessage}`;
        }
        
        throw new Error(errorMessage); 
      }

      setShowForm(false);
      setEditingEmployee(null);
      loadEmployees();
      alert(`Employee ${emp.id ? 'updated' : 'added'} successfully!`);
    } catch (err) {
      console.error('Error saving employee in catch block:', err);
      setError(`Failed to save employee: ${err.message}. Please try again.`);
      alert(`Failed to save employee: ${err.message}. Please check your input and try again.`);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedEmployeeIds(prev =>
      prev.includes(id) ? prev.filter(empId => empId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIdsOnPage = pagedEmployees.map(emp => emp.id);
      setSelectedEmployeeIds(allIdsOnPage);
    } else {
      setSelectedEmployeeIds([]);
    }
  };

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    } else if (sortConfig.key === key && sortConfig.direction === 'descending') {
      key = null;
      direction = 'ascending'; 
    }
    setSortConfig({ key, direction });
  };

  let displayedEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (sortConfig.key !== null) {
    displayedEmployees.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'ascending'
          ? aValue - bValue
          : bValue - aValue;
      }
      if (sortConfig.key.includes('date')) {
        const dateA = new Date(aValue);
        const dateB = new Date(bValue);
        return sortConfig.direction === 'ascending'
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0; 
    });
  }

  
  const totalPages = Math.ceil(displayedEmployees.length / itemsPerPage);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    } else if (totalPages === 0 && currentPage !== 1) { 
      setCurrentPage(1);
    }
  }, [displayedEmployees.length, totalPages, currentPage]);


  const pagedEmployees = displayedEmployees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const totalSalaryOnPage = pagedEmployees.reduce((sum, emp) => sum + emp.salary, 0);
  const overallTotalSalary = displayedEmployees.reduce((sum, emp) => sum + emp.salary, 0);


  
  const handleDownloadPdf = async () => {
    try {
      
      const res = await fetch(`${API_BASE_URL}/download-pdf`);
      if (!res.ok) {
        throw new Error(`Failed to download PDF: ${res.statusText}`);
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'EmployeeList.pdf'; 
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      alert('Employee list PDF downloaded successfully!');
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert(`Failed to download PDF: ${err.message}. Please try again.`);
    }
  };

  const handleViewReport = () => {
    
    const reportViewerUrl = `https://localhost:5000/api/employee/download-pdf`; 
    window.open(reportViewerUrl, '_blank');
    
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <div className="flex space-x-2">
          <button
            onClick={handleAddClick}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
          >
            Add New Employee
          </button>
          <button
            onClick={() => setShowChart(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
            disabled={employees.length === 0}
          >
            Show Employee Chart
          </button>
          <button
            onClick={handleDownloadPdf}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
            disabled={employees.length === 0 || isLoading}
          >
            Download PDF
          </button>
          <button
            onClick={handleViewReport}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
            disabled={isLoading}
          >
            View Report
          </button>
        </div>
      </div>

      <div className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search employees by name..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-gray-500 hover:text-gray-700 font-semibold"
          >
            Clear Search
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {isLoading ? (
        <div className="text-center p-8 text-lg text-gray-600">Loading employees...</div>
      ) : (
        <>
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-4 text-left border-b border-blue-500">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={pagedEmployees.length > 0 && selectedEmployeeIds.length === pagedEmployees.length}
                    disabled={pagedEmployees.length === 0}
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                </th>
                <th className="py-3 px-4 text-left border-b border-blue-500">#</th>
                {[
                  { key: 'name', label: 'Name' },
                  { key: 'designation', label: 'Designation' },
                  { key: 'dateOfJoin', label: 'DOJ' },
                  { key: 'salary', label: 'Salary' },
                  { key: 'gender', label: 'Gender' },
                  { key: 'state', label: 'State' }
                ].map((col) => (
                  <th
                    key={col.key}
                    className="py-3 px-4 text-left border-b border-blue-500 cursor-pointer hover:bg-blue-700 transition-colors duration-150"
                    onClick={() => requestSort(col.key)}
                  >
                    {col.label}
                    {sortConfig.key === col.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'}
                      </span>
                    )}
                  </th>
                ))}
                <th className="py-3 px-4 text-left border-b border-blue-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pagedEmployees.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-6 text-gray-500">
                    {searchTerm ? "No employees found matching your search." : "No employees added yet."}
                  </td>
                </tr>
              ) : (
                pagedEmployees.map((emp, index) => (
                  <tr key={emp.id} className="border-b border-gray-200 hover:bg-gray-50 transition duration-150">
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={selectedEmployeeIds.includes(emp.id)}
                        onChange={() => handleSelectOne(emp.id)}
                        className="form-checkbox h-4 w-4 text-blue-600 rounded"
                      />
                    </td>
                    <td className="py-3 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td
                      className="py-3 px-4 text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
                      onClick={() => handleEditClick(emp)}
                    >
                      {emp.name}
                    </td>
                    <td className="py-3 px-4">{emp.designation}</td>
                    <td className="py-3 px-4">
                      {emp.dateOfJoin ? new Date(emp.dateOfJoin).toLocaleDateString('en-GB') : 'N/A'}
                    </td>
                    <td className="py-3 px-4">₹{emp.salary.toLocaleString('en-IN')}</td>
                    <td className="py-3 px-4">{emp.gender}</td>
                    <td className="py-3 px-4">{emp.state}</td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="text-red-600 hover:text-red-800 font-semibold transition duration-150"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center text-gray-700 font-semibold">
            <button
              onClick={() => handleDelete(selectedEmployeeIds)}
              disabled={selectedEmployeeIds.length === 0}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 disabled:opacity-50"
            >
              Delete Selected ({selectedEmployeeIds.length})
            </button>
            <span>Total Salary (Page): ₹ {totalSalaryOnPage.toLocaleString('en-IN')}</span>
            <span>Overall Total Salary: ₹ {overallTotalSalary.toLocaleString('en-IN')}</span>
          </div>

          <div className="flex justify-center items-center mt-6 space-x-4">
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 transition duration-300"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-lg">Page {currentPage} of {totalPages === 0 ? 1 : totalPages}</span>

            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg disabled:opacity-50 transition duration-300"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage >= totalPages || totalPages === 0}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Employee Form Modal */}
      {showForm && (
        <EmployeeForm
          editingEmployee={editingEmployee}
          onClose={() => {
            setShowForm(false);
            setEditingEmployee(null);
          }}
          onSave={handleSave}
          existingEmployees={employees} 
        />
      )}

      {/* Chart Popup Modal */}
      {showChart && (
        <ChartPopup
          employees={employees}
          onClose={() => setShowChart(false)}
        />
      )}
    </div>
  );
};

export default EmployeeTable;