"use client"
import React, { useEffect } from 'react'
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { Card, Box, Grid, Heading, Separator, TextField, Button, Text, Link, Strong } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import { redirect } from 'next/navigation';

import { useSession, signIn } from 'next-auth/react';

import { getUser } from '../_utils/strapi';

import { encryptPass } from '../_utils/encrypt';

export const getServerSideProps:GetServerSideProps<{
    loggedIn:boolean
}> = async(context) => {
    // Verificando na sessão se o usuário já está logado
    /*const session = await getSession(context.req, context.res);
    console.log(context.req, context.res, session);
    session.loggedIn = session.loggedIn ? true : false;*/
    return {
        props: {
            loggedIn: false
        }
    }
}

function LogInForm({ loggedIn } : InferGetServerSidePropsType<typeof getServerSideProps>) {

    const { data: session, status, update } = useSession();

    useEffect(() => {
        if (session && status === "authenticated") {
            if (session) {
                console.log("Signed in: ", session.user?.name);
                redirect('/home')
            }
        }
    }, [status])

    return (
    <Grid columns="3" gap="3" width="100%">
        <Box/>
        <Box>
        <Card variant="classic" style={{
            width: "100%",
            padding: 15
        }}>
            <Heading>LogIn</Heading>
            <Separator my="5" size="4" />
            <Form.Root
                onSubmit={(event) => {
                    event.preventDefault();
                    // obtendo valores de entrada
                    const data = Object.fromEntries(new FormData(event.currentTarget));
                    if (typeof data["user"] === "string" && typeof data["password"] === "string") {
                        let encrypted = encryptPass(data["password"]); // criptografando senha
                        getUser(data["user"], encrypted) // verificando no banco se existe usuário correspondente com os dados
                        .then((res) => {
                            if(Array.isArray(res.data) && res.data.length > 0) {
                                console.log("Logado com sucesso!")
                                signIn('credentials', {
                                    redirect:false,
                                    user:data["user"],
                                })
                            } else {
                                console.log("Usuário ou senha errados.");
                            }
                        })
                    }
                }}>
                <Form.Field name="user">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label>Usuário</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                        <Text color="crimson" size="1">Por favor, digite o seu usuário</Text>
                        </Form.Message>
                    </div>
                    <Form.Control asChild required>
                        <TextField.Input placeholder='Digite aqui seu usuário...'></TextField.Input>
                    </Form.Control>
                </Form.Field>
                <Separator my="5" size="4" />
                <Form.Field name="password">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label>Senha</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                        <Text color="crimson" size="1">Por favor, digite a sua senha</Text>
                        </Form.Message>
                    </div>
                    <Form.Control asChild required type='password'>
                        <TextField.Input placeholder='Digite aqui sua senha...'></TextField.Input>
                    </Form.Control>
                </Form.Field>
                <Separator my="5" size="4" />
                <Form.Submit asChild>
                    <Button variant="solid" size="3">Entrar</Button>
                </Form.Submit>
            </Form.Root>
            <Text size="2" my="3">Ou <Strong><Link href='/signup'>se cadastre</Link></Strong>.</Text>
        </Card>
        </Box>
    </Grid>
  )
}

export default LogInForm