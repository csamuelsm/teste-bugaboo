import Strapi from "strapi-sdk-js";

let config = {
    url: process.env.NEXT_PUBLIC_STRAPI_URL,
    prefix: '/api',
    store: {
        key: 'strapi_jwt',
        useLocalStorage: false,
        cookieOptions: {path: '/'},
    },
    axiosOptions: {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_TOKEN}`,
            'Content-Type': 'application/json',
        }
    }
}

const strapi = new Strapi(config);

export async function getUsers() {
    /*
    Função para retornar uma lista de usuários no banco de dados
    */
    strapi.find('usuarios')
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log('Erro: ', error);
    })
}

export async function getUser(username:string, pass:string){
    /*
    Função para fazer a query de um usuário
    */
   //console.log("Strapi getUser: ", username, pass)
   return strapi.find('usuarios', {
    filters: {
        usuario: {
            $eq: username
        },
        pass: {
            $eq: pass
        }
    }
   })
   .then((data) => {
        return data;
   })
   .catch((error) => {
        throw Error(error);
   })
}

export async function getUserByUsername(username:string){
    /*
    Função para fazer a query de um usuário
    */
   //console.log("Strapi getUser: ", username, pass)
   return strapi.find('usuarios', {
    filters: {
        usuario: {
            $eq: username
        }
    }
   })
   .then((data) => {
        return data;
   })
   .catch((error) => {
        throw Error(error);
   })
}

export async function createUser(user:string, encryptedPass:string) {
    /*
    Função para criar um usuário com o username e a senha dadas
    */
    return strapi.create('usuarios', {
        usuario:user,
        pass:encryptedPass
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        throw Error(error);
    })
}

export async function saveFile(path:string, user:string) {
    /*
    Função para criar um usuário com o username e a senha dadas
    */
    console.log("saveFile", path, user);
    return strapi.create('arquivos', {
        path:path,
        usuario: {
            connect: [Number(user)]
        }
    })
    .then((data) => {
        return data;
    })
    .catch((error) => {
        throw Error(error);
    })
}

export async function fileExists(path:string) {
    return strapi.find('arquivos', {
        filters: {
            path: {
                $eq: path
            }
        }
    })
    .then((data) => {
        if (Array.isArray(data.data) && data.data.length > 0) return true;
        else return false;
    })
    .catch((error) => {
        throw Error(error);
    })
}