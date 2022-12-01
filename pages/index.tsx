import { useState, useEffect } from 'react'
import {
  Title,
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
  Menu,
  SimpleGrid,
  Flex,
  Overlay,
  LoadingOverlay,
  useMantineTheme,
} from '@mantine/core'
import { showNotification } from '@mantine/notifications';
import { Prism } from '@mantine/prism';
import jwtDecode, { JwtPayload } from "jwt-decode";
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSun, IconMoonStars, IconLogout, IconUser } from '@tabler/icons';
import dayjs from 'dayjs';


import AuthService from '../services/api';

const radius = "lg"
const size = "md"




// check token, return JwtPayload
// const checkToken = async (token: string) => {
const checkToken = (token: string): JwtPayload | null => {
  console.log('decoding token: ', token);
  try {
    const decodedHeader = jwtDecode<JwtPayload>(token, { header: true });
    const decodedPayload = jwtDecode<JwtPayload>(token, { header: false });
    console.log('decodedHeader: ', decodedHeader);
    console.log('decodedPayload: ', decodedPayload);
    return decodedPayload;
  } catch (error) {
    console.log('error: ', error);
    return null;
  }
}

// // create type user extend JwtPayload
type User = JwtPayload & {
  name: string;
  type: string;
}

type TokenDecoded = {
  header: JwtPayload;
  body: JwtPayload;
  signature: string;
}

const formDataDefault = { username: '5550000001', password: 'qwerty1' }

const Home = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const theme = useMantineTheme()

  const [isLoading, setIsLoading] = useState(false);

  const [mode, setMode] = useState('signin');
  const [formData, setFormData] = useState(formDataDefault)
  const [token, setToken] = useState('')
  // tokenData
  // TODO: refactor all token data to one obj
  const [user, setUser] = useState<JwtPayload | null>(null)
  // tokenHeader
  const [tokenHeader, setTokenHeader] = useState<JwtPayload | null>(null)

  // load token on page load
  useEffect(() => {
    const token = localStorage.getItem('access_token')
    if (token) {
      setToken(token)
      const decodedHeader = jwtDecode<JwtPayload>(token, { header: true });
      setTokenHeader(decodedHeader)
      const decodedBody = jwtDecode<JwtPayload>(token, { header: false });
      setUser(decodedBody)
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
  const handleButtonSignup = (e: any) => {
    console.log(JSON.stringify(formData))
    showNotification({
      color: 'orange',
      title: 'WIP',
      message: 'Signup is not implemented yet',
    })
  }

  function handleButtonLogin(e: any) {
    console.log(JSON.stringify(formData))
    setIsLoading(true);
    AuthService.doLogin(formData.username, formData.password).then(
      (data) => {
        setToken(data);
        const decodedHeader = jwtDecode<JwtPayload>(data, { header: true });
        setTokenHeader(decodedHeader)
        const decodedBody = jwtDecode<JwtPayload>(data, { header: false });
        setUser(decodedBody)
        setIsLoading(false);

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
        setIsLoading(false);
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
      const decodedHeader = jwtDecode<JwtPayload>(token, { header: true });
      setTokenHeader(decodedHeader)
      const decodedBody = jwtDecode<JwtPayload>(token, { header: false });
      setUser(decodedBody)

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

  const handleButtonMode = (e: any) => {
    if (mode === 'signin') {
      setMode('signup')
      setFormData({ username: '', password: '' })
    } else {
      setMode('signin')
      setFormData(formDataDefault)
    }
  }

  return (
    <>
      <Flex
        mih={50}
        bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="space-between"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        {/* {visible && <Overlay opacity={0.6} color="#000" zIndex={5}  blur={4} />} */}

        <Group position="right" sx={{ padding: 10, margin: 10 }}>
          <Switch
            size="md"
            color={dark ? 'gray' : 'dark'}
            onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[4]} />}
            offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
            onClick={() => toggleColorScheme()}
          />
        </Group>

        {user &&
          <Group position="left" sx={{ padding: 10, margin: 10 }}>
            <Menu width={200}>
              <Menu.Target>
                <Button>Hello!</Button>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item color="red" icon={<IconLogout size={14} />} onClick={handleButtonLogout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Group>
        }
      </Flex>

      {!token &&
        <>
          <Container size={420} my={40}>
            <Paper p={50} mt={30} radius="md">


              <div style={{ width: 400, position: 'relative' }}>
                {isLoading && <LoadingOverlay
                  loaderProps={{ size: 'md', color: 'blue', variant: 'bars' }}
                  overlayOpacity={0.5}
                  overlayColor={theme.colors.dark[7]}
                  transitionDuration={500}
                  visible
                />}
                <Group position="right" >
                  <Button variant="subtle" radius="lg" size="xs" compact onClick={handleButtonMode}>
                    {mode === 'signin' ? `Create account` : `I already have account`}
                  </Button>
                </Group>
                <Space h="xl" />
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
                  {mode === 'signin' ?
                    <Button
                      variant="gradient"
                      gradient={{ from: 'indigo', to: 'grape', deg: 50 }}
                      radius={radius}
                      size={size}
                      mt="xl"
                      fullWidth
                      onClick={handleButtonLogin}
                      disabled={isLoading}
                    >Let me in</Button>
                    :
                    <Button
                      variant="gradient"
                      gradient={{ from: 'grape', to: 'indigo', deg: 50 }}
                      radius={radius}
                      size={size}
                      mt="xl"
                      fullWidth
                      onClick={handleButtonSignup}
                      disabled={isLoading}
                    >Sign me up!</Button>
                  }

                </Center>
              </div>
            </Paper>


          </Container>
        </>
      }

      {token &&
        <>
          <Container my={40}>
            {user &&
              <Paper mt="md" radius="md" sx={{ padding: 20 }}>
                <Center>
                  <Table striped highlightOnHover sx={{ maxWidth: 320 }}>
                    <tbody>
                      <tr key='uid'>
                        <td>User id</td>
                        <td>{user.sub}</td>
                      </tr>
                      <tr key='type'>
                        <td>Type</td>
                        <td>{user.jti}</td>
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

                <Space h="xl" />

                <Prism language="json">
                  {JSON.stringify(tokenHeader)}
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
        </>
      }

    </>
  )
}

export default Home
