import React, { useEffect, useState } from 'react';

const Footer = () => {
    const themes: string[] = [
        "light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro",
        "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy",
        "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade",
        "night", "coffee", "winter", "dim", "nord", "sunset"
    ];
    const defaultTheme: string = 'synthwave';
    const [theme, setTheme] = useState<string>(defaultTheme);
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

    useEffect(() => {
        setDropdownVisible(false);
    }, []);

    const changeTheme = (newTheme: string) => {
        setTheme(newTheme);
        document.querySelector('html')?.setAttribute('data-theme', newTheme);
        setDropdownVisible(false);
    };

    return (
        <div className="flex flex-row justify-center items-center my-1.5 space-x-4">
            <div className="relative flex-grow flex justify-center items-center">
                <div className="text-neutral-content">
                    <a
                        href="https://github.com/iypetrov/bfzf"
                        className="flex items-center px-4 py-2 rounded-lg hover:text-error transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path
                                d="m12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="ml-2 underline text-xs">GitHub</span>
                    </a>
                </div>
                <button
                    className="btn btn-neutral text-neutral-content hover:bg-accent w-full max-w-20 h-auto font-bold text-xs"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                >
                    Theme
                </button>
                <div className="text-neutral-content">
                    <a
                        href="https://buymeacoffee.com"
                        className="flex items-center px-4 py-2 rounded-lg hover:text-error transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                            <path
                                d="m20.216 6.415-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 0 0-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 0 0-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 0 1-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 0 1 3.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 0 1-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 0 1-4.743.295 37.059 37.059 0 0 1-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0 0 11.343.376.483.483 0 0 1 .535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 0 1 .39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 0 1-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 0 1-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 0 0-1.322-.238c-.826 0-1.491.284-2.26.613z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="ml-2 underline text-xs">Buy Me Coffee</span>
                    </a>
                </div>
                {dropdownVisible && (
                    <div
                        className="dropdown-content absolute bottom-full mb-2 shadow rounded-box z-10 bg-neutral text-neutral-content overflow-auto max-h-52 w-4/5"
                        style={{left: '50%', transform: 'translateX(-50%)'}}
                    >
                        {themes.map((item: string) => (
                            <button
                                key={item}
                                className={`flex flex-col w-1/2 px-4 py-2 cursor-pointer rounded-box hover:bg-se`}
                                onClick={() => changeTheme(item)}
                            >
                                <span className="uppercase font-semibold">{item}</span>
                                <div className="flex flex-row space-x-1 w-full p-0.5 m-1">
                                    <div
                                        data-theme={item}
                                        className="w-4 h-4 rounded-md bg-primary"
                                    />
                                    <div
                                        data-theme={item}
                                        className="w-4 h-4 rounded-md bg-secondary"
                                    />
                                    <div
                                        data-theme={item}
                                        className="w-4 h-4 rounded-md bg-accent"
                                    />
                                    <div
                                        data-theme={item}
                                        className="w-4 h-4 rounded-md bg-error"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Footer;