import { Box } from "@mui/material";
import { ButtonProps } from "./Button.type";

export default function Button({
  children,
  variant = "contained",
  onClick,
}: ButtonProps) {
  const style = variant === "contained" ? styles.container : styles.outlined;
  return (
    <Box sx={style} onClick={onClick}>
      {children}
    </Box>
  );
}

const styles = {
  container: {
    backgroundColor: "#D14995",
    width: "500px",
    height: "70px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "42px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  outlined: {
    border: "6px solid #D14995",
    width: "500px",
    height: "70px",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: "42px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
};
