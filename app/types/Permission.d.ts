interface Permission {
  id?: number;
  name?: string;
  normalizedName?: string | null;
}
interface AuthorizationContextType {
  permissions: string[] | null;
  loading: boolean;
}