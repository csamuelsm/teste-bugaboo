import React, { useEffect, useState } from 'react'
import { Link, Card, Box, Grid, Heading, Text, Kbd, Button, Flex, Table, HoverCard, Strong } from '@radix-ui/themes';
import { getFiles, deleteFile } from '../_utils/strapi';
import { useSession } from 'next-auth/react';
import { EyeOpenIcon, TrashIcon } from '@radix-ui/react-icons';

// Dados dos arquivos salvos no banco de dados
type GLBdata = {
    id: number,
    attributes: {
        createdAt: string,
        path: string,
        publishedAt: string,
        updatedAt: string,
    }
}

function GLBTable() {

    const {data:session} = useSession();
    const [dados, setDados] = useState<GLBdata[]>([]);

    useEffect(() => {
        // Buscando os arquivos no banco de dados
        getFiles(Number(session?.user?.name))
        .then((data) => {
            if (Array.isArray(data.data)) {
                // Salvamos os arquivos em um formato de array na variável "dados"
                setDados(data.data);
            } else {
                console.log("Formato de dados inválido");
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }, [])

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
                <Card variant="classic" style={{
                    width: "100%",
                    padding: 15,
                }}>
                    <Flex direction="column" gap="3">
                        <Heading>
                            Seus arquivos GLB
                        </Heading>
                        <Text>Gerencie seus aquivos <Kbd>GLB</Kbd> abaixo. Para subir mais arquivos, <Link href='/home'>clique aqui</Link>.</Text>
                        <Table.Root size="1">
                            <Table.Header>
                                <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Nome</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Criado em</Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>Ações</Table.ColumnHeaderCell>
                            </Table.Header>
                            <Table.Body>
                                {dados.map((glb) => {
                                    // Aqui vamos gerar uma tabela com uma linha para cada arquivo em "dados"
                                    return (
                                        <Table.Row>
                                            <Table.RowHeaderCell>{glb.id}</Table.RowHeaderCell>
                                            <Table.Cell style={{
                                                maxWidth: "120px"
                                            }}>
                                                {glb.attributes.path.replace('public/uploads/', '')}
                                            </Table.Cell>
                                            <Table.Cell>{new Date(glb.attributes.createdAt).toLocaleDateString('pt-br', { year:"numeric", month:"short", day:"numeric"})}</Table.Cell>
                                            <Table.Cell>
                                                <HoverCard.Root>
                                                    <HoverCard.Trigger>
                                                        <Link href={`/glb_viewer/${glb.attributes.path.replace('public/uploads/', '')}`}>
                                                            <Button variant='outline' mx="1">
                                                                <EyeOpenIcon/>
                                                            </Button>
                                                        </Link>
                                                    </HoverCard.Trigger>
                                                    <HoverCard.Content size="1">
                                                        <Text size="1">
                                                            <Strong>Visualizar</Strong>
                                                        </Text>
                                                    </HoverCard.Content>
                                                </HoverCard.Root>

                                                <HoverCard.Root>
                                                    <HoverCard.Trigger>
                                                        <Button
                                                            variant='outline'
                                                            color='crimson'
                                                            onClick={() => {
                                                                deleteFile(glb.id)
                                                                .then((data) => {
                                                                    window.location.reload();
                                                                })
                                                            }}
                                                            >
                                                            <TrashIcon/>
                                                        </Button>
                                                    </HoverCard.Trigger>
                                                    <HoverCard.Content size="1">
                                                        <Text size="1">
                                                            <Strong>Apagar</Strong>
                                                        </Text>
                                                    </HoverCard.Content>
                                                </HoverCard.Root>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                })}
                            </Table.Body>
                        </Table.Root>
                    </Flex>
                </Card>
            </Box>
        </Grid>
        </>
    )
}

export default GLBTable