import { Card } from "@material-ui/core";
import ReportList from "../damageReport/ReportList";

function ReportedDamages(props) {
  return (
    <div className="reported-damages">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "40vh",
        }}
      >
        <h2>Reported Damages</h2>
        <ReportList
          openReportOverview={props.openReportOverview}
          availableContracts={props.availableContracts}
          // showDamageReport={props.showDamageReport}
          showDamageIsSelected={props.showDamageIsSelected}
          setShowDamageIsSelected={props.setShowDamageIsSelected}
          newDamageReports={props.newDamageReports}
          setSelectedReport={props.setSelectedReport}
          proposalHashList={props.proposalHashList}
        />
      </Card>
    </div>
  );
}

export default ReportedDamages;
