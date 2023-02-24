import { Box, Dialog, Typography } from "@mui/material";
import Button from "../button";
import Layout from "../layout";

type VotesContinueProps = {
  open: boolean;
  title: string;
  color?: "pink" | "green" | "lightPink" | "grey" | "brown";
  onClose: () => void;
  onContinue: () => void;
};

export default function VotesContinue({
  open,
  title,
  color = "pink",
  onClose,
  onContinue,
}: VotesContinueProps) {
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Layout colorBackground={color}>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>{title}</Typography>
          <Typography sx={styles.subtitle}>{`Se ha registrado tu voto para la
          elección de ${title.toLocaleLowerCase()}`}</Typography>
          <Button variant="contained" onClick={onContinue}>
            <Typography sx={styles.buttonTitle}>Siguiente Votación</Typography>
          </Button>
        </Box>
      </Layout>
    </Dialog>
  );
}

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 70,
    fontWeight: 500,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 400,
    textAlign: "center",
    paddingX: 30,
  },
  buttonTitle: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold",
  },
};
