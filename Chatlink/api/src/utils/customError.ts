class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // calling the constructor of parent class (Error in this case)
    this.statusCode = statusCode;

    // maintains the stack trace which helps in debugging
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;
