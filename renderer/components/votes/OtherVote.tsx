import { Box, TextField, Typography } from "@mui/material";

type OtherVoteProps = {
  type: "null" | "other";
};

export default function OtherVote({ type }: OtherVoteProps) {
  if (type === "other") {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box sx={styles.container}>
          <Typography sx={styles.titleOther}>
            Si DESEA VOTAR POR ALGÚN CANDIDATO NO REGISTRADO, ESCRIBA EN ESTE
            RECUADRO EL NOMBRE COMPLETO
          </Typography>
          <TextField fullWidth placeholder="Escribe aquí" sx={styles.input} />
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box sx={styles.container}>
        <Typography sx={styles.titleNull}>VOTO NULO</Typography>
      </Box>
    </Box>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleNull: {
    fontSize: 30,
    fontWeight: 900,
    padding: "50px 0px",
  },
  titleOther: {
    fontSize: 15,
    fontWeight: 700,
    textAlign: "center",
    padding: "10px 0px",
  },
  input: {
    padding: "10px 0px",
  },
};
