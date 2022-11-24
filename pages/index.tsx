import { useState, useEffect } from 'react'
import {
  Container,
  Center,
  PasswordInput,
  TextInput,
  Textarea,
  Button,
  Space,
  Paper,
  Group,
  Switch,
  Grid,
  Code,
  Text,
  Mark,
  Table,
  useMantineTheme
} from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { Prism } from '@mantine/prism';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons';
import dayjs from 'dayjs';


import AuthService from '../services/api';

const radius = "lg"
const size = "md"




// check token, return JwtPayload
// const checkToken = async (token: string) => {
const checkToken = (token: string): User | null => {
  console.log('decoding token: ', token);
  try {
    const decodedHeader = jwtDecode<JwtPayload>(token, { header: true });
    const decodedPayload = jwtDecode<JwtPayload>(token, { header: false });
    console.log('decodedHeader: ', decodedHeader);
    console.log('decodedPayload: ', decodedPayload);
    return decodedPayload as User;
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
}

// create type user extend JwtPayload
type User = JwtPayload & {
  name: string;
  type: string;
}


const Home = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme()

  const [formData, setFormData] = useState({ username: '5550000001', password: 'qwerty1' })
  const [token, setToken] = useState('')
  const [user, setUser] = useState<User | null>(null)

  // load token on page load
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setToken(token)
      setUser(checkToken(token))
    }
  }, [])

  const handleInputToken = (event: any) => {
    setToken(event.currentTarget.value)
  }

  const handleInputChange = (event: any) => {
    console.log(event.target.name)
    setFormData(prevData => ({
      ...prevData,
      [event.target.name]: event.target.value
    }))
  }


  // api call on form submit
  function handleButtonLogin(e: any) {
    console.log(JSON.stringify(formData))
    AuthService.doLogin(formData.username, formData.password).then(
      (data) => {
        setToken(data);
        // decode and set user (jwt payload data)
        // decoded data can be null
        setUser(checkToken(data))

        // save token to localstorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('access_token', data)
        }
        showNotification({
          color: 'green',
          title: 'Success!',
          message: 'You have been logged in successfully',
        })
      },
      error => {
        showNotification({
          color: 'red',
          title: 'Login error',
          message: error,
        })
      }
    );
  }

  const handleButtonLogout = (e: any) => {
    setUser(null)
    setToken('')
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token')
    }

    showNotification({
      title: 'See you again!',
      message: 'Logout successful',
    })
  }

  const handleButton = (e: any) => {
    showNotification({
      title: 'Got user data',
      message: JSON.stringify(formData),
    })
  }

  const handleButtonToken = (e: any) => {
    const decoded = checkToken(token)

    let message = '';
    let color;
    if (decoded) {
      message = JSON.stringify(decoded)
      // color = 'green'
      setUser(decoded)
    } else {
      message = `Invalid token`
      color = 'red'
      showNotification({
        color: color,
        title: 'Got user data',
        message: message,
      })
    }
  }

  return (
    <>
      <Group position="right" sx={{ padding: 10, margin: 10 }}>
        <Switch
          size="md"
          color={dark ? 'gray' : 'dark'}
          onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
          offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
          onClick={() => toggleColorScheme()}
        />
      </Group>

      {!token &&
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
                onClick={handleButtonLogin}
              >Let me in</Button>
            </Center>
          </Paper>

        </Container>
      }

      {token &&
        <>
          <Container my={40}>
            {user &&
              <Paper mt="md" radius="md" sx={{ padding: 20 }}>
                <Center>
                  <Table striped highlightOnHover sx={{ maxWidth: 320 }}>
                    <tbody>
                      <tr key='id'>
                        <td>Id</td>
                        <td>{user.sub}</td>
                      </tr>
                      <tr key='name'>
                        <td>Name</td>
                        <td>{user.name}</td>
                      </tr>
                      <tr key='type'>
                        <td>Type</td>
                        <td>{user.type}</td>
                      </tr>
                      <tr key='iat'>
                        <td>Issued at</td>
                        <td>{user.iat && dayjs.unix(user.iat).format('YYYY-MM-DD HH:mm:ss')}</td>
                      </tr>
                      <tr key='exp'>
                        <td>Expiring</td>
                        <td>{user.exp && dayjs.unix(user.exp).format('YYYY-MM-DD HH:mm:ss')}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Center>

                <Space h="xl" />

                <Prism language="json">
                  {JSON.stringify(user)}
                </Prism>
              </Paper>
            }
            <Paper
              p={50} mt={30}
              radius="md"
            >
              <Textarea
                placeholder=""
                label="Token"
                autosize
                minRows={4}
                value={token}
                onChange={handleInputToken}
              />

              <Center>
                <Button
                  // variant="gradient"
                  // gradient={{ from: 'indigo', to: 'blue', deg: 105 }}
                  radius="md"
                  size={size}
                  mt="xl"
                  fullWidth
                  onClick={handleButtonToken}
                  disabled={!token}
                >Decode</Button>
              </Center>
            </Paper>
          </Container>
          <Group position="right" sx={{ padding: 10, margin: 10 }}>
            <Button
              radius={radius}
              size="sm"
              color="pink"
              onClick={handleButtonLogout}
            >Logout</Button>
          </Group>
        </>
      }

    </>
  )
}

export default Home
