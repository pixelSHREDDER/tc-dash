import React from 'react';
import PropTypes from 'prop-types';
import Nav from './Nav';
import TopBar from './TopBar';

class AppFrame extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { handleLogOut, isLive, pathname, onboardingProgress } = this.props;
        const { mobileOpen } = this.state;

        return (
            <React.Fragment>
                <TopBar pathname={pathname} handleDrawerToggle={this.handleDrawerToggle} />
                <Nav isLive={isLive} handleDrawerToggle={this.handleDrawerToggle} handleLogOut={handleLogOut} mobileOpen={mobileOpen} onboardingProgress={onboardingProgress} />
            </React.Fragment>
        );
    }
}

AppFrame.propTypes = {
    handleLogOut: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
};

export default AppFrame;