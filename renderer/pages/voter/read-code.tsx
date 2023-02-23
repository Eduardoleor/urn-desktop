import React, { CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, Stack, SxProps, Typography } from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import EastIcon from "@mui/icons-material/East";

import Layout from "@/components/layout";
import Button from "@/components/button";

import { ROUTES } from "@/constants/routes";

export default function ReadCode() {
  const router = useRouter();

  const handleContinue = () => {
    router.push(ROUTES.VOTER_HOME);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Lectura de QR</title>
      </Head>
      <Layout>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>
            Escanea el código en el lector
          </Typography>
          <Box sx={styles.form}>
            <Stack direction="row" spacing={2} mb={2}>
              <QrCode2Icon
                sx={{ fontSize: 250, border: "5px solid rgba(0,0,0,0.4)" }}
              />
              <EastIcon sx={{ fontSize: 250, color: "GrayText" }} />
            </Stack>
            <Button variant="outlined" onClick={handleContinue}>
              <Typography sx={styles.buttonTextOutline}>
                Reintentar escaneo
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
