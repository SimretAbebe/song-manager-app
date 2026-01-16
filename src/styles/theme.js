// Theme configuration for the Song Manager App
export const theme = {
  // Color palette
  colors: {
    primary: "#1976d2",
    secondary: "#dc004e",
    success: "#4caf50",
    warning: "#ff9800",
    error: "#f44336",
    info: "#2196f3",

    text: {
      primary: "#212121",
      secondary: "#757575",
      disabled: "#bdbdbd",
    },
    background: {
      default: "#fafafa",
      paper: "#ffffff",
    },
    divider: "#e0e0e0",
  },

  // Typography
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700,
    },
    h1: {
      fontSize: "2.125rem",
      fontWeight: 300,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.3,
    },
    body1: {
      fontSize: "1rem",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: 1.43,
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: 500,
      textTransform: "uppercase",
    },
  },

  // Spacing system (8px base unit)
  spacing: (factor) => `${8 * factor}px`,

  // Breakpoints for responsive design
  breakpoints: {
    xs: "0px",
    sm: "600px",
    md: "960px",
    lg: "1280px",
    xl: "1920px",
  },

  // Border radius
  shape: {
    borderRadius: 4,
  },

  // Shadows
  shadows: [
    "none",
    "0px 2px 1px -1px rgba(0,0,0,0.2)",
    "0px 3px 1px -2px rgba(0,0,0,0.2)",
  ],

  // Transitions
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
  },
};
