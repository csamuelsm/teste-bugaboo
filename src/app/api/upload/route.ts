import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'
import { saveFile, fileExists } from '@/app/_utils/strapi';
import path from 'path';
import getConfig from 'next/config';

export async function POST(request: NextRequest) {
    console.log('upload POST')
    const data = await request.formData();
    const file:File | null = data.get('file') as unknown as File;
    const user:string = data.get('user') as string;

    if (!file) {
        return NextResponse.json({ sucess: false });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const p = `public/uploads/${file.name}`;
    console.log("Escrever arquivo")
    await writeFile(p, buffer);
    console.log(`Arquivo enviado para o caminho ${p}`);

    let exists = await fileExists(p, Number(user));
    if (!exists) {
        try {
            let fileSave = await saveFile(p, user);
            console.log("fileSavedInStrapi");
            return NextResponse.json({ success: true });
        } catch {
            return NextResponse.json({ sucess: false });
        }
    }
    return NextResponse.json({ sucess: false });
}