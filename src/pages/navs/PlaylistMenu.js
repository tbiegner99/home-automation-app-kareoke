/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import {
  H3,
  ListItem,
  List,
  StopIcon,
  PrimaryButton
} from '@tbiegner99/home-automation-components';

import styles from './PlaylistMenu.css';

const ClearPlaylistLink = (props) => {
  if (props.empty) return null;
  return (
    <PrimaryButton className={styles.clearLink} onClick={props.onClick}>
      Clear Playlist
    </PrimaryButton>
  );
};
const EmptyPlaylist = () => <div className={styles.emptyPlaylist}>No Items In Playlist</div>;

class PlaylistMenu extends React.Component {
  componentDidMount() {
    const { onFetchPlaylistChanges, onFetchCurrentItemChanges } = this.props;
    this.pollPlaylist = setInterval(() => onFetchPlaylistChanges(), 5000);
    this.pollCurrentItem = setInterval(() => onFetchCurrentItemChanges(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pollPlaylist);
    clearInterval(this.pollCurrentItem);
  }

  renderCurrentItem() {
    const { currentlyPlayingItem, onSkipCurrentItem } = this.props;
    if (!currentlyPlayingItem) {
      return null;
    }
    return (
      <section className={styles.nowPlaying}>
        <H3 className={styles.playlistHeader}>Now Playing </H3>
        <ListItem
          title={currentlyPlayingItem.title}
          onDelete={onSkipCurrentItem}
          subtitle={currentlyPlayingItem.artist}
          deleteIcon={<StopIcon />}
        />
      </section>
    );
  }

  render() {
    const { playlist, onMoveItemUp, onMoveItemDown, onDeleteItem, onClearPlaylist } = this.props;
    if (!playlist) return null;
    const toPlaylistItem = (item, index) => (
      <ListItem
        title={item.title}
        subtitle={item.artist}
        onMoveUp={() => onMoveItemUp(item)}
        onMoveDown={() => onMoveItemDown(item)}
        onDelete={() => onDeleteItem(item)}
        canMoveUp={index > 0}
        canMoveDown={index < playlist.length - 1}
      />
    );
    const isEmpty = playlist.length === 0;
    const playlistItems = isEmpty ? <EmptyPlaylist /> : playlist.map(toPlaylistItem);
    return (
      <div>
        {this.renderCurrentItem()}
        <section>
          <H3 className={styles.playlistHeader}>Current Playlist</H3>
          <List>{playlistItems}</List>
          <ClearPlaylistLink empty={isEmpty} onClick={onClearPlaylist} />
        </section>
      </div>
    );
  }
}

export default PlaylistMenu;
