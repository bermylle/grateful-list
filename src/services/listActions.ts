import { GratefulList } from "../constants/List.types";

export function saveGratefulListToLocalStorage(list: GratefulList) {
  localStorage.setItem("gratefulList", JSON.stringify(list));
}

export function getRemainingDailyCount(list: GratefulList) {
  const today = new Date(); // get the current date
  const todayItems = list.filter((item) => {
    // filter items with a date that matches today
    const itemDate = new Date(item.date);
    return (
      itemDate.getFullYear() === today.getFullYear() &&
      itemDate.getMonth() === today.getMonth() &&
      itemDate.getDate() === today.getDate()
    );
  });
  const dailyCount = 5 - todayItems.length;

  if (dailyCount > 0) {
    return dailyCount;
  }

  return 0; // return the count of items
}
