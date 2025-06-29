import React, { useState } from "react";
import {
  Box,
  Input,
  Button,
  Flex,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (todo: string) => void;
}

export const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState("");
  const toast = useToast();

  const borderColor = useColorModeValue("gray.200", "gray.600");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      toast({
        title: "Please enter a todo",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    onAdd(inputValue.trim());
    setInputValue("");
    toast({
      title: "Todo added successfully!",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box
      // bg={bgColor}
      p={3}
      borderRadius="sm"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
      mb={6}
    >
      <form onSubmit={handleSubmit}>
        <Flex gap={3}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="What needs to be done?"
            size="md"
            borderRadius="sm"
            flex={1}
          />
          <Button
            type="submit"
            colorScheme="blue"
            size="md"
            borderRadius="lg"
            leftIcon={<Plus size={18} />}
            px={6}
          >
            Add
          </Button>
        </Flex>
      </form>
    </Box>
  );
};
