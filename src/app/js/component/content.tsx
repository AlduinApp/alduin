import * as ReactDOM from "react-dom";
import * as React from "react";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";

export class Content extends CustomComponent<{}, {}> {
    constructor() {
        super();
    }

    render() {
        return (
            <div className="rss article">
                <h1>Hello world</h1>
                <p>sdasykdbjasjdbacasdfa usdha ahs as fk jsf asibfh iasi asj fas foai fhais ofia sifobasiho ia sifbas f asof ai foas fiajb fash fao fhias foa sfhi asofb  has fh ashf asf ahs fhi fiah fas fas hkfas fafja sf as fas fakf as</p>
                <h2>Yop Swag</h2>
                <p>kjdvj sdbvj ssv jdvd</p>
            </div>
        );
    }
}
