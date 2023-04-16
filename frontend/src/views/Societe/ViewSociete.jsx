import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Utils/api";
import { getSocieteBySiret } from "../../Utils/ApiPath";
import { Link } from "react-router-dom";

export default function ViewSociete() {
  const params = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    (async function getData() {
      try {
        const res = await api.get(`${getSocieteBySiret}/${params.id}`);
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
      <h1 className="title">Detail de Societe</h1>
      <div>
        <div className="mb-20">
          <p className="mb-20">Siret: {data?.siret}</p>
          <p>Raison Social: {data?.raisonSocial}</p>
        </div>
        {data && (
          <Link to={`/list-compteur/${data.siret}`} className="button">
            voir la liste de compteur
          </Link>
        )}
      </div>
    </div>
  );
}
