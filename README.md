About the project
This project is a full-stack web application that involves a Flask backend and a React frontend. The Flask backend handles file uploads and serves the uploaded files, while the React frontend provides a user-friendly interface for interacting with these files.

Backend (Flask)
We used Flask to create a simple REST API that handles file uploads.
File Upload Handling: The Flask backend provides an endpoint (/upload) that handles file uploads. Users can upload files such as images or PDFs, which are saved to a specified directory on the server.
File Retrieval: Another endpoint (/files) retrieves the list of uploaded files and provides URLs to access them. This allows the frontend to display or download the files.
Static File Serving: Flask serves the uploaded files as static content so they can be accessed via URLs.

Frontend (React)
We created a React application that interacts with the Flask API to upload files and display the list of uploaded files.
File Upload Form: The React frontend includes a form where users can select a file from their device and upload it to the server.
Displaying Uploaded Files: After uploading, the frontend fetches the list of files from the backend and displays them in a table. Images are shown as previews, while other file types (like PDFs) are provided as downloadable links.

Instruction for running the Backend code
a. Create a Virtual Environment - python -m venv venv
b. Activate the Virtual Environment - venv\Scripts\activate
c. Install Flask and Other Dependencies - pip install flask
pip install -r requirements.txt
If requirements.txt doesn’t exist, create it by listing the necessary packages - pip freeze > requirements.txt
d. Run the Flask Server - python app.py
If your main Flask file is named something other than app.py, replace app.py with your file name.

Instruction for running the Backend code
a. Navigate to the Frontend Directory - cd frontend
b. Install React Dependencies - npm install
c. Run the React Development Server - npm start

Running Both Servers Simultaneously
Make sure the Flask backend is running before starting the React frontend to ensure they can communicate properly.
* Open two terminal windows, one for Flask and one for React, and run the respective commands (python app.py and npm start) in each.
*  Access the Project
Challenges Faced and Solutions
1: Handling CORS (Cross-Origin Resource Sharing) Issues 
Solution: We used the flask-cors library to enable CORS for all routes in the Flask application. 
2: Managing State in React
Solution: We used useState to manage the state of the file list and useEffect to fetch the updated file list after every upload. 
4: Ensuring Seamless Integration Between Frontend and Backend
Solution: We tested the API endpoints thoroughly and ensured that the React frontend correctly interpreted the responses from the backend. Error handling was implemented to provide clear feedback to the user if something went wrong.
