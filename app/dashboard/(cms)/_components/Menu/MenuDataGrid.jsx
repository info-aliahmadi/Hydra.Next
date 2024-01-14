import { Box, Button, IconButton, Tooltip, Typography } from '@mui/material';

import MainCard from '@dashboard/_components/MainCard';
import TableCard from '@dashboard/_components/TableCard';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MaterialTable from '@dashboard/_components/MaterialTable/MaterialTable';
import { Edit, Menu, Add, Delete, Save } from '@mui/icons-material';
import Notify from '@dashboard/_components/@extended/Notify';
import { Stack } from '@mui/system';
import MenuService from '@dashboard/(cms)/_service/MenuService';
import AddOrEditMenu from './AddOrEditMenu';
import DeleteMenu from './DeleteMenu';
import { useSession } from 'next-auth/react';

function MenuDataGrid() {
  const [t] = useTranslation();
  const { data: session } = useSession();
  const jwt = session?.user?.accessToken;

  const menuService = new MenuService(jwt);
  const [isNew, setIsNew] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [row, setRow] = useState({});
  const [refetch, setRefetch] = useState();
  const [data, setData] = useState([]);
  const [notify, setNotify] = useState({ open: false });
  const [showSaveBtn, setShowSaveBtn] = useState(false);

  const columns = useMemo(
    () => [
      {
        accessorKey: 'title',
        header: t('fields.menu.title'),
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      },
      {
        accessorKey: 'url',
        header: t('fields.menu.url'),
        enableClickToCopy: true,
        type: 'string'
        // filterVariant: 'text' | 'select' | 'multi-select' | 'range' | 'range-slider' | 'checkbox',
      }
    ],
    []
  );
  useEffect(() => {
    handMenuList();
  }, []);

  const handleNewRow = (row) => {
    setIsNew(true);
    setRow(row);
    setOpen(true);
  };

  const handleSaveOrder = (data) => {
    menuService
      .updateMenuOrders(data)
      .then((result) => {
        setNotify({ open: true });
        setShowSaveBtn(false);
        handleRefetch();
      })
      .catch((error) => {
        setNotify({ open: true, type: 'error', description: error });
      });
  };
  const handleEditRow = (row) => {
    setIsNew(false);
    setRow(row);
    setOpen(true);
  };
  const handleDeleteRow = (row) => {
    setRow(row);
    setOpenDelete(true);
    handMenuList();
  };
  const handleRefetch = () => {
    setRefetch(Date.now());
  };
  const handMenuList = () => {
    menuService.getMenuList().then((result) => {
      setData(() => result.data);
      handleRefetch();
    });
  };
  const AddRow = useCallback(
    (showSaveBtn, data) => (
      <Stack spacing={2} direction="row">
        <Button color="primary" onClick={() => handleNewRow(null)} variant="contained" startIcon={<Menu />}>
          {t('buttons.menu.addMainMenu')}
        </Button>
        {showSaveBtn && (
          <Button color="info" onClick={() => handleSaveOrder(data)} variant="contained" startIcon={<Save />}>
            {t('buttons.menu.saveOrder')}
          </Button>
        )}
      </Stack>
    ),
    []
  );
  const DeleteOrEdit = useCallback(
    ({ row }) => (
      <Box sx={{ display: 'flex', gap: '1rem' }}>
        <Tooltip arrow placement="top-start" title={t('buttons.menu.delete')}>
          <IconButton color="error" onClick={() => handleDeleteRow(row)}>
            <Delete />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.menu.edit')}>
          <IconButton onClick={() => handleEditRow(row)}>
            <Edit />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top-start" title={t('buttons.menu.addSubMenu')}>
          <IconButton onClick={() => handleNewRow(row)}>
            <Add />
          </IconButton>
        </Tooltip>
      </Box>
    ),
    []
  );

  function replaceAndSort(data, idToReplace, idToReplaceBeside) {
    const findItem = (id, items) => {
      for (const item of items) {
        if (item.id === id) {
          return item;
        } else if (item.childs.length > 0) {
          const found = findItem(id, item.childs);
          if (found) return found;
        }
      }
      return null;
    };

    const itemToReplace = findItem(idToReplace, data);
    const itemBeside = findItem(idToReplaceBeside, data);
    itemToReplace.parentId = itemBeside.parentId;
    if (itemToReplace.order > itemBeside.order) {
      itemToReplace.order = itemBeside.order - 1;
    } else {
      itemToReplace.order = itemBeside.order + 1;
    }
    itemToReplace.isEdited = true;

    const parentOfItemToReplace = findItemParent(idToReplace, data);
    const parentOfItemBeside = findItemParent(idToReplaceBeside, data);
    if (parentOfItemToReplace && parentOfItemBeside) {
      if (!parentOfItemToReplace || !parentOfItemBeside) {
        return data;
      }

      // Find the indices of the items within their respective parents
      const indexToReplace = parentOfItemToReplace.childs.findIndex((child) => child.id === idToReplace);
      const indexBeside = parentOfItemBeside.childs.findIndex((child) => child.id === idToReplaceBeside);

      if (indexToReplace === -1 || indexBeside === -1) {
        return data;
      }

      // Replace items between different parents at the same depth
      parentOfItemToReplace.childs.splice(indexToReplace, 1);
      parentOfItemBeside.childs.splice(indexBeside, 0, itemToReplace);
    } else {
      const indexToReplace = data.findIndex((x) => x.id === idToReplace);
      const indexBeside = data.findIndex((x) => x.id === idToReplaceBeside);

      data.splice(indexToReplace, 1);
      data.splice(indexBeside, 0, itemToReplace);
    }

    // Sort by order
    const sortRecursive = (items) => {
      items.sort((a, b) => a.order - b.order);
      for (const item of items) {
        if (item.childs.length > 0) {
          sortRecursive(item.childs);
        }
      }
    };

    sortRecursive(data);
    return data;
  }

  function findItemParent(id, items) {
    for (const item of items) {
      if (item.childs.some((child) => child.id === id)) {
        return item;
      } else if (item.childs.length > 0) {
        const found = findItemParent(id, item.childs);
        if (found) return found;
      }
    }
    return null;
  }

  return (
    <>
      <Notify notify={notify} setNotify={setNotify}></Notify>
      <MainCard title={AddRow(showSaveBtn, data)}>
        <TableCard>
          <MaterialTable
            //key={'id' + refetch}
            dataSet={data}
            refetch={refetch}
            columns={columns}
            // dataApi={handleMenuList}
            enableExpanding={true}
            enableExpandAll={true}
            getSubRows={(originalRow) => originalRow?.childs}
            enablePagination={false}
            enableColumnOrdering={false}
            enableColumnFilters={false}
            enableColumnResizing={false}
            enableBottomToolbar={false}
            enableGlobalFilterModes={false}
            enableColumnFilterModes={false}
            enableRowActions
            renderRowActions={DeleteOrEdit}
            // renderTopToolbarCustomActions={() => AddRow(showSaveBtn, data)}
            enableRowOrdering={true}
            autoResetPageIndex={false}
            muiTableBodyRowDragHandleProps={({ table }) => ({
              onDragEnd: () => {
                const { draggingRow, hoveredRow } = table.getState();
                if (hoveredRow && draggingRow) {
                  if (hoveredRow.depth != draggingRow.depth) {
                    setNotify({ open: true, type: 'error', description: "You can't replace items from different depth" });
                    return;
                  }

                  replaceAndSort(data, draggingRow.original.id, hoveredRow.original.id);
                  setData([...data]);
                  setShowSaveBtn(true);
                  handleRefetch();
                }
              }
            })}
          />
        </TableCard>
      </MainCard>
      <AddOrEditMenu isNew={isNew} row={row} open={open} setOpen={setOpen} refetch={handMenuList} />
      <DeleteMenu row={row} open={openDelete} setOpen={setOpenDelete} refetch={handMenuList} />
    </>
  );
}

export default MenuDataGrid;
