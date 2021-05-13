import React from 'react';
import { Segment, Input } from 'semantic-ui-react'

const SearchFriend = ({ search }) => {

  const [searchInput, setSearchInput] = React.useState('');

  const handleChange = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  }


  React.useEffect(() => {
    search(searchInput)
  }, [searchInput]);

  return (
    <Segment attached>
      <Input
        onChange={handleChange}
        fluid
        icon='search'
        iconPosition='left'
        label={{ tag: true, content: 'Search Friend' }}
        labelPosition='right'
        placeholder='Search Friend'
        value={searchInput}
      />
    </Segment>
  );
};

export default SearchFriend;