import React, { CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, SxProps, Typography } from "@mui/material";

import Layout from "@/components/layout";
import Button from "@/components/button";

import PrinterIllustration from "@/components/illustrations/printer.svg";
import LogOutIllustration from "@/components/illustrations/logout.svg";

import { ROUTES } from "@/constants/routes";

export default function VerifyVotes() {
  const router = useRouter();

  const handleLogout = () => {};

  const handleContinue = () => {
    router.push(ROUTES.PRESIDENT_HOME);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Impresión de Votos</title>
      </Head>
      <Layout>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>Impresión de votos</Typography>
          <Box sx={styles.form}>
            <PrinterIllustration />
            <Typography sx={styles.subtitle}>
              La urna contiene: 0 votos
            </Typography>
            <Button variant="outlined">
              <Typography style={styles.buttonTextOutline as any}>
                Imprimir votos
              </Typography>
            </Button>
            <Button variant="contained" onClick={handleContinue}>
              <Typography style={styles.buttonText as any}>
                Continuar
              </Typography>
            </Button>
          </Box>
          <Box sx={styles.containerLogout} onClick={handleLogout}>
            <LogOutIllustration />
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
    padding: "0 20%",
    gap: "30px",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  buttonTextOutline: {
    color: "#000000",
    fontSize: "35px",
    fontWeight: "700",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: "35px",
    fontWeight: "700",
  },
  containerLogout: {
    display: "flex",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: "20px",
    right: "20px",
    "&:hover": {
      cursor: "pointer",
    },
  },
};
