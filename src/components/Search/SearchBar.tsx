import React from 'react';
import styles from './SearchBar.module.scss';

const SearchBar: React.FC = () => {
  return (
    <div className={styles.searchBar}>
      <input type="text" placeholder="Type in your query..." className={styles.searchBarInput}/>
    </div>
  );
};

export default SearchBar;