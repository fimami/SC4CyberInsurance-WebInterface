import axios from "axios";
import { useEffect, useState } from "react";

function ReportOverview(props) {
  const [logfileContent, setLogfileContent] = useState("");
  const [exchangeRate, setExchangeRate] = useState(0);

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

    axios
      .get(`${url}/getExchangeRate`)
      .then((res) => {
        console.log(res);
        setExchangeRate(res.data);
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

  const acceptCounteroffer = (e) => {
    const jsonId = JSON.stringify(props.selectedReport.id);

    axios
      .post(`${url}/acceptCounteroffer2`, jsonId, {
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

  const declineCounteroffer = (e) => {
    const jsonId = JSON.stringify(props.selectedReport.id);

    axios
      .post(`${url}/declineCounteroffer2`, jsonId, {
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

  const resolveDispute = (e) => {
    const jsonId = JSON.stringify(props.selectedReport.id);

    axios
      .post(`${url}/resolveDispute2`, jsonId, {
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

  function getStatus() {
    switch (props.selectedReport.damageStatus) {
      case 0:
        return "Pending";
      case 1:
        return "Paid";
      case 2:
        return "Under Investigation";
      case 3:
        return "Dispute";
      case 4:
        return "Resolved";
      case 5:
        return "Cancelled";
      default:
        break;
    }
  }

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
      <div>Initial amount to cover: {props.selectedReport.amount}</div>
      <br />
      <div style={{ float: "left" }}>
        <div
          style={{
            height: "30vh",
            margin: "5px",
            overflowY: "scroll",
            borderStyle: "solid",
            padding: "5px",
            width: "20vw",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Logfile Content: </div>
          <br />
          <div>{logfileContent}</div>
        </div>
        <br />
        <div>STATUS: {getStatus()}</div>
        <br />
        {getStatus() !== "Paid" &&
          getStatus() !== "Cancelled" &&
          getStatus() !== "Resolved" && (
            <button onClick={cancelDamage}>Cancel Damage Claim</button>
          )}
      </div>
      <div
        style={{
          height: "30vh",
          margin: "5px",
          overflowY: "scroll",
          borderStyle: "solid",
          borderColor: "red",
          padding: "5px",
          width: "20vw",
        }}
      >
        {getStatus() === "Under Investigation" && (
          <div style={{ float: "right" }}>
            <div>
              The new counteroffer is: {props.selectedReport.counteroffer}
            </div>
            <br />
            <br />
            <div>
              The reason for declining the claim was:{" "}
              {props.selectedReport.declineReason}
            </div>
            <br />
            <br />

            <div>
              <button onClick={acceptCounteroffer}>Accept counteroffer</button>
              <button
                style={{ marginLeft: "15px" }}
                onClick={declineCounteroffer}
              >
                Decline counteroffer
              </button>
            </div>
          </div>
        )}
        {getStatus() === "Dispute" && (
          <div style={{ float: "right" }}>
            The claim needs to be handled by both parties. Wait for a
            counteroffer or resolve the dispute externally.
            <br />
            <br />
            <button onClick={resolveDispute}>Resolve Dispute</button>
          </div>
        )}
        {getStatus() === "Resolved" && (
          <div style={{ float: "right" }}>
            The dispute was resolved externally.
          </div>
        )}
        {getStatus() === "Paid" && (
          <div style={{ float: "right" }}>
            {parseInt(props.selectedReport.counteroffer) !== 0 ? (
              <div>
                The claim has been paid with the counteroffer:{" "}
                {props.selectedReport.counteroffer}.
              </div>
            ) : (
              <div>
                The claim has been paid with {props.selectedReport.amount}.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportOverview;
