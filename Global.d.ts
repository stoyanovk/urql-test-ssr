declare module "*.svg";
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare global {
  interface Window {
    [key: string]: any;
  }
}

export {};
