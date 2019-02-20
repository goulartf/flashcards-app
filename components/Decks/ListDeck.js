import React, {Component} from 'react'
import {Card, CardItem, Right, Text} from "native-base";
import {TouchableOpacity} from "react-native";
import {connect} from "react-redux";

class ListDeck extends Component {

    render() {

        const {deck} = this.props;

        return (
            <TouchableOpacity key={deck.id} onPress={() => this.props.navigation.navigate('Deck', {id: deck.id})}>
                <Card button
                      style={{backgroundColor: "#c0c0c0"}}>
                    <CardItem>
                        <Text>{deck.name}</Text>
                    </CardItem>
                    <CardItem>
                        <Right>
                            <Text>{typeof deck.questions == "undefined" || !deck.questions.length ? 0 : deck.questions.length} cards</Text>
                        </Right>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}

function mapStateToProps(decks, {id}) {
    return {
        deck: decks[id]
    }

}

export default connect(mapStateToProps)(ListDeck);
