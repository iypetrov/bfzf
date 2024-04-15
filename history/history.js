import { generateHTMLForUrls, listenUserInput } from "../utils/common.js";
import { fzfSearch } from "../utils/fzf.js";

document.addEventListener("DOMContentLoaded", function() {
  const filterInput = document.getElementById("filter");
  const cnt = document.getElementById("history-list");

  browser.history.search({ text: "", maxResults: 250 }).then((historyItems) => {
    let urls = [
      ...new Set(historyItems.map((item) => item.title + " " + item.url)),
    ];
    generateHTMLForUrls(urls, cnt);
  });

  filterInput.addEventListener("input", function() {
    let input = this.value;
    let urls = cnt.getElementsByTagName("div");
    fzfSearch(input, urls);
  });

  window.addEventListener("keydown", function(event) {
    let selectedUrl = cnt.querySelector(".selected");
    listenUserInput(event, selectedUrl);
  });

  window.addEventListener("blur", function() {
    window.close();
  });
});
