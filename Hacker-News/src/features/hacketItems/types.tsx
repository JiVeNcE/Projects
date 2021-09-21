export declare module HackerItemsTypes {
  interface State {
    items: HackerItems[];
    authors: Record<string, Author>;
    isLoading: boolean;
  }
  type HackerItems = {
    by: string;
    id: number;
    score: number;
    time: number;
    title: string;
    url: string;
  };

  interface Author {
    id: number;
    karma: string;
  }
}
