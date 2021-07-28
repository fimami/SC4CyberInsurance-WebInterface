import axios from "axios";
import { useEffect, useState } from "react";
import ActionWindow from "./ActionWindow";
import ActiveContracts from "./ActiveContracts";
import Counteroffers from "./Counteroffers";
import PendingContracts from "./PendingContracts";
import ReportedDamages from "./ReportedDamages";

function WebInterface() {
  //sets if the contract information is shown
  const [showContractInfo, setShowContractInfo] = useState(false);

  const [showUpdateContent, setShowUpdateContent] = useState(false);

  const [showPendingInfo, setShowPendingInfo] = useState(false);

  const [availableContracts, setAvailableContracts] = useState([]);

  const [pendingContracts, setPendingContracts] = useState([]);

  const [newDamageReports, setNewDamageReports] = useState([]);

  const [selectedReport, setSelectedReport] = useState({});

  const [selectedContract, setSelectedContract] = useState({});

  const [proposalHashList, setProposalHashList] = useState([]);

  // const [useContractHash, setUseContractHash] = useState("");

  //triggers if the contract creation form is shown
  const [isFormOpen, setIsFormOpen] = useState(false);
  //triggers the visibility of the Open Form Button
  const [showFormButton, setShowFormButton] = useState(true);

  const [showDamageReport, setShowDamageReport] = useState(false);

  // const [showDamageIsSelected, setShowDamageIsSelected] = useState(false);

  const [showCounterOffer, setShowCounterOffer] = useState(false);

  const [selectedPendingContract, setSelectedPendingContract] = useState({});

  //
  const [showContractIsUsed, setShowContractIsUsed] = useState(false);

  //triggers the report form window (show, not show)
  const [showReportForm, setShowReportForm] = useState(false);

  const url = "http://127.0.0.1:5001";

  const getAvailableContracts = () => {
    axios
      .get(`${url}/getAvailableContracts2`)
      .then((response) => {
        setAvailableContracts([]);
        console.log(response);
        if (response.data.length) {
          setAvailableContracts(response.data);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getPendingContracts = () => {
    axios
      .get(`${url}/getPendingContracts`)
      .then((res) => {
        console.log(res);
        setPendingContracts(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getAllNewDamages = () => {
    axios
      .get(`${url}/getAllNewDamages`)
      .then((res) => {
        console.log(res);
        if (Array.isArray(res.data)) {
          setNewDamageReports(res.data);
        }
        // console.log(newDamageReports);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getNewDamagesOfHash = () => {
    const jsonHash = JSON.stringify(availableContracts[0].jsonHash);
    axios
      .post(`${url}/getNewDamagesOfHash`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        // console.log(res);
        setNewDamageReports(res.data);
        // console.log(newDamageReports);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    setInterval(() => {
      getAvailableContracts();
      getPendingContracts();
      // console.log(availableContracts);
    }, 10000);
  }, []);

  useEffect(() => {
    if (availableContracts.length && Array.isArray(availableContracts)) {
      getAllNewDamages();
    }
  }, [availableContracts]);

  // function handleContractInfoChange() {
  //   setShowContractInfo(true);
  // }

  // function changeOverview() {
  //   setShowContractInfo(false);
  //   setShowFormButton(true);
  //   setShowContractIsUsed(false);
  // }

  // function availableContractsHandler(value) {
  //   setAvailableContracts(value);
  // }

  // function changeUsedContract(value) {
  //   setUseContractHash(value);
  // }

  function closeForm() {
    setIsFormOpen(false);
  }

  function openForm() {
    if (availableContracts.length) {
      alert("There can be one contract at max. Please contact the insurer.");
      return;
    }
    setIsFormOpen(true);
  }

  function openUpdateContent() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(false);
    setShowContractIsUsed(true);
    setShowReportForm(false);
    setShowUpdateContent(true);
    setShowPendingInfo(false);
  }

  // function formButtonNotVisible() {
  //   setShowFormButton(false);
  // }

  function openReportOverview() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowDamageReport(true);
    setShowFormButton(false);
    setShowContractIsUsed(true);
    setShowReportForm(false);
    setShowCounterOffer(false);
    setShowPendingInfo(false);
  }

  function openContractInfo() {
    setShowContractInfo(true);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(false);
    setShowContractIsUsed(true);
    setShowReportForm(false);
    setShowUpdateContent(false);
    setShowPendingInfo(false);
  }

  function closeInfoOrReport() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(true);
    setShowContractIsUsed(false);
    setShowReportForm(false);
    setShowUpdateContent(false);
    setShowPendingInfo(false);
  }

  function openPendingInfo() {
    setShowContractInfo(false);
    setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    setShowFormButton(false);
    setShowContractIsUsed(false);
    setShowReportForm(false);
    setShowUpdateContent(false);
    setShowPendingInfo(true);
  }

  return (
    <>
      <ReportedDamages
        availableContracts={availableContracts}
        // setIsFormOpen={setIsFormOpen}
        // showDamageReport={showDamageReport}
        newDamageReports={newDamageReports}
        // showDamageIsSelected={showDamageIsSelected}
        // setShowDamageIsSelected={setShowDamageIsSelected}
        // setShowDamageReport={setShowDamageReport}
        openReportOverview={openReportOverview}
        setSelectedReport={setSelectedReport}
        proposalHashList={proposalHashList}
      />
      <Counteroffers />
      <ActionWindow
        // changeOverview={changeOverview}
        availableContracts={availableContracts}
        showContractInfo={showContractInfo}
        setShowContractInfo={setShowContractInfo}
        closeForm={closeForm}
        openForm={openForm}
        isFormOpen={isFormOpen}
        showFormButton={showFormButton}
        // useContractHash={useContractHash}
        setShowContractIsUsed={setShowContractIsUsed}
        showDamageReport={showDamageReport}
        setShowDamageReport={setShowDamageReport}
        showReportForm={showReportForm}
        setShowReportForm={setShowReportForm}
        showCounterOffer={showCounterOffer}
        closeInfoOrReport={closeInfoOrReport}
        newDamageReports={newDamageReports}
        selectedReport={selectedReport}
        selectedContract={selectedContract}
        showUpdateContent={showUpdateContent}
        showPendingInfo={showPendingInfo}
        selectedPendingContract={selectedPendingContract}
      />
      <ActiveContracts
        // onSelect={handleContractInfoChange}
        // onChange={availableContractsHandler}
        availableContracts={availableContracts}
        // showContractInfo={showContractInfo}
        // changeUsedContract={changeUsedContract}
        // formButtonNotVisible={formButtonNotVisible}
        // useContractHash={useContractHash}
        // showContractIsUsed={showContractIsUsed}
        // setShowContractIsUsed={setShowContractIsUsed}
        openContractInfo={openContractInfo}
        setSelectedContract={setSelectedContract}
        setProposalHashList={setProposalHashList}
        proposalHashList={proposalHashList}
        openUpdateContent={openUpdateContent}
      />
      <PendingContracts
        pendingContracts={pendingContracts}
        openPendingInfo={openPendingInfo}
        setSelectedPendingContract={setSelectedPendingContract}
      />
      {/* <div>{useContractHash}</div> */}
      {/* <div>{JSON.stringify(availableContracts)}</div> */}
    </>
  );
}

export default WebInterface;
