import React, { useEffect, useState } from 'react';
import {ActionType, load} from "../scripts/polyfill";
import SearchBar, {SearchBarResultCallback} from "../components/SearchBar";
import {FzfResultItem} from "fzf";
import Url from "../components/Url";

const FuzzyFindView = () => {
    const [title, setTitle] = useState<string>('');
    const [urls, setUrls] = useState<IUrl[]>([]);
    const [filteredUrls, setFilteredUrls] = useState<FzfResultItem<IUrl>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        const action = params.get('action')! as ActionType;
        load(action).then((loadedUrls: IUrl[]) => {
            setTitle(action)
            setUrls(loadedUrls);
            console.log(loadedUrls);
        });
    }, []);

    const callback = (callbackResult: SearchBarResultCallback): void => {
        setSelectedIndex(callbackResult.selectedIndex);
        setFilteredUrls(callbackResult.fzfResults);
    }

    return (
        <div>
            <h1>{title}</h1>
            <SearchBar props={urls} callback={callback} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            {filteredUrls.map((item: FzfResultItem<IUrl>, index: number) => (
               <Url index={index} selectedIndex={selectedIndex} props={item}/>
            ))}
        </div>
    );
};

export default FuzzyFindView;