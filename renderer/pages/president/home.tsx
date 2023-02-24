import React, { CSSProperties, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, SxProps, Typography, Stack } from "@mui/material";

import Layout from "@/components/layout";
import Button from "@/components/button";

import LogOutIllustration from "@/components/illustrations/logout.svg";

import { ROUTES } from "@/constants/routes";
import useStore from "@/store/useStore";
import { fetchCountVote } from "@/api/vote";

export default function PresidentHome() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [totalVotes, setTotalVotes] = useState(0);

  const user = useStore((state) => state.user);

  const handleLogout = () => {};

  const handleContinue = () => {
    if (totalVotes > 0) {
      alert("Esta urna ya contiene votos y fue cerrada.");
    } else {
      router.push(ROUTES.VOTER_READ_CODE);
    }
  };

  const handleReview = () => {
    router.push(ROUTES.PRESIDENT_VERIFY_VOTES);
  };

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
    <Layout>
      <Head>
        <title>Inicio | Presidente</title>
      </Head>
      <Box sx={styles.container}>
        <Typography sx={styles.title}>¡Bienvenido, presidente!</Typography>
        <Box sx={styles.form}>
          <Typography sx={styles.subtitle}>Inicio de la votación</Typography>
          {!loading && (
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
          )}
        </Box>
        <Box sx={styles.containerLogout} onClick={handleLogout}>
          <LogOutIllustration />
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
