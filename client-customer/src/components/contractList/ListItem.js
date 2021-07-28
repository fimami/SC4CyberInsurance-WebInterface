import axios from "axios";
import { useEffect, useState } from "react";

function ListItem(props) {
  const [updateStatus, setUpdateStatus] = useState("");
  const [proposalDict, setProposalDict] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
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
        console.log(proposalDict.new_hash);
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
        console.log(res.data);
        const newhash = res.data.new_hash;
        props.setProposalHashList([newhash]);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  function checkIfIsUpdate() {
    if (props.proposalHashList.includes(props.jsonHash)) {
      setIsUpdate(true);
    } else {
      setIsUpdate(false);
    }
  }

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
    checkIfIsUpdate();
    // }, 10000);
  }, []);

  return (
    <>
      {isUpdate && (
        <button
          style={{ marginTop: "30px", padding: "20px" }}
          onClick={openUpdateOverview}
        >
          <div>Company Name: {props.companyName}</div>
          <br />
          <br />
          <div style={{ color: "red" }}>Updated Form</div>
        </button>
      )}
      {!isUpdate && (
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
      )}
    </>
  );
}

export default ListItem;
