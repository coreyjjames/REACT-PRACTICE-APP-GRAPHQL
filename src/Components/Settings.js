import React from 'react';
import { connect } from 'react-redux';
import SettingsForm from './Forms/settingsForm';
import ListErrors from './ListErrors';


class Settings extends React.Component {
    render() {
        return (
            <div className="setting-page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your Settings</h1>
                        <ListErrors errors={this.props.errors} />
                        <SettingsForm />

                        <hr />
                        <button
                            className="btn btn-outline-danger"
                            onClick={(ev) => { ev.preventDefault(); this.props.onClickLogout(); }}>
                            Or click here to logout.
                        </button>
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = state => ({
    ...state.settings,
});


const mapDistpatchToprops = dispatch => ({
    onClickLogout: () => { dispatch({ type: "LOGOUT" }); },
});


export default connect(mapStateToProps, mapDistpatchToprops)(Settings);