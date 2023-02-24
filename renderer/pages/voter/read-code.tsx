import React, {
  CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import {
  Box,
  CircularProgress,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import EastIcon from "@mui/icons-material/East";

import Layout from "@/components/layout";
import Button from "@/components/button";

import { ROUTES } from "@/constants/routes";
import { CODE_VERIFY_LENGTH, COUNT_TIMER } from "@/constants/vote";
import { fetchRegisterVoter } from "@/api/vote";
import useStore from "@/store/useStore";

export default function ReadCode() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const [code, setCode] = useState<string | null>("123456789");
  const [counter, setCounter] = useState(COUNT_TIMER);
  const [loading, setLoading] = useState(false);

  const user = useStore((state) => state.user);
  const addVoter = useStore((state) => state.addVoter);

  const countTimer = useMemo(() => {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }, [counter]);

  const onVerifyCode = async () => {
    setLoading(true);
    try {
      const voter = await fetchRegisterVoter(String(user[0]?.id), code);
      addVoter(voter);
      router.push(ROUTES.VOTER_HOME);
    } catch (err) {
      alert(err.response?.data.message || "Error al iniciar votación");
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    router.push(ROUTES.VOTER_HOME);
  };

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(Number(timer));
  }, [counter]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (code.length >= CODE_VERIFY_LENGTH) {
      setCode("");
      onVerifyCode();
    }
  }, [code]);

  return (
    <React.Fragment>
      <Head>
        <title>Lectura de QR</title>
      </Head>
      <Layout orientationBackground="topBottom">
        <Box sx={styles.container} onClick={() => inputRef.current?.focus()}>
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
            {!loading && (
              <>
                {counter === 0 ? (
                  <Button variant="outlined" onClick={handleRetry}>
                    <Typography sx={styles.buttonTextOutline}>
                      Reintentar escaneo
                    </Typography>
                  </Button>
                ) : (
                  <>
                    <CircularProgress color="secondary" />
                    <Typography sx={styles.subtitle}>{countTimer}</Typography>
                  </>
                )}
              </>
            )}
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              ref={inputRef}
              style={{ width: 0, height: 0, border: "none" }}
            />
            {loading && <CircularProgress color="secondary" />}
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
    marginX: 25,
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
