import React, { useState ,useContext } from "react";
import Swal from "sweetalert2";
import "./main.css";
import { ThemeContext } from "./ThemeContext";

function ApiDataViewer() {
  const { theme } = useContext(ThemeContext);
  const [apiName, setApiName] = useState("");
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${apiName}`
      );
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(error);
      setData([]);
    }
  };

  const renderTableCell = (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    }
    return value;
  };

  return (
    <div id="mainArea">
      <div id="leftSide">
        <input
          type="text"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          placeholder="Enter API name"
        />
        <button onClick={fetchData}>Fetch Data</button>
      </div>

      <div id="rightSide">
        {data.length > 0 && (
          <div id="tableArea">
            <table id='table' className={`table ${theme === "light" ? "table-dark" : ""}`}>
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
          </div>
        )}
      </div>
    </div>
  );
}

export default ApiDataViewer;
