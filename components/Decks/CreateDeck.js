import React, {Component} from 'react'
import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Left, Text, Title, Toast} from "native-base";
import {generateUID} from "../../utils/helpers";
import {saveDeck} from "../../utils/api";
import {createDeck} from '../../actions';
import {connect} from 'react-redux';

class CreateDeck extends Component {

    state = {
        name: ""
    }

    submit = () => {

        const id = generateUID();
        const deck = { ...this.state, id: id, questions: [] }

        saveDeck(id, deck)
            .then(() => this.props.dispatch(createDeck(id, deck)))
            .then(() => {
                Toast.show({
                    text: 'Deck Created',
                    buttonText: 'Okay',
                    duration: 3000,
                })
            })
            .then(() => this.props.navigation.navigate('Deck', { id }))
            .catch((err) => {
                alert('Error')
                console.log(err)
            })

        this.setState(() => ({
            ...this.state,
            title: '',
        }))

    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Create Deck</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item last>
                            <Input placeholder="Name" onChangeText={(name) => this.setState({name})}/>
                        </Item>
                    </Form>

                    <Button block
                            style={{margin: 15, marginTop: 50}}
                            onPress={() => this.submit()}>
                        <Text>Create</Text>
                    </Button>

                </Content>
            </Container>
        )
    }
}

export default connect()(CreateDeck)
