import React from 'react';
import PropTypes from 'prop-types';

const RepoItem = ({ repoData }) => {

  return (
    <div className='card'>
      <h3>
        <a href={repoData.html_url} target="_blank" rel="noopener noreferrer"> {repoData.name}
        </a>
      </h3>
    </div>
  );
};

RepoItem.propTypes = {
  repoData: PropTypes.object.isRequired
};

export default RepoItem;
