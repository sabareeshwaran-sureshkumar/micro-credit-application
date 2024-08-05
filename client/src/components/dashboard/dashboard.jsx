import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        // Personal Details
        fullName: '',
        email: '',
        mobileNumber: '',
        address: '',
        age: '',
        gender: '',
        maritalStatus: '',
        numberOfDependents: '',
        educationLevel: '',
        panNumber: '',
        ownsHouse: '',  // Added for conditional rent field
        // Employment Details
        company: '',
        designation: '',
        dateOfJoining: '',
        employmentType: '',
        workLocation: '',
        employmentStatus: '',
        currentSalary: '',
        previousSalary: '',
        prevHikeDate: '',
        nextHikeDate: '',
        yearsAtCurrentJob: '',
        
        // Bank Details
        bankName: '',
        bankAccountBalances: '',
        repaymentType: '',
        alternateContact: '',
        employerContact: '',
        
        // Financial Details
        groceryExpense: '',
        rentAmount: '',
        currentEMIs: '',
        otherexpense:'',
        
        // Loan Details
        loanAmount: '',
        repaymentPeriod: '',
        existingLoans: '',
        loanPurpose: '',
        creditScore: '',
    });

    useEffect(() => {
        if (!auth) {
            navigate('/login');
        }
    }, [auth, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        try {
            const response = await fetch('http://localhost:5000/api/form-data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Submission successful:', result);
                navigate('/Homepage');
            } else {
                console.error('Submission failed');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className="container">
            <div className="form-title">FILL OUT THIS DETAILS AND CREATE PROFILE</div>
            <form id="loanForm" onSubmit={handleSubmit}>
                {/* Personal Details */}
                <div className="form-section">
                    <h2>Personal Details</h2>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="fullName">Full Name</label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="mobileNumber">Mobile Number</label>
                            <input type="tel" id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="address">Address</label>
                            <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
                        </div>
                        <div className="input-group">
                            <label htmlFor="age">Age</label>
                            <input type="number" id="age" name="age" value={formData.age} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="gender">Gender</label>
                            <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="maritalStatus">Marital Status</label>
                            <select id="maritalStatus" name="maritalStatus" value={formData.maritalStatus} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="divorced">Divorced</option>
                                <option value="widowed">Widowed</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="numberOfDependents">Number of Dependents</label>
                            <input type="number" id="numberOfDependents" name="numberOfDependents" value={formData.numberOfDependents} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="educationLevel">Education Level</label>
                            <select id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="high-school">High School</option>
                                <option value="bachelor">Bachelor's Degree</option>
                                <option value="master">Master's Degree</option>
                                <option value="phd">PhD</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="panNumber">PAN Number</label>
                            <input type="text" id="panNumber" name="panNumber" value={formData.panNumber} onChange={handleInputChange} />
                        </div>
                        <div className="input-group">
                            <label htmlFor="ownsHouse">Owns House</label>
                            <select id="ownsHouse" name="ownsHouse" value={formData.ownsHouse} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                    </div>
                    {formData.ownsHouse === 'no' && (
                        <div className="form-row">
                            <div className="input-group">
                                <label htmlFor="rentAmount">Rent Amount</label>
                                <input type="number" id="rentAmount" name="rentAmount" value={formData.rentAmount} onChange={handleInputChange} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Employment Details */}
                <div className="form-section">
                    <h2>Employment Details</h2>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="company">Company</label>
                            <input type="text" id="company" name="company" value={formData.company} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="designation">Designation</label>
                            <input type="text" id="designation" name="designation" value={formData.designation} onChange={handleInputChange} required />
                        </div>
                        
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="dateOfJoining">Date of Joining</label>
                            <input type="date" id="dateOfJoining" name="dateOfJoining" value={formData.dateOfJoining} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="employmentType">Employment Type</label>
                            <select id="employmentType" name="employmentType" value={formData.employmentType} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="employmentStatus">Employment Status</label>
                            <select id="employmentStatus" name="employmentStatus" value={formData.employmentStatus} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="terminated">Terminated</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="workLocation">Work Location</label>
                            <input type="text" id="workLocation" name="workLocation" value={formData.workLocation} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="currentSalary">Current Salary</label>
                            <input type="number" id="currentSalary" name="currentSalary" value={formData.currentSalary} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="previousSalary">Previous Salary</label>
                            <input type="number" id="previousSalary" name="previousSalary" value={formData.previousSalary} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="prevHikeDate">Previous Hike Date</label>
                            <input type="date" id="prevHikeDate" name="prevHikeDate" value={formData.prevHikeDate} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="nextHikeDate">Next Hike Date</label>
                            <input type="date" id="nextHikeDate" name="nextHikeDate" value={formData.nextHikeDate} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="yearsAtCurrentJob">Years at Current Job</label>
                            <input type="number" id="yearsAtCurrentJob" name="yearsAtCurrentJob" value={formData.yearsAtCurrentJob} onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>

                {/* Bank Details */}
                <div className="form-section">
                    <h2>Bank Details</h2>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="bankAccountBalances">Bank Account Balances</label>
                            <input type="text" id="bankAccountBalances" name="bankAccountBalances" value={formData.bankAccountBalances} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="repaymentType">Repayment Type</label>
                            <select id="repaymentType" name="repaymentType" value={formData.repaymentType} onChange={handleInputChange} required>
                                <option value="" disabled>Choose an option</option>
                                <option value="EMI">EMI</option>
                                <option value="Lump Sum">Lump Sum</option>
                            </select>
                        </div>
                        <div className="input-group">
                            <label htmlFor="alternateContact">Alternate Contact</label>
                            <input type="tel" id="alternateContact" name="alternateContact" value={formData.alternateContact} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="employerContact">Employer Contact</label>
                            <input type="tel" id="employerContact" name="employerContact" value={formData.employerContact} onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>

                {/* Financial Details */}
                <div className="form-section">
                    <h2>Financial Details</h2>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="groceryExpense">Grocery Expense</label>
                            <input type="number" id="groceryExpense" name="groceryExpense" value={formData.groceryExpense} onChange={handleInputChange} required />
                        </div>
                        {formData.ownsHouse === 'no' && (
                            <div className="input-group">
                                <label htmlFor="rentAmount">Rent Amount</label>
                                <input type="number" id="rentAmount" name="rentAmount" value={formData.rentAmount} onChange={handleInputChange} />
                            </div>
                        )}
                        <div className="input-group">
                            <label htmlFor="currentEMIs">Current EMIs</label>
                            <input type="number" id="currentEMIs" name="currentEMIs" value={formData.currentEMIs} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="otherexpense">Avg amt of other expenses</label>
                            <input type="number" id="otherexpense" name="otherexpense" value={formData.otherexpense} onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>

                {/* Loan Details */}
                <div className="form-section">
                    <h2>Loan Details</h2>
                    <div className="form-row">
                        <div className="input-group">
                            <label htmlFor="loanAmount">Loan Amount</label>
                            <input type="number" id="loanAmount" name="loanAmount" value={formData.loanAmount} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="repaymentPeriod">Repayment Period in months</label>
                            <input type="text" id="repaymentPeriod" name="repaymentPeriod" value={formData.repaymentPeriod} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="existingLoans">Existing Loans</label>
                            <input type="number" id="existingLoans" name="existingLoans" value={formData.existingLoans} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="loanPurpose">Purpose of Loan</label>
                            <input type="text" id="loanPurpose" name="loanPurpose" value={formData.loanPurpose} onChange={handleInputChange} required />
                        </div>
                        <div className="input-group">
                            <label htmlFor="creditScore">Credit Score</label>
                            <input type="number" id="creditScore" name="creditScore" value={formData.creditScore} onChange={handleInputChange} required />
                        </div>
                    </div>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Dashboard;