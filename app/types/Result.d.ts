
export default class Result<T> {
    status: ResultStatusEnum;
    errors: Error[];
    message?: string;
    data?: T;
  
    constructor() {
      this.status = ResultStatusEnum.Succeeded;
      this.errors = [];
    }
  
    get succeeded(): boolean {
      return this.status === ResultStatusEnum.Succeeded;
    }
  
    get statusDescription(): string {
      return this.status.description();
    }
  }
  
  export enum ResultStatusEnum {
    Succeeded = 200,
    Failed = 500,
    InvalidValidation = 501,
    NotFound = 404,
    IsNotAuthorized = 401,
    IsNotAllowed = 502,
    ItsDuplicate = 503,
    ExceptionThrowed = 504,
    FileIsTooLarge = 505,
    FileIsTooSmall = 506,
    RequiresTwoFactor = 507,
    IsLockedOut = 508
  }
  
  export namespace ResultStatusEnum {
    const descriptions: { [key in ResultStatusEnum]: string } = {
      [ResultStatusEnum.Succeeded]: "Succeeded",
      [ResultStatusEnum.Failed]: "Failed",
      [ResultStatusEnum.InvalidValidation]: "Invalid Validation",
      [ResultStatusEnum.NotFound]: "Not Found",
      [ResultStatusEnum.IsNotAuthorized]: "Is Not Authorized",
      [ResultStatusEnum.IsNotAllowed]: "Is Not Allowed",
      [ResultStatusEnum.ItsDuplicate]: "It's Duplicate",
      [ResultStatusEnum.ExceptionThrowed]: "Exception Throwed",
      [ResultStatusEnum.FileIsTooLarge]: "File Is Too Large",
      [ResultStatusEnum.FileIsTooSmall]: "File Is Too Small",
      [ResultStatusEnum.RequiresTwoFactor]: "Requires Two Factor",
      [ResultStatusEnum.IsLockedOut]: "User Is Locked"
    };
  
    export function description(val: ResultStatusEnum): string {
      return descriptions[val] || '';
    }
  }
  
  export class Error {
    property: string;
    description: string;
  
    constructor(property: string, description: string) {
      this.property = property;
      this.description = description;
    }
  }