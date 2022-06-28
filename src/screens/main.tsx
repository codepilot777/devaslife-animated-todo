import React, {useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import {
  Text,
  Box,
  Center,
  VStack,
  useColorModeValue
} from 'native-base'
import AnimatedCheckbox from '../components/animated-checkbox';
import TaskItem from '../components/task-item';
import ThemeToggle from '../components/theme-toggle';

export default function MainScreen () {
  const [checked, setChecked] = useState(false);
  const handlePressCheckbox = useCallback(() => {
    setChecked(prev => !prev)
  }, [])
  
  return (
    <Center _dark={{ bg:'blueGray.900'}} _light={{ bg: 'blueGray.50'}} px={4} flex={1}>
      <VStack space={5} alignItems="center">
        <Box w="100px" h="100px">
        <Pressable onPress={handlePressCheckbox}>
          <AnimatedCheckbox />
        </Pressable>
        </Box>
        <Box bg={useColorModeValue('red.500', 'yellow.500')} p={10}>
          <Text>Hello!</Text>
        </Box>
        <ThemeToggle />
      </VStack>
    </Center>
  )
}