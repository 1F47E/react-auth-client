import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {
  Container
} from "@mantine/core"
import Login from "../components/login"
import { Modal, useMantineTheme } from '@mantine/core';


const Home: NextPage = () => {
  const theme = useMantineTheme();

  return (
    <div>
      <Head>
        <title>ZENBIT</title>
        <meta name="description" content="Сервис для простых инвестиций в портфель криптоактивов" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div id="login">
      <Login />
      </div>

      <Container sx={{ height: "100vh", margin:0, padding:0, width:'100%', minWidth:'100%' }}>
      <iframe src='https://my.spline.design/clonercubebinarycopy-0a24ea896ae2d1196587d3f325b1441f/' frameBorder='0' width='100%' height='100%'></iframe>
      </Container>


    </div>
  )
}

export default Home
