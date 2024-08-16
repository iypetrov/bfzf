import React, {useEffect, useState} from 'react';
import useKeyboardListener from "../hooks/listeners";
import {Fzf, FzfOptions, FzfResultItem} from "fzf";

export type SearchBarResultCallback = {
    selectedIndex: number;
    fzfResults: FzfResultItem<IUrl>[];
};

interface SearchBarProps {
    props: IUrl[];
    callback: (fzfResults: SearchBarResultCallback) => void;
    selectedIndex: number;
    setSelectedIndex: (index: number) => void;
}

const SearchBar = ({props, callback, selectedIndex, setSelectedIndex}: SearchBarProps) => {
    const options: FzfOptions<IUrl> = {selector: (item) => `${item.title} (${item.url})`};
    const fzf = new Fzf<IUrl[]>(props, options);
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const fzfResult: FzfResultItem<IUrl>[] = fzf.find(searchQuery);
        const callbackResult: SearchBarResultCallback = {
            selectedIndex: selectedIndex,
            fzfResults: fzfResult
        };
        callback(callbackResult);
    }, [searchQuery, props]);

    return (
        <div>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={useKeyboardListener(props, selectedIndex, setSelectedIndex)}
                autoFocus={true}
            />
        </div>
    );
}

export default SearchBar;