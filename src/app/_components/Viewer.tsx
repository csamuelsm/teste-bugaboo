import React from 'react'
import "@google/model-viewer";
import { Heading, Text, Kbd, Button, Link } from '@radix-ui/themes';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

type ViewerProps = {
    glb_file:string
}

function Viewer({ glb_file } : ViewerProps) {
  /*
  Recebe o arquivo GLb e renderiza
  utilizando o model-viewer
  */
  return (
    <div>
        <Heading>
            Visualizador de GLB
        </Heading>
        <Text>Visualizando arquivo: <Kbd>{glb_file}</Kbd></Text>
        <div style={{
            margin:"3em auto",
            display: "flex",
            flexDirection: "column",
            borderRadius: "6px",
            boxShadow: "0 3px 10px rgba(0, 0, 0, 0.25)",
            height: "100%",
            border: "1px solid black"
        }}>
            {/*
            //@ts-ignore */}
            <model-viewer
                alt="Seu modelo GLB"
                src={`/uploads/${glb_file}`}
                ar
                shadow-intensity="1"
                camera-controls
                touch-action="pan-y"
                ar-modes="webxr scene-viewer quick-look"
                style={{
                    height: 400
                }}
            >

            {/*
            //@ts-ignore */}
            </model-viewer>
        </div>

        <Link href='/glb_manager'>
            <Button variant='outline'>
                <ArrowLeftIcon/>
                Retornar ao gerenciador
            </Button>
        </Link>
    </div>
  )
}

export default Viewer