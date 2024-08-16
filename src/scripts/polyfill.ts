import browser, {Bookmarks, History} from "webextension-polyfill";
import HistoryItem = History.HistoryItem;
import BookmarkTreeNode = Bookmarks.BookmarkTreeNode;

export type ActionType = 'open_history' | 'open_bookmarks';

export async function load(action: ActionType): Promise<IUrl[]> {
    if (action === 'open_history') {
        const historyItems: HistoryItem[] = await browser.history.search({text: ""});
        return historyItems.map((item: HistoryItem, index: number) => (
                {id: index, title: item.title!, url: item.url!}
            )
        );

    } else if (action === 'open_bookmarks') {
        const bookmarkItems: BookmarkTreeNode[] = await browser.bookmarks.search({});
        return bookmarkItems
            .filter((item: BookmarkTreeNode) => item.url && item.url.trim() !== undefined)
            .map((item: BookmarkTreeNode, index: number) => (
                    {id: index, title: item.title, url: item.url!}
                )
            );
    }
    return [];
}