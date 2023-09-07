"use client"
import React, { useEffect, useState } from 'react'
import { Flex, Card, Box, Grid, Heading, Separator, TextField, Button, Text, Link, Strong, Callout } from '@radix-ui/themes';
import * as Form from '@radix-ui/react-form';
import './../_styles/alertStyles.css';
import '@radix-ui/themes/styles.css';

import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import { encryptPass } from '../_utils/encrypt';
import { createUser } from '../_utils/strapi';

function validatePassword(pass:string) {
    // recebe uma string e valida se a string segue
    // os requisitos para senha:
    /*
    - Deve possuir pelo menos 6 caracteres
    - Deve ter uma letra maiúscula e uma minúsucla
    - Deve ter um símbolo especial
    */
    return /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g.test(pass);
}

type CalloutProps = {
    open:boolean,
    onOpenChange:React.Dispatch<React.SetStateAction<boolean>>
}

function SuccessCallout({ open, onOpenChange } : CalloutProps) {
    /* Um alert para confirmação de sucesso na criação do usuário */
    return (
        <Flex direction="column" align="center" justify="center" style={{
            display: open ? "flex" : "none"
        }}>
            <Callout.Root color='green'>
                <Callout.Icon>
                    <CheckCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Usuário criado com sucesso. Retorne para a <Link href="/">página de LogIn</Link> para entrar.
                </Callout.Text>
            </Callout.Root>
        </Flex>
    )
}

function ErrorCallout({ open, onOpenChange } : CalloutProps) {
    /* Um alert para comunicação de erro na criação do usuário */
    return (
        <Flex direction="column" align="center" justify="center" style={{
            display: open ? "flex" : "none"
        }}>
            <Callout.Root color='red'>
                <Callout.Icon>
                    <CrossCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    Occorreu algum erro ao tentar criar o usuário. Por favor, tente novamente.
                </Callout.Text>
            </Callout.Root>
        </Flex>
    )
}

function SignUpForm() {
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    return (
        <>
        <Grid columns={{
            md: '3',
            xs: '1'
            }} gap="3" width="100%">
            <Box/>
            <Box style={{
                padding: 5,
                display: "flex",
                alignContent: "center",
                justifyContent: "center",
            }}>
            {/* Aqui é a parte do formulário de cadastro */}
            <Card variant="classic" style={{
                width: "100%",
                padding: 15
            }}>
                <Heading>Cadastre-se</Heading>
                <Separator my="5" size="4" />
                <Form.Root
                    onSubmit={(event) => {
                        event.preventDefault();
                        //@ts-ignore
                        const data = Object.fromEntries(new FormData(event.currentTarget));
                        // validando a senha antes de chamar a função para criação de usuário
                        if (typeof data['password'] === "string" && typeof data['user'] === "string"
                            && validatePassword(data['password'])) {
                            let encrypted = encryptPass(data['password']); //criptografando a senha
                            createUser(data['user'], encrypted) //criando o usuário
                            .then((data) => {
                                setSuccess(true);
                                //console.log("Usuário criado com sucesso", data);
                            })
                            .catch((error) => {
                                setError(true);
                                //console.log("Erro ao criar o usuário", error);
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
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <Form.Message className="FormMessage" match={(value, formData) => value.length < 6}>
                                <Text color="crimson" size="1">Sua senha deve conter pelo menos 6 caracteres</Text>
                            </Form.Message>
                            <Form.Message className="FormMessage" match={(value, formData) => !/[A-Z]/.test(value) || !/[a-z]/.test(value)}>
                                <Text color="crimson" size="1">Sua senha deve ter pelo menos uma letra maiúscula e uma letra minúscula</Text>
                            </Form.Message>
                            <Form.Message className="FormMessage" match={(value, formData) => !/[!@#\$%\^\&*\)\(+=._-]/.test(value)}>
                                <Text color="crimson" size="1">Sua senha deve conter pelo menos um caractere especial</Text>
                            </Form.Message>
                        </div>
                    </Form.Field>
                    <Separator my="5" size="4" />
                    <Form.Field name="password_repeat">
                        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                            <Form.Label>Repita a sua senha</Form.Label>
                            <Form.Message className="FormMessage" match="valueMissing">
                                <Text color="crimson" size="1">Digite novamente a sua senha</Text>
                            </Form.Message>
                            <Form.Message className='FormMessage'
                                match={(value, formData) => value !== formData.get('password')}>
                                <Text color="crimson" size="1">As senhas não estão iguais</Text>
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
        <SuccessCallout open={success} onOpenChange={setSuccess} />
        <ErrorCallout open={error} onOpenChange={setError} />
        </>
    )
}

export default SignUpForm