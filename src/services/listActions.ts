import { GratefulList } from "../constants/List.types";

export function saveGratefulListToLocalStorage(list: GratefulList) {
  localStorage.setItem("gratefulList", JSON.stringify(list));
}

export function getGratefulListFromLocalStorage() {
  const gratefulList = localStorage.getItem("gratefulList");
  return gratefulList ? JSON.parse(gratefulList) : null;
}

export function resetGratefulListInLocalStorage() {
  localStorage.setItem("gratefulList", JSON.stringify([]));
}

export function getRemainingDailyCount(list: GratefulList) {
  const today = new Date();

  const todayItems = list.filter((item) => {
    const itemDate = new Date(item.date);

    return (
      itemDate.getFullYear() === today.getFullYear() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getDate() === today.getDate()
    );
  });

  const dailyCount = 5 - todayItems.length;

  return dailyCount > 0 ? dailyCount : 0;
}
