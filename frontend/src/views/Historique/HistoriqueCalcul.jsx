import React, { useState, useEffect } from "react";
import { api } from "../../Utils/api";
import {
  getHistoriqueDeCalculeParCompte,
  getHistoriqueDeCalculeParSociete,
} from "../../Utils/ApiPath";
import "../../styles/historique.css";
import FormInput from "../../Components/FormInput/FormInput";

export default function HistoriqueCalcul() {
  const [data, setData] = useState([]);
  const [siret, setSiret] = useState("");

  const handleSearchBySiret = async (e) => {
    e.preventDefault();
    if (siret) {
      try {
        const res = await api.get(
          `${getHistoriqueDeCalculeParSociete}/${siret}`
        );
        if (res.status == 200 || res.status == 201) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    async function getData() {
      try {
        const res = await api.get(`${getHistoriqueDeCalculeParCompte}`);
        if (res.status == 200 || res.status == 201) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!siret) {
      getData();
    }
  }, [siret]);

  return (
    <div className="history p-horizontal-20 p-vertical-40">
      <div className="header">
        <h1 className="title">Historique de Calcul</h1>
        <form onSubmit={handleSearchBySiret} className="header-form">
          <div style={{ width: "fit-content", marginRight: "10px" }}>
            <FormInput
              name="siret"
              placeholder="Chercher avec le siret"
              pattern="[0-9]*$"
              required={true}
              onChange={(e) => {
                setSiret(e.target.value);
              }}
            />
          </div>
          <div style={{ width: "fit-content", marginBottom: "4px" }}>
            <button className="button" role="button">
              Rechercher
            </button>
          </div>
        </form>
      </div>
      <table>
        <tr>
          <th>Resultat</th>
          <th>Type Energie</th>
          <th>Numéro Compteur</th>
          <th>Consommation</th>
          <th>Societe Siret</th>
          <th>Societe Raison</th>
        </tr>
        {data &&
          data.length > 0 &&
          data.map((el, index) => (
            <tr key={`line-table-his-${index}`}>
              <td>{el.resultat}</td>
              <td>{el.typeEnergie}</td>
              <td>{el.numCompteur}</td>
              <td>{el.consommation}</td>
              <td>{el.societe_siret}</td>
              <td>{el.societe_raison}</td>
            </tr>
          ))}
      </table>
    </div>
  );
}
