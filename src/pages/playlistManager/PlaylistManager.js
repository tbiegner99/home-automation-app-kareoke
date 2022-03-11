import React from 'react';
import {
  H2,
  Modal,
  Form,
  PrimaryButton,
  TextInput,
  HiddenField
} from '@tbiegner99/home-automation-components';
import ResultsPreview from './ResultsPreview/ResultsPreview';
import FullResults from './FullResults/FullResults';

import styles from './playlistManager.css';

const partitionArray = (arr, groupingFunc) => {
  const result = {};
  arr.forEach((item) => {
    const key = groupingFunc(item);
    const array = result[key] || [];
    array.push(item);
    result[key] = array;
  });
  return result;
};

class PlaylistManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onAddSong(song) {
    if (this.existsInPlaylist(song)) {
      this.setState({
        confirmAdd: song
      });
    } else {
      this.props.onAddSong(song.songId);
    }
  }

  existsInPlaylist(song) {
    const { playlist } = this.props;
    return playlist.filter((item) => item.songId === song.songId).length > 0;
  }

  changeSearchText(value) {
    this.setState({ value });
    if (value.length >= 3) {
      this.props.onAutoCompleteSearch(value);
    }
  }

  fullSearch(data) {
    this.props.onFullSearch(data);
  }

  cancelAdd() {
    this.setState({ confirmAdd: null });
  }

  renderConfirmModal() {
    const { confirmAdd } = this.state;
    const { onAddSong } = this.props;
    if (!confirmAdd) {
      return null;
    }
    return (
      <Modal className={styles.confirmAddModal}>
        <header>{JSON.stringify(confirmAdd)}</header>
        <main />
        <footer>
          <button onClick={() => onAddSong(confirmAdd.songId)}>Add</button>
          <button onClick={() => this.cancelAdd()}>Cancel</button>
        </footer>
      </Modal>
    );
  }

  renderResults() {
    if (!this.state.showResults || !this.state.value) return null;
    const byResultType = (song) => song.resultType;
    const results = partitionArray(this.props.autoCompleteResults || [], byResultType);
    return <ResultsPreview results={results} />;
  }

  render() {
    return (
      <main>
        <section className={styles.searchHeader}>
          <H2 className={styles.header}>Add Song To Playlist</H2>
          <Form onSubmit={(data) => this.fullSearch(data)}>
            <div className={styles.searchBox}>
              <div className={styles.searchBoxInput}>
                <TextInput
                  autocomplete="off"
                  name="searchText"
                  value={this.state.value}
                  onChange={(value) => this.changeSearchText(value)}
                  onFocus={() => this.setState({ showResults: true })}
                  onBlur={() => this.setState({ showResults: false })}
                />
              </div>
              <PrimaryButton submittable>Search</PrimaryButton>
            </div>

            <HiddenField name="searchMode" value="startsWith" />
          </Form>
        </section>
        {this.renderResults()}
        <section>
          <FullResults onAdd={(song) => this.onAddSong(song)} results={this.props.searchResults} />
        </section>
        {this.renderConfirmModal()}
      </main>
    );
  }
}

export default PlaylistManager;
