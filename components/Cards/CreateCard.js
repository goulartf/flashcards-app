import React, {Component} from 'react'
import {Body, Button, Container, Content, Form, Header, Icon, Input, Item, Left, Text, Title, Toast} from "native-base";
import {saveDeck} from "../../utils/api";
import {createDeck} from '../../actions';
import {connect} from 'react-redux';

class CreateCard extends Component {

    state = {
        question: '',
        answer: '',
    };

    submit = () => {
        const { deck } = this.props

        const updatedDeck = {
            ...deck,
            questions: [...deck.questions, this.state]
        }

        saveDeck(updatedDeck.id, updatedDeck)
            .then(() => this.props.dispatch(createDeck(updatedDeck.id, updatedDeck)))
            .then(() => {
                Toast.show({
                    text: 'Card Added',
                    buttonText: 'Okay',
                    duration: 3000,
                })
            })
            .then(() => this.props.navigation.navigate('Deck', { id: deck.id }))
            .catch((err) => {
                alert('Error' + JSON.stringify(err))
                console.log(err)
            })

        this.setState(() => ({
            ...this.state,
            question: '',
            answer: '',
        }))
    };


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
                    <Title>Create Decks</Title>
                    </Body>
                </Header>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Question"
                                   onChangeText={question => this.setState({ question })}
                                   value={this.state.question}/>
                        </Item>
                        <Item>
                            <Input placeholder="Answer"
                                   onChangeText={answer => this.setState({ answer })}
                                   value={this.state.answer}/>
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
function mapStateToProps (decks, { navigation }) {
    const { deckId } = navigation.state.params

    return {
        deckId,
        deck: decks[deckId],
    }
}

export default connect(mapStateToProps)(CreateCard)
