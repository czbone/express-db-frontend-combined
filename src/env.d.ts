declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: string
    readonly SERVER_PORT: string
    readonly HOST_URL: string
    readonly MONGO_URI: string
  }
}
