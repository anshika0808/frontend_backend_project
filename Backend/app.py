from flask import Flask, request, jsonify, url_for
from werkzeug.utils import secure_filename
from flask_cors import CORS
import os

# Initialize the Flask application
app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all routes
# This allows your API to be accessed from different domains
CORS(app, resources={r"/*": {"origins": "*"}}) 

# Set the folder where uploaded files will be stored
UPLOAD_FOLDER = 'static/uploads/'

# Define the allowed file extensions for uploads
ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'}

# Configure the app to use the specified upload folder
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Function to check if a file is allowed based on its extension
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Define the home route, which returns a simple "Hello world" message
@app.route('/')
def home():
    return 'Hello world'

# Define the route for uploading files
@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if a file is part of the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    # Check if the user has selected a file
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # If the file is allowed, save it in the upload folder
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        return jsonify({'message': 'File uploaded successfully!', 'filename': filename}), 200
    else:
        return jsonify({'error': 'File type not allowed'}), 400

# Define the route for retrieving a list of uploaded files
@app.route('/files', methods=['GET'])
def get_files():

    # List all files in the upload folder
    uploaded_files = os.listdir(app.config['UPLOAD_FOLDER'])
    # Create URLs for each uploaded file to allow downloading or previewing
    file_urls = [url_for('static', filename='uploads/' + file ,_external=True) for file in uploaded_files]
    # Return the list of files and their URLs as a JSON response
    return jsonify({'files': [{'filename': file, 'url': url } for file, url in zip(uploaded_files, file_urls)]})

# Run the Flask application in debug mode
if __name__ == '__main__':
    app.run(debug=True)


