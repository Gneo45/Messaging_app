import React, { useState } from "react";
import Cookies from "universal-cookie";
import axios from "axios";

import signinImage from "../assets/signup.jpg";

const cookies = new Cookies();

const initialState = {

    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState)
  const [isSignup, setIsSignup] = useState(true);

  const handleChange = (e) => {
      setForm({...form, [e.target.name]: e.target.value })
      
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const {  username, password, phoneNumber, avatarURL} = form;

      const URL = 'https://gn-pager.herokuapp.com/auth';

      const { data: { token , userId, hashedPassword, fullName} } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
        username, password, fullName: form.fullName, phoneNumber, avatarURL,
      });

      cookies.set('token', token);
      cookies.set('username', username);
      cookies.set('fullName', fullName);
      cookies.set('userId', userId);

      if(isSignup){
        cookies.set('phoneNumber', phoneNumber);
        cookies.set('avatarURL', avatarURL);
        cookies.set('hashedPassword', hashedPassword);
      }

      window.location.reload();
  }

  const switchMode = () => {
      setIsSignup((prevIsSignup) => !prevIsSignup)
  }

  return (
    <div className="auth__form-container">
      <div className="auth__form-container_fields">
        <div className="auth__form-container_fields-content">
          <p>{isSignup ? "S'inscrire" : "S'identifier"}</p>
          <form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="fullName">Nom</label>
                <input
                  name="fullName"
                  type="text"
                  placeholder="Nom"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="username">Pseudo</label>
              <input
                name="username"
                type="text"
                placeholder="Pseudo"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="phoneNumber">Téléphone</label>
                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="Téléphone"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="avatarURL">Avatar URL</label>
                <input
                  type="text"
                  name="avatarURL"
                  placeholder="Avatar URL"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_input">
              <label htmlFor="password">Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Mot de passe"
                onChange={handleChange}
                required
              />
            </div>
            {isSignup && (
              <div className="auth__form-container_fields-content_input">
                <label htmlFor="confirmPassword">Confirmer le Mot de Passe</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirmer le Mot de Passe"
                  onChange={handleChange}
                  required
                />
              </div>
            )}
            <div className="auth__form-container_fields-content_button">
                <button>{isSignup? "S'inscrire" : "S'identifier"}</button>
            </div>
          </form>
          <div className="auth__form-container_fields-account">
              <p>
                  {isSignup 
                  ? "Déjà inscrit? - "
                  : "Pas encore inscrit? - "
                }

                <span onClick={switchMode}>
                    {isSignup ?  "S'identifier" :"S'inscrire"}
                </span>
              </p>
          </div>
        </div>
      </div>
      <div className="auth__form-container_image">
          <img src={signinImage} alt="sign in" />
      </div>
    </div>
  );
};

export default Auth;
