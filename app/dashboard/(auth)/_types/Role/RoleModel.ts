interface RoleModel {
    id: number;
    name: string;
    normalizedName: string;
    concurrencyStamp: string;
    permissions: Permission[];
  }