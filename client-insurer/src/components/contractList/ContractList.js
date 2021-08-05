import ListItem from "./ListItem";

function ContractList(props) {
  // const [resetCounter, setResetCounter] = useState(0);
  // const [showUseContract, setShowUseContract] = useState(false);


  // function handleContractInfoChange() {
  //   props.onSelect();
  // }

  // function availableContractsHandler(value) {
  //   props.onChange(value);
  // }

  // const url = "http://127.0.0.1:5000";

  // const getAvailableContracts = () => {
  //   axios
  //     .get(`${url}/getAvailableContracts2`)
  //     .then((response) => {
  //       console.log(response);
  //       for (let index = 0; index < response.data.length; index++) {
  //         console.log(response.data[index]);
  //         setAvailableContracts((availableContracts) => [
  //           ...availableContracts,
  //           response.data[index],
  //         ]);
  //       }
  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // };

  // function resetList() {
  //   // setAvailableContracts([]);
  //   setResetCounter(resetCounter + 1);
  //   console.log(props.availableContracts);
  // }

  // function useContract() {
  //   const jsonHash = JSON.stringify(props.availableContracts[0].jsonHash);

  //   axios
  //     .post(`${url}/useContract2`, jsonHash, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //     .then((response) => {
  //       console.log(jsonHash);
  //       console.log(response);
  //       setUseContractMessage(response.data);


        // handleContractInfoChange();
        // props.setShowContractIsUsed(true);
        // props.changeUsedContract(jsonHash.toString());
        // props.formButtonNotVisible();
        // setShowUseContract(true);


  //     })
  //     .catch((error) => console.error(`Error: ${error}`));
  // }


  return (
    <div style={{ margin: "10px" }}>
      {/* <button onClick={resetList}>Reload List</button> */}
      
      {props.availableContracts.map((contract, i) => (
        <div key={i}>
        <ListItem
          // onClick={useContract}
          companyName={props.availableContracts[i].companyName}
          jsonHash={props.availableContracts[i].jsonHash}
          contractAddress={props.availableContracts[i].contractAddress}
          // useContractHash={props.useContractHash}
          // setUseContractHash={props.setUseContractHash}
          // useContractMessage={useContractMessage}
          // showContractInfo={props.showContractInfo}
          // resetCounter={resetCounter}
          // showContractIsUsed={props.showContractIsUsed}
          openContractInfo={props.openContractInfo}
          // setUsedContractHash={props.setUsedContractHash}
          setSelectedContract={props.setSelectedContract}
          selectedContract={props.selectedContract}
          setSelectedUpdateHash={props.setSelectedUpdateHash}
          selectedReport={props.selectedReport}
        />
        </div>
      ))}
        
      {/* The following map function is maybe only for insurer!-->
      {props.availableContracts.map((item) => (
        <div key={item.jsonHash}>
          <ListItem
            onClick={useContract}
            companyName={item.companyName}
            jsonHash={item.jsonHash}
            useContractHash={props.useContractHash}
            setUseContractHash={props.setUseContractHash}
            useContractMessage={useContractMessage}
            showContractInfo={props.showContractInfo}
          />
        </div>
      ))} */}
      {/*The following is just for testing */}
      {/* <div>{JSON.stringify(props.availableContracts)}</div> */}
    </div>
  );
}

export default ContractList;
