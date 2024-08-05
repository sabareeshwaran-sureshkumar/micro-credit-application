Here's the combined `README.md` file incorporating the details from both provided sections:

```markdown
# micro-credit-application

# Loan Approval Prediction Application

## Overview

This application predicts loan approval based on user details. It features a Flask backend for handling predictions and a React frontend for user interaction.

## Technologies Used
- **Database**: MongoDB
- **Backend**: Flask
- **Frontend**: React.js
- **Styling**: CSS
- **ML Model**: Decision Tree Classifier

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
   cd PYTHON MONGO
   python main.py
   ```

4. Connect the database:
   Open a new terminal
   ```bash
   cd server
   ```

5. Install the required packages:
   ```bash
   npm install
   ```

6. Establish the connection:
   ```bash
   npm run start
   ```

### Frontend

1. Navigate to the frontend directory:
   Open a new terminal 
   ```bash
   cd client
   ```

2. Install the required packages:
   ```bash
   npm install
   ```

3. Start the React application:
   ```bash
   npm run start
   ```

## Deployment

### Preparing the Flask Application

1. **Ensure you have a `Procfile` in your backend directory**:
    ```makefile
    web: python main.py
    ```

2. **Update `requirements.txt`**:
    ```bash
    pip freeze > requirements.txt
    ```

### Deploying the Flask Application

1. **Add all changes and commit them**:
    ```bash
    git add .
    git commit -m "Prepare for Heroku deployment"
    ```

2. **Push your code to Heroku**:
    ```bash
    git push heroku master
    ```

### Setting Up MongoDB

1. **Use a cloud MongoDB service like MongoDB Atlas to set up your MongoDB**.
2. **Get the connection string and set it as an environment variable in Heroku**:
    ```bash
    heroku config:set MONGO_URI="your_mongo_db_connection_string"
    ```

### Frontend Deployment on Netlify

1. **Create a Netlify Account**:
   If you don’t already have a Netlify account, create one at [Netlify](https://www.netlify.com/).

2. **Deploy on Netlify**:
   - Go to your [Netlify dashboard](https://app.netlify.com/).
   - Click on **"Add new site"** and select **"Import an existing project"**.
   - Connect your GitHub repository.
   - Select the repository containing your React application.
   - For the build command, enter `npm run build`.
   - For the publish directory, enter `client/build`.
   - Click **"Deploy Site"**.

### Backend Deployment on Heroku

1. **Create a Heroku Account**:
   If you don’t have a Heroku account, create one at [Heroku](https://www.heroku.com/).

2. **Install Heroku CLI**:
   Download and install the Heroku CLI from [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

3. **Login to Heroku**:
   ```bash
   heroku login
   ```

## Connecting Frontend and Backend

1. **Update API URL in Frontend**:
    In your React application, update the API URL to point to your Heroku backend URL. This can usually be done in an environment file (e.g., `.env`) or directly in the code where the API call is made.
    ```javascript
    const API_URL = "https://your-heroku-app.herokuapp.com";
    ```

## Usage

1. Ensure both the Flask backend and React frontend are running.
2. Open your web browser and go to `http://localhost:3000`.
3. Fill in the loan application form and submit it.
4. Click on the apply loan and enter your PAN card and mobile number.
5. Click on the Submit button.
6. The prediction result will be displayed on the homepage.

## Testing the Deployment

1. **Ensure both the Netlify frontend and the Heroku backend are running correctly**.
2. **Open your web browser and go to your Netlify URL**.
3. **Fill in the loan application form and submit it**.
4. **Verify that the prediction result is displayed correctly and that there are no errors**.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

