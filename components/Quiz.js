import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native'
import {Body, Button, Container, H1, H2, Header, Text, Title} from 'native-base'
import Icon from 'react-native-vector-icons/MaterialIcons'
import CardFlip from 'react-native-card-flip'
import {clearLocalNotification, setLocalNotification} from '../utils/helpers'

const INCORRECT = 0
const CORRECT = 1

class Quiz extends Component {

    state = {
        cardIndex: 0,
        quizFinished: 0,
        totalCards: 0,
        totalCorrectAnsweredQuestions: 0
    };

    componentDidMount() {
        const {cards} = this.props

        this.setState({
            totalCards: cards.length
        })
    }

    handleQuestionVote = questionVote => {
        this.card.flip()

        //this is a hack to change the card info in sync with cardFlip animation
        //there is an event called onFlipEnd, but i don't know how to use it
        setTimeout(() => {
            const cardIndex = this.state.cardIndex + 1

            this.setState(state => ({
                cardIndex,
                totalCorrectAnsweredQuestions:
                    state.totalCorrectAnsweredQuestions + questionVote
            }))

            if (cardIndex == this.state.totalCards) {
                this.completeTheQuiz()
            }
        }, 200)
    };

    completeTheQuiz = () => {
        this.setState({quizFinished: 1})

        clearLocalNotification()
            .then(setLocalNotification)
    }

    getPercentageOfCorrectAnsweredQuestions = () => {
        return (
            (this.state.totalCorrectAnsweredQuestions / this.state.totalCards) * 100
        )
    };

    restartQuiz = () => {
        this.setState({
            cardIndex: 0,
            quizFinished: 0,
            totalCorrectAnsweredQuestions: 0
        })
    };

    render() {
        const {deck} = this.props;
        const currentQuestion = this.props.cards[this.state.cardIndex]

        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Quiz</Title>
                    </Body>
                </Header>
                {this.state.quizFinished ? (

                    // Start Score
                    <View style={[styles.container]}>
                        <View style={{paddingTop: 150, paddingBottom: 50}}>
                            <H2 style={{textAlign: 'center'}}>
                                You`ve got {this.state.totalCorrectAnsweredQuestions} over{' '}
                                {this.state.totalCards}{' '}
                            </H2>

                            <Text style={{marginTop: 20, textAlign: 'center'}}>
                                {this.getPercentageOfCorrectAnsweredQuestions()} %
                            </Text>
                        </View>

                        <View style={styles.actionContainer}>
                            <Button
                                success
                                style={[styles.actionButton, {marginRight: 15}]}
                                onPress={() => this.restartQuiz()}
                            >
                                <Text>Restart Quiz</Text>
                            </Button>

                            <Button
                                style={styles.actionButton}
                                onPress={() => this.props.navigation.navigate('Home')}
                            >
                                <Text>Decks</Text>
                            </Button>
                        </View>
                    </View>
                    // End Score

                ) : currentQuestion !== undefined && currentQuestion.length !== 0 ? (

                    // Start Card
                    <View style={styles.container}>
                        <View style={styles.questionCounter}>
                            <Text>
                                {`${this.state.cardIndex + 1} / ${this.state.totalCards}`}
                            </Text>
                        </View>

                        <CardFlip
                            style={styles.cardContainer}
                            ref={card => (this.card = card)}
                        >
                            <View style={styles.card}>
                                <Text style={styles.cardAnswer}>
                                    {currentQuestion.question}
                                </Text>
                                <Button style={styles.centerButton}
                                        iconLeft
                                        onPress={() => this.card.flip()}>
                                    <Text>Answer</Text>
                                </Button>
                            </View>

                            <TouchableWithoutFeedback onPress={() => this.card.flip()}>
                                <View style={styles.card}>
                                    <View>
                                        <Text style={styles.cardQuestion}>
                                            {currentQuestion.answer}
                                        </Text>
                                    </View>

                                    <View style={styles.actionContainer}>
                                        <Button
                                            success
                                            style={styles.actionButton}
                                            onPress={() => this.handleQuestionVote(CORRECT)}
                                        >
                                            <Text>Correct</Text>
                                        </Button>

                                        <Button
                                            danger
                                            style={styles.actionButton}
                                            onPress={() => this.handleQuestionVote(INCORRECT)}
                                        >
                                            <Text>Incorrect</Text>
                                        </Button>
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </CardFlip>
                    </View>
                    //End Card

                ) : (

                    //Start Not Found
                    <View style={styles.container}>
                        <H2 style={{paddingTop: 200}}>No Cards Found</H2>
                    </View>
                    //End Not Found

                )}
            </Container>
        )
    }
}

function mapStateToProps(decks, {navigation}) {
    const {deckId} = navigation.state.params
    const deck = decks[deckId]

    return {
        deckId,
        deck,
        cards: deck ? deck.questions : []
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardContainer: {
        width: 320,
        height: 400
    },
    questionCounter: {
        marginTop: 30,
        marginBottom: 40
    },
    card: {
        textAlign: 'center',
        width: 320,
        height: 400,
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },

    cardQuestion: {
        height: 290,
        fontSize: 16,
        textAlign: 'center'
    },

    cardAnswer: {
        height: 300,
        fontSize: 16,
        textAlign: 'center',
        paddingTop: 50
    },

    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    actionButton: {
        width: 130,
        height: 40,
        justifyContent: 'center'
    },
    centerButton: {
        alignSelf: 'center'
    }
})

export default connect(mapStateToProps)(Quiz)
