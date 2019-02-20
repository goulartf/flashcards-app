import React, {Component} from 'react'
import {Body, Button, Container, Fab, Header, Icon, Left, Right, Text, Title, Toast, View} from "native-base";
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from "react-redux";

import {removeDeck} from '../../actions';
import {deleteDeck} from '../../utils/api';

class Deck extends Component {

    delete = () => {
        const {deck} = this.props

        deleteDeck(deck.id)
            .then(() => this.props.dispatch(removeDeck(deck.id)))
            .then(() => {
                Toast.show({
                    text: 'Deck Deleted',
                    buttonText: 'Okay',
                    duration: 3000,
                })
            })
            .then(() => this.props.navigation.navigate('Home'))
            .catch((err) => {
                alert('Error')
                console.log(err)
            })
    }

    render() {
        const cards = 0;
        const {deck} = this.props;

        if (deck == null) {
            return <Text>Not exists</Text>
        }

        return (

            <Container style={{backgroundColor: "#FBFAFA"}}>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Deck: {deck.name}</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={{flex: 1}}>


                    <Icon2 name="cards-outline" size={200} style={{textAlign: 'center'}}/>
                    <Text
                        style={{textAlign: 'center'}}>{typeof deck.questions == "undefined" || !deck.questions.length ? 0 : deck.questions.length} cards</Text>
                    <Button
                        onPress={() => this.props.navigation.navigate("CreateCard", {deckId: deck.id})}
                        iconLeft
                        style={{alignSelf: 'center'}}>
                        <Icon name="add"/>
                        <Text>Add Card</Text>
                    </Button>

                    <Fab
                        style={{backgroundColor: 'red'}}
                        onPress={() => this.delete()}
                        position="bottomLeft">
                        <Icon name="trash"/>
                    </Fab>
                    <Fab
                        style={{backgroundColor: 'green'}}
                        onPress={() => this.props.navigation.navigate('Quiz', {deckId: deck.id})}
                        position="bottomRight">
                        <Icon name="play"/>
                    </Fab>

                </View>
            </Container>
        )
    }
}

function mapStateToProps(decks, {navigation}) {
    const {id} = navigation.state.params
    return {
        id,
        deck: decks[id] ? decks[id] : null,
    }
}

export default connect(mapStateToProps)(Deck);
