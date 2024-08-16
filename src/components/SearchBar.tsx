import React, {useEffect, useState} from 'react';
import useKeyboardListener from "../hooks/listeners";
import {AsyncFzf, AsyncFzfOptions, FzfResultItem} from "fzf";

export type SearchBarResultCallback = {
    selectedIndex: number;
    fzfResults: FzfResultItem<IUrl>[];
};

interface SearchBarProps {
    props: IUrl[];
    callback: (fzfResults: SearchBarResultCallback) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
    setIsLoading: (index: boolean) => void;
}

const SearchBar = ({props, callback, selectedIndex, setSelectedIndex, setIsLoading}: SearchBarProps) => {
    const options: AsyncFzfOptions<IUrl> = {
        fuzzy: 'v1',
        selector: (item) => `${item.title} (${item.url})`
    };
    const fzf = new AsyncFzf<IUrl[]>(props, options);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [fzfResults, setFzfResults] = useState<IUrl[]>([]);

    useEffect(() => {
        fzf.find(searchQuery)
            .then((result) => {
                setSelectedIndex(0);
                setIsLoading(false);
                const callbackResult: SearchBarResultCallback = {
                    selectedIndex: selectedIndex,
                    fzfResults: result,
                };
                callback(callbackResult);
                setFzfResults(result.map((item) => item.item));
            });
    }, [searchQuery, props]);

    return (
        <div className="w-full h-8 mb-3 text-secondary-content">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setIsLoading(true);
                    }
                }
                onKeyDown={useKeyboardListener(fzfResults, selectedIndex, setSelectedIndex)}
                autoFocus={true}
                className="w-full h-full px-2 text-sm text-base-content bg-base-100 border-2 border-base-200 rounded-md focus:border-accent focus:outline-none focus:ring-accent"
            />
        </div>
    );
}

export default SearchBar;