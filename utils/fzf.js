export function fzfSearch(cnt, input) {
  let data = cnt.getElementsByTagName("div");
  let indexUrls = [];

  if (input.length === 0) {
    indexUrls = defaultCnt(data);
  } else {
    indexUrls = fzfCnt(data, input);
  }

  if (indexUrls.length > 0) {
    cnt.querySelector(".selected").classList.remove("selected");
    cnt.childNodes[indexUrls[0]].classList.add("selected");
  }
}

function fzfCnt(data, input) {
  let indexUrls = [];
  for (let i = 0; i < data.length; i++) {
    let url = data[i].textContent;
    let positions = [];
    for (let j = 0; j < url.length; j++) {
      if (url.substr(j, input.length) === input) {
        for (let k = 0; k < input.length; k++) {
          positions.push(j + k);
        }
      }
    }

    if (positions.length > 0) {
      colorMatches(data, i, positions);
      indexUrls.push(i);
    } else {
      data[i].style.display = "none";
    }
  }
  return indexUrls;
}

function defaultCnt(data) {
  let indexUrls = [];
  for (let i = 0; i < data.length; i++) {
    let url = data[i].textContent;
    data[i].style.display = "";
    data[i].innerHTML = url;
    indexUrls.push(i);
  }
  return indexUrls;
}

function colorMatches(data, index, positions) {
  let url = data[index].textContent;
  data[index].style.display = "";
  for (let j = positions.length - 1; j >= 0; j--) {
    let pos = positions[j];

    url =
      url.slice(0, pos) +
      '<span class="matched">' +
      url[pos] +
      "</span>" +
      url.slice(pos + 1);
  }

  data[index].innerHTML = url;
}
