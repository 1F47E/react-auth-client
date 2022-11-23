// import type { NextPage } from 'next'
import { useState } from 'react'
import {
  Container,
  Center,
  PasswordInput,
  TextInput,
  Text,
  Group,
  SimpleGrid,
  Anchor,
  Grid,
  Button,
  Space,
  Paper,
  Alert
} from '@mantine/core'
import { showNotification } from '@mantine/notifications';

const radius = "lg"
const size = "md"

const Home = () => {
  const [username, setUsername] = useState('test')
  const [password, setPassword] = useState('test')

  const handleButton = () => {
    showNotification({
      title: 'Default notification',
      message: 'Hey there, your code is awesome! 🤥',
    })
  }

  return (
    <Container size={420} my={40}>

      <Paper
        p={50} mt={30}
        radius="md"
      >

        <TextInput
          placeholder="login"
          id="your-login"
          radius={radius}
          size={size}
          value={username}
          withAsterisk
        />

        <Space h="xl" />

        <PasswordInput
          placeholder="password"
          id="your-password"
          radius={radius}
          size={size}
          value={password}
          withAsterisk
        />

        <Center>
          <Button
            variant="gradient"
            gradient={{ from: 'indigo', to: 'blue', deg: 105 }}
            radius={radius}
            size={size}
            mt="xl"
            fullWidth
            onClick={handleButton}
          >Let me in</Button>
        </Center>
      </Paper>
    
    </Container>
  )
}

export default Home
