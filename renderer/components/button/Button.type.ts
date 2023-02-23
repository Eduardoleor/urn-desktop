export type ButtonVariant = "contained" | "outlined";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onClick?: () => void;
}
