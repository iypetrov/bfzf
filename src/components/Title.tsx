import React from 'react';
import {ActionType} from "../scripts/polyfill";

interface TitleProps {
    text: ActionType;
}

function matchActionTypeToTitle(actionType: ActionType): string {
    switch (actionType) {
        case "open_bookmarks":
            return "Bookmarks";
        case "open_history":
            return "History";
        default:
            return 'Unrecognized Action';
    }
}

const Title = ({text}: TitleProps) => {
    return (
        <div className="flex justify-center">
            <h1 className="font-bold text-base">{matchActionTypeToTitle(text)}</h1>
        </div>
    );
}

export default Title;