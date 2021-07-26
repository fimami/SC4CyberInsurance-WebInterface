import axios from "axios";
import { useEffect, useState } from "react";

function ListItem(props) {
  const [updateStatus, setUpdateStatus] = useState("");
  // const [isSelected, setIsSelected] = useState(false);

  // function companyNameChangeHandler(event) {
  //   setCompanyName(props.setName(event));
  // }

  // function hashChangeHandler(event) {
  //   setJsonHash(props.setHash(event));
  // }

  const url = "http://127.0.0.1:5001";

  function useContract() {
    const jsonHash = JSON.stringify(props.jsonHash);

    axios
      .post(`${url}/useContract2`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(jsonHash);
        console.log(response);
        // console.log(proposalDict.new_hash);
        // setUseContractMessage("This contract is selected.");
        props.setSelectedContract({
          companyName: props.companyName,
          jsonHash: props.jsonHash,
          contractAddress: props.contractAddress,
        });
        props.openContractInfo();
        // props.setSelectedUpdateHash(proposalDict.new_hash);
        // setIsSelected(true);
        // handleContractInfoChange();
        // props.setShowContractIsUsed(true);
        // props.changeUsedContract(jsonHash.toString());
        // props.formButtonNotVisible();
        // setShowUseContract(true);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  const checkForNewProposal = () => {
    axios
      .get(`${url}/checkForNewProposal`)
      .then((res) => {
        console.log(res.data);
        setUpdateStatus(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getNewProposalByHash = () => {
    const jsonHash = JSON.stringify(props.jsonHash);

    axios
      .post(`${url}/getNewProposalByHash`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.setProposalHashList([]);
        // console.log(res.data.new_hash);
        if (res.data.new_hash !== 0) {
          const newhash = res.data.new_hash;
          props.setProposalHashList([newhash]);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  function openUpdateOverview() {
    props.setSelectedContract({
      companyName: props.companyName,
      jsonHash: props.jsonHash,
      contractAddress: props.contractAddress,
    });
    props.openUpdateContent();
  }

  //TODO: change the following function (read WARNING)!
  useEffect(() => {
    // setInterval(() => {
    checkForNewProposal();
    getNewProposalByHash();
    // }, 10000);
  }, []);

  if (props.proposalHashList.includes(props.jsonHash)) {
    return (
      <>
        <button
          style={{ marginTop: "30px", padding: "20px" }}
          onClick={openUpdateOverview}
        >
          <div>Company Name: {props.companyName}</div>
          <br />
          <br />
          <div style={{ color: "red" }}>Updated Form</div>
          {/* <div>{'"' + jsonHash.toString() + '"'}</div>
        <div>{props.useContractHash.toString()}</div>
        <div>{props.showContractInfo.toString()}</div> */}
        </button>
        {/*TODO: change the following, so it is just shown that this contract was selected (without using useContractHash) */}
        {/* {props.useContractHash === '"' + jsonHash + '"' && */}
        {/* {props.showContractIsUsed && (
        <div style={{ fontSize: "10px" }}>{props.useContractMessage}</div>
      )} */}
      </>
    );
  } else {
    return (
      <>
        <button
          style={{ marginTop: "30px", padding: "20px" }}
          onClick={useContract}
        >
          <div>Company Name: {props.companyName}</div>
          <br />
          <br />
          <div>{updateStatus}</div>
          {/* <div>{'"' + jsonHash.toString() + '"'}</div>
          <div>{props.useContractHash.toString()}</div>
          <div>{props.showContractInfo.toString()}</div> */}
        </button>
        {/*TODO: change the following, so it is just shown that this contract was selected (without using useContractHash) */}
        {/* {props.useContractHash === '"' + jsonHash + '"' && */}
        {/* {props.showContractIsUsed && (
          <div style={{ fontSize: "10px" }}>{props.useContractMessage}</div>
        )} */}
      </>
    );
  }
}

export default ListItem;
