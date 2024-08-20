import React from "react";

interface MediaLinkProps {
    title: string;
    url: string;
    svgPathD: string;
}

const MediaLink = ({title, url, svgPathD}: MediaLinkProps) => {
    return (
        <div className="text-accent">
            <a
                href={url}
                className="flex items-center px-4 py-2 rounded-lg hover:text-primary transition-colors"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24">
                    <path
                        d={svgPathD}
                        fill="currentColor"
                    />
                </svg>
                <span className="ml-2 underline text-xs">{title}</span>
            </a>
        </div>
    )
        ;
}

export default MediaLink;