import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

export const SettingsDialog = (props: any) => {
  const handleCancelReset = () => {
    props.setOpen(false);
  };

  const handleConfirmReset = () => {
    handleCancelReset();
    props.clear();
  };

  return (
    <>
      <Dialog
        open={Boolean(props.isOpen)}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Reset Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to reset your list?</DialogContent>
        <DialogActions>
          <Button onClick={handleCancelReset} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmReset} color="secondary">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
