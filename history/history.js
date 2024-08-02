import { generateUrlsCnt, listenUserInput } from "../utils/common.js";
import { fzfSearch } from "../utils/fzf.js";

document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("filter");
  const cnt = document.getElementById("history-list");

  browser.history.search({ text: "" }).then((historyItems) => {
    let urls = [
      ...new Set(historyItems.map((item) => item.title + " " + item.url)),
    ];
    generateUrlsCnt(urls, cnt);
  });

  input.addEventListener("input", function() {
    let urls = cnt.getElementsByTagName("div");
    fzfSearch(cnt, this.value, urls);
  });

  window.addEventListener("keydown", function(event) {
    let selectedUrl = cnt.querySelector(".selected");
    listenUserInput(event, selectedUrl);
  });

  window.addEventListener("blur", function() {
    window.close();
  });
});
