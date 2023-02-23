import React from "react";

export type OrientationBackground = "top" | "topBottom";
export type ColorBackground = "pink" | "green" | "lightPink" | "grey" | "brown";

export interface LayoutProps {
  children: React.ReactNode;
  orientationBackground?: OrientationBackground;
  colorBackground?: ColorBackground;
}
