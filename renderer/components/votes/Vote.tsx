import { Box, SxProps, Typography } from "@mui/material";
import Image from "next/image";
import { CSSProperties } from "react";

type VoteProps = {
  owner: string;
  alternate: string;
  image_path: string;
};

export default function Vote({ owner, alternate, image_path }: VoteProps) {
  return (
    <Box display="flex" justifyContent="space-around" alignItems="center">
      {image_path && <Image src={`${image_path}`} height={80} width={80} />}
      <Box sx={styles.container}>
        <Typography sx={styles.title}>Propietario</Typography>
        <Typography sx={styles.titleContent}>{owner}</Typography>
        <Typography sx={styles.title}>Suplente</Typography>
        <Typography sx={styles.titleContent}>{alternate}</Typography>
      </Box>
    </Box>
  );
}

const styles: Record<string, CSSProperties | SxProps> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 1,
  },
  title: {
    color: "#A31464",
    textAlign: "center",
    fontSize: 14,
    fontWeight: 700,
  },
  titleContent: {
    fontSize: 14,
    fontWeight: 400,
    textAlign: "center",
  },
};
