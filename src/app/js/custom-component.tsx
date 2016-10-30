import * as React from "react";

export class CustomComponent<P, S> extends React.Component<P, S> {

    constructor() {
        super();
    }

    editState(obj: any) {
        this.setState((prevState, props) => {
            for (const prop in obj) prevState[prop] = obj[prop];
            return prevState;
        });
    }
}