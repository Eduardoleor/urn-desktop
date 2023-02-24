import { NULL_VOTE, OTHER_VOTE } from "@/constants/representative";
import { Representative } from "@/types/representative";
import { Box, Dialog, TextField, Typography } from "@mui/material";
import { useState } from "react";
import Button from "../button";
import Layout from "../layout";
import Vote from "./Vote";

type VotesSelectedProps = {
  open: boolean;
  title: string;
  color?: "pink" | "green" | "lightPink" | "grey" | "brown";
  deputySelected: Representative;
  onClose: () => void;
  onContinue: (representative?: string) => void;
};

const VotesSelected = ({
  open,
  deputySelected,
  title,
  color,
  onClose,
  onContinue,
}: VotesSelectedProps) => {
  const [representative, setRepresentative] = useState<Representative>(
    {} as Representative
  );

  const bgColor =
    color === "green"
      ? "#BBB070"
      : color === "lightPink"
      ? "#CE9A96"
      : color === "grey"
      ? "#B9AEA8"
      : color === "brown"
      ? "#573E37"
      : "#CE9A96";
  const isNullVote = deputySelected.id === NULL_VOTE;
  const isOtherVote = deputySelected.id === OTHER_VOTE;

  const handleContinue = () => {
    if (isOtherVote) {
      if (representative.name?.length > 0) {
        onContinue(representative.name);
      } else {
        alert("Debes ingresar el nombre del candidato");
      }
    } else {
      onContinue();
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      aria-labelledby="votes-dialog-selected"
      aria-describedby="votes-dialog-selected-description"
    >
      <Layout colorBackground={color}>
        <Box sx={styles.container}>
          <Typography sx={styles.title}>{title}</Typography>
          <Typography sx={styles.subtitle}>
            ¿Este es el voto que has seleccionado?
          </Typography>
          <Box
            sx={{
              ...styles.box,
              border: `6px solid ${bgColor}`,
              background:
                !isOtherVote &&
                `linear-gradient(to top left, rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 5px), ${bgColor} 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%), linear-gradient(to top right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) calc(50% - 5px), ${bgColor} 50%, rgba(0,0,0,0) calc(50% + 0.8px), rgba(0,0,0,0) 100%)`,
            }}
          >
            {isNullVote && (
              <Typography sx={styles.titleVoteNull}>Voto nulo</Typography>
            )}
            {isOtherVote && (
              <>
                <Typography sx={styles.titleOther}>
                  SI DESEA VOTAR POR ALGÚN CANDIDATO NO REGISTRADO, ESCRIBA EN
                  ESTE RECUADRO EL NOMBRE COMPLETO
                </Typography>
                <TextField
                  placeholder="Escribe aquí"
                  value={representative.name}
                  onChange={(e) =>
                    setRepresentative({
                      ...representative,
                      name: e.target.value,
                    })
                  }
                />
              </>
            )}
            {!isNullVote && !isOtherVote && (
              <>
                <Typography sx={styles.titleBox}>
                  {deputySelected.name}
                </Typography>
                <Vote
                  owner={deputySelected.owner}
                  alternate={deputySelected.substitute}
                  image_path={deputySelected.image}
                />
              </>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            width={0.5}
            px={2}
            gap={2}
          >
            <Button variant="outlined" onClick={onClose}>
              <Typography variant="h5" color="#000" fontWeight={700}>
                No
              </Typography>
            </Button>
            <Button variant="contained" onClick={handleContinue}>
              <Typography variant="h5" color="#FFF" fontWeight={700}>
                Sí
              </Typography>
            </Button>
          </Box>
        </Box>
      </Layout>
    </Dialog>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 70,
    fontWeight: 400,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 400,
    textAlign: "center",
  },
  titleBox: {
    fontSize: 24,
    fontWeight: 900,
    textAlign: "center",
    margin: "10px 0px",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    padding: 1,
    width: "50%",
    height: "230px",
    margin: "50px 0px",
  },
  titleVoteNull: {
    fontSize: 50,
    fontWeight: 900,
    display: "flex",
    height: "100%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  titleOther: {
    fontSize: 25,
    margin: "20px 0px",
    textAlign: "center",
    fontWeight: 900,
  },
};

export default VotesSelected;
