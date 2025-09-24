// Google OAuth 응답 타입 (실제 라이브러리 타입에 맞게 수정)
export interface GoogleCredentialResponse {
  credential?: string;
  clientId?: string;
}

// JWT 토큰에서 디코딩된 사용자 정보
export interface GoogleUserInfo {
  email: string;
  name: string;
  picture?: string;
  sub: string;
  aud: string;
  iss: string;
  exp: number;
  iat: number;
}

// 백엔드 API 응답 타입
export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_info: {
    email: string;
    name: string;
    user_id: string;
  };
}

// API 에러 타입
export interface ApiError {
  detail: string;
}
