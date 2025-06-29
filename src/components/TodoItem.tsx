import React, { useState } from "react";
import {
  Box,
  Text,
  Flex,
  IconButton,
  Checkbox,
  Input,
  useColorModeValue,
  Badge,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { Edit2, Trash2, Check, X } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newTodo: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.todo);
  const toast = useToast();

  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const mutedTextColor = useColorModeValue("gray.500", "gray.400");

  const handleEdit = () => {
    if (editValue.trim() === "") {
      toast({
        title: "Todo cannot be empty",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    onEdit(todo.id, editValue.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(todo.todo);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Box
      bg={bgColor}
      p={3}
      borderRadius="md"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
      transition="all 0.2s"
      _hover={{ shadow: "md", transform: "translateY(-1px)" }}
    >
      <Flex align="center" justify="space-between">
        <Flex align="center" flex={1} mr={4}>
          <Checkbox
            isChecked={todo.status === "COMPLETED"}
            onChange={() => onToggle(todo.id)}
            colorScheme="green"
            size="lg"
            mr={3}
          />

          {isEditing ? (
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleEdit()}
              size="sm"
              flex={1}
              mr={2}
            />
          ) : (
            <Box flex={1}>
              <Text
                color={textColor}
                textDecoration={
                  todo.status === "COMPLETED" ? "line-through" : "none"
                }
                opacity={todo.status === "COMPLETED" ? 0.6 : 1}
                fontSize="md"
                fontWeight="medium"
              >
                {todo.todo}
              </Text>
              <HStack mt={1} spacing={2}>
                <Text fontSize="xs" color={mutedTextColor}>
                  {formatDate(todo.date)}
                </Text>
                <Badge
                  colorScheme={todo.status === "COMPLETED" ? "green" : "blue"}
                  size="sm"
                  variant="subtle"
                >
                  {todo.status}
                </Badge>
              </HStack>
            </Box>
          )}
        </Flex>

        <HStack spacing={1}>
          {isEditing ? (
            <>
              <IconButton
                aria-label="Save todo"
                icon={<Check size={16} />}
                size="sm"
                colorScheme="green"
                variant="ghost"
                onClick={handleEdit}
              />
              <IconButton
                aria-label="Cancel edit"
                icon={<X size={16} />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={handleCancel}
              />
            </>
          ) : (
            <>
              <IconButton
                aria-label="Edit todo"
                icon={<Edit2 size={16} />}
                size="sm"
                colorScheme="blue"
                variant="ghost"
                onClick={() => setIsEditing(true)}
                isDisabled={todo.status === "COMPLETED"}
              />
              <IconButton
                aria-label="Delete todo"
                icon={<Trash2 size={16} />}
                size="sm"
                colorScheme="red"
                variant="ghost"
                onClick={() => onDelete(todo.id)}
              />
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};
