import React, { CSSProperties, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { Box, CircularProgress, SxProps, Typography } from "@mui/material";
import Layout from "@/components/layout";

import VotesList from "@/components/votes/List";
import VotesSelected from "@/components/votes/Selected";
import VotesContinue from "@/components/votes/Continue";
import { Representative } from "@/types/representative";
import { fetchFederalRepresentative, fetchRegisterVote } from "@/api/vote";
import {
  addOthersRepresentative,
  cleanNameRepresentative,
} from "@/utils/representative";
import useStore from "@/store/useStore";
import { ROUTES } from "@/constants/routes";

const REPRESENTATIVE_TYPE = "Diputados Federales";
const REPRESENTATIVE_COLOR = "green";
export default function RepresentativeFederal() {
  const router = useRouter();
  const user = useStore((state) => state.user);
  const voter = useStore((state) => state.voter);

  const [loading, setLoading] = useState(false);
  const [isContinue, setIsContinue] = useState(false);

  const [representatives, setRepresentatives] = useState<Representative[]>([]);
  const [representativeSelected, setRepresentativeSelected] =
    useState<Representative>({} as Representative);

  const handleSelectedRepresentative = (representative) => {
    setRepresentativeSelected(representative);
  };

  const handleCancelSelectedRepresentative = () => {
    setRepresentativeSelected({} as Representative);
  };

  const handleConfirmSelectedRepresentative = async (
    localRepresentative?: string
  ) => {
    setRepresentativeSelected({} as Representative);
    const isValidVote = Boolean(
      String(user[0]?.id).length > 0 &&
        REPRESENTATIVE_TYPE.length > 0 &&
        String(representativeSelected.id).length > 0
    );

    const vote: {
      id: string;
      voter_id: string;
      representative_id: string;
      representative_type: string;
    } = {
      id: String(user[0]?.id),
      voter_id: String(voter[0]?.id),
      representative_id: representativeSelected.id,
      representative_type:
        localRepresentative?.length > 0
          ? cleanNameRepresentative(
              `${cleanNameRepresentative(
                REPRESENTATIVE_TYPE
              )}-${localRepresentative}`
            )
          : cleanNameRepresentative(REPRESENTATIVE_TYPE),
    };

    if (isValidVote) {
      try {
        await fetchRegisterVote(vote);
        setIsContinue(true);
      } catch (err) {
        alert(err.response?.data.message || "Error al guardar el voto");
      }
    } else {
      alert("Error al guardar el voto");
    }
  };

  const handleContinue = () => {
    setIsContinue(false);
    router.push(ROUTES.VOTER_HOME);
  };

  const onLoadRepresentatives = async () => {
    setLoading(true);
    try {
      const representatives = await fetchFederalRepresentative();
      const list = addOthersRepresentative(representatives);
      setRepresentatives(list);
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
          <Typography variant="h4">Cargando diputados federales...</Typography>
          <CircularProgress color="secondary" sx={{ my: 2 }} />
        </Box>
      </Layout>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Diputados Federales</title>
      </Head>
      <Layout colorBackground={REPRESENTATIVE_COLOR}>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>{REPRESENTATIVE_TYPE}</Typography>
          <Typography textAlign="center" variant="h3">
            Elección de Representante
          </Typography>
          <Box sx={styles.list}>
            <VotesList
              color={REPRESENTATIVE_COLOR}
              deputies={representatives}
              onSelected={handleSelectedRepresentative}
            />
            <VotesSelected
              title={REPRESENTATIVE_TYPE}
              color={REPRESENTATIVE_COLOR}
              deputySelected={representativeSelected}
              open={Object.keys(representativeSelected).length > 0}
              onClose={handleCancelSelectedRepresentative}
              onContinue={handleConfirmSelectedRepresentative}
            />
            <VotesContinue
              title={REPRESENTATIVE_TYPE}
              color={REPRESENTATIVE_COLOR}
              open={isContinue}
              onClose={handleContinue}
              onContinue={handleContinue}
            />
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
};
