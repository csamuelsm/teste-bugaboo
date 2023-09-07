"use client"
import { Flex, Text, Heading, Link } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

type AuthProps = {
    children:ReactNode
}

function Auth({ children } : AuthProps) {

    const { data: session, status, update } = useSession();

    if (status === "loading") {
        return (
            <Flex direction="column" gap="3" align="center" justify="center"
                style={{
                    minHeight: "100vh"
                }}>
                <div>
                    Loading...
                </div>
            </Flex>
        )
    }

    if (status === "unauthenticated") {
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
        <div>{children}</div>
    )
}

export default Auth;