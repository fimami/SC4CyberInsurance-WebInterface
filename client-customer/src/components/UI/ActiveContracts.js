import { Card } from "@material-ui/core";
import ContractList from "../contractList/ContractList";

function ActiveContracts(props) {
  return (
    <div className="open-contracts">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "44vh",
        }}
      >
        <h2>Active Contracts</h2>
        {Array.isArray(props.availableContracts) &&
        props.availableContracts.length ? (
          <ContractList
            availableContracts={props.availableContracts}
            openContractInfo={props.openContractInfo}
            setSelectedContract={props.setSelectedContract}
            setProposalHashList={props.setProposalHashList}
            proposalHashList={props.proposalHashList}
            openUpdateContent={props.openUpdateContent}
          />
        ) : (
          <div>No contract is active.</div>
        )}
      </Card>
    </div>
  );
}

export default ActiveContracts;
