import React, { useEffect, useState } from "react";
import Axios from "axios";
import io from "socket.io-client";
import { Alert } from "react-bootstrap";
import "./App.scss";

function App() {
  const [deviceData, setDeviceData] = useState([]);
  const ENDPOINT = "https://sheru-assign.herokuapp.com/";

  useEffect(() => {
    let socket = io(ENDPOINT);
    socket.on("connect", () => {
      console.log("connected");
    });

    const getData = async () => {
      const data = await Axios.get("/getdata");
      setDeviceData(data.data);
    };
    getData();
  }, [ENDPOINT]);

  return (
    <div id="container">
      <div id="grid-container">
        <div>DEVICE ID</div>
        <div>IMEI</div>
        <div>Avg. Cell Voltage</div>
        <div>Pack Voltage</div>
        <div>Current</div>
        <div>Battery Percentage</div>
        {deviceData.map((el, idx) => {
          return (
            <>
              <div>{el.vid}</div>
              <div>{el.tdata.IMEI}</div>
              <div>{el.tdata.avgCellVoltage}</div>
              <div>{el.tdata.packVoltage}</div>
              <div>{el.tdata.current}</div>
              <div>{el.tdata.batteryPerc}</div>
            </>
          );
        })}
      </div>
      {deviceData.map((el, idx) => {
        return (
          <>
            {el.tdata.batteryPerc <= 20 ? (
              <div className="alert">
                <Alert variant="danger">Warning - Battery low !!</Alert>
              </div>
            ) : (
              <></>
            )}

            {el.tdata.current < 0 ? (
              <div className="alert">
                <Alert variant="warning">Alert - Battery dischagring!</Alert>
              </div>
            ) : (
              <></>
            )}

            {el.tdata.packVoltage >= 100 ? (
              <div className="alert">
                <Alert variant="danger"> Warning - Voltage too high! </Alert>
              </div>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </div>
  );
}

export default App;
