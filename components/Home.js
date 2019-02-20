import React, {Component} from 'react'
import {Body, Button, Container, Content, Fab, Header, Icon, Right, Title} from "native-base";
import {getDecks, clearStorage} from '../utils/api'
import {receiveDecks} from "../actions";
import {connect} from 'react-redux';
import ListDeck from  './Decks/ListDeck';

class Home extends Component {

    state = {
        active: 'true'
    };

    componentDidMount() {
        const {dispatch} = this.props;

        getDecks()
            .then((decks) => this.props.dispatch(receiveDecks(decks)))
    }

    render() {

        const {decks} = this.props;

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Decks</Title>
                    </Body>
                </Header>
                <Content padder>
                    {decks && decks.length !== 0 &&
                    decks.map(deck => (
                        <ListDeck key={deck.id} id={deck.id} navigation={this.props.navigation} />
                    ))}
                </Content>
                <Fab
                    style={{backgroundColor: 'green'}}
                    onPress={() => this.props.navigation.navigate("CreateDeck")}
                    position="bottomRight">
                    <Icon name="add" />
                </Fab>
            </Container>
        )
    }
}

function mapStateToProps (decks) {
    return {
        decks: Object.values(decks)
    }
}

export default connect(mapStateToProps)(Home);
