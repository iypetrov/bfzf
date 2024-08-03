chrome.commands.onCommand.addListener((command: string) => {
    const screenWidth = window.screen.availWidth;
    const screenHeight = window.screen.availHeight;
    const width = Math.round(screenWidth * 0.5);
    const height = Math.round(screenHeight * 0.4);
    const left = (screenWidth - width) / 2;
    const top = (screenHeight - height) / 2;

    let url = "dist/index.html";
    if (command === "open_history") {
        url += "?action=open_history";
    } else if (command === "open_bookmarks") {
        url += "?action=open_bookmarks";
    }

    chrome.windows.create({
        url: url,
        type: "popup",
        width: width,
        height: height,
        left: Math.round(left),
        top: Math.round(top),
    }).then(r => console.log(r));
});