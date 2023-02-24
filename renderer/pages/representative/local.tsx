import React, { CSSProperties, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, CircularProgress, SxProps, Typography } from "@mui/material";
import Layout from "@/components/layout";

import VotesList from "@/components/votes/List";
import VotesContinue from "@/components/votes/Continue";
import { Representative } from "@/types/representative";
import { fetchLocalRepresentative, fetchRegisterVote } from "@/api/vote";
import { cleanNameRepresentative } from "@/utils/representative";
import useStore from "@/store/useStore";
import { ROUTES } from "@/constants/routes";
import Button from "@/components/button";

const REPRESENTATIVE_TYPE = "Diputados Locales";
const REPRESENTATIVE_COLOR = "lightPink";
const MAX_SELECTED = 3;
export default function RepresentativeLocal() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const voter = useStore((state) => state.voter);
  const addVoterStep = useStore((state) => state.addVoterStep);

  const [isContinue, setIsContinue] = useState(false);
  const [loading, setLoading] = useState(false);

  const [votesSelected, setVotesSelected] = useState<string[]>([]);
  const [votesSelectedRepresentatives, setVotesSelectedRepresentatives] =
    useState<Representative[]>([]);
  const [representatives, setRepresentatives] = useState<Representative[]>([]);

  const handleConfirmSelectedRepresentative = async (representative) => {
    setVotesSelected((prev) => {
      const isAlreadySelected = prev.includes(representative.id);
      if (isAlreadySelected) {
        return prev.filter((id) => id !== representative.id);
      }
      return [...prev, representative.id];
    });
    setVotesSelectedRepresentatives((prev) => {
      const isAlreadySelected = prev.find(
        (rep) => rep.id === representative.id
      );
      if (isAlreadySelected) {
        return prev.filter((rep) => rep.id !== representative.id);
      }
      return [...prev, representative];
    });
  };

  const handleContinue = async () => {
    if (
      votesSelectedRepresentatives.length > MAX_SELECTED ||
      votesSelectedRepresentatives.length < MAX_SELECTED
    ) {
      alert("Debes seleccionar 3 diputados");
      return;
    } else {
      for (let i = 0; i < votesSelectedRepresentatives.length; i++) {
        const isValidVote = Boolean(
          String(user[0]?.id).length > 0 &&
            REPRESENTATIVE_TYPE.length > 0 &&
            String(votesSelectedRepresentatives[i].id).length > 0
        );

        const vote: {
          id: string;
          voter_id: string;
          representative_id: string;
          representative_type: string;
        } = {
          id: String(user[0]?.id),
          voter_id: String(voter[0]?.id),
          representative_id: votesSelectedRepresentatives[i].id,
          representative_type: cleanNameRepresentative(REPRESENTATIVE_TYPE),
        };

        if (isValidVote) {
          try {
            await fetchRegisterVote(vote);
          } catch (err) {
            alert(err.response?.data.message || "Error al guardar el voto");
          }
        } else {
          alert("Error al guardar el voto");
        }
      }
      setIsContinue(true);
    }
  };

  const handleNext = () => {
    addVoterStep("2");
    router.push(ROUTES.VOTER_HOME);
  };

  const onLoadRepresentatives = async () => {
    setLoading(true);
    try {
      const representatives = await fetchLocalRepresentative();
      setRepresentatives(representatives);
    } catch (err) {
      alert(err.response?.data.message || "Error al obtener los diputados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onLoadRepresentatives();
  }, []);

  if (loading) {
    return (
      <Layout colorBackground={REPRESENTATIVE_COLOR}>
        <Box sx={styles.containerLoading}>
          <Typography variant="h4">Cargando diputados locales...</Typography>
          <CircularProgress color="secondary" sx={{ my: 2 }} />
        </Box>
      </Layout>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Diputados Locales</title>
      </Head>
      <Layout colorBackground={REPRESENTATIVE_COLOR}>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>{REPRESENTATIVE_TYPE}</Typography>
          <Typography textAlign="center" variant="h3">
            Elección de Comité
          </Typography>
          <Box sx={styles.list}>
            <VotesList
              color={REPRESENTATIVE_COLOR}
              deputies={representatives}
              votesSelected={votesSelected}
              onSelected={handleConfirmSelectedRepresentative}
            />
            <VotesContinue
              title={REPRESENTATIVE_TYPE}
              color={REPRESENTATIVE_COLOR}
              open={isContinue}
              onClose={handleNext}
              onContinue={handleNext}
            />
            <Box sx={styles.button}>
              <Button onClick={handleContinue}>
                <Typography sx={styles.buttonText}>Siguiente</Typography>
              </Button>
            </Box>
          </Box>
        </Box>
      </Layout>
    </React.Fragment>
  );
}

const styles: Record<string, CSSProperties | SxProps> = {
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",
  },
  containerLoading: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 70,
    color: "#000000",
    textAlign: "center",
    fontWeight: 400,
    flex: 1,
    marginTop: 20,
  },
  list: {
    flex: 1,
    margin: "0px 20px",
  },
  button: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginY: 5,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
};
