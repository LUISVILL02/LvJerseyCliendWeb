import { GoogleOAuthError } from "./socialModels";

// Interfaces para OAuth2 (no las estamos usando actualmente)
export interface GoogleOAuth2TokenClient {
  requestAccessToken(): void;
}

export interface GoogleOAuth2CodeClient {
  requestCode(): void;
}

export interface GoogleOAuth2Config {
  client_id: string;
  scope: string;
  ux_mode?: 'popup' | 'redirect';
  callback: (response: { code: string }) => void;
  error_callback?: (error: GoogleOAuthError) => void;
}

export interface GoogleAccounts {
  id: {
    prompt(callback?: (notification: GooglePromptNotification) => void): void;
    renderButton(parent: HTMLElement): void;
    cancel(): void;
  };
  oauth2: {
    initCodeClient(config: GoogleOAuth2Config): GoogleOAuth2CodeClient;
    initTokenClient(config: GoogleOAuth2Config): GoogleOAuth2TokenClient;
  };
}


export interface GooglePromptNotification {
  isNotDisplayed(): boolean;
  isSkippedMoment(): boolean;
  isDismissedMoment(): boolean;
}

declare global {
  interface Window {
    google?: {
      accounts: GoogleAccounts;
    };
  }
}