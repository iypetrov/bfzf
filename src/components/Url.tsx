import React, { useRef, useEffect } from 'react';
import { FzfResultItem } from 'fzf';
import { selectedTarget } from '../hooks/listeners';

interface UrlProps {
    index: number;
    selectedIndex: number;
    props: FzfResultItem<IUrl>;
}

// TODO: Add a element before/after highlighted and move when reaching it
const Url = ({ index, selectedIndex, props }: UrlProps) => {
    const { item } = props;
    const { title, url } = item;
    const isHighlighted = index === selectedIndex;

    const urlRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        if (isHighlighted && urlRef.current) {
            urlRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        }
    }, [isHighlighted]);

    const renderText = () => {
        const titleChars = title.split('');
        const urlChars = url.split('');
        return (
            <>
                <span className="font-bold">{titleChars.map((char, i) => (
                    props.positions.has(i) ? (<span key={i} className="text-accent">{char}</span>) : (char)
                ))}</span>
                {' '}
                {urlChars.map((char, i) => (
                    props.positions.has(title.length + i + 1) ? (<span key={i} className="text-accent">{char}</span>) : (char)
                ))}
            </>
        );
    };

    return (
        <div
            className={`overflow-hidden w-full text-sm tracking-wide ${isHighlighted ? 'bg-secondary text-secondary-content' : ''}`}
        >
            <pre style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {isHighlighted && <span className="text-lg text-accent font-bold">{'> '}</span>}
                <a
                    ref={urlRef}
                    href={url}
                    target={selectedTarget}
                    rel="noopener noreferrer"
                    className="w-full text-base-content inline"
                >
                    {renderText()}
                </a>
            </pre>
        </div>
    );
};

export default Url;