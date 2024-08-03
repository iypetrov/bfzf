import React, { useEffect, useState } from 'react';
import browser from 'webextension-polyfill';

function HistoryComponent() {
    const [urls, setUrls] = useState<(string | undefined)[]>([]);

    useEffect(() => {
        browser.history.search({ text: "", maxResults: 250 }).then((historyItems: browser.History.HistoryItem[]) => {
            const historyUrls = historyItems.map(items => items.url);
            setUrls(historyUrls);
        });
    }, []);

    return (
      <div>
            <h1>History</h1>
            <ul>
                {urls.map((url, index) => (
                    <li key={index}>
                        <a href={url} target="_blank">{url}</a>
                    </li>
                ))}
            </ul>
      </div>
    );
}

export default HistoryComponent;