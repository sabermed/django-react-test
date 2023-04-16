import React, { useState, useEffect } from "react";
import "../../styles/societe.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { api } from "../../Utils/api";
import { getListCompteurBySociete } from "../../Utils/ApiPath";

export default function ListCompteur() {
  const params = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function getData() {
      try {
        const res = await api.get(`${getListCompteurBySociete}/${params.id}`);
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
        <h1 className="title">List Compteurs</h1>
        <div>
          <Link to={`/add-compteur/${params.id}`} className="button">
            Ajouter Compteur
          </Link>
        </div>
      </div>
      <div className="list-societe-container">
        {data?.map((el, index) => (
          <div key={`societe-card-${index}`} className="card">
            <div className="mb-20">
              <p>numCompteur : {el.numCompteur}</p>
              <p>typeEnergie: {el.typeEnergie}</p>
              <p>consommation: {el.consommation}</p>
            </div>
            <Link
              to={`/view-compteur/${params.id}/${el.numCompteur}`}
              className="button"
            >
              Voir Compteur
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
