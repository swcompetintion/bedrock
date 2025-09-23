// 환경 설정을 environment.ts로 이동했습니다.
// 하위 호환성을 위해 이 파일을 유지하되, environment.ts를 re-export합니다.

export { 
  config, 
  getEnvironmentConfig as getAppConfig,
  type EnvironmentConfig as AppConfig,
  getCurrentEnvironment 
} from './environment';
