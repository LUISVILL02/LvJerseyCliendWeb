import { ResponseAuth, ResponseAuthAdapter} from "@app/featured/auth/model/responseAuth";
import { UserDecode, UserDecodeResponse } from "../model/userDecode";

export const authAdapter = (response: ResponseAuth): ResponseAuthAdapter => {
    return {
        accessToken: response.accessToken,
        refreshToken: response.refreshToken
    };
}

export const decodeUserTokenAdapter = (userDecode: UserDecodeResponse): UserDecode => {
    return {
        idUser: userDecode.idUser,
        email: userDecode.email,
        nickname: userDecode.nickname,
        rol: userDecode.rol
    }
}