import axios from "axios";
import { useEffect, useState } from "react";

function PendingOverview(props) {
  const [pendingInformation, setPendingInformation] = useState({
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

  const url = "http://127.0.0.1:5000";

  const getPendingContractInformation = () => {
    const jsonHash = JSON.stringify(props.selectedPendingContract.jsonHash);

    axios
      .post(`${url}/getPendingContractInformation`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setPendingInformation(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  const calculatePremium = (e) => {
    const json_content = JSON.stringify(pendingInformation);
    axios
      .post(`${url}/calculatePremium`, json_content, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        props.setSelectedPendingContract({
          companyName: props.selectedPendingContract.companyName,
          jsonHash: props.selectedPendingContract.jsonHash,
          status: "Accepted",
          premium: res.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const acceptRequest = (e) => {
    const pendingContract = JSON.stringify(props.selectedPendingContract);

    axios
      .post(`${url}/acceptPendingContract`, pendingContract, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {})
      .catch((error) => console.error(`Error: ${error}`));
  };

  const cancelRequest = (e) => {
    const jsonHash = JSON.stringify(props.selectedPendingContract.jsonHash);

    axios
      .post(`${url}/deletePendingContract`, jsonHash, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    getPendingContractInformation();
  }, []);

  return (
    <div>
      <div
        style={{
          height: "60vh",
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
        <div>
          <div style={{ fontSize: "20px", textDecoration: "underline" }}>
            Business Information
          </div>
          <label id="companyName">Company Name: </label>
          <span>{pendingInformation.business_information.companyName}</span>
          <br />
          <label id="type">Company Type: </label>
          <span>{pendingInformation.business_information.type}</span>
          <br />
          <label id="sector">Company Sector: </label>
          <span>{pendingInformation.business_information.sector}</span>
          <br />
          <label id="streetAddress">Street Address: </label>
          <span>
            {pendingInformation.business_information.address.streetAddress}
          </span>

          <br />
          <label id="city">City: </label>
          <span>{pendingInformation.business_information.address.city}</span>

          <br />
          <label id="state">State: </label>
          <span>{pendingInformation.business_information.address.state}</span>

          <br />
          <label id="postalCode">Postal code: </label>
          <span>
            {pendingInformation.business_information.address.postalCode}
          </span>

          <br />
          {pendingInformation.business_information.contact.map((contact, i) => (
            <div key={i}>
              <br />
              <label>Contact Type: </label>
              <span>
                {pendingInformation.business_information.contact[i].type}
              </span>

              <br />
              <label>Contact Number: </label>
              <span>
                {pendingInformation.business_information.contact[i].number}
              </span>
              <br />
            </div>
          ))}
          <br />
          <br />
          <div style={{ fontSize: "20px", textDecoration: "underline" }}>
            Contract Constraints
          </div>
          <label>Start Date: </label>
          <span>{pendingInformation.contract_constraints.startDate}</span>

          <br />

          <label>End Date: </label>
          <span>{pendingInformation.contract_constraints.endDate}</span>

          <br />
          <br />
          <label>Payment Freq. per Year: </label>
          <span>
            {pendingInformation.contract_constraints.paymentFrequencyPerYear}
          </span>

          <br />
          <label>Cancellation Allowed? </label>
          <span>
            {pendingInformation.contract_constraints.cancellation.allowed.toString() ===
            "true"
              ? "Yes"
              : "No"}
          </span>

          <br />
          <label>Penalty in % (only when cancellation allowed): </label>
          <span>
            {
              pendingInformation.contract_constraints.cancellation
                .penaltyInPercent
            }
          </span>

          <br />
          <br />
          <div style={{ fontSize: "20px", textDecoration: "underline" }}>
            Company Conditions
          </div>
          <label>Yearly Revenue: </label>
          <span>{pendingInformation.company_conditions.yearly_revenue}</span>

          <br />
          <label>Revenue % due to technology (between 0 and 1): </label>
          <span>{pendingInformation.company_conditions.revenue}</span>

          <br />
          <label>Based on Year: </label>
          <span>{pendingInformation.company_conditions.basedOnYear}</span>

          <br />
          <label>Number of Employees: </label>
          <span>{pendingInformation.company_conditions.numberOfEmployees}</span>

          <br />
          <br />
          <div style={{ fontSize: "20px", textDecoration: "underline" }}>
            Company Security
          </div>
          {pendingInformation.company_security.risk_assessment_metrics.map(
            (metric, i) => (
              <div key={i}>
                <label>Risk Assessment Metric Name: </label>
                <span>
                  {
                    pendingInformation.company_security.risk_assessment_metrics[
                      i
                    ].name
                  }
                </span>

                <br />
                <label>Result: </label>
                <span>
                  {
                    pendingInformation.company_security.risk_assessment_metrics[
                      i
                    ].result
                  }
                </span>
                <br />
                <br />
              </div>
            )
          )}

          {pendingInformation.company_security.attacks_history.map(
            (attack, i) => (
              <div key={i}>
                <br />
                <label>Type of occurred attack: </label>
                <span>
                  {pendingInformation.company_security.attacks_history[i].type}
                </span>

                <br />
                <label>Date of incident: </label>
                <span>
                  {pendingInformation.company_security.attacks_history[i].date}
                </span>

                <br />
                <label>Time to recover: </label>
                <span>
                  {
                    pendingInformation.company_security.attacks_history[i]
                      .time_to_recovery
                  }
                </span>

                <br />
                <label>Details: </label>
                <span>
                  {
                    pendingInformation.company_security.attacks_history[i]
                      .details
                  }
                </span>

                <br />
                <label>Attack mitigated? </label>
                <span>
                  {pendingInformation.company_security.attacks_history[
                    i
                  ].mitigated.toString() === "true"
                    ? "Yes"
                    : "No"}
                </span>
              </div>
            )
          )}
          <br />

          {pendingInformation.company_security.security_software.map(
            (software, i) => (
              <div key={i}>
                <br />
                <label>Security Software Name: </label>
                <span>
                  {
                    pendingInformation.company_security.security_software[i]
                      .name
                  }
                </span>

                <br />
                <label>Security Software Type: </label>
                <span>
                  {
                    pendingInformation.company_security.security_software[i]
                      .type
                  }
                </span>

                <br />
              </div>
            )
          )}

          <br />
          {pendingInformation.company_security.security_training.map(
            (training, i) => (
              <div key={i}>
                <br />
                <label>Security Training Name: </label>
                <span>
                  {
                    pendingInformation.company_security.security_training[i]
                      .name
                  }
                </span>
                <br />
                <label>Security Training Type: </label>
                <span>
                  {
                    pendingInformation.company_security.security_training[i]
                      .type
                  }
                </span>

                <br />
                <label>Security Training Date: </label>
                <span>
                  {
                    pendingInformation.company_security.security_training[i]
                      .date
                  }
                </span>

                <br />
                <label>Security Training Provider: </label>
                <span>
                  {
                    pendingInformation.company_security.security_training[i]
                      .provider
                  }
                </span>

                <br />
              </div>
            )
          )}

          <br />
          <br />
          <div style={{ fontSize: "20px", textDecoration: "underline" }}>
            Company Infrastructure
          </div>
          <label>Number of connected devices: </label>
          <span>
            {pendingInformation.company_infrastructure.number_connected_devices}
          </span>

          <br />
          <label>Number of Systems: </label>
          <span>
            {pendingInformation.company_infrastructure.number_systems}
          </span>

          {pendingInformation.company_infrastructure.technologies.map(
            (tech, i) => (
              <div key={i}>
                <br />
                <label>Technology Type: </label>
                <span>
                  {
                    pendingInformation.company_infrastructure.technologies[i]
                      .type
                  }
                </span>

                <br />
                <label>Technology Name: </label>
                <span>
                  {
                    pendingInformation.company_infrastructure.technologies[i]
                      .name
                  }
                </span>

                <br />
                <label>Technology Version: </label>
                <span>
                  {
                    pendingInformation.company_infrastructure.technologies[i]
                      .version
                  }
                </span>

                <br />
                <label>Latest updates installed: </label>
                <span>
                  {pendingInformation.company_infrastructure.technologies[
                    i
                  ].updates.toString()}
                </span>
              </div>
            )
          )}

          <br />
          <br />
          <label>Critical Data Amount: </label>
          <span>{pendingInformation.company_infrastructure.critical_data}</span>

          <br />
          <br />
          {pendingInformation.company_infrastructure.critical_services.map(
            (service, i) => (
              <div key={i}>
                <label>Critical Service: </label>
                <span>
                  {
                    pendingInformation.company_infrastructure.critical_services[
                      i
                    ]
                  }
                </span>

                <br />
                <br />
              </div>
            )
          )}
          <br />
          <div style={{ fontSize: "20px", textDecoration: "underline" }}>
            Contract Coverage
          </div>
          {pendingInformation.contract_coverage.map((c1, i) => (
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
              <span>{pendingInformation.contract_coverage[i].name}</span>

              <br />
              <br />
              {c1.coverage.map((c2, j) => (
                <div key={(i, j)}>
                  <label>Covered Damage Type Name: </label>
                  <span>
                    {pendingInformation.contract_coverage[i].coverage[j].name}
                  </span>

                  <br />
                  <label>Coverage Ratio for damage type: </label>
                  <span>
                    {
                      pendingInformation.contract_coverage[i].coverage[j]
                        .coverage_ratio
                    }
                  </span>

                  <br />
                  <label>Deductible for damage type: </label>
                  <span>
                    {
                      pendingInformation.contract_coverage[i].coverage[j]
                        .deductible
                    }
                  </span>

                  <br />
                  <label>Max. Indemnification for damage type: </label>
                  <span>
                    {
                      pendingInformation.contract_coverage[i].coverage[j]
                        .max_indemnification
                    }
                  </span>

                  <br />
                  <br />
                </div>
              ))}
            </div>
          ))}
          <br />
          <br />

          <br />
        </div>
      </div>
      {parseInt(props.selectedPendingContract.premium) !== 0 && (
        <div>
          The calculated Premium is {props.selectedPendingContract.premium}{" "}
          euro.
        </div>
      )}
      {parseInt(props.selectedPendingContract.premium) === 0 && (
        <button onClick={calculatePremium}>Calculate Premium</button>
      )}

      <br />
      <br />
      <button onClick={cancelRequest}>Cancel Request</button>

      <button onClick={acceptRequest}>Accept Request</button>
    </div>
  );
}

export default PendingOverview;
