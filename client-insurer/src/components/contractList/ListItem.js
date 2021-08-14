import axios from "axios";
import { useEffect, useState } from "react";

function ListItem(props) {
  // const [companyName, setCompanyName] = useState("");
  // const [jsonHash, setJsonHash] = useState("");
  // const [updateStatus, setUpdateStatus] = useState("");
  const [proposalDict, setProposalDict] = useState({});
  const [useContractMessage, setUseContractMessage] = useState("");

  // function companyNameChangeHandler(event) {
  //   setCompanyName(props.setName(event));
  // }

  // function hashChangeHandler(event) {
  //   setJsonHash(props.setHash(event));
  // }

  const url = "http://127.0.0.1:5000";

  function useContract() {
    const jsonHash = JSON.stringify(props.jsonHash);

    axios
      .post(`${url}/useContract2`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // console.log(jsonHash);
        // console.log(response);
        // console.log(proposalDict.new_hash);
        setUseContractMessage("This contract is selected.");
        props.setSelectedContract({
          companyName: props.companyName,
          jsonHash: props.jsonHash,
          contractAddress: props.contractAddress,
        });
        props.openContractInfo();
        props.setSelectedUpdateHash(proposalDict.new_hash);
        // handleContractInfoChange();
        // props.setShowContractIsUsed(true);
        // props.changeUsedContract(jsonHash.toString());
        // props.formButtonNotVisible();
        // setShowUseContract(true);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  // const checkForNewProposal = () => {
  //   axios
  //     .get(`${url}/checkForNewProposal`)
  //     .then((res) => {
  //       // console.log(res.data);
  //       setUpdateStatus(res.data);
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  const getNewProposalByHash = () => {
    const jsonHash = JSON.stringify(props.jsonHash);
    // console.log(props.jsonHash);
    // console.log(jsonHash);
    axios
      .post(`${url}/getNewProposalByHash`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        setProposalDict(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  // const selectContract = () => {
  //   useContract();
  //   props.openContractInfo();
  //   // props.onClick();
  // };

  //TODO: change the following function (read WARNING)!
  //TODO: maybe remove the setInterval() ?
  useEffect(() => {
    console.log("listitem has been rendered");
    setInterval(() => {
      // setCompanyName(props.companyName);
      // setJsonHash(props.jsonHash);
      getNewProposalByHash();
    }, 11000);
  }, []);

  return (
    <>
      <button
        style={{ padding: "20px", backgroundColor: "yellow" }}
        onClick={useContract}
      >
        <div>Company Name: {props.companyName}</div>
        <br />
        <br />
        <div>{proposalDict.message}</div>

        {props.setSelectedContract.jsonHash == props.jsonHash && (
          <div style={{ fontSize: "10px" }}>{useContractMessage}</div>
        )}

        {/* <div>{'"' + jsonHash.toString() + '"'}</div>
        <div>{props.useContractHash.toString()}</div>
        <div>{props.showContractInfo.toString()}</div> */}
      </button>
      {props.selectedReport.contractHash == props.jsonHash && (
        <div style={{ fontSize: "10px" }}>This contract was selected.</div>
      )}
      {/*TODO: change the following, so it is just shown that this contract was selected (without using useContractHash) */}
      {/* {props.useContractHash === '"' + jsonHash + '"' && */}
      {/* {props.showContractIsUsed && (
        <div style={{ fontSize: "10px" }}>{props.useContractMessage}</div>
      )} */}
    </>
  );
}

export default ListItem;
