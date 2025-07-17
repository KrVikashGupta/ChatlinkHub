import { User } from "./user";

declare global {
  namespace Express {
    interface Request {
      user?: User; // define user as an optional property of type user
    }
  }
}
