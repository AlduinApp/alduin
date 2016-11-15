import * as React from "react";

export class CustomComponent<P, S> extends React.Component<P, S> {

    constructor() {
        super();
    }

    editState(obj: S | any, callback?: () => void) {
        if (callback)
            this.setState((prevState, props) => {
                for (const prop in obj) prevState[prop] = obj[prop];
                return prevState;
            }, () => callback());
        else
            this.setState((prevState, props) => {
                for (const prop in obj) prevState[prop] = obj[prop];
                return prevState;
            });
        console.log(`State of an instance of ${this.constructor.name} was edited...`, obj);
    }
}
