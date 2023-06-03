declare global {
  namespace NodeJS {

    interface ProcessEnv {
      SERVER_PORT: number
      NODE_ENV: 'development' | 'test' | 'production'
      DB_NAME: string
      DB_USER: string
      DB_PASSWORD: string
      DB_HOST: string
      DB_DIALECT: string

    }
  }
}

export {}
