import React, { useRef, useState } from 'react'
import { Callout, Link, Card, Box, Grid, Heading, Text, Kbd, Button, Separator, Flex, Strong } from '@radix-ui/themes';
import { FileIcon, UploadIcon, HandIcon, CheckIcon, Cross2Icon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import { CheckCircledIcon, CrossCircledIcon } from '@radix-ui/react-icons';

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
                    O arquivo foi salvo com sucesso!
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
                    O arquivo já existe ou não foi possível salvar o arquivo.
                </Callout.Text>
            </Callout.Root>
        </Flex>
    )
}


function UploadCard() {
    const [file, setFile] = useState<File>();
    const [valid, setValid] = useState<boolean|null>(null);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
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

            const resData = await res.json();
            console.log(resData);
            if (resData.success) {
                console.log("Sucesso");
                setSuccess(true);
                setError(false);
                setFile(undefined);
                setValid(null);
                setTimeout(() => {
                    setSuccess(false);
                }, 10000);
            }else if (!resData.success || !res.ok) {
                console.log("Erro");
                setError(true);
                setSuccess(false);
                setFile(undefined);
                setValid(null);
                setTimeout(() => {
                    setError(false);
                }, 10000);
            }
        } catch (e: any) {
            console.log("Erro");
            setError(true);
            setSuccess(false);
            setFile(undefined);
            setValid(null);
            setTimeout(() => {
                setError(false);
            }, 10000);
        }
    }

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
                        <Link href='/glb_manager'>
                            <Button variant='outline'>
                                <HandIcon/> Gerenciar seus arquivos GLB
                            </Button>
                        </Link>
                    </Flex>
                </Card>
            </Box>
        </Grid>
        <SuccessCallout open={success} onOpenChange={setSuccess}/>
        <ErrorCallout open={error} onOpenChange={setError}/>
        </>
    )
}

export default UploadCard