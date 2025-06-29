import React from "react";
import {
  Box,
  Text,
  Flex,
  Badge,
  Button,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { CheckCircle, Clock, Trash } from "lucide-react";
import { Todo } from "../types/todo";

interface TodoStatsProps {
  todos: Todo[];
  onClearCompleted: () => void;
}

export const TodoStats: React.FC<TodoStatsProps> = ({
  todos,
  onClearCompleted,
}) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  const completedCount = todos.filter(
    (todo) => todo.status === "COMPLETED"
  ).length;
  const pendingCount = todos.filter((todo) => todo.status === "PENDING").length;

  if (todos.length === 0) return null;

  return (
    <Box
      bg={bgColor}
      p={3}
      borderRadius="md"
      border="1px"
      borderColor={borderColor}
      shadow="sm"
      mt={6}
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
        <HStack spacing={4}>
          <HStack>
            <Clock size={16} />
            <Text fontSize="sm">Pending:</Text>
            <Badge colorScheme="blue" variant="subtle">
              {pendingCount}
            </Badge>
          </HStack>
          <HStack>
            <CheckCircle size={16} />
            <Text fontSize="sm">Completed:</Text>
            <Badge colorScheme="green" variant="subtle">
              {completedCount}
            </Badge>
          </HStack>
        </HStack>

        {completedCount > 0 && (
          <Button
            size="xs"
            colorScheme="red"
            variant="outline"
            leftIcon={<Trash size={14} />}
            onClick={onClearCompleted}
          >
            Clear Completed
          </Button>
        )}
      </Flex>
    </Box>
  );
};
