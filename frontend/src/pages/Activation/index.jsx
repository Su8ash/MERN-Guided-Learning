import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../../server";

const ActivationPage = () => {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (activation_token) {
            const sendRequest = async () => {
                await axios
                    .post(`${server}/user/activation`, {
                        activation_token,
                    })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((err) => {
                        setError(true);
                        setErrorMsg(err.response.data.message)
                        console.log(err);
                    });
            };
            sendRequest();
        }
    }, [activation_token]);

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {error ? (
                <p>Your token is expired! - {errorMsg}</p>
            ) : (
                <p>Your account has been created suceessfully!</p>
            )}
        </div>
    );
};

export default ActivationPage;