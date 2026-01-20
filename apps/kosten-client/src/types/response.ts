interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: string;
}

export { type ApiResponse };
