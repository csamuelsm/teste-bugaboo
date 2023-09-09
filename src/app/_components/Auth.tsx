"use client"
import { Flex, Text, Heading, Link, Button } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'
import { signOut } from 'next-auth/react'
import { ExitIcon } from '@radix-ui/react-icons';

type AuthProps = {
    children:ReactNode
}

function Auth({ children } : AuthProps) {

    const { data: session, status, update } = useSession();

    if (status === "loading") {
        /* Retorna apenas uma tela com "Carregando"
        enquanto o status da sessão ainda não é conhecido
        Assim, evitamos dar um "flash" de conteúdos indesejados
        para pessoas inautenticadas */
        return (
            <Flex direction="column" gap="3" align="center" justify="center"
                style={{
                    minHeight: "100vh"
                }}>
                <div>
                    Carregando...
                </div>
            </Flex>
        )
    }

    if (status === "unauthenticated") {
        /*
        Se o status da sessão for não-autenticado,
        retornamos uma tela comunicando que a pessoa não
        tem permissão
        */
        return (
            <Flex direction="column" gap="3" align="center" justify="center"
                style={{
                    minHeight: "100vh"
                }}>
                <div>
                    <Heading color='crimson'>Permissão negada.</Heading>
                    <Text>Você não tem permissão para acessar este página.</Text>
                    <br/>
                    <Text><Link href="/">Faça login para poder acessar.</Link></Text>
                </div>
            </Flex>
        )
    }

    return (
        /*
        Caso o status não seja "loading" ou "unauthenticated", então
        o status é "authenticated", logo o usuário possui permissão
        para ver o conteúdo da página. Então, renderizamos a página
        juntamente com um botão de encerrar sessão
        */
        <div>
            <Button variant='outline' my="5" onClick={() => {
                signOut({
                    callbackUrl: `${window.location.origin}`
                });
            }}>
                Encerrar sessão
                <ExitIcon/>
            </Button>
            {children}
        </div>
    )
}

export default Auth;