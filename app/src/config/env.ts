interface EnvConfig {
  apiBaseUrl: string;
  useMockServices: boolean;
  mockApiDelay: number;
  mockTestUsername: string;
  mockTestPassword: string;
}

const envConfig: EnvConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
  useMockServices: import.meta.env.VITE_USE_MOCK_SERVICES === 'true',
  mockApiDelay: Number(import.meta.env.VITE_MOCK_API_DELAY) || 500,
  mockTestUsername: import.meta.env.VITE_MOCK_TEST_USERNAME || 'test',
  mockTestPassword: import.meta.env.VITE_MOCK_TEST_PASSWORD || 'test'
};

export default envConfig; 
