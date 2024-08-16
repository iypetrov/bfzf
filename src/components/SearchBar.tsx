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

    useEffect(() => {
        fzf.find(searchQuery)
            .then((result) => {
                const callbackResult: SearchBarResultCallback = {
                    selectedIndex: selectedIndex,
                    fzfResults: result,
                };
                setIsLoading(false);
                callback(callbackResult);
            });
    }, [searchQuery, props]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setIsLoading(true);
                    }
                }
                onKeyDown={useKeyboardListener(props, selectedIndex, setSelectedIndex)}
                autoFocus={true}
            />
        </div>
    );
}

export default SearchBar;