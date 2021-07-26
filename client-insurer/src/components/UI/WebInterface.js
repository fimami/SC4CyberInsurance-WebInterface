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

  const [availableContracts, setAvailableContracts] = useState([]);

  const [showPendingInfo, setShowPendingInfo] = useState(false);

  const [pendingContracts, setPendingContracts] = useState([]);

  const [selectedPendingContract, setSelectedPendingContract] = useState({});

  const [newDamageReports, setNewDamageReports] = useState([]);

  const [selectedReport, setSelectedReport] = useState({});

  const [selectedContract, setSelectedContract] = useState({});

  // const [usedContractHash, setUsedContractHash] = useState("");

  const [selectedUpdateHash, setSelectedUpdateHash] = useState("");

  //triggers if the contract creation form is shown
  // const [isFormOpen, setIsFormOpen] = useState(false);
  // //triggers the visibility of the Open Form Button
  // const [showFormButton, setShowFormButton] = useState(true);

  const [showDamageReport, setShowDamageReport] = useState(false);

  // const [showDamageIsSelected, setShowDamageIsSelected] = useState("");

  const [showCounterOffer, setShowCounterOffer] = useState(false);

  //
  // const [showContractIsUsed, setShowContractIsUsed] = useState("");

  //triggers the report form window (show, not show)
  // const [showReportForm, setShowReportForm] = useState(false);

  const url = "http://127.0.0.1:5000";

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

  const getNewDamagesOfHash = () => {
    const listOfAllHashes = [];
    for (var i = 0; i < availableContracts.length; i++) {
      listOfAllHashes.push(availableContracts[i].jsonHash);
    }
    console.log(listOfAllHashes);
    if (listOfAllHashes.length) {
      listOfAllHashes.map((hash) => {
        const jsonHash = JSON.stringify(hash);
        axios
          .post(`${url}/getNewDamagesOfHash`, jsonHash, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            console.log(res.data); //NoneType Object is not suscriptable
            setNewDamageReports(res.data);
            console.log(newDamageReports);
          })
          .catch((error) => console.error(`Error: ${error}`));
      });
    } else {
      setNewDamageReports([]);
    }
    //   const jsonHash = JSON.stringify(availableContracts[0].jsonHash);
    //   axios
    //     .post(`${url}/getNewDamagesOfHash`, jsonHash, {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     })
    //     .then((res) => {
    //       // console.log(res);

    //       //TODO: check the following -->
    //       if (res.data.length) {
    //         setNewDamageReports(res.data);
    //       }
    //       // console.log(newDamageReports);
    //     })
    //     .catch((error) => console.error(`Error: ${error}`));
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
      getNewDamagesOfHash();
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

  // function closeForm() {
  //   setIsFormOpen(false);
  // }

  // function openForm() {
  //   if(availableContracts.length) {
  //     alert("There can be one contract at max.");
  //     return;
  //   }
  //   setIsFormOpen(true);
  // }

  // function formButtonNotVisible() {
  //   setShowFormButton(false);
  // }

  function openReportOverview() {
    setShowContractInfo(false);
    // setIsFormOpen(false);
    setShowDamageReport(false);
    setShowDamageReport(true);
    // setShowFormButton(false);
    // setShowContractIsUsed(true);
    // setShowReportForm(false);
    setShowCounterOffer(false);
    setShowPendingInfo(false);
  }

  function openContractInfo() {
    setShowContractInfo(true);
    // setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    // setShowFormButton(false);
    // setShowContractIsUsed(true);
    // setShowReportForm(false);
    setShowPendingInfo(false);
  }

  function closeInfoOrReport() {
    setShowContractInfo(false);
    // setIsFormOpen(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
    // setShowFormButton(true);
    // setShowContractIsUsed(false);
    // setShowReportForm(false);
    setShowPendingInfo(false);
  }

  function openPendingInfo() {
    setShowContractInfo(false);
    setShowDamageReport(false);
    setShowCounterOffer(false);
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
      />
      <Counteroffers />
      <ActionWindow
        // changeOverview={changeOverview}
        availableContracts={availableContracts}
        showContractInfo={showContractInfo}
        setShowContractInfo={setShowContractInfo}
        // closeForm={closeForm}
        // openForm={openForm}
        // isFormOpen={isFormOpen}
        // showFormButton={showFormButton}
        // useContractHash={useContractHash}
        // setShowContractIsUsed={setShowContractIsUsed}
        showDamageReport={showDamageReport}
        setShowDamageReport={setShowDamageReport}
        // showReportForm={showReportForm}
        // setShowReportForm={setShowReportForm}
        showCounterOffer={showCounterOffer}
        closeInfoOrReport={closeInfoOrReport}
        newDamageReports={newDamageReports}
        selectedReport={selectedReport}
        selectedContract={selectedContract}
        selectedUpdateHash={selectedUpdateHash}
        setSelectedReport={setSelectedReport}
        showPendingInfo={showPendingInfo}
        selectedPendingContract={selectedPendingContract}
        setSelectedPendingContract={setSelectedPendingContract}
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
        // setUsedContractHash={setUsedContractHash}
        setSelectedContract={setSelectedContract}
        setSelectedUpdateHash={setSelectedUpdateHash}
        selectedReport={selectedReport}
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
