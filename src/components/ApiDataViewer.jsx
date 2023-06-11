import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import "./apiDataViewer.css";
import { ThemeContext } from "./ThemeContext";
import Pagination from "./Pagination";

function ApiDataViewer() {
  const { theme } = useContext(ThemeContext);
  const [apiName, setApiName] = useState("");
  const [data, setData] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // starti set edir
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [initialApiName, setInitialApiName] = useState("");

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const fetchData = async () => {
    if (apiName.trim() === "") {
      Swal.fire({
        icon: "warning",
        title: "Empty Value",
        text: "Please enter a value before fetching data.",
      });
      return;
    }

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/${apiName}`
      );
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to fetch data. Please check your input or try again later.",
        });
        return;
      }
      const jsonData = await response.json();
      const filteredData = jsonData.map(
        ({ thumbnailUrl, website, company, address, completed, ...rest }) =>
          rest
      );
      // setData(jsonData);
      // initializeColumnVisibility(jsonData, true);
      setData(filteredData);
      initializeColumnVisibility(filteredData, true);
      setInitialApiName(apiName);
      setApiName("");
    } catch (error) {
      console.error(error);
      setData([]);
      setColumnVisibility({});
      setApiName("");

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch data. Please try again later.",
      });
    }
  };

  const initializeColumnVisibility = (jsonData, activateAll) => {
    const columns = Object.keys(jsonData[0] || {});
    const initialVisibility = columns.reduce((acc, column) => {
      acc[column] = activateAll ? true : false; // activateAll true-dusa, bütün check qutuları aktiv olsun
      return acc;
    }, {});
    setColumnVisibility(initialVisibility);
  };

  const renderTableCell = (value) => {
    const maxLength = 20;
    if (typeof value === "string" && value.length > maxLength) {
      return value.substring(0, maxLength) + "...";
    }
    return value;
  };

  // const renderTableCell = (value) => {
  //   const maxLength = 27;
  //   if (typeof value === "object" && value !== null) {
  //     const jsonString = JSON.stringify(value);//objectise ve null deyilse
  //     if (jsonString.length > maxLength) {
  //       return jsonString.substring(0, maxLength) + "...";
  //     }
  //     return jsonString;
  //   } else if (typeof value === "string" && value.length > maxLength) {
  //     return value.substring(0, maxLength) + "...";
  //   }

  //   return value;
  // };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10);//her deyisende sehifede nece eded gostersin
    setItemsPerPage(newItemsPerPage);//select eliyrnde pagination deyisin deye
    setCurrentPage(1); 
  };

  return (
    <div id="mainArea">
      <div id="leftSide" className={`navbar-${theme}`}>
        <h2>Sorğu</h2>
        <input
          type="text"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          placeholder="Input"
          id="inputStyle"
          className={`input-${theme}`}
        />
        <button onClick={fetchData} className="btn">
          Button
        </button>
      </div>
      <div id="rightSide">
        {data.length > 0 && (
          <>
            <h2 className="exampleTitle">{initialApiName}</h2>

            <div id="rightTop">
              <div id="checkBoxes">
                <div id="checkStyle" className={`navbar-${theme}`}>
                  <div className="checkbox-wrapper-28">
                    <input
                      id="selectAllColumns"
                      type="checkbox"
                      className="promoted-input-checkbox"
                      checked={Object.values(columnVisibility).filter(
                                                              //every//some
                        (value) => value                //true olanlardan teze array yaradiriq
                      )}
                      onChange={() => {
                        const allSelected = Object.values(
                          columnVisibility
                        ).every((value) => value);//onchange vaxti elementlerin true olmagin yoxluyur
                        
                        const updatedVisibility = Object.keys(
                          columnVisibility
                        ).reduce((acc, column, index) => {
                          acc[column] =
                            !allSelected || (index === 0 && allSelected);
                           // hamısı seçilməyibsə və ya seçilibsə birinci sütunu aktiv etmek
                          return acc;
                        }, {});
                        setColumnVisibility(updatedVisibility);
                      }}
                    />

                    <svg>
                      <use xlinkHref="#checkmark-28" />
                    </svg>
                    <label
                      htmlFor="selectAllColumns"
                      style={{
                        color: theme === "light" ? "#f9e5e5" : "#c0bfbf",
                      }}
                    >
                      All
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ display: "none" }}
                    >
                      <symbol id="checkmark-28" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeMiterlimit="10"
                          fill="none"
                          d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                        ></path>
                      </symbol>
                    </svg>
                  </div>
                </div>

                {Object.keys(columnVisibility).map((column, index) => (
                  <div
                    key={column}
                    id="checkStyle"
                    className={`navbar-${theme}`}
                  >
                    <div className="checkbox-wrapper-28">
                      <input
                        id={`columnVisibility.${column}`}
                        type="checkbox"
                        className="promoted-input-checkbox"
                        checked={columnVisibility[column]}
                        disabled={//1-cini Disable etmek
                          index === 0 &&
                          Object.values(columnVisibility).every(
                            (value) => value//boxlardan her hani biri true-dusa 1 ci box disabled olsun
                          )
                        } 
                        onChange={() =>
                          setColumnVisibility((prevState) => ({
                            ...prevState,
                            [column]:!prevState[column],
                          }))
                        }
                      />

                      <svg>
                        <use xlinkHref="#checkmark-28" />
                      </svg>
                      <label
                        htmlFor={`columnVisibility.${column}`}
                        style={{
                          color: theme === "light" ? "#f9e5e5" : "#c0bfbf",
                        }}
                      >
                        {column.charAt(0).toUpperCase() + column.slice(1)}
                      </label>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ display: "none" }}
                      >
                        <symbol id="checkmark-28" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeMiterlimit="10"
                            fill="none"
                            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
                          ></path>
                        </symbol>
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div id="tableDiv">
          {data.length > 0 && (
            <table id="table" className={`navbar-${theme}`}>
              <thead>
                <tr>
                  {Object.keys(columnVisibility)
                    .filter((column) => columnVisibility[column])
                    .map((key) => (
                      <th key={key}>{key}</th>
                    ))}
                </tr>
              </thead>

              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    {Object.entries(item)
                      .filter(([column]) => columnVisibility[column])
                      .map(([column, value], i) => (
                        <td key={i}>{renderTableCell(value)}</td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {data.length > 0 && (
          <div className="rightBottom">
            <div className="selects">
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="pagination">
              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={data.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        )}

        <div className="dataAlert">
          <h1>
            {data.length === 0 && (
              <div id="noDataMessage">No data available</div>
            )}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default ApiDataViewer;
