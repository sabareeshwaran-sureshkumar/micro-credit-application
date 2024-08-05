# micro-credit-application


# Loan Approval Prediction Application

## Overview

This application predicts loan approval based on user details. It features a Flask backend for handling predictions and a React frontend for user interaction.

## Technologies Used
- **Database**:MONGODB
- **Backend**: Flask
- **Frontend**: React.js
- **Styling**: CSS
- **ML MODEL** : Decision Tree Classifier

## Prerequisites

- Python 3.x
- Node.js
- npm (Node Package Manager)
- Flask
- React
- Sklearn

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>/
   ```

2. Install the required packages:
   ```bash
   pip install -r requirements.txt
   ```
   
3. Run the Flask application:
   ```bash
   cd PYTHON MONGO>
   python main.py
   ```
4. Connect the database:
   ```bash
   cd server>
   npm run start
   ```
   




### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm start
   ```

## Usage

1. Ensure both the Flask backend and React frontend are running.
2. Open your web browser and go to `http://localhost:3000`.
3. Fill in the loan application form and submit it.
4. The prediction result will be displayed on the homepage.

## Project Structure

```
loan-approval-prediction/
│
├── backend/
│   ├── app.py
│   ├── model.py
│   ├── requirements.txt
│   └── ... (other backend files)
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ... (other frontend files)
│   ├── package.json
│   └── ... (other frontend files)
│
├── README.md
└── ... (other project files)
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

---

Feel free to customize this README to better fit your project and requirements.
