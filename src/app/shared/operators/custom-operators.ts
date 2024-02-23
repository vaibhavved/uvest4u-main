import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  OperatorFunction,
  pipe,
  UnaryFunction
} from 'rxjs';
import {
  CountWithoutResponse,
  Data,
  DataOrMessage,
  DataOrSuccess,
  IResponse,
  IResponseId,
  IResponseMessage,
  IResponseMessageCode,
  IResponseMessageStatus,
  IResponseMessageType,
  Response,
  ResponseCount,
  ResponseData,
  ResponseMessageOrCode,
  ResponseOnlyData
} from 'src/app/model/interfaces/response.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomOperators {
  constructor() {}

  /**
   * Extract the data that used with response types `ResponseData<T>`
   * @returns Data of api response
   */
  extractResponseData(): <T>(source: Observable<ResponseData<T>>) => Observable<T> {
    return <T>(source: Observable<ResponseData<T>>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          if (value.data === null) {
            return {} as T;
          }
          return value.data;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * 
   * @returns only string response
   */
  extractResponseWithString(): (source: Observable<string>) => Observable<string> {
    return (source: Observable<string>) => {
      return source.pipe(
        map(value => {
          if (!value) throw new Error("Something went wrong, Please try again or reload the browser");
          // if (value.data === null) {
          //   return {} as T;
          // }
          return value;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }
/**
 * 
 * @returns simple reponse without property
 */
  extractResponseOnly(): <T> (source: Observable<T>) => Observable<T> {
    return <T>(source: Observable<T>) => {
      return source.pipe(
        map(value => {
          if (!value) throw new Error("Something went wrong, Please try again or reload the browser");
          // if (value.data === null) {
          //   return {} as T;
          // }
          return value;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the response that used with response types `IResponse`
   * @returns The api response
   */
  extractResponse(): (source: Observable<Response>) => Observable<true> {
    return (source: Observable<Response>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          return value.success;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the count that used with response types `ResponseCount`
   * @returns The count of api response
   */
  extractResponseCount(): (source: Observable<ResponseCount>) => Observable<number> {
    return (source: Observable<ResponseCount>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          return value.count;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the count that used with response types `CountWithoutResponse`
   * @returns The count of api response
   */
  extractCount(): (source: Observable<CountWithoutResponse>) => Observable<number> {
    return (source: Observable<CountWithoutResponse>) => {
      return source.pipe(
        map(value => {
          if (!value) throw new Error("Something went wrong, Please try again or reload the browser");
          return value.data;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the message and success status that used with response types `IResponseMessage`
   * @returns The success amd message of api response
   */
  extractResponseMessage(): (source: Observable<IResponseMessage>) => Observable<IResponseMessage> {
    return (source: Observable<IResponseMessage>) => {
      return source.pipe(
        map(value => {
          if (!value.success && value.message === 'ADMIN_ALREADY_EXISTING') {
            throw new Error('ADMIN_ALREADY_EXISTING');
          } else if (!value.success) {
            throw new Error("Something went wrong, Please try again or reload the browser");
          }
          // FIXME throwing a successful response makes no sense
          // if (value.message) {
          //   throw new Error(value.message);
          // }
          return value;
        }),
        catchError((err: HttpErrorResponse) => {
          throw new Error(err.message);
        })
      );
    };
  }

  /**
   * Extract the unknown response that used with response types `unknown`
   * @returns The api response
   */
  extractUnknownResponse(): (source: Observable<unknown>) => Observable<unknown> {
    return (source: Observable<unknown>) => {
      return source.pipe(
        map(value => {
          if (!value) throw new Error("Something went wrong, Please try again or reload the browser");
          return value;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the message or success status that used with response types `IResponse` or `IResponseMessage`
   * @returns The api response
   */
  extractResponseOrMessage(): (
    source: Observable<IResponse | IResponseMessage>
  ) => Observable<IResponse | IResponseMessage> {
    return (source: Observable<IResponse | IResponseMessage>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          return value;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the id and success status that used with response types `IResponseId`
   * @returns The api response
   */
  extractResponseId(): (source: Observable<IResponseId>) => Observable<number> {
    return (source: Observable<IResponseId>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          return value.id;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the code,data and success status that used with response types `IResponseMessageCode`
   * @returns The api response
   */
  // extractResponseMessageCode(): (source: Observable<IResponseMessageCode>) => Observable<IResponseMessageCode> {
  //   return (source: Observable<IResponseMessageCode>) => {
  //     return source.pipe(
  //       map(value => {
  //         if (value.code === 9) {
  //           throw this.alert.translate('ADMIN_ACCOUNT_ALREADY_EXISTING');
  //         } else if (value.code === 1) {
  //           throw this.alert.translate('TECHNISCHER_FEHLER');
  //         } else if (!value.success && value.code !== 10) {
  //           throw new Error("Something went wrong, Please try again or reload the browser");
  //         }
  //         return value;
  //       }),
  //       catchError(e => {
  //         throw new Error(e);
  //       })
  //     );
  //   };
  // }

  /**
   * Extract the code,data and success status that used with response types `IResponseMessageStatus`
   * @returns The api response
   */
  extractResponseMessageStatus(): (source: Observable<IResponseMessageStatus>) => Observable<IResponseMessageStatus> {
    return (source: Observable<IResponseMessageStatus>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          return value;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the login,mode and success status that used with response types `ResponseGoogleLogin`
   * @returns The api response
   */
  // extractResponseGoogleLogin(): (source: Observable<ResponseGoogleLogin>) => Observable<ResponseGoogleLogin> {
  //   return (source: Observable<ResponseGoogleLogin>) => {
  //     return source.pipe(
  //       map(result => {
  //         if (!result.success) throw "Something went wrong, Please try again or reload the browser";
  //         return { mode: result.mode, login: result.login, body: result.body, success: result.success };
  //       }),
  //       catchError(() => {
  //         throw new Error("Something went wrong, Please try again or reload the browser");
  //       })
  //     );
  //   };
  // }

  /**
   * Extract the login,mode and success status that used with response types `ResponseO365SSO<T>`
   * @returns The api response
   */
  // extractResponseO365SSO(): (source: Observable<ResponseO365SSO>) => Observable<ResponseO365SSO> {
  //   return (source: Observable<ResponseO365SSO>) => {
  //     return source.pipe(
  //       map(result => {
  //         if (!result.success) throw "Something went wrong, Please try again or reload the browser";
  //         return {
  //           activationCode: result.activationCode,
  //           body: result.body,
  //           login: result.login,
  //           mode: result.mode,
  //           success: result.success,
  //           userId: result.userId
  //         };
  //       }),
  //       catchError(() => {
  //         throw new Error("Something went wrong, Please try again or reload the browser");
  //       })
  //     );
  //   };
  // }

  /**
   * Extract the message status that used with response types `IResponseMessageType`
   * @returns The api response
   */
  extractResponseMessageType(): (source: Observable<IResponseMessageType>) => Observable<IResponseMessageType> {
    return (source: Observable<IResponseMessageType>) => {
      return source.pipe(
        map(value => {
          if (!value) throw new Error("Something went wrong, Please try again or reload the browser");
          return value;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Filters a string observable based on a provided string length
   * @param searchLength - The length of the string to filter
   * @returns String observable that passes the predicate
   */
  filterSearchString(searchLength: number): (source: Observable<string>) => Observable<string> {
    return (source: Observable<string>) => {
      return source.pipe(
        filter(source => source.length >= searchLength),
        distinctUntilChanged(),
        debounceTime(250)
      );
    };
  }

  /**
   * Extract the message, code and success status that used with response types `ResponseMessageOrCode`
   * @returns The success, code amd message of api response
   */
  extractResponseMessageStatusCode(): (source: Observable<ResponseMessageOrCode>) => Observable<ResponseMessageOrCode> {
    return (source: Observable<ResponseMessageOrCode>) => {
      return source.pipe(
        map(value => value),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the data that used with response types `DataOrSuccess<T>`
   * @returns Data of api response
   */
  extractResponseDataOrSuccess(): <T>(source: Observable<DataOrSuccess<T>>) => Observable<T> {
    return <T>(source: Observable<DataOrSuccess<T>>) => {
      return source.pipe(
        map(value => {
          if (!value.success) throw new Error("Something went wrong, Please try again or reload the browser");
          return value.data;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the data that used with response types `DataOrMessage<T>`
   * @returns Data of api response
   */
  extractResponseDataOrMessage(): <T>(source: Observable<DataOrMessage<T>>) => Observable<T> {
    return <T>(source: Observable<DataOrMessage<T>>) => {
      return source.pipe(
        map(value => {
          if (!value.data) {
            throw new Error("Something went wrong, Please try again or reload the browser");
          }
          return value.data;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Extract the success or data or message `ResponseMessageOrCode`
   * @returns Data of api response
   */
  extractResponseSuccessOrMessage(): (source: Observable<ResponseMessageOrCode>) => Observable<ResponseMessageOrCode> {
    return (source: Observable<ResponseMessageOrCode>) => {
      return source.pipe(
        map(result => {
          if (!result.success) throw new Error(result.message);

          return result;
        }),
        catchError((e: ResponseMessageOrCode) => {
          if (e.message === 'RETRY_AFTER_ONE_HOUR') {
            throw new Error('RETRY_AFTER_ONE_HOUR');
          } else {
            throw new Error("Something went wrong, Please try again or reload the browser");
          }
        })
      );
    };
  }

  /**
   * Extract the `data` property from the response
   * @returns Data of api response
   */
  extractData(): <T>(source: Observable<Data<T>>) => Observable<T> {
    return <T>(source: Observable<Data<T>>) => {
      return source.pipe(
        map(value => {
          if (!value.data) {
            throw new Error("Something went wrong, Please try again or reload the browser");
          }
          return value.data;
        }),
        catchError(() => {
          throw new Error("Something went wrong, Please try again or reload the browser");
        })
      );
    };
  }

  /**
   * Filters nullish values
   * @returns Values with `null` or `undefined` filtered out
   */
  filterNullish<T>(): UnaryFunction<Observable<T | null | undefined>, Observable<T>> {
    return pipe(filter(x => x != null) as OperatorFunction<T | null | undefined, T>);
  }

  /**
   * Filters confirmed only
   * @returns Return if confirmed
   */
  filterConfirmed(): (isConfirm: Observable<boolean>) => Observable<boolean> {
    return isConfirm => {
      return isConfirm.pipe(filter(isConfirm => !!isConfirm));
    };
  }

  /**
   * Given an observable of array, filters nullish and empty array values
   * @returns Observable with nullish and empty array values filtered out
   */
  filterSelectedItems<T>(): (source: Observable<T[]>) => Observable<T[]> {
    return source => {
      return source.pipe(
        this.filterNullish(),
        filter(source => source.length > 0)
      );
    };
  }
}
