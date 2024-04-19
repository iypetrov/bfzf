browser.commands.onCommand.addListener((command) => {
  const screenWidth = window.screen.availWidth;
  const screenHeight = window.screen.availHeight;
  const width = Math.round(screenWidth * 0.5);
  const height = Math.round(screenHeight * 0.4);
  const left = (screenWidth - width) / 2;
  const top = (screenHeight - height) / 2;

  if (command === "open_history") {
    browser.windows.create({
      url: "history/history.html",
      type: "popup",
      width: width,
      height: height,
      left: Math.round(left),
      top: Math.round(top),
    });
  } else if (command === "open_bookmarks") {
    browser.windows.create({
      url: "bookmarks/bookmarks.html",
      type: "popup",
      width: width,
      height: height,
      left: Math.round(left),
      top: Math.round(top),
    });
  }
});
