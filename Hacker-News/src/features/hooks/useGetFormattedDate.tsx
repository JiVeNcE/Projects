export const useGetFormattedDate = (timestamp: number) => {
  return new Date(timestamp).toISOString().substring(0, 10);
};
