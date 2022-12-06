import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useState } from "react"
import { Modal, useMantineTheme } from '@mantine/core';


export default function Login() {
  const theme = useMantineTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: any) => {
    // if no email or password, return
    if (!email || !password) return;
    // check if email is valid
    if (!email.includes('@')) return;
    // check if password is valid
    if (password.length < 6) return;
    // set timer for 1 seconds
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (e: any) => {
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  };

  const [opened, setOpened] = useState(false);

  return (
    /* create container apbosile position in the center of the screen */
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Как создать аккаунт?"

      >
        Для участия в закрытом тестировании, пожалуйста, напишите нам на {" "}
        <Anchor<'a'> href="mailto:hello@zenbit.co" size="sm">
          hello@zenbit.co
        </Anchor>
      </Modal>
      <Container mt={40} sx={{ maxWidth: '420px' }}>

        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 300 })}
          variant="gradient"

          gradient={{ from: 'teal', to: 'indigo', deg: 45 }}
        >
          ZENBIT
        </Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Простыe криптовалютные инвестиции
        </Text>

        {/* set paper transparent 50% */}
        <Paper shadow="md" p={30} mt={30} radius="md" sx={{ backgroundColor: 'rgba(20, 20, 20, 0.5)' }}>
          <TextInput name="email" placeholder="Ваш email" required onChange={handleInputChange} value={email} />
          <PasswordInput name="password" placeholder="Ваш пароль" required mt="md" onChange={handleInputChange} value={password} />
          <Button fullWidth mt="xl" onClick={handleSubmit} variant="gradient" gradient={{ from: 'teal', to: 'indigo', deg: 45 }} disabled={isLoading}>
            Войти
          </Button>
        </Paper>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          <Anchor<'a'> href="#" size="sm" onClick={() => setOpened(true)}>
            Создать аккаунт
          </Anchor>
        </Text>
      </Container>
    </>
  );
}