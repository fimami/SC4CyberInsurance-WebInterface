import axios from "axios";
import { useEffect, useState } from "react";

function ListItem(props) {
  const [companyName, setCompanyName] = useState("");
  const [jsonHash, setJsonHash] = useState("");
  const [updateStatus, setUpdateStatus] = useState("");
  // const [isSelected, setIsSelected] = useState(false);

  // function companyNameChangeHandler(event) {
  //   setCompanyName(props.setName(event));
  // }

  // function hashChangeHandler(event) {
  //   setJsonHash(props.setHash(event));
  // }

  const checkForNewProposal = () => {
    axios
      .get("http://127.0.0.1:5001/checkForNewProposal")
      .then((res) => {
        // console.log(res.data);
        setUpdateStatus(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  function selectContract() {
    props.openContractInfo();
    props.onClick();
  }

  //TODO: change the following function (read WARNING)!
  useEffect(() => {
    setInterval(() => {
      setCompanyName(props.companyName);
      setJsonHash(props.jsonHash);
      checkForNewProposal();
    }, 2000);
  }, []);

  return (
    <>
      <button
        style={{ marginTop: "30px", padding: "20px" }}
        onClick={selectContract}
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

export default ListItem;
