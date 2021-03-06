class QuestResults extends React.Component {
  constructor(){
    super()
    this.state = {
      questResults: []
    }
  }
  componentWillMount() {
    questID = this.props.currentQuest.id
    $.ajax({
      method: 'get',
      url: `/quests/${questID}/quest_members/results`
    }).done((response) => {
        this.setState({
          questResults: response
        })
    }.bind(this))
  }


  render(){

    // function hasMemberFailedQuest(member) {return member.succeeded === false}
    // // debugger
    // const membersThatFailedTheQuest = this.props.members.filter(hasMemberFailedQuest)

    // make it so that later quests with more players requires more fails.
    // i.e., set length to be 2 when over 7 users.
    var numFails = 0
    var numSuccess = 0
    for (i = 0; i < this.state.questResults.length; i++) {
      if (this.state.questResults[i] === true) {
        numSuccess++
      } else if (this.state.questResults[i] === false) {
        numFails++
      }
    }

    let questOutcome
    if (numFails > 0){
      questOutcome =
       <div>
         <h2>The mission has failed! The robots won this one.</h2>
         <p> {numFails} / {numFails + numSuccess} failed the mission!</p>
       </div>
    } else {
      questOutcome =
      <div>
        <h2>The humans have prevailed!</h2>
        <p> All {numFails + numSuccess} members succeeded the mission!</p>
      </div>
    }

    return(
      <div>
        {questOutcome}
        <CreateRound currentGame={this.props.currentGame} currentQuest={this.props.currentQuest} members={this.props.members} currentUser={this.props.currentUser} users={this.props.users}/>
      </div>
    )
  }
}
