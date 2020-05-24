import React from 'react';
import { connect } from 'react-redux';
import Banner from './Banner';
import MainView from './MainView';
import Tags from './Tags';

class Home extends React.Component {
    componentWillMount(){
        this.props.onLoad();
    }
    componentWillUnmount(){
        this.props.onUnLoad();
    }
    render() {
        return (
            <div className="home-page">
                <Banner appName={this.props.appName} />

                <div className="container page">
                    <div className="row">
                        <MainView />
                        <div className="col-md-3">
                            <div className="sidebar">
                                <p>Popular Tags</p>

                                <Tags
                                    onClickTag={this.props.onClickTag} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appName: state.common.appName
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => dispatch({ type: 'HOME_PAGE_LOADED' }),
    onUnLoad: () => dispatch({ type: 'HOME_PAGE_UNLOADED' }),
    onClickTag: (tag) =>
        dispatch({ type: 'APPLY_TAG_FILTER', tag })
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);