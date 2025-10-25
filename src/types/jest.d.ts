/// <reference types="jest" />

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveLength(length: number): R;
    }
  }
}

export {};
