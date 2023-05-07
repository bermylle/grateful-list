import { useEffect, useState } from "react";
import { GratefulList } from "../constants/List.types";
import { Button, TextField, ThemeProvider, createTheme } from "@mui/material";

import "../App.css";
import {
  getGratefulListFromLocalStorage,
  getRemainingDailyCount,
  resetGratefulListInLocalStorage,
  saveGratefulListToLocalStorage,
} from "../services/listActions";
import CssBaseline from "@mui/material/CssBaseline";

import { SettingsComponent } from "../components/SettingsComponent";

export const Journal = () => {
  const [gratefulList, setGratefulList] = useState<GratefulList>([]);
  const [error, setError] = useState(false);

  function handleAddGratefulThing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const gratefulThingInput = (
      event.currentTarget.elements.namedItem(
        "gratefulThing"
      ) as HTMLInputElement
    )?.value;
    const newGratefulThing = {
      input: gratefulThingInput,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
      }),
      totalCount: gratefulList.length + 1,
    };

    const isInputEmpty = !gratefulThingInput;
    setError(isInputEmpty);
    if (isInputEmpty) {
      return;
    }

    setGratefulList((prevGratefulList) => [
      ...prevGratefulList,
      newGratefulThing,
    ]);
    saveGratefulListToLocalStorage([...gratefulList, newGratefulThing]);

    event.currentTarget.reset();
  }

  function clearGratefulList() {
    setGratefulList([]);
    resetGratefulListInLocalStorage();
  }

  useEffect(() => {
    const storedList = getGratefulListFromLocalStorage();
    if (storedList) {
      setGratefulList(storedList);
    }
  }, [gratefulList]);

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="input-container">
          <div className="title">
            <h1> What are you grateful for today?</h1>
            <div className="list-counter">
              <h3>Remaining entries: {getRemainingDailyCount(gratefulList)}</h3>
            </div>
          </div>

          <div className="form-container">
            <form onSubmit={handleAddGratefulThing}>
              <TextField
                id="gratefulThing"
                name="gratefulThing"
                label="Input"
                multiline
                rows={4}
                className="input-area"
                error={error}
                helperText={error ? "This field is required" : ""}
                disabled={getRemainingDailyCount(gratefulList) === 0}
              />

              <div className="button-container">
                <Button
                  type="submit"
                  variant="outlined"
                  disabled={getRemainingDailyCount(gratefulList) === 0}
                  sx={{
                    marginRight: "15px",
                  }}
                >
                  Submit
                </Button>

                <SettingsComponent
                  gratefulList={gratefulList}
                  clear={clearGratefulList}
                />
              </div>
            </form>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
};
