import React from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux'

import allReducers from '../reducers'

import Header from './header'
import Footer from './footer'

import AddFeedModal from './modals/add-feed-modal'

import { openAddFeedModal } from '../actions/modal-actions'

class App extends React.Component {
    render() {

        console.log(this.props)

        return (
            <div className="app">
                <Header />
                <div className="main-container">
                    <div className="sidebar">
                        <div className="feed-list">
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 1</div>
                                <div className="feed-unread">
                                    <span className="feed-unread-number">15</span>
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 2</div>
                                <div className="feed-unread">
                                    <span className="feed-unread-number">15</span>
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                            <div className="feed">
                                <div className="feed-icon">
                                    <i className="fa fa-rss" aria-hidden="true"></i>
                                </div>
                                <div className="feed-title">Feed 3</div>
                                <div className="feed-unread">
                                </div>
                            </div>
                        </div>
                        <div className="action-buttons">
                            <div className="add-feed-button">
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                            <div className="fetch-feeds-button">
                                <i className="fa fa-download" aria-hidden="true"></i>
                            </div>
                            <div className="delete-feed-button">
                                <i className="fa fa-trash" aria-hidden="true"></i>
                            </div>
                            <div className="settings-button">
                                <i className="fa fa-cog faa-spin faa-slow animated-hover" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                    <div className="articles-list">
                        <div className="article">
                            <div className="article-header">
                                <span className="article-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span className="article-date">03.07.2017</span>
                            </div>
                            <p className="article-intro">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra, mauris finibus venenatis rutrum, mauris justo sagittis massa, ut efficitur ex sem eu est. Nunc pellentesque luctus nisl in bibendum. Nam vestibulum nibh pharetra feugiat blandit. Nulla ornare, quam vel suscipit scelerisque, mi libero dapibus ante, non elementum tellus risus posuere sapien.
                    </p>
                        </div>
                        <div className="article">
                            <div className="article-header">
                                <span className="article-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span className="article-date">03.07.2017</span>
                            </div>
                            <p className="article-intro">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra, mauris finibus venenatis rutrum, mauris justo sagittis massa, ut efficitur ex sem eu est. Nunc pellentesque luctus nisl in bibendum. Nam vestibulum nibh pharetra feugiat blandit. Nulla ornare, quam vel suscipit scelerisque, mi libero dapibus ante, non elementum tellus risus posuere sapien.
                    </p>
                        </div>
                        <div className="article">
                            <div className="article-header">
                                <span className="article-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span className="article-date">03.07.2017</span>
                            </div>
                            <p className="article-intro">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra, mauris finibus venenatis rutrum, mauris justo sagittis massa, ut efficitur ex sem eu est. Nunc pellentesque luctus nisl in bibendum. Nam vestibulum nibh pharetra feugiat blandit. Nulla ornare, quam vel suscipit scelerisque, mi libero dapibus ante, non elementum tellus risus posuere sapien.
                    </p>
                        </div>
                        <div className="article">
                            <div className="article-header">
                                <span className="article-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span className="article-date">03.07.2017</span>
                            </div>
                            <p className="article-intro">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra, mauris finibus venenatis rutrum, mauris justo sagittis massa, ut efficitur ex sem eu est. Nunc pellentesque luctus nisl in bibendum. Nam vestibulum nibh pharetra feugiat blandit. Nulla ornare, quam vel suscipit scelerisque, mi libero dapibus ante, non elementum tellus risus posuere sapien.
                    </p>
                        </div>
                        <div className="article">
                            <div className="article-header">
                                <span className="article-title">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</span>
                                <span className="article-date">03.07.2017</span>
                            </div>
                            <p className="article-intro">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra, mauris finibus venenatis rutrum, mauris justo sagittis massa, ut efficitur ex sem eu est. Nunc pellentesque luctus nisl in bibendum. Nam vestibulum nibh pharetra feugiat blandit. Nulla ornare, quam vel suscipit scelerisque, mi libero dapibus ante, non elementum tellus risus posuere sapien.
                    </p>
                        </div>

                    </div>
                    <div className="article-content">
                        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h1>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id eleifend nibh. Integer laoreet leo at tristique suscipit. Maecenas congue interdum metus vel efficitur. Cras feugiat lectus id viverra pellentesque. Donec sodales lacinia leo eget interdum. Morbi rhoncus tincidunt lectus eu aliquet. Integer pulvinar sed velit at imperdiet. Curabitur nec tempus ante. Praesent pharetra ut turpis id elementum. Nunc volutpat eget nisi eget convallis. Suspendisse ipsum nunc, dignissim sed ante vitae, lobortis tincidunt elit. Cras posuere, arcu eget rutrum faucibus, velit eros fermentum felis, vitae sagittis leo nisi nec arcu. Curabitur turpis nibh, semper non ex ut, lobortis cursus risus. Nam rutrum tempus blandit.</p>

                        <p>Donec elementum gravida nulla, nec commodo arcu dapibus eu. Donec sodales interdum ipsum, vitae ornare enim dignissim et. Duis at imperdiet nibh. Aliquam nunc urna, hendrerit non tortor ac, consectetur tempor erat. Vestibulum rhoncus, dui imperdiet ullamcorper rhoncus, ex nibh pretium risus, nec sollicitudin diam est sit amet leo. Nullam efficitur lectus nisl, nec commodo purus mattis lacinia. In pretium felis maximus est mollis, auctor faucibus urna hendrerit. Etiam sem tortor, malesuada nec lectus nec, efficitur lobortis ligula. Nam ullamcorper mauris efficitur auctor porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat orci, iaculis ac egestas non, tincidunt in lorem. Fusce ultricies odio purus, id sodales felis blandit at. Cras malesuada lorem quis arcu viverra pellentesque.</p>

                        <p>Nunc in tempor dolor. Quisque bibendum metus at iaculis tempor. Nullam eget facilisis eros, et malesuada lectus. Fusce pretium eros urna, id vulputate nulla pulvinar eget. Nunc vitae tortor luctus, commodo neque vitae, porta mauris. Mauris ornare libero sed laoreet venenatis. Integer erat nulla, lobortis nec erat nec, aliquet ultrices risus. Phasellus finibus sapien quis quam aliquet blandit. Praesent at elit et magna cursus vulputate. Curabitur tortor velit, semper sit amet lobortis id, maximus maximus quam.</p>

                        <p>Proin at ipsum vel ligula convallis egestas. Donec pretium dictum lacus. Curabitur at vulputate velit, ut scelerisque nisl. Mauris pellentesque consectetur volutpat. Aliquam molestie dui a risus fringilla egestas. Pellentesque luctus est lectus, non porta enim aliquam vel. Curabitur non tempor felis.</p>

                        <p>Suspendisse vel pharetra diam, et pretium erat. Ut a sodales tellus, in mattis ipsum. Duis sagittis ullamcorper elit quis dictum. Mauris quis leo ut dui luctus faucibus at at dui. Sed fringilla lectus accumsan, bibendum magna at, pulvinar tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ac augue facilisis, ultrices turpis at, molestie ipsum. Quisque tempor tristique quam, ut auctor sapien auctor id. Sed ligula tortor, hendrerit vel nunc nec, vulputate convallis ante. Nam erat nunc, gravida vestibulum varius at, blandit sed ante.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id eleifend nibh. Integer laoreet leo at tristique suscipit. Maecenas congue interdum metus vel efficitur. Cras feugiat lectus id viverra pellentesque. Donec sodales lacinia leo eget interdum. Morbi rhoncus tincidunt lectus eu aliquet. Integer pulvinar sed velit at imperdiet. Curabitur nec tempus ante. Praesent pharetra ut turpis id elementum. Nunc volutpat eget nisi eget convallis. Suspendisse ipsum nunc, dignissim sed ante vitae, lobortis tincidunt elit. Cras posuere, arcu eget rutrum faucibus, velit eros fermentum felis, vitae sagittis leo nisi nec arcu. Curabitur turpis nibh, semper non ex ut, lobortis cursus risus. Nam rutrum tempus blandit.</p>

                        <p>Donec elementum gravida nulla, nec commodo arcu dapibus eu. Donec sodales interdum ipsum, vitae ornare enim dignissim et. Duis at imperdiet nibh. Aliquam nunc urna, hendrerit non tortor ac, consectetur tempor erat. Vestibulum rhoncus, dui imperdiet ullamcorper rhoncus, ex nibh pretium risus, nec sollicitudin diam est sit amet leo. Nullam efficitur lectus nisl, nec commodo purus mattis lacinia. In pretium felis maximus est mollis, auctor faucibus urna hendrerit. Etiam sem tortor, malesuada nec lectus nec, efficitur lobortis ligula. Nam ullamcorper mauris efficitur auctor porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat orci, iaculis ac egestas non, tincidunt in lorem. Fusce ultricies odio purus, id sodales felis blandit at. Cras malesuada lorem quis arcu viverra pellentesque.</p>

                        <p>Nunc in tempor dolor. Quisque bibendum metus at iaculis tempor. Nullam eget facilisis eros, et malesuada lectus. Fusce pretium eros urna, id vulputate nulla pulvinar eget. Nunc vitae tortor luctus, commodo neque vitae, porta mauris. Mauris ornare libero sed laoreet venenatis. Integer erat nulla, lobortis nec erat nec, aliquet ultrices risus. Phasellus finibus sapien quis quam aliquet blandit. Praesent at elit et magna cursus vulputate. Curabitur tortor velit, semper sit amet lobortis id, maximus maximus quam.</p>

                        <p>Proin at ipsum vel ligula convallis egestas. Donec pretium dictum lacus. Curabitur at vulputate velit, ut scelerisque nisl. Mauris pellentesque consectetur volutpat. Aliquam molestie dui a risus fringilla egestas. Pellentesque luctus est lectus, non porta enim aliquam vel. Curabitur non tempor felis.</p>

                        <p>Suspendisse vel pharetra diam, et pretium erat. Ut a sodales tellus, in mattis ipsum. Duis sagittis ullamcorper elit quis dictum. Mauris quis leo ut dui luctus faucibus at at dui. Sed fringilla lectus accumsan, bibendum magna at, pulvinar tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ac augue facilisis, ultrices turpis at, molestie ipsum. Quisque tempor tristique quam, ut auctor sapien auctor id. Sed ligula tortor, hendrerit vel nunc nec, vulputate convallis ante. Nam erat nunc, gravida vestibulum varius at, blandit sed ante.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id eleifend nibh. Integer laoreet leo at tristique suscipit. Maecenas congue interdum metus vel efficitur. Cras feugiat lectus id viverra pellentesque. Donec sodales lacinia leo eget interdum. Morbi rhoncus tincidunt lectus eu aliquet. Integer pulvinar sed velit at imperdiet. Curabitur nec tempus ante. Praesent pharetra ut turpis id elementum. Nunc volutpat eget nisi eget convallis. Suspendisse ipsum nunc, dignissim sed ante vitae, lobortis tincidunt elit. Cras posuere, arcu eget rutrum faucibus, velit eros fermentum felis, vitae sagittis leo nisi nec arcu. Curabitur turpis nibh, semper non ex ut, lobortis cursus risus. Nam rutrum tempus blandit.</p>

                        <p>Donec elementum gravida nulla, nec commodo arcu dapibus eu. Donec sodales interdum ipsum, vitae ornare enim dignissim et. Duis at imperdiet nibh. Aliquam nunc urna, hendrerit non tortor ac, consectetur tempor erat. Vestibulum rhoncus, dui imperdiet ullamcorper rhoncus, ex nibh pretium risus, nec sollicitudin diam est sit amet leo. Nullam efficitur lectus nisl, nec commodo purus mattis lacinia. In pretium felis maximus est mollis, auctor faucibus urna hendrerit. Etiam sem tortor, malesuada nec lectus nec, efficitur lobortis ligula. Nam ullamcorper mauris efficitur auctor porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat orci, iaculis ac egestas non, tincidunt in lorem. Fusce ultricies odio purus, id sodales felis blandit at. Cras malesuada lorem quis arcu viverra pellentesque.</p>

                        <p>Nunc in tempor dolor. Quisque bibendum metus at iaculis tempor. Nullam eget facilisis eros, et malesuada lectus. Fusce pretium eros urna, id vulputate nulla pulvinar eget. Nunc vitae tortor luctus, commodo neque vitae, porta mauris. Mauris ornare libero sed laoreet venenatis. Integer erat nulla, lobortis nec erat nec, aliquet ultrices risus. Phasellus finibus sapien quis quam aliquet blandit. Praesent at elit et magna cursus vulputate. Curabitur tortor velit, semper sit amet lobortis id, maximus maximus quam.</p>

                        <p>Proin at ipsum vel ligula convallis egestas. Donec pretium dictum lacus. Curabitur at vulputate velit, ut scelerisque nisl. Mauris pellentesque consectetur volutpat. Aliquam molestie dui a risus fringilla egestas. Pellentesque luctus est lectus, non porta enim aliquam vel. Curabitur non tempor felis.</p>

                        <p>Suspendisse vel pharetra diam, et pretium erat. Ut a sodales tellus, in mattis ipsum. Duis sagittis ullamcorper elit quis dictum. Mauris quis leo ut dui luctus faucibus at at dui. Sed fringilla lectus accumsan, bibendum magna at, pulvinar tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ac augue facilisis, ultrices turpis at, molestie ipsum. Quisque tempor tristique quam, ut auctor sapien auctor id. Sed ligula tortor, hendrerit vel nunc nec, vulputate convallis ante. Nam erat nunc, gravida vestibulum varius at, blandit sed ante.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id eleifend nibh. Integer laoreet leo at tristique suscipit. Maecenas congue interdum metus vel efficitur. Cras feugiat lectus id viverra pellentesque. Donec sodales lacinia leo eget interdum. Morbi rhoncus tincidunt lectus eu aliquet. Integer pulvinar sed velit at imperdiet. Curabitur nec tempus ante. Praesent pharetra ut turpis id elementum. Nunc volutpat eget nisi eget convallis. Suspendisse ipsum nunc, dignissim sed ante vitae, lobortis tincidunt elit. Cras posuere, arcu eget rutrum faucibus, velit eros fermentum felis, vitae sagittis leo nisi nec arcu. Curabitur turpis nibh, semper non ex ut, lobortis cursus risus. Nam rutrum tempus blandit.</p>

                        <p>Donec elementum gravida nulla, nec commodo arcu dapibus eu. Donec sodales interdum ipsum, vitae ornare enim dignissim et. Duis at imperdiet nibh. Aliquam nunc urna, hendrerit non tortor ac, consectetur tempor erat. Vestibulum rhoncus, dui imperdiet ullamcorper rhoncus, ex nibh pretium risus, nec sollicitudin diam est sit amet leo. Nullam efficitur lectus nisl, nec commodo purus mattis lacinia. In pretium felis maximus est mollis, auctor faucibus urna hendrerit. Etiam sem tortor, malesuada nec lectus nec, efficitur lobortis ligula. Nam ullamcorper mauris efficitur auctor porta. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed erat orci, iaculis ac egestas non, tincidunt in lorem. Fusce ultricies odio purus, id sodales felis blandit at. Cras malesuada lorem quis arcu viverra pellentesque.</p>

                        <p>Nunc in tempor dolor. Quisque bibendum metus at iaculis tempor. Nullam eget facilisis eros, et malesuada lectus. Fusce pretium eros urna, id vulputate nulla pulvinar eget. Nunc vitae tortor luctus, commodo neque vitae, porta mauris. Mauris ornare libero sed laoreet venenatis. Integer erat nulla, lobortis nec erat nec, aliquet ultrices risus. Phasellus finibus sapien quis quam aliquet blandit. Praesent at elit et magna cursus vulputate. Curabitur tortor velit, semper sit amet lobortis id, maximus maximus quam.</p>

                        <p>Proin at ipsum vel ligula convallis egestas. Donec pretium dictum lacus. Curabitur at vulputate velit, ut scelerisque nisl. Mauris pellentesque consectetur volutpat. Aliquam molestie dui a risus fringilla egestas. Pellentesque luctus est lectus, non porta enim aliquam vel. Curabitur non tempor felis.</p>

                        <p>Suspendisse vel pharetra diam, et pretium erat. Ut a sodales tellus, in mattis ipsum. Duis sagittis ullamcorper elit quis dictum. Mauris quis leo ut dui luctus faucibus at at dui. Sed fringilla lectus accumsan, bibendum magna at, pulvinar tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nullam ac augue facilisis, ultrices turpis at, molestie ipsum. Quisque tempor tristique quam, ut auctor sapien auctor id. Sed ligula tortor, hendrerit vel nunc nec, vulputate convallis ante. Nam erat nunc, gravida vestibulum varius at, blandit sed ante.</p>
                    </div>
                </div>
                <Footer />

                {this.props.openModal != null && <this.props.openModal />}
            </div>
        )
    }
}

const ConnectedApp = connect(
    (state)    => ({ openModal: state.ModalReducer.openModal }),
    (dispatch) => bindActionCreators({ openAddFeedModal }, dispatch)
)(App);

const store = createStore(allReducers)

ReactDOM.render(
    <Provider store={store}>
        <ConnectedApp />
    </Provider>,
    document.getElementById('root')
)
