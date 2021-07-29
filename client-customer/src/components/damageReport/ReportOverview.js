import axios from "axios";
import { useEffect, useState } from "react";

function ReportOverview(props) {
  const [logfileContent, setLogfileContent] = useState("");

  const url = "http://127.0.0.1:5001";
  const getLogfileContentAndHash = () => {
    const logfileHash = JSON.stringify(props.selectedReport.logfileHash);
    const jsonHash = JSON.stringify(props.selectedReport.contractHash);

    axios
      .post(`${url}/getLogContent2`, logfileHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setLogfileContent(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));

    axios
      .post(`${url}/useContract2`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const cancelDamage = (e) => {
    const jsonId = JSON.stringify(props.selectedReport.id);

    axios
      .post(`${url}/cancelDamage`, jsonId, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // function useContract() {
  //   const jsonHash = JSON.stringify(props.selectedReport.contractHash);

  //   axios
  //     .post(`${url}/useContract2`, jsonHash, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // }

  useEffect(() => {
    getLogfileContentAndHash();
    // useContract();
  }, []);

  return (
    <div>
      <button
        style={{ marginBottom: "15px" }}
        onClick={props.closeInfoOrReport}
      >
        Close Report Overview
      </button>
      <br />
      <div>Contract Hash: {props.selectedReport.contractHash}</div>
      <div>Contract Address: {props.availableContracts[0].contractAddress}</div>
      <br />
      <br />
      <div>Date: {props.selectedReport.damageDate}</div>
      <br />
      <div>Attack Type: {props.selectedReport.attackType}</div>
      <br />
      <div>Amount to cover: {props.selectedReport.amount}</div>
      <br />
      <div
        style={{
          height: "30vh",
          margin: "5px",
          overflowY: "scroll",
          borderStyle: "solid",
          padding: "5px",
        }}
      >
        <div style={{ fontWeight: "bold" }}>Logfile Content: </div>
        <br />
        <div>{logfileContent}</div>
      </div>
      <br />
      <div>STATUS: Pending...</div>
      <br />
      <button onClick={cancelDamage}>Cancel Damage Claim</button>
    </div>
  );
}

export default ReportOverview;
