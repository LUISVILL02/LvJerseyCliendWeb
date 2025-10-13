export type role = 'ADMIN' | 'USER';

export interface UserDecode {
    idUser: number;
    email: string;
    nickname: string,
    rol: role;
}

export interface UserDecodeResponse {
    idUser: number;
    email: string;
    nickname: string,
    rol: role;
}