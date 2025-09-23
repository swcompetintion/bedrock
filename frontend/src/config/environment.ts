// 환경 타입 정의
export type Environment = 'development' | 'production' | 'staging';

// 환경별 설정 인터페이스
export interface EnvironmentConfig {
  environment: Environment;
  googleClientId: string;
  apiBaseUrl: string;
  frontendUrl: string;
  isDevelopment: boolean;
  isProduction: boolean;
  enableLogging: boolean;
}

// 현재 환경 감지
export const getCurrentEnvironment = (): Environment => {
  // NODE_ENV 우선 확인
  if (process.env.NODE_ENV === 'production') {
    return 'production';
  }
  if (process.env.NODE_ENV === 'development') {
    return 'development';
  }
  
  // REACT_APP_ENVIRONMENT 확인
  const reactEnv = process.env.REACT_APP_ENVIRONMENT as Environment;
  if (reactEnv && ['development', 'production', 'staging'].includes(reactEnv)) {
    return reactEnv;
  }
  
  // localhost 확인
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
    return 'development';
  }
  
  // 기본값은 production (안전한 기본값)
  return 'production';
};

// 환경별 기본 설정
const environmentDefaults: Record<Environment, Partial<EnvironmentConfig>> = {
  development: {
    apiBaseUrl: 'http://localhost:8000',
    frontendUrl: 'http://localhost:3000',
    enableLogging: true,
  },
  staging: {
    apiBaseUrl: 'https://staging-api.your-domain.com',
    frontendUrl: 'https://staging.your-domain.com',
    enableLogging: true,
  },
  production: {
    apiBaseUrl: 'https://api.your-domain.com',
    frontendUrl: 'https://your-domain.com',
    enableLogging: false,
  },
};

// 환경변수 로드 및 검증
export const getEnvironmentConfig = (): EnvironmentConfig => {
  const environment = getCurrentEnvironment();
  const defaults = environmentDefaults[environment];
  
  // 환경변수에서 값 가져오기 (환경변수가 우선)
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || defaults.apiBaseUrl;
  const frontendUrl = process.env.REACT_APP_FRONTEND_URL || defaults.frontendUrl;
  const enableLogging = process.env.REACT_APP_ENABLE_LOGGING === 'true' || defaults.enableLogging || false;

  // 필수 값 검증
  if (!googleClientId) {
    throw new Error(`REACT_APP_GOOGLE_CLIENT_ID is required for ${environment} environment`);
  }
  if (!apiBaseUrl) {
    throw new Error(`API Base URL is not configured for ${environment} environment`);
  }
  if (!frontendUrl) {
    throw new Error(`Frontend URL is not configured for ${environment} environment`);
  }

  const config: EnvironmentConfig = {
    environment,
    googleClientId,
    apiBaseUrl,
    frontendUrl,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    enableLogging,
  };

  // 개발환경에서 설정 로깅
  if (config.isDevelopment && config.enableLogging) {
    console.log('🔧 Environment Config:', {
      environment: config.environment,
      apiBaseUrl: config.apiBaseUrl,
      frontendUrl: config.frontendUrl,
      enableLogging: config.enableLogging,
    });
  }

  return config;
};

// 전역 설정 객체
export const config = getEnvironmentConfig();
