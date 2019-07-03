import React from 'react';
import Nav from './Nav';
import TopBar from './TopBar';

class AppFrame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mobileOpen: false,
        };
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    render() {
        const { handleLogOut, isLive, pathname } = this.props;
        const { mobileOpen } = this.state;

        return (
            <React.Fragment>
                <TopBar pathname={pathname} handleDrawerToggle={this.handleDrawerToggle} />
                <Nav isLive={isLive} handleDrawerToggle={this.handleDrawerToggle} handleLogOut={handleLogOut} mobileOpen={mobileOpen} />
            </React.Fragment>
        );
    }
}

export default AppFrame;