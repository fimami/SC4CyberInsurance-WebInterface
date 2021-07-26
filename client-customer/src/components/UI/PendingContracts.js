import { Card } from "@material-ui/core";
import PendingList from "../pendingRequests/PendingList";

function PendingContracts(props) {
  return (
    <div className="pending-contracts">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "40vh",
        }}
      >
        <h2>Pending Contracts</h2>
        {Array.isArray(props.pendingContracts) && (
          <PendingList
            pendingContracts={props.pendingContracts}
            openPendingInfo={props.openPendingInfo}
            setSelectedPendingContract={props.setSelectedPendingContract}
          />
        )}
      </Card>
    </div>
  );
}

export default PendingContracts;
