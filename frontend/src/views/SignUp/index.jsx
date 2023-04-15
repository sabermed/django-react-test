import React, { useState, useEffect } from "react";
import "../../styles/auth.css";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { baseURL } from "../../Utils/api";
import { RegisterApi } from "../../Utils/ApiPath";
import useAuth from "../../Utils/useAuth";
import axios from "axios";
const validationToken = import.meta.env.VITE_SIGNUP_TOKEN;

export default function SignUp() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [values, setValues] = useState({
    token: validationToken,
    nom: "",
    prenom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    try {
      setLoading(true);
      const res = await axios.post(`${baseURL}/${RegisterApi}`, values);
      if (res.status == 200 || res.status == 201) {
        navigate("/login");
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
      name: "nom",
      type: "text",
      placeholder: "Nom",
      errorMessage: "Nom doit comporter entre 3 et 16 caractères.",
      label: "Nom",
      pattern: "[^.*]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "prenom",
      type: "text",
      placeholder: "Prenom",
      errorMessage: "Prenom doit comporter entre 3 et 16 caractères.",
      label: "Prenom",
      pattern: "[^.*]{3,16}$",
      required: true,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Entrez une adresse e-mail valide!",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password doit être au moins 6 caractères.",
      label: "Password",
      pattern: `[^.*]{6,}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Password ne correspondent pas!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form-container">
        <div className="form-header">
          <p className="title">Inscription</p>
          <p className="description">Veuillez saisir vos coordonnées.</p>
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
              {isLoading ? "Loading..." : "Inscrire"}
            </button>
          </form>
        </div>
        <p className="form-footer">
          <span>Vous avez déjà un compte? </span>
          <Link to={"/login"} className="h-text">
            S'identifier
          </Link>
        </p>
      </div>
    </div>
  );
}
