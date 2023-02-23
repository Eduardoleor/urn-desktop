import { LayoutProps } from "./Layout.interface";

import LeftIllustrationBrown from "@/components/illustrations/layout/colors/brown/layout-left.svg";
import RightIllustrationBrow from "@/components/illustrations/layout/colors/brown/layout-right.svg";

import LeftIllustrationGreen from "@/components/illustrations/layout/colors/green/layout-left.svg";
import RightIllustrationGreen from "@/components/illustrations/layout/colors/green/layout-right.svg";

import LeftIllustrationGrey from "@/components/illustrations/layout/colors/grey/layout-left.svg";
import RightIllustrationGrey from "@/components/illustrations/layout/colors/grey/layout-right.svg";

import LeftIllustrationPink from "@/components/illustrations/layout/colors/pink/layout-left.svg";
import RightIllustrationPink from "@/components/illustrations/layout/colors/pink/layout-right.svg";

import LeftIllustrationLightPink from "@/components/illustrations/layout/colors/light-pink/layout-left.svg";
import RightIllustrationLightPink from "@/components/illustrations/layout/colors/light-pink/layout-right.svg";

import TopLeftIllustration from "@/components/illustrations/layout/layout-left.svg";
import BottomRightIllustration from "@/components/illustrations/layout/layout-right.svg";
import { Box } from "@mui/material";

const LayoutTopLeft = (color) => {
  switch (color) {
    case "brown":
      return <LeftIllustrationBrown style={styles.leftIllustration} />;
    case "green":
      return <LeftIllustrationGreen style={styles.leftIllustration} />;
    case "grey":
      return <LeftIllustrationGrey style={styles.leftIllustration} />;
    case "pink":
      return <LeftIllustrationPink style={styles.leftIllustration} />;
    case "lightPink":
      return <LeftIllustrationLightPink style={styles.leftIllustration} />;
    default:
      return <LeftIllustrationPink style={styles.leftIllustration} />;
  }
};

const LayoutTopRight = (color) => {
  switch (color) {
    case "brown":
      return <RightIllustrationBrow style={styles.rightIllustration} />;
    case "green":
      return <RightIllustrationGreen style={styles.rightIllustration} />;
    case "grey":
      return <RightIllustrationGrey style={styles.rightIllustration} />;
    case "pink":
      return <RightIllustrationPink style={styles.rightIllustration} />;
    case "lightPink":
      return <RightIllustrationLightPink style={styles.rightIllustration} />;
    default:
      return <RightIllustrationPink style={styles.rightIllustration} />;
  }
};

export default function Layout({
  children,
  colorBackground,
  orientationBackground,
}: LayoutProps) {
  if (orientationBackground === "topBottom") {
    return (
      <Box sx={styles.container}>
        <TopLeftIllustration style={styles.leftIllustration} />
        <Box sx={styles.content}>{children}</Box>
        <BottomRightIllustration style={styles.rightBottomIllustration} />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      {LayoutTopLeft(colorBackground)}
      <Box sx={styles.content}>{children}</Box>
      {LayoutTopRight(colorBackground)}
    </Box>
  );
}

const styles = {
  container: {
    backgroundColor: "#F5F5F5",
    width: "100%",
    height: "100vh",
  },
  content: {
    display: "flex",
    flexGrow: 1,
  },
  leftIllustration: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  rightIllustration: {
    position: "absolute",
    top: 0,
    right: 0,
  },
  rightBottomIllustration: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
};
