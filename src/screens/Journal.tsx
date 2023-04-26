import { useEffect, useState } from "react";

import "../App.css";
import {
  getRemainingDailyCount,
  saveGratefulListToLocalStorage,
} from "../services/listActions";
import { GratefulList } from "../constants/List.types";

export const Journal = () => {
  let dailyCount = 5;
  const [gratefulList, setGratefulList] = useState<GratefulList>([]);

  function handleAddGratefulThing(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const newGratefulThing = {
      input: event.currentTarget.elements.namedItem("gratefulThing")?.value,
      date: new Date(),
      totalCount: gratefulList.length + 1,
    };

    if (!newGratefulThing) {
      return;
    }

    setGratefulList((prevGratefulList) => [
      ...prevGratefulList,
      newGratefulThing,
    ]);

    localStorage.setItem(
      "gratefulList",
      JSON.stringify([...gratefulList, newGratefulThing])
    );

    event.currentTarget.reset();
  }

  function clearGratefulList() {
    setGratefulList([]);
  }

  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem("gratefulList"));
    if (storedList) {
      setGratefulList(storedList);
    }
  }, []);

  return (
    <>
      <h1>Gratitude Journal</h1>
      <h3>Daily count: {getRemainingDailyCount(gratefulList)}</h3>
      <div className="card">
        <form onSubmit={handleAddGratefulThing}>
          <label htmlFor="gratefulThing">
            What are you grateful for today?
          </label>
          <input
            type="text"
            id="gratefulThing"
            name="gratefulThing"
            placeholder="I am very grateful because.. "
            autoComplete="off"
          />
          <div>
            <button
              type="submit"
              onClick={() => saveGratefulListToLocalStorage(gratefulList)}
              disabled={getRemainingDailyCount(gratefulList) === 0}
            >
              Add
            </button>
            <button type="button" onClick={clearGratefulList}>
              Clear
            </button>
          </div>
        </form>

        <ul>
          {gratefulList.map((item, index) => (
            <li key={index}>
              {item.input} <br></br>
              {item.date.toString()}
            </li>
          ))}
        </ul>
        <ul></ul>
      </div>
    </>
  );
};
