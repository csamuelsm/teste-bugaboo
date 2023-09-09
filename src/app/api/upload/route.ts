import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { saveFile, fileExists } from '@/app/_utils/strapi';
import path from 'path';
import getConfig from 'next/config';

export async function POST(request: NextRequest) {
    // Recebemos um arquivo através de uma requisição POST
    console.log('upload POST')
    const data = await request.formData();
    const file:File | null = data.get('file') as unknown as File; // arquivo
    const user:string = data.get('user') as string; //usuário

    if (!file) {
        // Caso o arquivo seja indefinido retornamos sem sucesso
        return NextResponse.json({ sucess: false });
    }

    // obtendo o buffer de bytes do arquivo
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // o arquivo será salvo na pasta public/uploads/ que fica na raiz
    const p = `public/uploads/${file.name}`;
    console.log("Escrever arquivo")
    await writeFile(p, buffer);
    console.log(`Arquivo enviado para o caminho ${p}`);

    // aqui vamos verificar se o arquivo já existe no banco de dados
    // para evitar duplicatas de arquivos iguais salvos no banco
    let exists = await fileExists(p, Number(user));
    if (!exists) {
        // se o arquivo não existir rentamos salvá-lo no banco
        // retornamos sucesso se der tudo certo
        // caso contrário retornamos sem sucesso
        try {
            let fileSave = await saveFile(p, user);
            console.log("fileSavedInStrapi");
            return NextResponse.json({ success: true });
        } catch {
            return NextResponse.json({ sucess: false });
        }
    }

    // caso o arquivo já exista no banco de dados
    // retornamos a requisição sem sucesso
    return NextResponse.json({ sucess: false });
}