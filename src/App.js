import React from 'react';
import { Container, Segment, Button, Icon, List, Message, Pagination } from 'semantic-ui-react'
import data from './data.json';
import HeaderComponent from './components/Header';
import AddFriend from './components/AddFriend';
import SearchFriend from './components/SearchFriend';
const style = {
  container: {
    marginTop: '2em'
  },
  marginLebel: {
    marginTop: '5px',
    display: 'block'
  },
  fav: {
    color: 'red'
  }
}

const App = () => {

  const [page, setPage] = React.useState(1);
  const [list, setList] = React.useState(data);

  const itemsPerPage = 4
  const totalPages = list.length / itemsPerPage;
  const renderItems = list.slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + itemsPerPage);

  const setPageNum = (evt, { activePage }) => {
    setPage(activePage);
  };

  const handleSearch = (searchInput) => {
    if (searchInput !== "") {
      const results = list.filter(item =>
        item.name.toLowerCase().includes(searchInput)
      );
      setList(results);
    }
  }


  const handleRemove = (id) => {
    const items = renderItems.filter(item => item.id !== id);
    setList(items);
  }


  const addFriend = (userInput) => {
    let copy = [...list];
    copy = [{ id: list.length + 1, name: userInput, favorite: false }, ...list];
    setList(copy);
  }


  const addToFavirite = (id) => {
    const existingListItems = [...list];
    const clickedItemIndex = existingListItems.findIndex((item) => item.id === id);
    existingListItems[clickedItemIndex].favorite = !existingListItems[clickedItemIndex].favorite;
    existingListItems.sort((a, b) => { return b.favorite - a.favorite })
    setList(existingListItems);
  }


  return (
    <Container text style={style.container}>
      <Segment.Group>
        <HeaderComponent />
        <AddFriend add={addFriend} />
        <SearchFriend search={handleSearch} />
        <Segment>
          <List divided verticalAlign='middle'>
            {list.length !== 0 ? renderItems.map((item) => {
              return (
                <List.Item key={item.name}>
                  <List.Content floated='right'>
                    <Button icon color={item.favorite ? 'red' : ''} onClick={() => addToFavirite(item.id)}>
                      <Icon name='star' />
                    </Button>
                    <Button icon onClick={() => handleRemove(item.id)} >
                      <Icon name='trash alternate' />
                    </Button>
                  </List.Content>
                  <List.Content>
                    <List.Header>{item.name}</List.Header>
          is your friend
        </List.Content>
                </List.Item>
              )
            }) : <Message
              icon='inbox'
              header='No Data in List!'
              content='Add friend in list'
            />}
          </List>
        </Segment>
      </Segment.Group>
      <Pagination
        activePage={page}
        totalPages={totalPages}
        siblingRange={1}
        onPageChange={setPageNum} />
    </Container>
  )

}
export default App