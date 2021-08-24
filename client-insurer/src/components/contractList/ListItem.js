import axios from "axios";
import { useEffect, useState } from "react";

function ListItem(props) {
  const [proposalDict, setProposalDict] = useState({});
  const [useContractMessage, setUseContractMessage] = useState("");

  const url = "http://127.0.0.1:5000";

  function useContract() {
    const jsonHash = JSON.stringify(props.jsonHash);

    axios
      .post(`${url}/useContract`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUseContractMessage("This contract is selected.");
        props.setSelectedContract({
          companyName: props.companyName,
          jsonHash: props.jsonHash,
          contractAddress: props.contractAddress,
        });
        props.openContractInfo();
        props.setSelectedUpdateHash(proposalDict.new_hash);
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  const getNewProposalByHash = () => {
    const jsonHash = JSON.stringify(props.jsonHash);
    axios
      .post(`${url}/getNewProposalByHash`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setProposalDict(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  //TODO: change the following function (read WARNING)!
  //TODO: maybe remove the setInterval() ?
  useEffect(() => {
    console.log("listitem has been rendered");
    setInterval(() => {
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
      </button>
      {props.selectedReport.contractHash == props.jsonHash && (
        <div style={{ fontSize: "10px" }}>This contract was selected.</div>
      )}
    </>
  );
}

export default ListItem;
