interface Notify {
    type: 'error' | 'success';
    description?: any;
    open: boolean;
    title?: string;
  };

  type setNotify = (notify: Notify) => void;