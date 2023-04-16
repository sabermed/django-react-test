import React, { useState } from "react";
import FormInput from "../../Components/FormInput/FormInput";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/societe.css";
import { ajouterCompteurToSociete } from "../../Utils/ApiPath";
import { api } from "../../Utils/api";

export default function AddCompteur() {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    siret: params.id,
    numCompteur: "",
    consommation: "",
    typeEnergie: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post(`${ajouterCompteurToSociete}`, values);
      if (res?.status == 200 || res?.status == 201) {
        navigate("/");
      }
      setLoading(false);
    } catch (error) {
      if (error.response.status == 400) {
        alert("Cette informations de compteur existe ou n'est pas valide");
      }
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: 2,
      type: "text",
      name: "numCompteur",
      label: "Numéro Compteur",
      placeholder: "Entrer le Numéro Compteur",
      errorMessage: "Le Numéro Compteur est obligatoire.",
      required: true,
    },
    {
      id: 3,
      type: "text",
      name: "consommation",
      label: "Consommation",
      placeholder: "Entrer le Consommation",
      errorMessage: "Le Consommation obligatoire et doit être un nombre.",
      pattern: `[0-9]*$`,
      required: true,
    },
    {
      id: 4,
      type: "text",
      name: "typeEnergie",
      label: "Type Energie",
      placeholder: "Entrer le Type Energie",
      errorMessage: "Le Type Energie est obligatoire.",
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
              {isLoading ? "Loading..." : "Add Compteur"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
