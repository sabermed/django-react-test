import React, { useState, useEffect } from "react";
import { api } from "../../Utils/api";
import { getSocieteByCompte } from "../../Utils/ApiPath";
import "../../styles/societe.css";
import { Link } from "react-router-dom";

export default function ListSociete() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function getData() {
      try {
        const res = await api.get(`${getSocieteByCompte}`);
        if (res.status == 200 || res.status == 201) {
          setData(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div className="list-societe-wrapper p-vertical-40 p-horizontal-20">
      <div className="list-societe-header">
        <h1 className="title">List Societe</h1>
        <div>
          <Link to={"/add-societe"} className="button">
            Ajouter Societe
          </Link>
        </div>
      </div>
      <div className="list-societe-container">
        {data?.map((el, index) => (
          <div key={`societe-card-${index}`} className="card">
            <div className="mb-20">
              <p>siret : {el.siret}</p>
              <p>Raison Social: {el.raisonSocial}</p>
            </div>
            <Link to={`/view-societe/${el.siret}`} className="button">
              voir Societe
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
