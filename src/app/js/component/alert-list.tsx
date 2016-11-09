import * as ReactDOM from "react-dom";
import * as React from "react";

import * as crypto from "crypto";

import { CustomComponent } from "./../custom-component";
import { ComponentsRefs } from "./../components-refs";
import { Feed, FeedProp } from "./feed";
import { Queue } from "./../queue";
import { Alert, AlertProps } from "./alert";

export class AlertList extends CustomComponent<{}, FeedListState> {

    constructor() {
        super();

        this.state = {
            alerts: new Queue<AlertProps>()
        };

        ComponentsRefs.alertList = this;
    }

    render() {
        return (
            <ul className="alert label">
                {
                    this.state.alerts.map(alert => {
                        return <Alert key={alert.uuid} uuid={alert.uuid} message={alert.message} alertType={alert.alertType} />;
                    })
                }
            </ul>
        );
    }

    alert(message: string, alertType: AlertType = "success") {
        const newAlerts = this.state.alerts.clone();
        newAlerts.enqueue({
            uuid: crypto.randomBytes(16).toString("hex"),
            message: message,
            alertType: alertType
        });
        this.editState({
            alerts: newAlerts
        });

        setTimeout(() => this.removeAlert(), 3000);
    }

    removeAlert() {
        const newAlerts = this.state.alerts.clone();
        newAlerts.dequeue();
        this.editState({
            alerts: newAlerts
        });
    }
}

export type AlertType = "warning" | "error" | "success";

interface FeedListState {
    alerts: Queue<AlertProps>;
}
