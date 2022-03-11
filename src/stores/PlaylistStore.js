import { AbstractReducingStore, StoreField } from '@tbiegner99/ui-app-components';
import PlaylistActionCreator from '../actionCreators/PlaylistActionCreator';
import PlaylistEvents from '../events/PlaylistEvents';

class PlaylistStore extends AbstractReducingStore {
  constructor() {
    super();
    this.data = {
      playlistData: new StoreField('playlistData', null, this.getPlaylistData.bind(this)),
      currentlyPlaying: new StoreField(
        'currentlyPlaying',
        null,
        this.getCurrentlyPlayingItem.bind(this)
      )
    };
  }

  get playlistData() {
    return this.data.playlistData;
  }

  get currentlyPlaying() {
    return this.data.currentlyPlaying;
  }

  getPlaylistData() {
    return PlaylistActionCreator.getPlaylistItems();
  }

  getCurrentlyPlayingItem() {
    return PlaylistActionCreator.getCurrentPlayingItem();
  }

  handleEvent(action) {
    switch (action.type) {
      case PlaylistEvents.CURRENT_ITEM_LOADED:
        this.data.currentlyPlaying.value = action.data;
        break;
      case PlaylistEvents.PLAYLIST_LOADED:
        this.data.playlistData.value = action.data;
        break;
      default:
        return false;
    }
    return true;
  }
}

export default new PlaylistStore();
