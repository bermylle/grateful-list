import { useState } from "react";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import RestartAltIcon from "@mui/icons-material/RestartAlt";

import { ListDialog } from "./ListDialog";
import { SettingsDialog } from "./SettingsDialog";

export const SettingsComponent = (props: any) => {
  const [dialogBooleans, setDialogBooleans] = useState({
    isListOpen: false,
    isSettingsOpen: false,
  });
  const actions = [
    { icon: <MenuBookIcon />, name: "View Journal" },
    { icon: <RestartAltIcon />, name: "Reset List" },
    // { icon: <InfoIcon />, name: "About the App" },
    // { icon: <ShareIcon />, name: "Share" },
  ];
  const handleCopy = () => {
    navigator.clipboard
      .writeText("http://127.0.0.1:5173/")
      .then(() => {
        console.log("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error("Error copying URL to clipboard:", error);
      });
  };

  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        className="MuiSpeedDial-fab"
        sx={{
          position: "absolute",
          bottom: 16,
          right: 16,
          color: "white",
        }}
        icon={<SettingsIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              if (action.name === "View Journal") {
                setDialogBooleans({ ...dialogBooleans, isListOpen: true });
              }
              if (action.name === "Reset List") {
                setDialogBooleans({ ...dialogBooleans, isSettingsOpen: true });
              }

              if (action.name === "Share") {
                handleCopy();
              }
            }}
          />
        ))}
      </SpeedDial>
      <ListDialog
        gratefulList={props.gratefulList}
        isOpen={dialogBooleans.isListOpen}
        setOpen={setDialogBooleans}
      />
      <SettingsDialog
        gratefulList={props.gratefulList}
        isOpen={dialogBooleans.isSettingsOpen}
        setOpen={setDialogBooleans}
        clear={props.clear}
      />
    </>
  );
};
