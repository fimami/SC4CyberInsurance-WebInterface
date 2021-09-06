import axios from "axios";
import { useState } from "react";

function LoginScreen(props) {
  const [credentials, setCredentials] = useState("");

  const url = "http://127.0.0.1:5001";

  function handleChange(e) {
    setCredentials(e.target.value);
  }

  const defineAccount = (e) => {
    if (credentials !== "") {
      const addrKey = JSON.stringify(credentials);

      axios
        .post(`${url}/defineAccount`, addrKey, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          props.setAddressConfiguration(true);
          alert("You are assigned to the following address: " + res.data);
          props.setAccAddr(res.data);
        })
        .catch((error) => console.error(`Error: ${error}`));
    } else {
      alert("Please insert your private key to assign your address.");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-50px",
        marginLeft: "-50px",
        width: "100px",
        height: "100px",
      }}
    >
      <label>Enter your private key:</label>
      <br />
      <br />
      <input style={{ width: "500px" }} type="password" onChange={handleChange} />
      <br />
      <br />
      <button onClick={defineAccount}>Set Address</button>
    </div>
  );
}

export default LoginScreen;
