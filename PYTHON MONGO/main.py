from flask import Flask, request, jsonify
from flask_cors import CORS
import re
import pymongo
from pymongo import MongoClient
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.metrics import accuracy_score, classification_report

app = Flask(__name__)
CORS(app)  

client = MongoClient('mongodb+srv://sabareeshwaran:25092003@cluster0.jvrnnps.mongodb.net/waitlist')
db = client['waitlist']
collection = db['formdatas']

def validate_pan(pan):
    return re.match(r'^[A-Z]{5}[0-9]{4}[A-Z]{1}$', pan) is not None

def validate_phone(phone):
    return re.match(r'^\d{10}$', phone) is not None

@app.route('/api/loanData', methods=['POST'])
def handle_loan_data():
    data = request.get_json()
    
    pan_card = data.get('panCard')
    phone_number = data.get('phoneNumber')
    
    if not pan_card or not phone_number:
        return jsonify({"message": "All fields are required"}), 400
    
    if not validate_pan(pan_card):
        return jsonify({"message": "Invalid PAN Card format"}), 400
    
    if not validate_phone(phone_number):
        return jsonify({"message": "Invalid Phone Number format"}), 400
    
    
    document = collection.find_one({'panNumber': pan_card})
    
    if document:
        
        age = document.get('age')
        gender = document.get('gender')
        marital_status = document.get('maritalStatus')
        number_of_dependents = document.get('numberOfDependents')
        education_level = document.get('educationLevel')
        employment_type = document.get('employmentType')
        current_salary = document.get('currentSalary')
        owns_house = document.get('ownsHouse')
        rent_amount = document.get('rentAmount')
        years_at_current_job = document.get('yearsAtCurrentJob')
        grocery_expense = document.get('groceryExpense')
        loan_amount = document.get('loanAmount')
        repayment_period = document.get('repaymentPeriod')
        existing_loans = document.get('existingLoans')
        loan_purpose = document.get('loanPurpose')
        credit_score = document.get('creditScore')
         
        
        
        approval_status = predict_loan_approval(
            age=age, gender=gender, maritalStatus=marital_status, numberOfDependents=number_of_dependents,
            educationLevel=education_level, ownsHouse=owns_house, employmentType=employment_type,
            currentSalary=current_salary, yearsAtCurrentJob=years_at_current_job, bankAccountBalances=0, 
            creditScore=credit_score, existingLoans=existing_loans, loanAmount=loan_amount, 
            repaymentPeriod=repayment_period, loanPurpose=loan_purpose
        )
        print(approval_status)
        
        return jsonify({
            "message": "Data received successfully!",
            "approval_status": approval_status
        }), 200
    else:
        return jsonify({"message": "Document not found",}), 404


file_path = 'loan_prediction_data.csv'
df = pd.read_csv(file_path)


selected_features = [
    'age', 'gender', 'maritalStatus', 'numberOfDependents', 'educationLevel',
    'ownsHouse', 'employmentType', 'currentSalary', 'yearsAtCurrentJob',
    'bankAccountBalances', 'creditScore', 'existingLoans', 'loanAmount',
    'repaymentPeriod', 'loanPurpose', 'loanApproved'
]


df_selected = df[selected_features]


imputer = SimpleImputer(strategy='most_frequent')
df_imputed = pd.DataFrame(imputer.fit_transform(df_selected), columns=selected_features)


label_encoders = {}
for column in df_imputed.select_dtypes(include=['object']).columns:
    if column != 'loanApproved':
        label_encoders[column] = LabelEncoder()
        df_imputed[column] = label_encoders[column].fit_transform(df_imputed[column])


label_encoder = LabelEncoder()
df_imputed['loanApproved'] = label_encoder.fit_transform(df_imputed['loanApproved'])


X = df_imputed.drop('loanApproved', axis=1)
y = df_imputed['loanApproved']

# Splitting the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Training the Decision Tree model
dt_model = DecisionTreeClassifier(random_state=42)
dt_model.fit(X_train, y_train)

# Making predictions
dt_predictions = dt_model.predict(X_test)

# Evaluating the model
# print("Decision Tree Accuracy:", accuracy_score(y_test, dt_predictions))
# print("Decision Tree Classification Report:\n", classification_report(y_test, dt_predictions))

# Export the decision tree rules
tree_rules = export_text(dt_model, feature_names=list(X.columns))
# print(tree_rules)

# Mapping for categorical variables
mappings = {
    'gender': {'Male': 1, 'Female': 0, 'Other': 2},
    'maritalStatus': {'Single': 3, 'Married': 1, 'Divorced': 0, 'Widowed': 2},
    'educationLevel': {'High School': 2, 'Bachelors': 0, 'Masters': 1, 'PhD': 3},
    'ownsHouse': {'Yes': 1, 'No': 0},
    'employmentType': {'Full-time': 0, 'Part-time': 1, 'Contract': 2},
    'existingLoans': {'Yes': 1, 'No': 0},
    'loanPurpose': {'Education': 0, 'Home': 2, 'Car': 1, 'Business': 3, 'Other': 4}
}

def map_input(data, mappings):
    mapped_data = {}
    for key, value in data.items():
        if key in mappings:
            mapped_data[key] = mappings[key].get(value, -1)  # Use -1 for unknown values
        else:
            mapped_data[key] = value
    return mapped_data

def predict_loan_approval(age, gender, maritalStatus, numberOfDependents, educationLevel,
                          ownsHouse, employmentType, currentSalary, yearsAtCurrentJob,
                          bankAccountBalances, creditScore, existingLoans, loanAmount,
                          repaymentPeriod, loanPurpose):

    data = {
        'age': age,
        'gender': gender,
        'maritalStatus': maritalStatus,
        'numberOfDependents': numberOfDependents,
        'educationLevel': educationLevel,
        'ownsHouse': ownsHouse,
        'employmentType': employmentType,
        'currentSalary': currentSalary,
        'yearsAtCurrentJob': yearsAtCurrentJob,
        'bankAccountBalances': bankAccountBalances,
        'creditScore': creditScore,
        'existingLoans': existingLoans,
        'loanAmount': loanAmount,
        'repaymentPeriod': repaymentPeriod,
        'loanPurpose': loanPurpose
    }

    mapped_data = map_input(data, mappings)

    if mapped_data['creditScore'] < 600:
        return 'You are not eligible for the Loan '
    else:
        if mapped_data['currentSalary'] < 50000:
            if mapped_data['employmentType'] in [1, 2]:  # Part-time or Contract
                return 'You are not eligible for the Loan '
            else:
                if mapped_data['ownsHouse'] == 0:
                    if mapped_data['loanAmount'] > 500000:
                        return 'You are not eligible for the Loan'
                    else:
                        return 'You are eligible for the Loan'
                else:
                    return 'You are eligible for the Loan'
        else:
            if mapped_data['existingLoans'] == 1:
                if mapped_data['loanAmount'] > 300000:
                    return 'You are not eligible for the Loan'
                else:
                    return 'You are eligible for the Loan'
            else:
                return 'You are eligible for the Loan'

# # Test the function with a sample input
# print(predict_loan_approval(
#     age=30, gender='Male', maritalStatus='Married', numberOfDependents=2, educationLevel='Bachelors',
#     ownsHouse='Yes', employmentType='Full-time', currentSalary=60000, yearsAtCurrentJob=5,
#     bankAccountBalances=100000, creditScore=300, existingLoans='No', loanAmount=200000,
#     repaymentPeriod=24, loanPurpose='Home'
# ))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=3000)
