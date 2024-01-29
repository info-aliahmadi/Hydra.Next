// ===============================|| COLOR BOX ||=============================== //

export const renderColor = (m) => {
  switch (m) {
    case 0:
      return 'primary';
    case 1:
      return 'success';
    case 2:
      return 'warning';
    case 3:
      return 'error';
    default:
      return 'default';
  }
};
export const renderTitle = (m) => {
  switch (m) {
    case 0:
      return 'private';
    case 1:
      return 'public';
    case 2:
      return 'contact';
    case 3:
      return 'request';
    default:
      return 'default';
  }
};

export const MessageTypes = [
  { id: 0, title: 'private' },
  { id: 1, title: 'public' },
  { id: 2, title: 'contact' },
  { id: 3, title: 'request' }
];
