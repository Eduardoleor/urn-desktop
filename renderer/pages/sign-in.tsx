import React, { CSSProperties, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, SxProps, Typography, TextField, Stack } from "@mui/material";

import Layout from "@/components/layout";
import Button from "@/components/button";
import { ROUTES } from "@/constants/routes";

export default function SignIn() {
  const router = useRouter();

  const [form, setForm] = useState({
    user: "",
    password: "",
  });

  const handleSignIn = () => {
    router.push(ROUTES.VERIFY_VOTES);
  };

  return (
    <React.Fragment>
      <Head>
        <title>Inicio de sesión</title>
      </Head>
      <Layout orientationBackground="topBottom">
        <Box sx={styles.container}>
          <Typography sx={styles.title}>Inicio de sesión</Typography>
          <Box sx={styles.form}>
            <Stack direction="row" spacing={13.5} alignItems="center">
              <Typography sx={styles.subtitle}>Usuario:</Typography>
              <TextField
                fullWidth
                value={form.user}
                id="user-input"
                label="Escribe aquí"
                variant="outlined"
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography sx={styles.subtitle}>Contraseña:</Typography>
              <TextField
                fullWidth
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                type="password"
                id="password-input"
                label="Escribe aquí"
                variant="outlined"
              />
            </Stack>
          </Box>
          <Box sx={styles.button}>
            <Button onClick={handleSignIn}>
              <Typography style={styles.buttonText as any}>Ingresar</Typography>
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
  },
  button: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "50px",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: "35px",
    fontWeight: "700",
  },
};
