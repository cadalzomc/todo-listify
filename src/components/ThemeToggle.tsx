import React from "react";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.200", "gray.600");

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === "light" ? <Moon size={18} /> : <Sun size={18} />}
      onClick={toggleColorMode}
      border="1px"
      borderColor={borderColor}
      borderRadius="xl"
      size="lg"
      _hover={{
        transform: "scale(1.05)",
        shadow: "md",
      }}
      transition="all 0.2s"
    />
  );
};
