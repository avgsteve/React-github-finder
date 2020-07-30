import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const Repos = ({ reposArray }) => {
  return reposArray.map(
    repo =>
      <RepoItem repoData={repo} key={repo.id} />);
};

Repos.propTypes = {
  reposArray: PropTypes.array.isRequired
};

export default Repos;
