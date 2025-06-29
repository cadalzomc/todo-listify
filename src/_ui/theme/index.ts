import {
  extendTheme,
  type ThemeConfig,
  type StyleFunctionProps,
} from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "system",
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
  },
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: props.colorMode === "dark" ? "gray.900" : "gray.50",
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: "blue",
      },
      variants: {
        solid: {
          _hover: {
            transform: "translateY(-1px)",
            shadow: "lg",
          },
          transition: "all 0.2s",
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            _focus: {
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px blue.400",
            },
          },
        },
      },
    },
  },
});
