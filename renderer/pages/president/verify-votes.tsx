import React, { CSSProperties } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Box,
  SxProps,
  Typography,
  Stack,
  Button as ButtonIcon,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Layout from "@/components/layout";
import Button from "@/components/button";

import PrinterIllustration from "@/components/illustrations/printer.svg";

export default function PresidentVerifyVotes() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleDownload = () => {};

  const handlePrint = () => {};

  return (
    <React.Fragment>
      <Head>
        <title>Impresión de Votos</title>
      </Head>
      <Layout>
        <Box sx={styles.container}>
          <ButtonIcon
            variant="text"
            color="secondary"
            startIcon={<ArrowBackIosIcon />}
            sx={{
              width: "100px",
              marginLeft: "120px",
              marginBottom: "20px",
            }}
            onClick={handleBack}
          >
            Regresar
          </ButtonIcon>
          <Typography sx={styles.title}>Impresión de votos</Typography>
          <Box sx={styles.form}>
            <PrinterIllustration />
            <Typography sx={styles.subtitle}>
              La urna contiene: 0 votos
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button variant="outlined" onClick={handleDownload}>
                <Typography style={styles.buttonTextOutline as any}>
                  Descargar listado
                </Typography>
              </Button>
              <Button variant="contained" onClick={handlePrint}>
                <Typography style={styles.buttonText as any}>
                  Imprimir
                </Typography>
              </Button>
            </Stack>
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
};
