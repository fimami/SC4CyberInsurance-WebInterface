import { Card } from "@material-ui/core";

function Counteroffers() {
  return (
    <div className="counteroffers">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "40vh",
        }}
      >
        <h2>Counteroffers</h2>
      </Card>
    </div>
  );
}

export default Counteroffers;
