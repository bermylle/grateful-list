import { useEffect, useState } from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { TableComponent } from "./TableComponent";

export const ListDialog = (props: any) => {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Dialog
        open={Boolean(props.isOpen)}
        onClose={close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">View List</DialogTitle>
        <DialogContent>
          <TableComponent gratefulList={props.gratefulList} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
