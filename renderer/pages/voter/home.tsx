import React, { CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, SxProps, Typography } from "@mui/material";

import Layout from "@/components/layout";
import Button from "@/components/button";

import { Vote } from "@/types/votes";
import { ROUTES } from "@/constants/routes";
import useStore from "@/store/useStore";

export default function VoterHome() {
  const router = useRouter();

  const removeAllVoters = useStore((state) => state.removeAllVoters);
  const removeAllVoterSteps = useStore((state) => state.removeAllVoterSteps);

  const voterStep = useStore((state) => state.voterStep);

  const isFirstStepCompleted = voterStep.includes("1");
  const isSecondStepCompleted = voterStep.includes("2");
  const isThirdStepCompleted = voterStep.includes("3");

  const handleType = (type: Vote) => {
    switch (type) {
      case "representative":
        if (!isFirstStepCompleted) {
          router.push(ROUTES.REPRESENTATIVE_FEDERAL);
        } else {
          alert("Ya has realizado esta elección");
        }
        break;
      case "committee":
        if (!isSecondStepCompleted) {
          router.push(ROUTES.REPRESENTATIVE_LOCAL);
        } else {
          alert("Ya has realizado esta elección");
        }
        break;
      case "associations":
        if (!isThirdStepCompleted) {
          router.push(ROUTES.REPRESENTATIVE_GOV);
        } else {
          alert("Ya has realizado esta elección");
        }
        break;
    }
  };

  const handleContinue = () => {
    if (isFirstStepCompleted && isSecondStepCompleted && isThirdStepCompleted) {
      removeAllVoters();
      removeAllVoterSteps();
      router.push(ROUTES.VOTER_READ_CODE);
    } else {
      alert("Debes completar todas las elecciones");
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Lectura de QR</title>
      </Head>
      <Layout>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>Menú de configuración</Typography>
          <Box sx={styles.form}>
            <Typography sx={styles.subtitle}>
              Selecciona qué tipo de elección deseas:
            </Typography>
            <Button
              variant={isFirstStepCompleted ? "contained" : "outlined"}
              onClick={() => handleType("representative")}
            >
              <Typography
                sx={
                  isFirstStepCompleted
                    ? styles.buttonText
                    : styles.buttonTextOutline
                }
              >
                Elección de Representantes (Ej. 1)
              </Typography>
            </Button>
            <Button
              variant={isSecondStepCompleted ? "contained" : "outlined"}
              onClick={() => handleType("committee")}
            >
              <Typography
                sx={
                  isSecondStepCompleted
                    ? styles.buttonText
                    : styles.buttonTextOutline
                }
              >
                Elección de Comité (Ej. 2)
              </Typography>
            </Button>
            <Button
              variant={isThirdStepCompleted ? "contained" : "outlined"}
              onClick={() => handleType("associations")}
            >
              <Typography
                sx={
                  isThirdStepCompleted
                    ? styles.buttonText
                    : styles.buttonTextOutline
                }
              >
                Asociaciones (Ej. 3)
              </Typography>
            </Button>
          </Box>
          <Box sx={styles.button}>
            <Button
              variant={
                isFirstStepCompleted &&
                isSecondStepCompleted &&
                isThirdStepCompleted
                  ? "outlined"
                  : "contained"
              }
              onClick={handleContinue}
            >
              <Typography
                sx={
                  isFirstStepCompleted &&
                  isSecondStepCompleted &&
                  isThirdStepCompleted
                    ? styles.buttonTextOutline
                    : styles.buttonText
                }
              >
                Finalizar
              </Typography>
            </Button>
          </Box>
        </Box>
      </Layout>
    </React.Fragment>
  );
}

const styles: Record<string, CSSProperties | SxProps> = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    color: "#000000",
    fontSize: "70px",
    fontWeight: "400",
    marginBottom: "50px",
    textAlign: "center",
  },
  subtitle: {
    color: "#000000",
    fontSize: "40px",
  },
  form: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    padding: "30px",
    gap: "50px",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9E9E9",
    borderRadius: "20px",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "30px",
  },
  buttonTextOutline: {
    color: "#000000",
    fontSize: "20px",
    fontWeight: "700",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: "700",
  },
};
