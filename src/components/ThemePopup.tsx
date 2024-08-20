import React, {useEffect} from 'react';

interface ThemePopupProps {
    isTransparent: boolean;
    setPopupVisible: (visible: boolean) => void;
}

const ThemePopup = ({isTransparent, setPopupVisible}: ThemePopupProps) => {
    const BFZF_THEME: string = 'BFZF_THEME';
    const defaultTheme: string = 'dark';
    const themes: string[] = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro",
        "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "pastel", "fantasy",
        "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
        "night", "coffee", "winter", "dim", "nord", "sunset"
    ];

    useEffect(() => {
        const storedTheme = localStorage.getItem(BFZF_THEME);
        if (storedTheme && themes.includes(storedTheme)) {
            changeTheme(storedTheme);
        } else {
            changeTheme(defaultTheme);
        }
    }, []);

    const changeTheme = (newTheme: string) => {
        document.querySelector('html')?.setAttribute('data-theme', newTheme);
        localStorage.setItem(BFZF_THEME, newTheme);
        setPopupVisible(false);
    };

    return (
        <div>
            {isTransparent ? <div></div> : (
                <div className="w-full h-full flex flex-col">
                    {themes.map((item: string) => (
                        <button
                            key={item}
                            className="flex flex-row items-center w-full px-4 py-2 cursor-pointer rounded-md hover:bg-accent hover:text-accent-content transition-colors"
                            onClick={() => changeTheme(item)}
                        >
                            <span className="flex-1 text-left uppercase font-semibold">{item}</span>
                            <div className="ml-4 flex items-center">
                                <div
                                    data-theme={item}
                                    className="flex flex-row items-center justify-between text-center w-32 h-12 rounded-md bg-base-100 p-2"
                                >
                                    <div
                                        data-theme={item}
                                        className="w-6 h-6 rounded-md bg-primary"
                                    />
                                    <div
                                        data-theme={item}
                                        className="w-6 h-6 rounded-md bg-secondary"
                                    />
                                    <div
                                        data-theme={item}
                                        className="w-6 h-6 rounded-md bg-accent"
                                    />
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ThemePopup;