'use client';
import React from 'react';

import { useRouter } from 'next/navigation';
import Pagination from '@mui/material/Pagination';

export default function PostPagination({url , totalPages, page }) {
  const router = useRouter();

  const handlePageChange = (event, value) => {
    router.push(url +value);
  };

  return <Pagination count={totalPages} page={page} size="large" onChange={handlePageChange} />;
}
