import { generateUrlsCnt, listenUserInput } from "../utils/common.js";
import { fzfSearch } from "../utils/fzf.js";

document.addEventListener("DOMContentLoaded", function() {
  const input = document.getElementById("filter");
  const cnt = document.getElementById("bookmarks-list");

  browser.bookmarks.search({}).then((bookmarkItems) => {
    let urls = [
      ...new Set(
        bookmarkItems
          .filter((item) => item.url != undefined)
          .filter(
            (item) =>
              ![
                "Get Help",
                "Customise Firefox",
                "Get Involved",
                "About Us",
              ].includes(item.title),
          )
          .map((item) => item.title + " " + item.url),
      ),
    ];
    generateUrlsCnt(urls, cnt);
  });

  input.addEventListener("input", function() {
    fzfSearch(cnt, this.value);
  });

  window.addEventListener("keydown", function(event) {
    let selectedUrl = cnt.querySelector(".selected");
    listenUserInput(event, selectedUrl);
  });

  window.addEventListener("blur", function() {
    window.close();
  });
});
