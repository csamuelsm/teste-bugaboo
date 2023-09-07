import React, { useRef, useState } from 'react'
import { Card, Box, Grid, Heading, Text, Kbd, Button, Separator, Flex, Strong } from '@radix-ui/themes';
import { FileIcon, UploadIcon, HandIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';

const validator = require('gltf-validator');

function validateGLB(file:File | undefined,
    setValid: React.Dispatch<React.SetStateAction<boolean | null>>) {
    console.log("validateGLB")
    if (typeof file !== "undefined") {
        file.arrayBuffer()
        .then((buff) => {
            console.log(buff);
            let asset = new Uint8Array(buff);
            return asset;
        })
        .then((asset) => {
            return validator.validateBytes(asset);
        })
        .then((report) => {
            console.info('Validação bem-sucedida!', report);
            setValid(true);
        })
        .catch((error) => {
            console.error('Algum erro aconteceu na validação do arquivo', error);
            setValid(false);
        })
    } else {
        console.error('Arquivo indefinido');
        setValid(false);
    }
}


function UploadCard() {
    const [file, setFile] = useState<File>();
    const [valid, setValid] = useState<boolean|null>(null);
    const { data: session } = useSession();

    const inputFile = useRef(null);

    const openFileHandler = () => {
        //@ts-ignore
        inputFile.current.click();
    }

    const submitFile = async(username:string|null|undefined) => {
        if (!file || username == null || typeof username === "undefined") return;

        try {
            const data = new FormData();
            data.set('file', file);
            data.set('user', username);

            const res = await fetch('/api/upload/', {
                method: 'POST',
                body: data
            });

            if (!res.ok) throw new Error(await res.text());
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
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
                            Seja bem vindo.
                        </Heading>
                        <Text>Faça o upload de um aquivo <Kbd>GLB</Kbd> abaixo:</Text>
                        <input
                            type='file'
                            id='file'
                            ref={inputFile}
                            style={{display:'none'}}
                            onChange={(e) => {
                                setFile(e.target.files?.[0]);
                                validateGLB(e.target.files?.[0], setValid);
                            }}
                            />
                        <Button onClick={() => openFileHandler()}>
                            <FileIcon/> Selecionar arquivo
                        </Button>
                        <Text>Arquivo selecionado: <Kbd>{file ? file?.name : "Nenhum"}</Kbd></Text>
                        <Text style={{
                                display: valid != null ? "flex" : "none"
                            }} size="1"
                            color={valid ? 'green' : 'crimson'}>
                                {valid && <CheckIcon/>}
                                {!valid && <Cross2Icon/>}
                                <Strong>
                                    {valid && "Arquivo válido"}
                                    {!valid && "Arquivo inválido"}
                                </Strong>
                        </Text>
                        <Separator my="5" size="4" />
                        <Button disabled={!valid || !file} onClick={() => submitFile(session?.user?.name)}>
                            <UploadIcon/> Enviar
                        </Button>
                        <Button variant='outline'>
                            <HandIcon/> Gerenciar seus arquivos GLB
                        </Button>
                    </Flex>
                </Card>
            </Box>
        </Grid>
    )
}

export default UploadCard