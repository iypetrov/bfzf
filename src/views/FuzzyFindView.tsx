import React, {useEffect, useState} from 'react';
import {ActionType, load} from "../scripts/polyfill";
import SearchBar, {SearchBarResultCallback} from "../components/SearchBar";
import {FzfResultItem} from "fzf";
import Url from "../components/Url";
import Footer from "../components/Footer";
import Title from "../components/Title";
import Delimiter from "../components/Delimiter";

const FuzzyFindView = () => {
    const [title, setTitle] = useState<ActionType>('');
    const [urls, setUrls] = useState<IUrl[]>([]);
    const [filteredUrls, setFilteredUrls] = useState<FzfResultItem<IUrl>[]>([]);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        let params = new URLSearchParams(window.location.search);
        const action = params.get('action')! as ActionType;
        load(action).then((loadedUrls: IUrl[]) => {
            setTitle(action)
            setUrls(loadedUrls);
        });
    }, []);

    const callback = (callbackResult: SearchBarResultCallback): void => {
        setSelectedIndex(callbackResult.selectedIndex);
        setFilteredUrls(callbackResult.fzfResults);
    }

    return (
        <div className="flex flex-col h-screen px-2">
            <Title text={title}/>
            <SearchBar
                props={urls}
                callback={callback}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                setIsLoading={setIsLoading}
            />
            <div className="flex-1 overflow-auto">
                {filteredUrls.length === 0 && (
                    <div className="h-full flex items-center justify-center text-center font-bold text-lg">
                        No results found
                    </div>
                )}

                {filteredUrls.length > 0 && isLoading && (
                    <div className="h-full flex items-center justify-center text-center">
                        <span className="loading loading-spinner text-neutral"></span>
                    </div>
                )}

                {filteredUrls.length > 0 && !isLoading && (
                    <div>
                        {filteredUrls.map((item: FzfResultItem<IUrl>, index: number) => (
                            <Url key={index} index={index} selectedIndex={selectedIndex}
                                 setSelectedIndex={setSelectedIndex} props={item} />
                        ))}
                    </div>
                )}
            </div>
            <Delimiter/>
            <Footer/>
        </div>
    );
};

export default FuzzyFindView;