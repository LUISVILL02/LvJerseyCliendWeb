export interface GoogleCompleteAuthResponse {
  id_token: string;
}

export interface GoogleOAuthError {
  type: 'popup_closed' | 'popup_blocked' | 'invalid_client' | 'access_denied';
  details?: string;
}

export interface UserInfoBackend {
  tokenId: string;
  provider: string;
}

