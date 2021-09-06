import axios from "axios";

function ListItem(props) {
  const url = "http://127.0.0.1:5001";

  function useContract() {
    const jsonHash = JSON.stringify(props.jsonHash);

    axios
      .post(`${url}/useContract`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        props.setSelectedContract({
          companyName: props.companyName,
          jsonHash: props.jsonHash,
          contractAddress: props.contractAddress,
        });
        props.openContractInfo();
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  function openUpdateOverview() {
    props.setSelectedContract({
      companyName: props.companyName,
      jsonHash: props.jsonHash,
      contractAddress: props.contractAddress,
    });
    props.openUpdateContent();
  }

  return (
    <>
      {props.proposalHashList.includes(props.jsonHash) && (
        <button
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "yellow",
          }}
          onClick={openUpdateOverview}
        >
          <div>Company Name: {props.companyName}</div>
          <br />
          <br />
          <div style={{ color: "red" }}>Updated Contract</div>
        </button>
      )}
      {!props.proposalHashList.includes(props.jsonHash) && (
        <button
          style={{
            marginTop: "30px",
            padding: "20px",
            backgroundColor: "yellow",
          }}
          onClick={useContract}
        >
          <div>Company Name: {props.companyName}</div>
          <br />
          {parseInt(props.updated) >= 1 && (
            <div style={{ fontStyle: "italic" }}>Updated: {props.updated}*</div>
          )}
          <br />
          <div>Selected Contract</div>
        </button>
      )}
    </>
  );
}

export default ListItem;
