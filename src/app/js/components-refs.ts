import { App } from "./main";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { ConfigOpenModalButton } from "./component/button/config-open-modal-button";
import { AddFeedModal } from "./component/modal/add-feed-modal";
import { ConfigModal } from "./component/modal/config-modal";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { SwitchButton } from "./component/button/switch-button";
import { Sidebar } from "./component/sidebar";
import { FeedList } from "./component/feed/feed-list";
import { AlertList } from "./component/alert/alert-list";
import { ArticleList } from "./component/article/article-list";
import { Loading } from "./component/loading";
import { Content } from "./component/content";
import { Theme } from "./component/theme";

export namespace ComponentsRefs {
    export let main: App;
    export let addFeedModal: AddFeedModal;
    export let addFeedOpenModalButton: AddFeedOpenModalButton;
    export let pinSidebarButton: PinSidebarButton;
    export let switchButton: SwitchButton;
    export let sidebar: Sidebar;
    export let feedList: FeedList;
    export let alertList: AlertList;
    export let articleList: ArticleList;
    export let loading: Loading;
    export let content: Content;
    export let configModal: ConfigModal;
    export let theme: Theme;
}
