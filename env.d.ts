declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      saltWorkFactor: string;
      DBURI: string;
      TOKEN_SECRET: string;
    }
  }
}

export {}
