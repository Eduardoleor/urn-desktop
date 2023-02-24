import React, { CSSProperties, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Box,
  SxProps,
  Typography,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Layout from "@/components/layout";
import Button from "@/components/button";

import { ROUTES } from "@/constants/routes";
import { fetchSignIn } from "@/api/auth";
import useStore from "@/store/useStore";
import { UserStore } from "@/store/types/IUser";

export default function SignIn() {
  const router = useRouter();
  const addUser = useStore((state) => state.addUser);

  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    user: "president",
    password: "M0nd4y$44",
  });

  const handleSignIn = async () => {
    if (Object.values(form).some((value) => value === "")) {
      return alert("Todos los campos son obligatorios");
    }
    try {
      const user: UserStore = await fetchSignIn(form.user, form.password);
      if (user.active) {
        addUser(user);
        router.push(ROUTES.VERIFY_VOTES);
      } else {
        alert("Usuario inactivo");
      }
    } catch (err) {
      alert(err.response?.data.message || "Error al iniciar sesión");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
                color="secondary"
                value={form.user}
                id="user-input"
                label="Escribe aquí"
                variant="outlined"
                onChange={(e) => setForm({ ...form, user: e.target.value })}
              />
            </Stack>
            <Stack direction="row" spacing={5} alignItems="center">
              <Typography sx={styles.subtitle}>Contraseña:</Typography>
              <FormControl variant="outlined" fullWidth color="secondary">
                <InputLabel htmlFor="outlined-adornment-password">
                  Escribe aquí
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </FormControl>
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
