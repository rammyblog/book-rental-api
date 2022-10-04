declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      saltWorkFactor: number;
    }
  }
}

export {};
