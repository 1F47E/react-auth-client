import { useState } from 'react'
import {
  Container,
  Center,
  PasswordInput,
  TextInput,
  Button,
  Space,
  Paper,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications';

const radius = "lg"
const size = "md"

const Home = () => {
  const [formData, setFormData] = useState({ username: 'test', password: 'test' })

  const handleInputChange = (event: any) => {
    console.log(event.target.name)
    setFormData(prevData => ({
        ...prevData,
        [event.target.name]: event.target.value
      }))
  }

  const handleButton = (e: any) => {
    showNotification({
      title: 'Got user data',
      message: JSON.stringify(formData),
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
          name="username"
          radius={radius}
          size={size}
          value={formData.username}
          onChange={handleInputChange}
          withAsterisk
        />

        <Space h="xl" />

        <PasswordInput
          placeholder="password"
          name="password"
          radius={radius}
          size={size}
          value={formData.password}
          onChange={handleInputChange}
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
