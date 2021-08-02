export class User {
    cod_prod: string;
    session_id: string;
    token: string;

    constructor(cod_prod, session_id, token){
        this.cod_prod = cod_prod;
        this.session_id = session_id;
        this.token = token;
    }
}