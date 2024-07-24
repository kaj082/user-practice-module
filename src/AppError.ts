class AppError extends Error {
  public errorCode: number;
  public messageCode?: string;

  constructor(errorCode: number, message: string, messageCode?: string) {
    super(message);
    this.errorCode = errorCode;
    this.messageCode = messageCode;
  }
}

export default AppError;
