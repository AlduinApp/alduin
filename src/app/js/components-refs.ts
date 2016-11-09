import { App } from "./main";
import { AddFeedOpenModalButton } from "./component/button/add-feed-open-modal-button";
import { AddFeedModal } from "./component/modal/add-feed-modal";
import { PinSidebarButton } from "./component/button/pin-sidebar-button";
import { Sidebar } from "./component/sidebar";
import { FeedList } from "./component/feed-list";
import { AlertList } from "./component/alert-list";
import { ArticleList } from "./component/article-list";
import { Loading } from "./component/loading";
import { Content } from "./component/content";

export namespace ComponentsRefs {
    export let main: App;
    export let addFeedModal: AddFeedModal;
    export let addFeedOpenModalButton: AddFeedOpenModalButton;
    export let pinSidebarButton: PinSidebarButton;
    export let sidebar: Sidebar;
    export let feedList: FeedList;
    export let alertList: AlertList;
    export let articleList: ArticleList;
    export let loading: Loading;
    export let content: Content;
}
