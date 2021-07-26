import { Card } from "@material-ui/core";

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
        
      </Card>
    </div>
  );
}

export default PendingContracts;
