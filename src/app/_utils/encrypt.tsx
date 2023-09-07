var sha256 = require('sha256');

export function encryptPass(pass:string) {
    // recebe uma string e criptografa ela
    // assim, enviamos a senha criptografada para o servidor
    return sha256(pass);
}