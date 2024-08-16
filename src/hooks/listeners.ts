import React, { useCallback } from 'react';

export const selectedTarget: string = '_blank';

function useKeyboardListener(urls: IUrl[], index: number, setIndex: (index: number) => void) {
    return useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            setIndex(Math.min(index + 1, urls.length - 1));
        } else if (e.key === 'ArrowUp') {
            setIndex(Math.max(0, index - 1));
        } else if (e.key === 'Enter') {
            window.open(urls[index].url, selectedTarget);
            window.close();
        }
    }, [urls, index, setIndex]);
}

export default useKeyboardListener;