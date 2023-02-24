import React, { CSSProperties, useEffect, useRef, useState } from "react";
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
import LogOutIllustration from "@/components/illustrations/logout.svg";

import { ROUTES } from "@/constants/routes";
import useStore from "@/store/useStore";
import { fetchCountVote } from "@/api/vote";
import ReactToPrint from "react-to-print";

export default function PresidentVerifyVotes() {
  const router = useRouter();
  let componentRef: any = useRef();

  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  const user = useStore((state) => state.user);
  const removeAllUsers = useStore((state) => state.removeAllUsers);

  const handleLogout = () => {
    removeAllUsers();
    router.push(ROUTES.SING_IN);
  };

  const handleBack = () => {
    router.back();
  };

  const handleDownload = () => {};

  const obtainTotalVotes = async () => {
    setLoading(true);
    try {
      const total = await fetchCountVote(user[0]?.id);
      setTotalVotes(total);
    } catch (err) {
      alert(err.response?.data.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtainTotalVotes();
  }, []);

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
            <Box ref={(el) => (componentRef = el)}>
              <Stack direction="row" justifyContent="space-between" spacing={2}>
                {user.length > 0 && (
                  <Typography fontWeight="bold">
                    {user[0]?.name?.toUpperCase()}
                  </Typography>
                )}
                <Typography>
                  {new Date().toLocaleDateString("es-MX", {
                    timeZone: "America/Mexico_City",
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    timeZoneName: "short",
                  })}
                </Typography>
              </Stack>
              <Typography sx={styles.subtitle}>
                La urna contiene: {totalVotes} votos
              </Typography>
            </Box>
            {!loading && (
              <Stack direction="row" spacing={2}>
                <Button variant="outlined" onClick={handleDownload}>
                  <Typography style={styles.buttonTextOutline as any}>
                    Descargar listado
                  </Typography>
                </Button>
                <ReactToPrint
                  content={() => componentRef}
                  trigger={() => (
                    <Button variant="contained">
                      <Typography style={styles.buttonText as any}>
                        Imprimir
                      </Typography>
                    </Button>
                  )}
                />
              </Stack>
            )}
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
