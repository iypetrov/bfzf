import React from 'react';
import {FzfResultItem} from 'fzf';
import {selectedTarget} from '../hooks/listeners';

interface IUrl {
    title: string;
    url: string;
}

interface UrlProps {
    index: number;
    selectedIndex: number;
    props: FzfResultItem<IUrl>;
}

const Url = ({index, selectedIndex, props}: UrlProps) => {
    const {item} = props;
    const {title, url} = item;
    const isHighlighted = index === selectedIndex;

    const renderText = () => {
        const chars = `${title} (${url})`.split('');
        return chars.map((char, i) => (
                props.positions.has(i) ? (<b key={i} className="text-red-500"> {char}</b>) : (char)
            )
        );
    };

    return (
        <div className={isHighlighted ? 'bg-blue-500' : ''}>
             <pre>
                <a
                    href={url}
                    target={selectedTarget}
                    rel="noopener noreferrer"
                >
                    {renderText()}
                </a>
            </pre>
        </div>
    );
};

export default Url;