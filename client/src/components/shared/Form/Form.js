import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
//useState ki help s value ko lenge by multiple state like email and password
const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div>
      <form
        onSubmit={(e) => {
          // e -> event
          if (formType === "login")
            return handleLogin(e, role, email, password);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organizationName,
              address,
              hospitalName,
              website
            );
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />

        <div className="d-flex ">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="donarRadio" className="form-check-label">
              {" "}
              Donar{" "}
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              {" "}
              Admin{" "}
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="orgRadio"
              value={"organization"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="orgRadio" className="form-check-label">
              {" "}
              Organization{" "}
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              className="form-check-input"
              type="radio"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              {" "}
              Hospital{" "}
            </label>
          </div>
        </div>

        <br></br>

        {/* switch statements based on formType */}

        {
          //using IFEE function
          (() => {
            //eslint-disable-next-line
            switch (true) {
              case formType === "login": {
                return (
                  <>
                    <InputType
                      labelFor={"ForEmail"}
                      labelText={"Email"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelFor={"ForPassword"}
                      labelText={"Password"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </>
                );
              }
              case formType === "register": {
                return (
                  <>
                    {(role === "donar" || role === "admin") && (
                      <InputType
                        labelFor={"ForName"}
                        labelText={"Name"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    )}
                    {role === "organization" && (
                      <InputType
                        labelFor={"forOrganizationName"}
                        labelText={"Organization Name"}
                        inputType={"text"}
                        name={"organizationName"}
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                      />
                    )}
                    {role === "hospital" && (
                      <InputType
                        labelFor={"ForHospitalName"}
                        labelText={"Hospital Name"}
                        inputType={"text"}
                        name={"hospitalName"}
                        value={hospitalName}
                        onChange={(e) => setHospitalName(e.target.value)}
                      />
                    )}

                    <InputType
                      labelFor={"ForEmail"}
                      labelText={"Email"}
                      inputType={"email"}
                      name={"email"}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputType
                      labelFor={"ForPassword"}
                      labelText={"Password"}
                      inputType={"password"}
                      name={"password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <InputType
                      labelFor={"ForWebsite"}
                      labelText={"Website"}
                      inputType={"text"}
                      name={"website"}
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                    <InputType
                      labelFor={"ForAddress"}
                      labelText={"Address"}
                      inputType={"text"}
                      name={"address"}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <InputType
                      labelFor={"ForPhone"}
                      labelText={"Phone"}
                      inputType={"text"}
                      name={"phone"}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </>
                );
              }
            }
          })()
        }

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet? Register
              <Link to="/register"> Here!</Link>
            </p>
          ) : (
            <p>
              Already User
              <Link to="/login"> Login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
