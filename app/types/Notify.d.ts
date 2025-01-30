interface NotifyProps {
    type?: 'error' | 'success';
    description?: any;
    open: boolean;
    title?: string;
  };

  type setNotify = (notify: NotifyProps) => void;