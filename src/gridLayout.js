(function () {
  const data = [
    { href: "./src/gridLayout/columnDrop.css", name: "Column Drop", id: "columnDrop" },
    { href: "./src/gridLayout/mostlyFluid.css", name: "Mostly Fluid", id: "mostlyFluid" },
    { href: "./src/gridLayout/loShifter.css", name: "LO Shifter", id: "loShifter" },
    { href: "./src/gridLayout/holyGrial.css", name: "Holy Grial", id:"holyGrial" },
  ];
  let timer;

  (function createBtn() {
    data.forEach(object => {
      document.getElementsByTagName("footer")[0].insertAdjacentHTML("beforeend", `<button type="button" id=${object.id}>${object.name} Layout</button>`);
      document.getElementById(`${object.id}`).addEventListener("click", uploadFile.bind(object));
      document.getElementById(`${object.id}`).addEventListener("click", createFooterPopup.bind(object));
    })
  })();

  function createDevicePopup(device) {
    document.getElementsByTagName("main")[0].insertAdjacentHTML("afterbegin", `<span class="popup device">${device}</span>`);
    resetPopup(2000);
  }

  function createFooterPopup() {
    document.getElementsByTagName("footer")[0].insertAdjacentHTML("afterend", `<span class="popup foot">Loaded ${this.name} Layout!</span>`);
    resetPopup(3600);
  }

  function uploadFile() {
    document.getElementsByTagName("head")[0].insertAdjacentHTML("beforeend", `<link rel="stylesheet" type="text/css" href=${this.href} media="all">`);
    resetHeader(5000);
  }

  function resetPopup(duration) {
    const popup = document.querySelectorAll(".popup");
    popup.forEach((item) => {
      let timer = window.setTimeout(() => { item.classList.add("inactive") }, duration);
    })   
  }

  function resetHeader(duration) {
    const header = document.querySelector("header");
    header.classList.remove("inactive");
    timer = window.setTimeout(() => { header.classList.add("inactive") }, duration);
    if (!header.classList.contains("inactive")) {
      while(timer--) { window.clearTimeout(timer) };
      timer = window.setTimeout(() => { header.classList.add("inactive") }, duration);
    }
    if (document.querySelector(".fa-times").classList.contains("inactive")) document.querySelector(".fa-times").classList.remove("inactive");
  }
      
  window.onresize = function() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      if (window.matchMedia("(width<480px)").matches) { createDevicePopup("Mobile") };
      if (window.matchMedia("(width>=480px) and (width<1024px)").matches) { createDevicePopup("Tablet") };
      if (window.matchMedia("(width>=1024px)").matches) { createDevicePopup("Desktop") };
    }, 500);
  }
  //Debouncing window.onresize will only call the event handler after the event has stopped firing for a certain amount of time.

  document.querySelector(".fa-times").addEventListener("click", () => { window.location.reload(true) });
})();
