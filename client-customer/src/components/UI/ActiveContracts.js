import { Card } from "@material-ui/core";
import ContractList from "../contractList/ContractList";

function ActiveContracts(props) {
  // const [showContractInfo, setShowContractInfo] = useState(false);

  // function handleContractInfoChange() {
  //   setShowContractInfo(true);
  //   props.onSelect();
  // }

  return (
    <div className="open-contracts">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "90vh",
          overflowX: "hidden",
        }}
      >
        <h2>Active Contracts</h2>
        <ContractList
          availableContracts={props.availableContracts}
          // onSelect={props.onSelect}
          // onChange={props.onChange}
          // showContractInfo={props.showContractInfo}
          // changeUsedContract={props.changeUsedContract}
          // formButtonNotVisible={props.formButtonNotVisible}
          // useContractHash={props.useContractHash}
          showContractIsUsed={props.showContractIsUsed}
          setShowContractIsUsed={props.setShowContractIsUsed}
          openContractInfo={props.openContractInfo}
        />
      </Card>
    </div>
  );
}

export default ActiveContracts;
