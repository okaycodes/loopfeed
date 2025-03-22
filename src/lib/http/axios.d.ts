import * as axios from "axios";

declare module "axios" {
  interface AxiosResponse<T = any> {
    error: boolean;
    message: string;
  }
}
