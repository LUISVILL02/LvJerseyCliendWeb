export type Role = 'ADMIN' | 'USER';

export interface UserDecode {
    idUser: number;
    email: string;
    nickname: string,
    role: Role;
}

export interface UserDecodeResponse {
    idUser: number;
    email: string;
    nickname: string,
    role: Role;
}