import { ChakraProvider, VStack } from '@chakra-ui/react'
import { MultiSelect } from 'chakra-multiselect'

const App = () => {
  return (
    <ChakraProvider>
      <VStack minH="100vh" w="full" justifyContent="center" alignItems="center">
      <MultiSelect maxW="xl" />
      </VStack>
    </ChakraProvider>
  )
}

export default App
