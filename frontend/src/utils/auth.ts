import { GoogleUserInfo } from '../types/auth';

/**
 * JWT 토큰을 디코딩하여 사용자 정보 추출
 * @param token JWT 토큰
 * @returns 디코딩된 사용자 정보
 */
export const decodeJwtToken = (token: string): GoogleUserInfo => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) {
      throw new Error('Invalid token format');
    }

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    const userInfo: GoogleUserInfo = JSON.parse(jsonPayload);
    
    // 필수 필드 검증
    if (!userInfo.email || !userInfo.name || !userInfo.sub) {
      throw new Error('Invalid user info in token');
    }

    return userInfo;
  } catch (error) {
    console.error('Token decoding failed:', error);
    throw new Error('Failed to decode user token');
  }
};

/**
 * 이메일에서 사용자 ID 추출
 * @param email 사용자 이메일
 * @returns 사용자 ID (이메일의 @ 앞부분)
 */
export const extractUserIdFromEmail = (email: string): string => {
  const userId = email.split('@')[0];
  if (!userId) {
    throw new Error('Invalid email format');
  }
  return userId;
};
