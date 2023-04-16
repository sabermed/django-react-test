import React, { useState } from "react";
import FormInput from "../../Components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import "../../styles/societe.css";
import { ajouterSociete } from "../../Utils/ApiPath";
import { api } from "../../Utils/api";

export default function AddSociete() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    siret: "",
    raisonSocial: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      setLoading(true);
      const res = await api.post(`${ajouterSociete}`, values);
      if (res.status == 200 || res.status == 201) {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: 1,
      type: "text",
      name: "siret",
      label: "Siret",
      placeholder: "Entrer le Siret",
      errorMessage: "Le Siret obligatoire et doit être un nombre.",
      pattern: `[0-9]*$`,
      required: true,
    },
    {
      id: 2,
      type: "text",
      name: "raisonSocial",
      label: "Raison Social",
      placeholder: "Entrer le Raison Social",
      errorMessage: "Le Raison Social est obligatoire.",
      required: true,
    },
  ];

  return (
    <div className="add-societe-wrapper p-horizontal-20 p-vertical-40">
      <div className="add-societe-header">
        <h1 className="title">Ajouter Societe</h1>
      </div>
      <div className="add-societe-container">
        <form onSubmit={handleSubmit}>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <div className="btn-submit-wrapper">
            <button className="button mt-8" role="button" disabled={isLoading}>
              {isLoading ? "Loading..." : "Add Societe"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
