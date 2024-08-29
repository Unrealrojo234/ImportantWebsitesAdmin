import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cool, setCool] = useState([]);

  const [inputName, setInputName] = useState("");
  const [inputUse, setInputUse] = useState("");
  const [inputLink, setInputLink] = useState("");

  const [load, setload] = useState(0);

  const api = import.meta.env.VITE_REACT_API_COOL;

  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCool((cool) => data);
      })
      .catch((error) => console.log(error));
  }, [load]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        use: inputUse,
        link: inputLink,
      }),
    })
      .then((res) => {
        res.json();
        if (res.ok) {
          console.log("Data submited Successfully!");
          setload((load) => load + 1);
        }
      })
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const handleName = (e) => {
    setInputName((inputName) => e.target.value);
  };

  const handleUse = (e) => {
    setInputUse((inputUse) => e.target.value);
  };

  const handleLink = (e) => {
    setInputLink((inputLink) => e.target.value);
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-warning">
        Important Websites Admin Dashboard
      </h1>
      <hr />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <form
          className="form-control"
          style={{ background: "none", padding: "10px", maxWidth: "40rem" }}
          onSubmit={handleSubmit}
        >
          <input
            className="form-control"
            required
            placeholder="Enter Website Name"
            style={{ background: "none", color: "whitesmoke" }}
            value={inputName}
            onChange={handleName}
          />
          <br />
          <input
            className="form-control"
            required
            placeholder="Enter Website Use"
            style={{ background: "none", color: "whitesmoke" }}
            value={inputUse}
            onChange={handleUse}
          />
          <br />
          <input
            className="form-control"
            required
            placeholder="Enter Website link"
            style={{ background: "none", color: "whitesmoke" }}
            value={inputLink}
            onChange={handleLink}
          />
          <br />
          <div className="d-grid">
            <button className="btn btn-warning" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      <hr />
      <div>
        <ol>
          {cool.map((data) => (
            <li key={data._id} style={{ marginTop: "12px" }}>
              <div style={{ display: "inline-block" }}>
                <div
                  className="card"
                  style={{ background: "none", marginTop: 5, border: "none" }}
                >
                  <h3>{data.name}</h3>
                  <>{data.use}</>
                  <a
                    href={data.link}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      display: "inline",
                    }}
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <hr/>
      <p>&copy;2024 Rojo's Ltd | All Rights Are Reserved</p>
    </div>
  );
}

export default App;
