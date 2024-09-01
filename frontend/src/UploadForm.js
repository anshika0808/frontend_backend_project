import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import './UploadForm.css'; // Ensure this path is correct

// Main functional component for the upload form
function UploadForm() {
  // State to manage the selected file, message, and the list of uploaded files
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);

// useEffect hook to fetch the list of files when the component is first rendered
  useEffect(() => {
    fetchFiles();
  }, []);

// Function to fetch the list of uploaded files from the server
  const fetchFiles = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/files', {
        method: 'GET'} );
      const data = await response.json();// Update the state with the fetched files
      setFiles(data.files);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
// Function to handle file selection by the user

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);// Update the state with the selected file
  };
// Function to handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();// Prevent the default form submission behavior
  
    if (!file) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);// Append the selected file to the FormData object

    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();
      
      if (response.ok) {
        setMessage(result.message);// Display a success message
        fetchFiles(); // Refresh the list of files
        setFile(null); // Clear the selected file
        e.target.reset();// Reset the form to its initial state
      } else {
        setMessage(result.error);// Display an error message
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file');
    }
  };

// Define the columns for the react-table
  const columns = React.useMemo(
    () => [
      {
        Header: 'Filename',
        accessor: 'filename',
        className: 'filename-column',
      },
      {
        Header: 'File Type',
        accessor: 'filetype',
        className: 'filetype-column',
        Cell: ({ row }) => {
          const filename = row.original.filename;
          return filename.split('.').pop().toUpperCase();// Extract and display the file extension
        },
      },
      {
        Header: 'Preview/Download',
        accessor: 'url',
        className: 'view-column',
        Cell: ({ row }) => {
          const filetype = row.original.filename.split('.').pop().toLowerCase();
          const url = row.original.url;
          
          if (['png', 'jpg', 'jpeg', 'gif'].includes(filetype)) {
            // If the file is an image, display it with a max width of 100px
            return <img src={url} alt="Uploaded File" style={{ maxWidth: '100px' }} />;
          } else {
            // For other file types, provide a download link
            return <a href={url} target="_blank" rel="noopener noreferrer">Download</a>;
          }
        },
      },
    ],
    []
  );

// Memoize the data for the table using the files state
  const data = React.useMemo(() => files, [files]);
// Use the react-table hook to create table properties
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <div>
      <div className="upload-container">
        <h1>Upload a File</h1>
        
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {message && <p>{message}</p>}
      </div>
      <h2 className="centered-heading">Uploaded Files</h2>
      <table {...getTableProps()} className="file-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} className={column.className}>
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()} className={cell.column.className}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UploadForm;
