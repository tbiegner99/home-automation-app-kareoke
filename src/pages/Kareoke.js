import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Catalog from './catalog/Catalog';
import PlaylistManager from './playlistManager/ReduxPlaylistManager';
import styles from './kareoke.css';
import Urls from '../utils/Urls';
import SideMenu from './navs/SideMenu';
import PlaylistMenu from './navs/PlaylistMenu';
import PlaylistActionCreator from '../actionCreators/PlaylistActionCreator';

class Kareoke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenuOpen: false
    };
  }

  openSideMenu() {
    this.setState({
      sideMenuOpen: true
    });
  }

  closeSideMenu() {
    this.setState({
      sideMenuOpen: false
    });
  }

  render() {
    const {
      onDeletePlaylistItem,
      onClearPlaylist,
      playlist,
      onMoveItemDown,
      onMoveItemUp,
      onFetchPlaylistChanges,
      shouldHandleDefaultRoute
    } = this.props;
    return (
      <Router>
        <div className={styles.kareokePage}>
          <SideMenu open={this.state.sideMenuOpen} onClose={() => this.closeSideMenu()}>
            <PlaylistMenu
              playlist={playlist}
              onFetchPlaylistChanges={onFetchPlaylistChanges}
              onDeleteItem={onDeletePlaylistItem}
              onClearPlaylist={onClearPlaylist}
              onMoveItemDown={onMoveItemDown}
              onMoveItemUp={onMoveItemUp}
            />
          </SideMenu>
          <div className={styles.mainContent}>
            <Switch>
              <Route exact path={Urls.Kareoke.PLAYLIST_MANAGER} component={PlaylistManager} />
              <Route exact path={Urls.Kareoke.CATALOG} component={Catalog} />
              {shouldHandleDefaultRoute ? (
                <Redirect from="*" to={Urls.Kareoke.PLAYLIST_MANAGER} />
              ) : null}
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  playlist: state.playlist.store.playlistData.value
});

const mapDispatchToProps = () => ({
  onChangeUrl: (url) => {
    PlaylistActionCreator.changeUrl(url);
  },
  onFetchPlaylistChanges: async () => {
    try {
      await PlaylistActionCreator.getPlaylistItems();
    } catch (err) {
      // TODO:
    }
  },
  onClearPlaylist: async () => {
    try {
      await PlaylistActionCreator.clearPlaylist();
    } catch (err) {
      // TODO:
    }
  },
  onDeletePlaylistItem: async (item) => {
    try {
      await PlaylistActionCreator.deletePlaylistItem(item);
    } catch (err) {
      // TODO:
    }
  },
  onMoveItemDown: async (item) => {
    try {
      await PlaylistActionCreator.moveItemDown(item);
    } catch (err) {
      // TODO:
    }
  },
  onMoveItemUp: async (item) => {
    try {
      await PlaylistActionCreator.moveItemUp(item);
    } catch (err) {
      // TODO:
    }
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Kareoke);
