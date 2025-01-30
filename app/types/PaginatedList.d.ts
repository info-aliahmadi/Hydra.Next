class PaginatedList<T= MRT_RowData> {
    pageIndex: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    items: T[];
  
    constructor(items: T[], totalItems: number, pageIndex: number, pageSize: number) {
      this.pageIndex = pageIndex;
      this.pageSize = pageSize;
      this.totalPages = Math.ceil(totalItems / pageSize);
      this.totalItems = totalItems;
      this.items = items.slice(0, pageSize);
    }
  
    // This is for serialization.
    private constructor() {
      this.pageIndex = 0;
      this.pageSize = 0;
      this.totalPages = 0;
      this.totalItems = 0;
      this.items = [];
    }
  }