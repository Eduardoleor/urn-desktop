import React, { CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, SxProps, Typography, Stack } from "@mui/material";

import Layout from "@/components/layout";
import Button from "@/components/button";
import { ROUTES } from "@/constants/routes";

export default function PresidentHome() {
  const router = useRouter();

  const handleContinue = () => {};

  const handleReview = () => {
    router.push(ROUTES.PRESIDENT_VERIFY_VOTES);
  };

  return (
    <Layout>
      <Head>
        <title>Inicio | Presidente</title>
      </Head>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>¡Bienvenido, presidente!</Typography>
        <Box sx={styles.form}>
          <Typography sx={styles.subtitle}>Inicio de la votación</Typography>
          <Stack direction="row" spacing={2} my={3}>
            <Button variant="outlined" onClick={handleReview}>
              <Typography sx={styles.buttonTextOutline}>
                Revisión de votos
              </Typography>
            </Button>
            <Button variant="contained" onClick={handleContinue}>
              <Typography sx={styles.buttonText}>Empezar votación</Typography>
            </Button>
          </Stack>
        </Box>
      </Box>
    </Layout>
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
};
