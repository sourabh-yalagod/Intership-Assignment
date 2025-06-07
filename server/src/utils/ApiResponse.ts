class ApiResponse {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly data: Object;
  public readonly success: boolean;
  constructor(statusCode: number, message: string, data: Object) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.success = statusCode >= 200 && statusCode < 300;
  }
}
export { ApiResponse };
