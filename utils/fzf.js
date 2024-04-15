export function fzfSearch(input, urls) {
  for (let i = 0; i < urls.length; i++) {
    let url = urls[i].textContent;
    urls[i].style.display = url.includes(input) ? "" : "none";
  }

  let visibleItems = cnt.querySelectorAll("div:not([style='display: none;'])");
  if (visibleItems.length > 0) {
    cnt.querySelector(".selected").classList.remove("selected");
    cnt.childNodes[0].classList.add("selected");
  }
}
