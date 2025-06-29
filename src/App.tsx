import {
  ChakraProvider,
  Box,
  Container,
  Heading,
  VStack,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { TodoItem } from "./components/TodoItem";
import { AddTodo } from "./components/AddTodo";
import { TodoStats } from "./components/TodoStats";
import { ThemeToggle } from "./components/ThemeToggle";
import { useTodoStore } from "./store/todoStore";
import { CheckSquare } from "lucide-react";
import { theme } from "./_ui/theme";

function TodoApp() {
  const { todos, addTodo, deleteTodo, toggleTodo, editTodo, clearCompleted } =
    useTodoStore();

  const bgGradient = useColorModeValue(
    "linear(to-br, blue.50, purple.50)",
    "linear(to-br, gray.900, blue.900)"
  );

  return (
    <Box minH="100vh" bgGradient={bgGradient}>
      <Container maxW="2xl" py={8}>
        <Flex justify="space-between" align="center" mb={8}>
          <Flex align="center" gap={3}>
            <CheckSquare size={32} color="blue" />
            <Box>
              <Heading
                size="xl"
                bgGradient="linear(to-r, blue.400, purple.500)"
                bgClip="text"
              >
                Todo Listify
              </Heading>
              <Text fontSize="sm" opacity={0.7}>
                Organize your tasks niftyly
              </Text>
            </Box>
          </Flex>
          <ThemeToggle />
        </Flex>

        <VStack spacing={2} align="stretch">
          <AddTodo onAdd={addTodo} />

          {todos.length === 0 ? (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" opacity={0.6}>
                No todos yet. Add one above to get started! ✨
              </Text>
            </Box>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}

          <TodoStats todos={todos} onClearCompleted={clearCompleted} />
        </VStack>
      </Container>
    </Box>
  );
}

function App() {
  return (
    <ChakraProvider theme={theme}>
      <TodoApp />
    </ChakraProvider>
  );
}

export default App;
