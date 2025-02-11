interface MenuItem {
    id: string;
    title: string;
    type: string;
    url?: string | undefined;
    icon?: any;
    breadcrumbs?: boolean;
    permission?: string | null;
    target?: string;
    external?: boolean;
    disabled? : boolean
    children? : MenuItem[];
    chip?: {
      color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
      variant?: 'filled' | 'outlined';
      size?: 'small' | 'medium';
      label?: string;
      avatar?: string;
    };
  }
