document.addEventListener("DOMContentLoaded", function() {
  const filterInput = document.getElementById("filter");
  const urlList = document.getElementById("history-list");
  let fzt;

  browser.history.search({ text: "", maxResults: 100 }).then((historyItems) => {
    let uniqueUrls = [...new Set(historyItems.map((item) => item.url))];
    uniqueUrls.forEach((url) => {
      let listItem = document.createElement("div");
      listItem.textContent = url;
      urlList.appendChild(listItem);
    });

    if (urlList.childNodes.length > 0) {
      urlList.childNodes[0].classList.add("selected");
    }
  });

  filterInput.addEventListener("input", function() {
    let filterValue = this.value.toLowerCase();
    let listItems = urlList.getElementsByTagName("div");
    for (let i = 0; i < listItems.length; i++) {
      let url = listItems[i].textContent;
      listItems[i].style.display = url.toLowerCase().includes(filterValue)
        ? ""
        : "none";
    }

    let visibleItems = urlList.querySelectorAll(
      "div:not([style='display: none;'])",
    );
    if (visibleItems.length > 0) {
      urlList.querySelector(".selected").classList.remove("selected");
      visibleItems[0].classList.add("selected");
    }
  });

  window.addEventListener("keydown", function(event) {
    let selectedUrl = urlList.querySelector(".selected");
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
          browser.tabs.create({ url: selectedUrl.textContent });
          window.close();
        }
        return;
    }

    if (nextSelectedUrl) {
      selectedUrl.classList.remove("selected");
      nextSelectedUrl.classList.add("selected");
    }
  });

  urlList.addEventListener("click", function(e) {
    if (e.target.tagName === "DIV") {
      let selectedUrl = urlList.querySelector(".selected");
      if (selectedUrl) {
        selectedUrl.classList.remove("selected");
      }
      e.target.classList.add("selected");
    }
  });
});
