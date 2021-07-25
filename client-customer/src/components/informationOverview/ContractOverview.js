import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import UpdateForm from "./UpdateForm";

function ContractOverview(props) {
  const [contractInformation, setContractInformation] = useState({
    business_information: {
      companyName: "",
      type: "",
      sector: "",
      address: {
        streetAddress: "",
        city: "",
        state: "",
        postalCode: 0,
      },
      contact: [
        {
          type: "",
          number: "",
        },
      ],
    },
    contract_constraints: {
      startDate: "",
      endDate: "",
      paymentFrequencyPerYear: 2,
      cancellation: {
        allowed: true,
        penaltyInPercent: 50,
      },
    },
    company_conditions: {
      yearly_revenue: 0,
      revenue: 0.2,
      basedOnYear: 2019,
      numberOfEmployees: 0,
    },
    company_security: {
      risk_assessment_metrics: [
        {
          name: "",
          result: "",
        },
      ],
      attacks_history: [
        {
          type: "",
          date: "",
          time_to_recovery: "",
          details: "",
          mitigated: true,
        },
      ],
      security_software: [
        {
          name: "",
          type: "",
        },
      ],
      security_training: [
        {
          name: "",
          type: "",
          date: "",
          provider: "",
        },
      ],
    },
    company_infrastructure: {
      number_connected_devices: 50,
      number_systems: 2,
      technologies: [
        {
          type: "",
          name: "",
          version: "",
          updates: false,
        },
      ],
      critical_data: "",
      critical_services: [""],
    },
    contract_coverage: [
      {
        name: "",
        coverage: [
          {
            name: "",
            coverage_ratio: 100,
            deductible: 1000,
            max_indemnification: 300000,
          },
        ],
      },
    ],
  });

  const [resetCounter, setResetCounter] = useState(0);

  const [currentPremiumEuro, setCurrentPremiumEuro] = useState(0);
  const [currentPremiumEther, setCurrentPremiumEther] = useState(0);
  const [contractValidUntil, setContractValidUntil] = useState("");
  const [isContractValid, setIsContractValid] = useState(false);
  const [currentSecurity, setCurrentSecurity] = useState(0);
  const [showUpdateResponse, setShowUpdateResponse] = useState(false);
  const [updateResponse, setUpdateResponse] = useState("");

  const url = "http://127.0.0.1:5001";

  function resetList() {
    setResetCounter(resetCounter + 1);
  }

  const getValidUntil = () => {
    axios
      .get(`${url}/getValidUntil`)
      .then((response) => {
        console.log(response.data);
        const validDate = response.data;
        console.log(
          moment.unix(validDate).utc().format("DD.MM.YYYY").toString()
        );
        setContractValidUntil(
          moment.unix(validDate).utc().format("DD.MM.YYYY").toString()
        );
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getPremium = () => {
    axios
      .get(`${url}/getPremium2`)
      .then((response) => {
        console.log(parseInt(response.data));
        setCurrentPremiumEuro(parseInt(response.data));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getContractInformation = () => {
    const jsonHashString = JSON.stringify(props.selectedContract.jsonHash);
    console.log(jsonHashString);

    axios
      .post(`${url}/getContractInformation`, jsonHashString, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setContractInformation(response.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getPremiumInEther = () => {
    axios
      .get(`${url}/getPremiumInEther`)
      .then((response) => {
        console.log(parseInt(response.data));
        setCurrentPremiumEther(parseInt(response.data));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getIsContractValid = () => {
    axios
      .get(`${url}/getValidBool`)
      .then((response) => {
        console.log(response.data);
        if (response.data === "True") {
          setIsContractValid(true);
        }
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const getSecurity = () => {
    const jsonHashString = JSON.stringify(props.availableContracts[0].jsonHash);

    axios
      .post(`${url}/getSecurity`, jsonHashString, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        setCurrentSecurity(parseInt(response.data));
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getContractInformation();
    getPremium();
    getPremiumInEther();
    getValidUntil();
    getIsContractValid();
    getSecurity();
    console.log(showUpdateResponse);
    console.log(updateResponse);
  }, [resetCounter]);

  // function changeOverview() {
  //   props.changeOverview();
  // }

  function paySecurity() {
    if (isContractValid) {
      alert("The security was paid already.");
      return;
    }
    axios
      .post(`${url}/paySecurity2`, currentSecurity, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        resetList();
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  function payPremium() {
    if (!isContractValid) {
      alert("The security has to be paid first.");
      return;
    }
    axios
      .post(`${url}/payPremium2`, currentPremiumEther, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        resetList();
      })
      .catch((error) => console.error(`Error: ${error}`));
  }

  const proposeToUpdateContract = (e) => {
    if (!isContractValid) {
      alert("The security has to be paid first.");
      return;
    }
    const json_content = JSON.stringify(contractInformation, null, 0);
    console.log(json_content);
    axios
      .post(`${url}/proposeToUpdateContract2`, json_content, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setShowUpdateResponse(true);
        setUpdateResponse(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // function showContractInformation() {
  //   console.log(JSON.stringify(contractInformation, null, 2));
  //   console.log(typeof contractInformation);
  // }

  //TODO:Show also contract address here!
  return (
    <div>
      <div
        style={{
          height: "50vh",
          margin: "5px",
          overflowY: "scroll",
          borderStyle: "solid",
          padding: "5px",
        }}
      >
        <button
          style={{ marginBottom: "15px" }}
          onClick={props.closeInfoOrReport}
        >
          Close Overview
        </button>
        <div style={{ color: "green" }}>
          Contract Hash:{" "}
          {props.selectedContract.jsonHash}
        </div>
        <div style={{color: "red"}}>
          Contract Address:{" "}
          {props.selectedContract.contractAddress}
        </div>
        <br />
        <UpdateForm
          contractInformation={contractInformation}
          setContractInformation={setContractInformation}
          onSubmit={proposeToUpdateContract}
          showUpdateResponse={showUpdateResponse}
          updateResponse={updateResponse}
        />
      </div>
      <div>
        Security: {currentSecurity}{" "}
        <button onClick={paySecurity}>Pay Security</button>
      </div>
      <div>
        Premium: {currentPremiumEther} Ether ({currentPremiumEuro} euro){" "}
        <button onClick={payPremium}>Pay Premium</button>
      </div>
      <div>Contract valid until: {contractValidUntil}</div>
      {!isContractValid && (
        <div style={{ margin: "10px", color: "red" }}>
          Security has to be paid next!
        </div>
      )}
      {isContractValid && (
        <div style={{ margin: "10px", color: "red" }}>
          Premium must be paid until due date!
        </div>
      )}
      {isContractValid && (
        <button
          style={{ margin: "20px", padding: "15px" }}
          onClick={props.clickReportDamage}
        >
          Report Damage
        </button>
      )}
    </div>
  );
}

export default ContractOverview;
