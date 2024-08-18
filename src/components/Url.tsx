import React, { useRef, useEffect } from 'react';
import { FzfResultItem } from 'fzf';
import { selectedTarget } from '../hooks/listeners';

interface UrlProps {
    index: number;
    selectedIndex: number;
    props: FzfResultItem<IUrl>;
}

const Url = ({ index, selectedIndex, props }: UrlProps) => {
    const { item } = props;
    const { title, url } = item;
    const itemRef = useRef<HTMLDivElement>(null);
    const isHighlighted = index === selectedIndex;

    useEffect(() => {
        if (isHighlighted && itemRef.current) {
            let options: ScrollIntoViewOptions = {
                behavior: 'auto',
                block: 'center'
            };
            itemRef.current.scrollIntoView(options);
        }
    }, [isHighlighted]);

    const renderText = () => {
        const chars = `${title} ${url}`.split('');
        return chars.map((char, i) => (
            props.positions.has(i) ? (<span key={i} className="text-error">{char}</span>) : (char)
        ));
    };

    return (
        <div
            ref={itemRef}
            className={`text-sm ${isHighlighted ? 'highlighted bg-neutral text-neutral-content' : ''} overflow-hidden whitespace-nowrap`}
        >
            <div className="flex flex-row items-center overflow-hidden whitespace-nowrap">
                {isHighlighted
                    ? <div className="px-0.5 text-error">{'>'}</div>
                    : <div className="px-0.5 bg-neutral text-transparent">{'>'}</div>
                }
                <a
                    href={url}
                    target={selectedTarget}
                    rel="noopener noreferrer"
                    className="ml-1 text-base-content w-full tracking-wide overflow-hidden whitespace-nowrap text-ellipsis"
                >
                    {renderText()}
                </a>
            </div>
        </div>
    );
};

export default Url;