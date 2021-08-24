import { Card } from "@material-ui/core";
import { useEffect, useState } from "react";
import ReportList from "../damageReport/ReportList";

function ReportedDamages(props) {
  const [reportSelect, setReportSelect] = useState(6);
  const [nrOfNew, setNrOfNew] = useState(0);
  const [nrOfPaid, setNrOfPaid] = useState(0);
  const [nrOfDispute, setNrOfDispute] = useState(0);
  const [nrOfCancelled, setNrOfCancelled] = useState(0);
  const [nrOfResolved, setNrOfResolved] = useState(0);
  const [nrOfUnderInvestigation, setNrOfUnderInvestigation] = useState(0);
  const [selectedList, setSelectedList] = useState([]);

  const handleChange = (event) => {
    let selector = parseInt(event.target.value);
    setReportSelect(selector);
  };

  useEffect(() => {
    const getDamagesCategory = () => {
      let countNew = 0;
      let countPaid = 0;
      let countDispute = 0;
      let countCancelled = 0;
      let countResolved = 0;
      let countUnderInvestigation = 0;
      if (
        Array.isArray(props.newDamageReports) &&
        props.newDamageReports.length
      ) {
        props.newDamageReports.map((report, i) => {
          if (props.newDamageReports[i].status === 0) {
            countNew++;
          }
          if (props.newDamageReports[i].status === 1) {
            countPaid++;
          }
          if (props.newDamageReports[i].status === 2) {
            countUnderInvestigation++;
          }
          if (props.newDamageReports[i].status === 4) {
            countResolved++;
          }
          if (props.newDamageReports[i].status === 3) {
            countDispute++;
          }
          if (props.newDamageReports[i].status === 5) {
            countCancelled++;
          }
          return true;
        });
      }
      setNrOfNew(countNew);
      setNrOfPaid(countPaid);
      setNrOfDispute(countDispute);
      setNrOfCancelled(countCancelled);
      setNrOfResolved(countResolved);
      setNrOfUnderInvestigation(countUnderInvestigation);
    };
    getDamagesCategory();

    const reloadList = () => {
      let list = [];
      for (let i = 0; i < props.newDamageReports.length; i++) {
        if (
          props.newDamageReports[i].status === reportSelect ||
          reportSelect === 6
        ) {
          list.push(props.newDamageReports[i]);
        }
      }
      setSelectedList(list);
    };
    reloadList();
  }, [props.newDamageReports, reportSelect]);

  return (
    <div className="reported-damages">
      <Card
        style={{
          borderRadius: "10px 10px 10px 10px",
          paddingLeft: "1vmax",
          paddingRight: "1vmax",
          overflowY: "scroll",
          height: "90vh",
        }}
      >
        <h2>Reported Damages</h2>
        <select
          value={reportSelect}
          onChange={handleChange}
          style={{ backgroundColor: "lightgreen" }}
        >
          <option value={6}>All ({props.newDamageReports.length})</option>
          <option value={0}>New ({nrOfNew})</option>
          <option value={1}>Paid ({nrOfPaid})</option>
          <option value={2}>
            Under Investigation ({nrOfUnderInvestigation})
          </option>
          <option value={3}>Dispute ({nrOfDispute})</option>
          <option value={4}>Resolved ({nrOfResolved})</option>
          <option value={5}>Cancelled ({nrOfCancelled})</option>
        </select>
        <br />
        <br />
        {Array.isArray(props.availableContracts) &&
        props.availableContracts.length ? (
          <ReportList
            openReportOverview={props.openReportOverview}
            availableContracts={props.availableContracts}
            showDamageIsSelected={props.showDamageIsSelected}
            setShowDamageIsSelected={props.setShowDamageIsSelected}
            newDamageReports={props.newDamageReports}
            setSelectedReport={props.setSelectedReport}
            proposalHashList={props.proposalHashList}
            selectedList={selectedList}
          />
        ) : (
          <div>No claims available.</div>
        )}
      </Card>
    </div>
  );
}

export default ReportedDamages;
