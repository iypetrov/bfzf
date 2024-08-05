import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

async function loadUrls(action: string): Promise<string[]> {
    if (action === 'open_history') {
        const historyItems = await browser.history.search({ text: "" });
        return historyItems.map(item => item.url!);
    } else if (action === 'open_bookmarks') {
        const bookmarkItems = await browser.bookmarks.search({});
        return bookmarkItems
            .filter(item => item.url != undefined)
            .filter(
                item =>
                    !["Get Help", "Customise Firefox", "Get Involved", "About Us"].includes(item.title)
            )
            .map(item => item.title + " " + item.url);
    }

    return [action]
}

function FuzzyFindView() {
    const [urls, setUrls] = useState<string[]>([]);

    useEffect(() => {
        let params = new URLSearchParams(window.location.search)
        const action = params.get('action');
        loadUrls(action!).then(setUrls);
    }, []);

    return (
        <div>
            <h1>{location.pathname}</h1>
            <h1>urls</h1>
            <ul>
                {urls.map((url, index) => (
                    <li key={index}>
                        <a href={url}>{url}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FuzzyFindView;