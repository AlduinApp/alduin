import {CustomComponent} from "./../../custom-component";

import * as React from "react";

export abstract class Button<P, S> extends CustomComponent<P, S> {

    constructor() {
        super();
    }

    abstract onClick(event: React.MouseEvent<HTMLElement>);
}
