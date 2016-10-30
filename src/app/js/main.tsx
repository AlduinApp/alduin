import * as ReactDOM from "react-dom";
import * as React from "react";

import { AddFeedModal } from "./component/modal/add-feed-modal";
import { CustomComponent } from "./custom-component";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { Sidebar } from "./component/sidebar";

import { ComponentsRefs } from "./components-refs";

export class App extends CustomComponent<{}, {}>{

    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Sidebar ref={sidebar => ComponentsRefs.sidebar = sidebar} />
                <div className="rss articles">
                    <ul>
                        <li className="unread">
                            <h3><span>20Minutes | Hightech</span><span>30.5.2015</span></h3>
                            <p>Découverte d'une technologie révolutionnaire</p>
                        </li>
                        <li className="selected">
                            <h3><span>20Minutes | Hightech</span><span>30.5.2015</span></h3>
                            <p>Découverte d'une technologie révolutionnaire</p>
                        </li>
                        <li className="unread">
                            <h3><span>20Minutes | Hightech</span><span>30.5.2015</span></h3>
                            <p>Découverte d'une technologie révolutionnaire</p>
                        </li>
                        <li>
                            <h3><span>20Minutes | Hightech</span><span>30.5.2015</span></h3>
                            <p>Découverte d'une technologie révolutionnaire</p>
                        </li>
                        <li>
                            <h3><span>20Minutes | Hightech</span><span>30.5.2015</span></h3>
                            <p>Découverte d'une technologie révolutionnaire</p>
                        </li>
                    </ul>
                </div><div className="rss article">
                    <h1>Hello world</h1>
                    <p>sdasykdbjasjdbacasdfa usdha ahs as fk jsf asibfh iasi asj fas foai fhais ofia sifobasiho ia sifbas f asof ai foas fiajb fash fao fhias foa sfhi asofb  has fh ashf asf ahs fhi fiah fas fas hkfas fafja sf as fas fakf as</p>
                    <h2>Yop Swag</h2>
                    <p>kjdvj sdbvj ssv jdvd</p>
                </div>
                <ul className="alert label">
                    <li className="warning">Vos informations ont été modifiées</li>
                </ul>
                <footer></footer>
                <AddFeedModal ref={modal => ComponentsRefs.addFeedModal = modal} />
            </div>
        );
    }
}

const app: App = ReactDOM.render(<App />, document.querySelector("#root")) as App;
