const hours = [9, 10, 11, 12, 13, 14, 15, 16, 17];
const currentHour = dayjs().hour();

$(function () {
  const saveButtons = document.querySelectorAll(".saveBtn");
  const timeBlocks = document.querySelectorAll(".time-block");

  // Loop through each hour and set the time block properties
  for (var i = 0; i < hours.length; ++i) {

    // Set class for each time block
    if (hours[i] < currentHour) {
      timeBlocks[i].classList.add("past");
    } else if (hours[i] == currentHour) {
      timeBlocks[i].classList.add("present");
    } else {
      timeBlocks[i].classList.add("future");
    }

    // Get localStorage entry for each time block
    const localStorageText = localStorage.getItem(hours[i]);
    const timeBlockDescription = timeBlocks[i].querySelector(".description");
    timeBlockDescription.value = localStorageText;

    // Add a click event listener to each save button and save to localStorage
    saveButtons[i].addEventListener("click", function (event) {
      const timeBlock = event.target.closest(".time-block");
      const hour = timeBlock.id.replace("hour-", "");
      const timeBlockDescription = timeBlock.querySelector(".description");

      localStorage.setItem(hour, timeBlockDescription.value);
    });
  }

  updateClock();
  setInterval(updateClock, 1000);
});

function updateClock() {
  const clockElement = document.getElementById("clock");
  const now = dayjs();
  const formattedDate = now.format('dddd, MMMM D, YYYY hh:mm:ss A');

  clockElement.textContent = formattedDate;
}