const modal = document.getElementById("subscribe-modal");
modal.classList.add("modal_active");

getCookie();

function getCookie() {
  const cookies = document.cookie.split(";");
  cookies.forEach((cookie) => {
    const parts = cookie.split("=");
    if (parts[0] === "isClosses" && parts[1] === false) {
      modal.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal__close")) {
          modal.classList.remove("modal_active");
          document.cookie = "isCloses=true";
        }
      });
    }
  });
}
