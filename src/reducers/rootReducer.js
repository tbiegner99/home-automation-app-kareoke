import { combineReducers } from 'redux';
import { ApplicationStore } from '@tbiegner99/ui-app-components';
import PlaylistStore from '../stores/PlaylistStore';
import SongsStore from '../stores/SongsStore';

export default combineReducers({
  application: ApplicationStore.reduce,
  playlist: PlaylistStore.reduce,
  songs: SongsStore.reduce
});
