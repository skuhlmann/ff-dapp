export {};

declare global {
  interface Window {
    Vinoshipper?: {
      init: (id: number, options?: { cartButton?: boolean }) => void;
      refresh?: () => void;
    };
  }
}
