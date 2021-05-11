import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Header,
  Segment,
  Input,
  Button, Icon, List, Message
} from 'semantic-ui-react'

const style = {
  container: {
    marginTop: '2em'
  },
  marginLebel: {
    marginTop: '5px',
    display: 'block'
  },
  fav:{
    color:'red'
  }
}

const friends = [];

const App = () => {

  const [list, setList] = React.useState(friends);
  const [isFav, setFav] = React.useState(false);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (e.target.value !== '') {
        const newList = list.concat({ id: uuidv4(), name: e.target.value});
        setList(newList);
      }
      e.target.value = '';
    }
  }

  const handleSearch = (e) => {
    const filteredList = list.filter(item => item.name === e.target.value)
    setList(filteredList);
  }

  const handleRemove = (id) => {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  


  const renderItems = list.map((item) => {
    return (
      <List.Item key={item.id}>
        <List.Content floated='right'>
          <Button icon color={isFav? 'red' : ''}>
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
  });

  return (
    <Container text style={style.container}>
      <Segment.Group>
        <Header as='h4' attached='top' block>
          Friend List
       </Header>
        <Segment attached>
          <Input
            fluid
            icon='add user'
            iconPosition='left'
            label={{ tag: true, content: 'Add Friend' }}
            labelPosition='right'
            placeholder='Enter your friend name'
            onKeyPress={handleKeyPress}
          />
        </Segment>
        <Segment attached>
          {
            list.length !== 0 ? <Input
              fluid
              icon='search'
              iconPosition='left'
              label={{ tag: true, content: 'Search...' }}
              labelPosition='right'
              placeholder='Search Friend'
              onChange={handleSearch}
            /> : null
          }

        </Segment>
        <Segment>
          <List divided verticalAlign='middle'>
            {list.length !== 0 ? renderItems : <Message
              icon='inbox'
              header='No Data in List!'
              content='Add friend in list'
            />}
          </List>
        </Segment>
      </Segment.Group>
    </Container>
  )

}
export default App