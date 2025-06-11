import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EmployeeForm = ({ onClose, onSave, editingEmployee, existingEmployees }) => {
    const [employee, setEmployee] = useState(editingEmployee || {
        name: '',
        designation: '',
        dateOfJoin: null,
        dateOfBirth: null,
        salary: '',
        gender: '',
        state: ''
    });

    const [states, setStates] = useState([]);
    const [age, setAge] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [duplicateError, setDuplicateError] = useState('');

    useEffect(() => {
        fetch('https://localhost:44364/api/employee/states')
            .then(res => {
                if (!res.ok) throw new Error('Failed to fetch states');
                return res.json();
            })
            .then(data => setStates(data))
            .catch(err => console.error('Error loading states:', err));
    }, []);

    useEffect(() => {
        if (employee.dateOfBirth) {
            calculateAge(employee.dateOfBirth);
        } else {
            setAge('');
        }
    }, [employee.dateOfBirth]);

    useEffect(() => {
        if (duplicateError && employee.name !== (editingEmployee ? editingEmployee.name : '')) {
            setDuplicateError('');
        }
    }, [employee.name, duplicateError, editingEmployee]);

    const handleDateChange = (date, name) => {
        setEmployee(prev => ({ ...prev, [name]: date }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee(prev => ({ ...prev, [name]: value }));
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let ageNow = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            ageNow--;
        }
        setAge(ageNow);
    };

    const handleClear = () => {
        setEmployee({
            name: '',
            designation: '',
            dateOfJoin: null,
            dateOfBirth: null,
            salary: '',
            gender: '',
            state: ''
        });
        setAge('');
        setDuplicateError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);

        if (!employee.name || !employee.designation || !employee.dateOfJoin || !employee.dateOfBirth || !employee.salary || !employee.gender || !employee.state) {
            alert('Please fill in all required fields.');
            setIsSaving(false);
            return;
        }

        if (existingEmployees) {
           
            const currentEmployeeNameTrimmedLower = employee.name.toLowerCase().trim();

            const isDuplicate = existingEmployees.some(
                (emp) => emp.name.toLowerCase().trim() === currentEmployeeNameTrimmedLower && emp.id !== employee.id
            );
            if (isDuplicate) {
                const errorMessage = 'Employee with this name already exists.';
                setDuplicateError(errorMessage);
                alert(errorMessage); 
                setIsSaving(false);
                return; 
            } else {
                setDuplicateError('');
            }
        }

        try {
            const employeeToSave = {
                ...employee,
                name: employee.name.trim(),
                dateOfJoin: employee.dateOfJoin ? employee.dateOfJoin.toISOString() : null,
                dateOfBirth: employee.dateOfBirth ? employee.dateOfBirth.toISOString() : null,
            };
            await onSave(employeeToSave);
        } catch (error) {
            console.error('Error in EmployeeForm handleSubmit:', error);
            alert('An error occurred while saving. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-96 shadow-lg relative">
                <h2 className="text-xl font-bold mb-4">{editingEmployee ? 'Edit' : 'Add'} Employee</h2>

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    disabled={isSaving}
                >
                    &times;
                </button>

                {['name', 'designation'].map(field => (
                    <input
                        key={field}
                        className="w-full border mb-3 p-2"
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                        name={field}
                        value={employee[field]}
                        onChange={handleChange}
                        required
                    />
                ))}
                {duplicateError && <p className="text-red-500 text-sm -mt-2 mb-2">{duplicateError}</p>}

                <input
                    type="number"
                    className="w-full border mb-3 p-2"
                    placeholder="Salary"
                    name="salary"
                    value={employee.salary}
                    onChange={handleChange}
                    required
                />

                {/* Date of Join DatePicker */}
                <label htmlFor="dateOfJoin" className="text-sm text-gray-600 block mb-1">Date of Join:</label>
                <DatePicker
                    selected={employee.dateOfJoin ? new Date(employee.dateOfJoin) : null}
                    onChange={(date) => handleDateChange(date, 'dateOfJoin')}
                    dateFormat="dd/MM/yyyy"
                    className="w-full border mb-3 p-2"
                    placeholderText="Select Date of Join"
                    required
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    scrollableYearDropdown
                    yearDropdownItemNumber={15}
                />

                {/* Date of Birth DatePicker */}
                <label htmlFor="dateOfBirth" className="text-sm text-gray-600 block mb-1">Date of Birth:</label>
                <DatePicker
                    selected={employee.dateOfBirth ? new Date(employee.dateOfBirth) : null}
                    onChange={(date) => handleDateChange(date, 'dateOfBirth')}
                    dateFormat="dd/MM/yyyy"
                    className="w-full border mb-3 p-2"
                    placeholderText="Select Date of Birth"
                    required
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                />

                <div className="mb-3">Age: <b>{age || 'N/A'}</b></div>

                <select
                    name="gender"
                    value={employee.gender}
                    onChange={handleChange}
                    className="w-full border mb-3 p-2"
                    required
                >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                </select>

                <select
                    name="state"
                    value={employee.state}
                    onChange={handleChange}
                    className="w-full border mb-3 p-2"
                    required
                >
                    <option value="">Select State</option>
                    {states.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                </select>

                <div className="flex justify-between items-center mt-4">
                    <div className="flex space-x-2">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
                            disabled={isSaving}
                        >
                            {isSaving ? 'Saving...' : 'Save'}
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="bg-purple-500 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-purple-600 transition-colors"
                            disabled={isSaving}
                        >
                            Clear
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition-colors"
                        disabled={isSaving}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;