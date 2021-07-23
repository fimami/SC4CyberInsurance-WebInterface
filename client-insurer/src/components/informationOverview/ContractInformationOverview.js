import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

function ContractInformationOverview(props) {
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
          updates: true,
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
  const [currentPremiumEuro, setCurrentPremiumEuro] = useState(0);
  const [currentPremiumEther, setCurrentPremiumEther] = useState(0);
  const [contractValidUntil, setContractValidUntil] = useState("");
  const [isContractValid, setIsContractValid] = useState(false);
  const [currentSecurity, setCurrentSecurity] = useState(0);

  const url = "http://127.0.0.1:5000";

  const getContractInformation = () => {
    const jsonHash = JSON.stringify(props.selectedContract.jsonHash);
    console.log(jsonHash);

    axios
      .post(`${url}/getContractInformation`, jsonHash, {
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
    // console.log(showUpdateResponse);
    // console.log(updateResponse);
  }, []);

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
          Contract Hash: {props.selectedContract.jsonHash}
        </div>
        <div style={{ color: "red" }}>
          Contract Address: {props.selectedContract.contractAddress}
        </div>
        <br />
        <div>
          <label id="companyName">Company Name: </label>
          <span>{contractInformation.business_information.companyName}</span>
          <br />
          <label id="type">Company Type: </label>
          <span>{contractInformation.business_information.type}</span>
          <br />
          <label id="sector">Company Sector: </label>
          <span>{contractInformation.business_information.sector}</span>
          <br />
          <label id="streetAddress">Street Address: </label>
          <span>
            {contractInformation.business_information.address.streetAddress}
          </span>

          <br />
          <label id="city">City: </label>
          <span>{contractInformation.business_information.address.city}</span>

          <br />
          <label id="state">State: </label>
          <span>{contractInformation.business_information.address.state}</span>

          <br />
          <label id="postalCode">Postal code: </label>
          <span>
            {contractInformation.business_information.address.postalCode}
          </span>

          <br />
          <br />
          {contractInformation.business_information.contact.map(
            (contact, i) => (
              <div key={i}>
                <br />
                <label>Contact Type: </label>
                <span>
                  {contractInformation.business_information.contact[i].type}
                </span>

                <br />
                <label>Contact Number: </label>
                <span>
                  {contractInformation.business_information.contact[i].number}
                </span>

                <br />

                <br />
              </div>
            )
          )}

          <br />
          <label>Start Date: </label>
          <span>{contractInformation.contract_constraints.startDate}</span>

          <br />

          <label>End Date: </label>
          <span>{contractInformation.contract_constraints.endDate}</span>

          <br />
          <label>Payment Freq. per Year: </label>
          <span>
            {contractInformation.contract_constraints.paymentFrequencyPerYear}
          </span>

          <br />
          <label>Cancellation Allowed? </label>
          <span>{contractInformation.contract_constraints.cancellation.allowed.toString()}</span>
          
          <br />
          <label>Penalty in % (only when cancellation allowed): </label>
          <span>
            {
              contractInformation.contract_constraints.cancellation
                .penaltyInPercent
            }
          </span>

          <br />
          <br />
          <br />
          <label>Yearly Revenue: </label>
          <span>{contractInformation.company_conditions.yearly_revenue}</span>

          <br />
          <label>Revenue % due to technology (between 0 and 1): </label>
          <span>{contractInformation.company_conditions.revenue}</span>

          <br />
          <label>Based on Year: </label>
          <span>{contractInformation.company_conditions.basedOnYear}</span>

          <br />
          <label>Number of Employees: </label>
          <span>
            {contractInformation.company_conditions.numberOfEmployees}
          </span>

          <br />
          <br />
          {contractInformation.company_security.risk_assessment_metrics.map(
            (metric, i) => (
              <div key={i}>
                <br />
                <label>Risk Assessment Metric Name: </label>
                <span>
                  {
                    contractInformation.company_security
                      .risk_assessment_metrics[i].name
                  }
                </span>

                <br />
                <label>Result: </label>
                <span>
                  {
                    contractInformation.company_security
                      .risk_assessment_metrics[i].result
                  }
                </span>
              </div>
            )
          )}

          <br />
          <br />
          {contractInformation.company_security.attacks_history.map(
            (attack, i) => (
              <div key={i}>
                <br />
                <label>Type of occurred attack: </label>
                <span>
                  {contractInformation.company_security.attacks_history[i].type}
                </span>

                <br />
                <label>Date of incident: </label>
                <span>
                  {contractInformation.company_security.attacks_history[i].date}
                </span>

                <br />
                <label>Time to recover: </label>
                <span>
                  {
                    contractInformation.company_security.attacks_history[i]
                      .time_to_recovery
                  }
                </span>

                <br />
                <label>Details: </label>
                <span>
                  {
                    contractInformation.company_security.attacks_history[i]
                      .details
                  }
                </span>

                <br />
                <label>Attack mitigated? </label>
                <span>{contractInformation.company_security.attacks_history[i].mitigated.toString()}</span>
                
              </div>
            )
          )}
          <br />

          <br />
          <br />
          {contractInformation.company_security.security_software.map(
            (software, i) => (
              <div key={i}>
                <br />
                <label>Security Software Name: </label>
                <span>
                  {
                    contractInformation.company_security.security_software[i]
                      .name
                  }
                </span>

                <br />
                <label>Security Software Type: </label>
                <span>
                  {
                    contractInformation.company_security.security_software[i]
                      .type
                  }
                </span>

                <br />

                <br />
              </div>
            )
          )}

          <br />
          <br />
          {contractInformation.company_security.security_training.map(
            (training, i) => (
              <div key={i}>
                <br />
                <label>Security Training Name: </label>
                <span>
                  {
                    contractInformation.company_security.security_training[i]
                      .name
                  }
                </span>
                <br />
                <label>Security Training Type: </label>
                <span>
                  {
                    contractInformation.company_security.security_training[i]
                      .type
                  }
                </span>

                <br />
                <label>Security Training Date: </label>
                <span>
                  {
                    contractInformation.company_security.security_training[i]
                      .date
                  }
                </span>

                <br />
                <label>Security Training Provider: </label>
                <span>
                  {
                    contractInformation.company_security.security_training[i]
                      .provider
                  }
                </span>

                <br />
              </div>
            )
          )}

          <br />
          <br />
          <br />
          <label>Number of connected devices: </label>
          <span>
            {
              contractInformation.company_infrastructure
                .number_connected_devices
            }
          </span>

          <br />
          <label>Number of Systems: </label>
          <span>
            {contractInformation.company_infrastructure.number_systems}
          </span>

          <br />
          {contractInformation.company_infrastructure.technologies.map(
            (tech, i) => (
              <div key={i}>
                <br />
                <br />
                <label>Technology Type: </label>
                <span>
                  {
                    contractInformation.company_infrastructure.technologies[i]
                      .type
                  }
                </span>

                <br />
                <label>Technology Name: </label>
                <span>
                  {
                    contractInformation.company_infrastructure.technologies[i]
                      .name
                  }
                </span>

                <br />
                <label>Technology Version: </label>
                <span>
                  {
                    contractInformation.company_infrastructure.technologies[i]
                      .version
                  }
                </span>

                <br />
                <label>Latest updates installed: </label>
                <span>{contractInformation.company_infrastructure.technologies[i].updates.toString()}</span>
                <br />

                <br />
              </div>
            )
          )}

          <br />
          <br />
          <br />
          <label>Critical Data Amount: </label>
          <span>
            {contractInformation.company_infrastructure.critical_data}
          </span>

          <br />
          <br />
          {contractInformation.company_infrastructure.critical_services.map(
            (service, i) => (
              <div key={i}>
                <label>Critical Service: </label>
                <span>
                  {
                    contractInformation.company_infrastructure
                      .critical_services[i]
                  }
                </span>

                <br />
                <br />
              </div>
            )
          )}

          <br />
          <br />
          <br />
          {contractInformation.contract_coverage.map((c1, i) => (
            <div
              key={i}
              style={{
                borderStyle: "solid",
                padding: "5px",
                marginBottom: "30px",
                marginTop: "20px",
                borderColor: "blue",
              }}
            >
              <label>Attack Type to cover: </label>
              <span>{contractInformation.contract_coverage[i].name}</span>

              <br />
              <br />
              {c1.coverage.map((c2, j) => (
                <div key={(i, j)}>
                  <label>Covered Damage Type Name: </label>
                  <span>
                    {contractInformation.contract_coverage[i].coverage[j].name}
                  </span>

                  <br />
                  <label>Coverage Ratio for damage type: </label>
                  <span>
                    {
                      contractInformation.contract_coverage[i].coverage[j]
                        .coverage_ratio
                    }
                  </span>

                  <br />
                  <label>Deductible for damage type: </label>
                  <span>
                    {
                      contractInformation.contract_coverage[i].coverage[j]
                        .deductible
                    }
                  </span>

                  <br />
                  <label>Max. Indemnification for damage type: </label>
                  <span>
                    {
                      contractInformation.contract_coverage[i].coverage[j]
                        .max_indemnification
                    }
                  </span>

                  <br />
                </div>
              ))}

              <br />
              <br />
              <br />
            </div>
          ))}
          <br />
          <br />

          <br />
        </div>
      </div>
      <div>
        Security: {currentSecurity}{" "}
        {/* <button onClick={paySecurity}>Pay Security</button> */}
      </div>
      <div>
        Premium: {currentPremiumEther} Ether ({currentPremiumEuro} euro){" "}
        {/* <button onClick={payPremium}>Pay Premium</button> */}
      </div>
      <div>Contract valid until: {contractValidUntil}</div>
      {!isContractValid && (
        <div style={{ margin: "10px", color: "red" }}>
          Security has to be paid next by the Customer!
        </div>
      )}
      {isContractValid && (
        <div style={{ margin: "10px", color: "red" }}>
          Premium must be paid until due date by the Customer!
        </div>
      )}
      {/* {isContractValid && (
        <button
          style={{ margin: "20px", padding: "15px" }}
          onClick={props.clickReportDamage}
        >
          Report Damage
        </button>
      )} */}
    </div>
  );
}

export default ContractInformationOverview;
