import React, { CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, SxProps, Typography } from "@mui/material";

import Layout from "@/components/layout";
import Button from "@/components/button";

import { Vote } from "@/types/votes";
import { ROUTES } from "@/constants/routes";

export default function VoterHome() {
  const router = useRouter();

  const handleType = (type: Vote) => {
    switch (type) {
      case "representative":
        router.push(ROUTES.REPRESENTATIVE_FEDERAL);
        break;
      case "committee":
        router.push(ROUTES.REPRESENTATIVE_LOCAL);
        break;
      case "associations":
        break;
    }
  };

  const handleContinue = () => {};

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
              variant="outlined"
              onClick={() => handleType("representative")}
            >
              <Typography sx={styles.buttonTextOutline}>
                Elección de Representantes (Ej. 1)
              </Typography>
            </Button>
            <Button variant="outlined" onClick={() => handleType("committee")}>
              <Typography sx={styles.buttonTextOutline}>
                Elección de Comité (Ej. 2)
              </Typography>
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleType("associations")}
            >
              <Typography sx={styles.buttonTextOutline}>
                Asociaciones (Ej. 3)
              </Typography>
            </Button>
          </Box>
          <Box sx={styles.button}>
            <Button onClick={handleContinue}>
              <Typography sx={styles.buttonText}>Finalizar</Typography>
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
    fontSize: "35px",
    fontWeight: "700",
  },
};
