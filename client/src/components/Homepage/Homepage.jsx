import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';

export default function Homepage() {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [panCard, setPanCard] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [approvalStatus, setApprovalStatus] = useState(null);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/loanData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ panCard, phoneNumber }),
            });
    
            const data = await response.json();
            setApprovalStatus(data.approval_status); // Set the approval status
            closeModal();
        } catch (error) {
            console.error("Failed to connect to the data server", error);
        }
    };

    return (
        <div className="homepage">
            {approvalStatus === null ? (
                <>
                    <div className="top-right-buttons">
                        <button onClick={openModal}>Apply Loan</button>
                        <button onClick={() => navigate('/login')}>Logout</button>
                    </div>
                    <div className="content">
                        <div className="background-image"></div>
                        <div className="text-content">
                            <h1>Loan Application !!!</h1>
                            <p>Applying for a loan has never been easier. Our seamless and user-friendly application process ensures that you get the financial assistance you need without any hassle.</p>
                            <p>Features:</p>
                            <ul>
                                <li>Quick and Easy Application Process</li>
                                <li>Competitive Interest Rates</li>
                                <li>Flexible Repayment Options</li>
                                <li>24/7 Customer Support</li>
                            </ul>
                            <p>Start your application today and take the first step towards securing your financial future.</p>
                        </div>
                    </div>
                    <div className="bottom-center-button">
                        <button onClick={openModal}>Apply Loan</button>
                    </div>

                    {isModalOpen && (
                        <div className="modal-overlay">
                            <div className="modal">
                                <h2>Apply Loan</h2>
                                <div className="input-box">
                                    <label htmlFor="panCard" className='text'>PAN Card Number</label>
                                    <input 
                                        className='modal-input'
                                        id="panCard"
                                        type="text" 
                                        placeholder="Enter PAN Card Number" 
                                        value={panCard} 
                                        onChange={(e) => setPanCard(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="input-box">
                                    <label htmlFor="phoneNumber" className='text'>Phone Number</label>
                                    <input 
                                        id="phoneNumber"
                                        className='modal-input'
                                        type="tel" 
                                        placeholder="Enter Phone Number" 
                                        value={phoneNumber} 
                                        onChange={(e) => setPhoneNumber(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <button onClick={handleSubmit} className="submit-button">Submit</button>
                                <button onClick={closeModal} className="close-button">Close</button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="result">
                    <h2>Loan Application Result:</h2>
                    {approvalStatus === "You are eligible for the Loan" ? (
                        <div>
                            <p style={{
                                textAlign: 'center',
                                fontSize: '40px',
                                fontWeight: 'bold',
                                color: 'DarkBlue', 
                                padding: '20px',
                                borderRadius: '10px',
                                background: 'none', 
                                margin: '0',
                                position: 'relative', 
                                transform: 'translateY(-50%)',
                            }}>
                                {approvalStatus}
                            </p>
                            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTc0eHI4NjU4M3VlcHl2eDZ3YzZ0NTFmMTBoMmd5eGR4M2hqOTQxeSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VlnDtLakpAj2cLgWbN/giphy.webp" alt="Congratulations" style={{ display: 'block', margin: 'auto' }} />
                        </div>
                    ) : (
                        <div>
                            <p style={{
                                textAlign: 'center',
                                fontSize: '40px',
                                fontWeight: 'bold',
                                color: 'DarkRed', 
                                padding: '20px',
                                borderRadius: '10px',
                                background: 'none', 
                                margin: '0',
                                position: 'relative', 
                                transform: 'translateY(-50%)',
                            }}>
                                {approvalStatus}
                            </p>
                            <img src="https://www.clipartmax.com/png/middle/474-4748337_we-have-the-right-to-refuse-or-limit-the-use-of-any.png" alt="Better Luck Next Time" style={{ display: 'block', margin: 'auto' }} />
                        </div>
                    )}
                    <br />
                    <button onClick={() => setApprovalStatus(null)}>Apply for Another Loan</button>
                    <button onClick={() => navigate('/login')}>Logout</button>
                </div>
            )}
        </div>
    );
}
