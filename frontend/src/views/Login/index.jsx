import React, { useState, useEffect } from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { baseURL } from "../../Utils/api";
import { LoginApi } from "../../Utils/ApiPath";
import axios from "axios";
import useAuth from "../../Utils/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const { updateAuth, user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${LoginApi}`, values);
      if (res.status == 200 || res.status == 201) {
        let token = null;
        let user = null;
        if (res.data) {
          token = res.data.token;
        }
        if (token) {
          user = {
            nom: res.data.nom,
            prenom: res.data.prenom,
            email: res.data.email,
          };
        }
        updateAuth(token, user);
        setLoading(false);
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Entrez une adresse e-mail valide!",
      label: "Email",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Entrer votre password",
      label: "Password",
      required: true,
    },
  ];

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <div className="form-header">
          <p className="title">Connexion</p>
          <p className="description">
            Veuillez entrer vos coordonnées pour vous identifier.
          </p>
        </div>
        <div className="form-body">
          <form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button className="button mt-8" role="button" disabled={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </button>
          </form>
        </div>
        <p className="form-footer">
          <span>Vous n'avez pas de compte ? </span>
          <Link to={"/register"} className="h-text">
            S'inscrire
          </Link>
        </p>
      </div>
    </div>
  );
}
