import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Utils/api";
import { getCompteurBySociete, effectuerUnCalcule } from "../../Utils/ApiPath";
import FormInput from "../../Components/FormInput/FormInput";

export default function ViewCompteur() {
  const params = useParams();
  const [data, setData] = useState(null);
  const [calculOpen, setCalculOpen] = useState(false);
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [calculResult, setCalculResult] = useState({
    message: "",
    resultat: "",
  });

  const handleCalculOpen = () => {
    setCalculOpen((prev) => !prev);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };
  async function handleCalcul(e) {
    e.preventDefault();
    console.log(dateDebut);
    console.log(dateFin);
    try {
      const res = await api.post(`${effectuerUnCalcule}`, {
        siret: params.siret,
        numCompteur: params.id,
        dateDebut: dateDebut,
        dateFin: dateFin,
      });
      if (res.status == 200 || res.status == 201) {
        if (res.data) {
          if (res.data.resultat == 0) {
            alert(res.data.message);
          } else {
            setCalculResult({
              message: res.data.message,
              resultat: res.data.resultat,
            });
          }
        }
      }
    } catch (error) {
      console.log(error.response);
    }
  }
  useEffect(() => {
    (async function getData() {
      try {
        const res = await api.get(
          `${getCompteurBySociete}/${params.siret}/${params.id}`
        );
        if (res.status == 200 || res.status == 201) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, []);

  return (
    <div className="p-horizontal-20 p-vertical-40">
      <h1 className="title">Detail de Compteur</h1>
      <p>numCompteur : {data?.numCompteur}</p>
      <p>typeEnergie: {data?.typeEnergie}</p>
      <p>consommation: {data?.consommation}</p>
      <div style={{ maxWidth: "fit-content" }}>
        <button onClick={handleCalculOpen} className="button" role="button">
          {calculOpen ? "Close Calcul" : "Effectuer un Calcul"}
        </button>
      </div>
      {calculOpen && (
        <form onSubmit={handleCalcul} style={{ maxWidth: "300px" }}>
          <FormInput
            type="date"
            onChange={(e) => {
              const formattedDate = formatDate(e.target.value);
              setDateDebut(formattedDate);
            }}
            errorMessage={"Date Debut est obligatoire"}
            required={true}
          />
          <FormInput
            type="date"
            onChange={(e) => {
              const formattedDate = formatDate(e.target.value);
              setDateFin(formattedDate);
            }}
            errorMessage={"Date Fin est obligatoire"}
            required={true}
          />
          <button type="submit" className="button" role="button">
            save
          </button>
          {calculResult.resultat && (
            <p>Calcul Result:{calculResult.resultat}</p>
          )}
        </form>
      )}
    </div>
  );
}
