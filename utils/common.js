export function generateUrlsCnt(urls, cnt) {
  urls.forEach((url) => {
    let item = document.createElement("div");
    item.textContent = url;
    cnt.appendChild(item);
  });

  if (cnt.childNodes.length > 0) {
    cnt.childNodes[0].classList.add("selected");
  }
}

export function listenUserInput(event, selectedUrl) {
  let nextSelectedUrl;

  switch (event.key) {
    case "ArrowUp":
      nextSelectedUrl = selectedUrl.previousElementSibling;
      while (nextSelectedUrl && nextSelectedUrl.style.display === "none") {
        nextSelectedUrl = nextSelectedUrl.previousElementSibling;
      }
      break;
    case "ArrowDown":
      nextSelectedUrl = selectedUrl.nextElementSibling;
      while (nextSelectedUrl && nextSelectedUrl.style.display === "none") {
        nextSelectedUrl = nextSelectedUrl.nextElementSibling;
      }
      break;
    case "Enter":
      if (selectedUrl) {
        browser.tabs.create({
          url: selectedUrl.textContent.split(" ").pop(),
        });
        window.close();
      }
      return;
  }

  if (nextSelectedUrl) {
    selectedUrl.classList.remove("selected");
    nextSelectedUrl.classList.add("selected");
  }
}
