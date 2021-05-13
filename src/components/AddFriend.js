import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import { Segment, Input } from 'semantic-ui-react'

const AddFriend = ({ add }) => {

    const [userInput, setUserInput] = useState('');

    const handleChange = (e) => {
        setUserInput(e.currentTarget.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        add(userInput);
        setUserInput("");
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Segment attached>
                <Input
                    onChange={handleChange}
                    fluid
                    icon='add user'
                    iconPosition='left'
                    label={{ tag: true, content: 'Add Friend' }}
                    labelPosition='right'
                    placeholder='Enter your friend name'
                    value={userInput}
                />
            </Segment>
        </Form>
    );
};

export default AddFriend;