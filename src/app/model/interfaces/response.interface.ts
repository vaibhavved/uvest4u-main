
/**
 * Response with success and optional status
 */
export type Response = {
  success: boolean;
  status?: number;
};

export type ResponseOnlyData = {

}

/**
 * Response with data
 */
export type ResponseData<T> = Response & { data: T };

/**
 * Response with message
 */
export type ResponseMessage = Response & { message: string };

/**
 * Response with count
 */
export type ResponseCount = Response & { count: number };

/**
 * Count without Response
 */
export type CountWithoutResponse = { data: number };

/**
 * Response with id
 */
export type ResponseId = Pick<Response, 'success'> & { id: number };

/**
 * Response with optional code
 */
export type ResponseCode = Pick<Response, 'success'> & { code?: number };

/**
 * Special case for optional data and message
 */
export type ResponseDataOrMessage<T> = Pick<Response, 'success'> & { data?: T; message?: string };

/**
 * Special case for optional data or message without success
 */
export type DataOrMessage<T> = { data?: T; message?: string };

/**
 * Special case for data or success without message
 */
export type DataOrSuccess<T> = ResponseData<T> & Response;

/**
 * Special case for optional data and code
 */
export type ResponseDataOrCode = ResponseCode & { data?: boolean };

/**
 * Special case for data as string and code should be optional
 */
export type ResponseDataCode = ResponseCode & { data: string };

/**
 * Specific case for optional message and code
 */
export type ResponseMessageOrCode = ResponseCode & { message?: string };

/**
 * Response with generic `data` property only
 */
export type Data<T> = { data: T };

/**
 * Specific for google login response
 */
// export type ResponseGoogleLogin = Pick<Response, 'success'> & {
//   body?: unknown;
//   login?: IUserLoginSuccess;
//   mode: GoogleLoginMode;
//   success: boolean;
// };

/**
 * Specific for O365 login response
 */
// export type ResponseO365SSO = Pick<Response, 'success'> & {
//   activationCode?: string;
//   body?: M365ExistingDomainBody;
//   login?: IUserLoginSuccess;
//   mode: O365LoginMode;
//   userId?: string;
// };

/**
 * Specific for message type
 */
export type ResponseMessageType = { message: boolean };

/**
 * Specific for refresh token
 */
export type ResponseMessageToken = Pick<ResponseMessage, 'success' & 'message'> & { token: string };

/**
 * @deprecated Use `Response` Instead
 */
export interface IResponse {
  status?: number;
  success: boolean;
}

/**
 * @deprecated Use `ResponseCount` Instead
 */
export interface IResponseCount {
  count: number;
  status?: number;
  success: boolean;
}

/**
 * @deprecated Use `ResponseData` Instead
 */
export interface IResponseData<T> {
  success: boolean;
  data: T;
  status?: number;
}

/**
 * @deprecated Use `ResponseId` Instead
 */
export interface IResponseId {
  id: number;
  success: boolean;
}

/**
 * @deprecated Use `ResponseMessage` Instead
 */
export interface IResponseMessage {
  message: string;
  status?: number;
  success: boolean;
}

/**
 * @deprecated Use `ResponseDataOrCode` Instead
 */
export interface IResponseMessageCode {
  code?: number;
  data?: boolean;
  success: boolean;
}

/**
 * @deprecated Use `ResponseDataCode` Instead
 */
export interface IResponseMessageStatus {
  code?: number;
  data: string;
  success: boolean;
}

/**
 * @deprecated Use `ResponseMessageType` Instead
 * Delete campaigns api response
 */
export interface IResponseMessageType {
  message: boolean;
}

/**
 * @deprecated Use `ResponseMessageToken` Instead
 */
export interface ResponseToken {
  message: string;
  success: boolean;
  token: string;
}

/**
 * Response of CRM error response while getting connection details
 */
export type ResponseDataMessageError<T> = Pick<ResponseData<T>, 'data' | 'success'> & {
  error?: string;
  message?: string;
};
