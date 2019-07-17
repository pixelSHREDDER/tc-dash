import React from 'react';
import Nav from './Nav';
import TopBar from './TopBar';

class AppFrame extends React.Component {
    constructor() {
        super();
        this.state = {
          mobileOpen: false,
        };
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

export default AppFrame;