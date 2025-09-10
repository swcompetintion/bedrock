import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const ClientSideIDTokenFlow = () => {
  const handleLoginSuccess = async (credentialResponse: any) => {
    const idToken = credentialResponse.credential;

    const res = await fetch("http://localhost:8000/auths/google-verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id_token: idToken }),
    });
    const data = await res.json();
    console.log("Server response: ", data);
  };

  return (
    <GoogleOAuthProvider clientId="818064127728-34agr6511gtk4gtgdfec0phqskkkptju.apps.googleusercontent.com">
      <div>
        <h1>ClientSide IDToken Flow</h1>
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => {
            console.log("Login Failed");
          }}
        />
      </div>
    </GoogleOAuthProvider>
  );
};

const AuthorizationCodeFlow = () => {
  return (
    <div>
      <h1>Authorization Code Flow</h1>
      <p>Implement the Authorization Code Flow here.</p>
    </div>
  );
};

export default ClientSideIDTokenFlow;
