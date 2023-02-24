import { Box, Grid, Typography } from "@mui/material";
import Vote from "./Vote";
import OtherVote from "./OtherVote";
import { Representative } from "@/types/representative";
import { NULL_VOTE, OTHER_VOTE } from "@/constants/representative";

type VotesListProps = {
  color?: "pink" | "green" | "lightPink" | "grey" | "brown";
  deputies: Representative[];
  onSelected: (deputy: any) => void;
};

export default function VotesList({
  color = "pink",
  deputies,
  onSelected,
}: VotesListProps) {
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
  return (
    <Grid container spacing={2} my={2}>
      {deputies.map((deputy, index) => {
        const isOtherOrNullDeputy =
          deputy.id === NULL_VOTE || deputy.id === OTHER_VOTE;
        return (
          <Grid
            item
            xs={4}
            key={deputy.id ?? index}
            onClick={() => onSelected(deputy)}
          >
            <Box sx={{ ...styles.box, border: `6px solid ${bgColor}` }}>
              {isOtherOrNullDeputy ? (
                <OtherVote type={deputy.id === NULL_VOTE ? "null" : "other"} />
              ) : (
                <>
                  <Typography sx={styles.title}>{deputy.name}</Typography>
                  <Vote
                    owner={deputy.owner}
                    alternate={deputy.substitute}
                    image_path={deputy.image}
                  />
                </>
              )}
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
}

const styles = {
  box: {
    padding: 1,
    maxHeight: 200,
    overflow: "hiddenm",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(0, 0, 0, 0.1)",
    },
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 2,
  },
};
