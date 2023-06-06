import React, { useState } from 'react';
import Swal from "sweetalert2";
import "./main.css";

function ApiDataViewer() {
  const [apiName, setApiName] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/${apiName}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  const renderTableCell = (value) => {
    if (typeof value === 'object' && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div>
      <input
        type="text"
        value={apiName}
        onChange={(e) => setApiName(e.target.value)}
        placeholder="Enter API name"
      />
      <button onClick={fetchData}>Fetch Data</button>
      {data.length > 0 && (
        <table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {Object.values(item).map((value, i) => (
                  <td key={i}>{renderTableCell(value)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ApiDataViewer;