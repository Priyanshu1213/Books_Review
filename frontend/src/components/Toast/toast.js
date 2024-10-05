import "./toast.css";
import redCrossIcon from "../../assets-icon/redCrossIcon.png";
import checkIcon from "../../assets-icon/checkIcon.png";

function showToast(message, checker) {
  let toastContainer = document.querySelector(".toast-container");
  
  // Create the toast container if it does not exist
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.className = "toast-container";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = "toast";

  const img = document.createElement("img");
  img.style.width = "25px";
  img.style.height = "25px";
  img.src = checker ? checkIcon : redCrossIcon;

  const textDiv = document.createElement("span");
  textDiv.innerText = message;

  const mover = document.createElement("div");
  mover.className = checker ? "mover" : "mover_error";

  let changer = 98;
  toast.appendChild(img);
  toast.appendChild(textDiv);

  function moverFunction() {
    mover.style.width = `${changer}%`;

    if (changer > 0) {
      changer = changer - 1;
    } else {
      clearInterval(interval);
    }
  }

  const interval = setInterval(moverFunction, 20);

  toastContainer.appendChild(toast);
  toastContainer.appendChild(mover);

  // Show the toast message
  setTimeout(() => {
    toast.classList.add("show");
    mover.classList.add("mover2");
  }, 10);

  // Remove the toast message after a set duration (e.g., 5 seconds)
  setTimeout(() => {
    toast.classList.remove("show");
    mover.classList.remove("mover2");

    setTimeout(() => {
      toast.remove();
      mover.remove();

      // Check if the toast container is empty, if so, remove it from DOM
      if (toastContainer.childElementCount === 0) {
        toastContainer.remove();
      }
    }, 10); // Wait for CSS transition to complete before removing
  }, 2000); // Adjust duration here (5000ms = 5 seconds)
}

export default showToast;
