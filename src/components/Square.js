import React from 'react';
import { HEADERS } from '../constants';
import { API_ROOT } from '../constants';


class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      room_id: this.props.room_id,
      user_id: this.props.user_id,
      bgColor: null,
      lucky: this.props.initLucky,
      found: false,
      temp: null
    };
    this.evaluateClick = this.evaluateClick.bind(this);
  }

  updateLuckySquare = () => {
    fetch(`${API_ROOT}/guesses/my_guess_id`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
  }

  generateNewLucky = () => {
    const lucky = Math.floor(Math.random() * 27) + 1;
    console.log(`NEW RANDOM Lucky, ${lucky}`);
    return this.setState({ lucky: lucky });
  };

  showLucky = () => {
    if (this.state.lucky) {
      this.setState({ bgColor: "green" });
    } else {
      this.setState({ bgColor: "yellow" });
    }
  };

  evaluateClick() {
    this.props.guesses.map(guess => {
      //check if the guess is lucky
      if (
        this.state.value === this.state.lucky &&
        this.state.value !== guess.value
      ) {
        console.log("YOU FOUND LUCKY!");
        console.log(`CURRENT VALUE ${this.state.value}`);
        //if you found lucky:
        // 1. set lucky number as temp
        this.setState({ temp: this.state.value });
        // 2. setState bgColor :"green"
        this.setState({ bgColor: "green" });
        // 3. setState found : true
        this.setState({ found: true });
        // 4. update points (for now keep track of points in state only)
        this.props.updateStatePoints();

      } else if (
        this.state.value === this.state.lucky &&
        this.state.value === guess.value
      ) {
        this.setState({ bgColor: "orange" });
        if(guess.tem !== null) {
          const guessID = guess.id 
          console.log(`guessID, ${guessID}`);
          fetch(`${API_ROOT}/guesses/${guessID}`, {
            method: "PATCH",
            headers: HEADERS,
            body: JSON.stringify({bgColor: "orange"})
          })
          // .then(fetch(`${API_ROOT}/guesses`)
          //   .then(res => res.json())
          //   .then(guesses => console.log(guesses)));
        }
        // check who holds lucky and change bgColor to orange
        console.log(`TEMP = , ${guess.temp}, USER, ${guess.user_id}`);
        console.log(guess.temp);
      
          // I want to update the guess with guess.temp != null to guess.bgColor = "orange";
          // this.setState({ temp: null })
          // generate a new lucky
          // then generste a new lucky via this.generateNewLucky();
       
      } else if (this.state.value !== this.state.lucky) {
        this.setState({ bgColor: "orange" });
        //if you find the lucky but it was already claimed by someone else:
      } else {
        console.log("no more cases!");
      }
    });
  }

  changeLuckyColor = () => {
    this.props.guesses.find(function(el) {
      return;
    });
  };

  test = () => {
    // console.log("AM I TESTING????")
    //   console.log(`VALUE, ${this.state.value}`);

    this.props.guesses.map(guess => {
      console.log(`USER IS ${guess.user_ids[0]}`);
      console.log(`THIS STATE USER IS  ${this.state.user_id}`);
      console.log(`GUESS, ${guess.value}`);
      return this.state.value === guess.value
        ? this.setState({
            bgColor: "purple"
          })
        : this.setState({
            bgColor: "yellow"
          });
    });
  };

  // foundLucky = () => {
  //   return this.state.value === this.state.lucky
  //     ? this.setState({ bgColor: "green", found: true })
  //     : this.setState({ bgColor: "orange" });
  // };

  handleClick = () => {
    // e.preventDefault();
    this.postGuess();
    this.evaluateClick();
    // // this.updatePointsDB();
    // this.updatePointState();
  };

  resetValue = () => {
    this.setState({ value: null });
  };
  componentWillReceiveProps = nextProps => {
    this.setState({ room_id: nextProps.room_id });
  };

  postGuess = () => {
    console.log("READY FOR FETCH");
    fetch(`${API_ROOT}/guesses`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: HEADERS
    });
    // .then(resp => resp.json()).then(result => this.test())
  };

  render() {
    console.log(`lucky: ${this.state.lucky}`);
    return (
      <button
        className="square"
        style={{ background: this.state.bgColor }}
        onClick={this.handleClick}
      />
    );
  }
}

export default Square;

//use for later when backend points controller is set up
// updatePointsDB = () => {
//   fetch(`${API_ROOT}/points`, {
//     method: "PATCH",
//     body: JSON.stringify({ points: { points: this.points + award } }),
//     headers: HEADERS
//   });
// };

// updatePointState = () => {
//   fetch(`${API_ROOT}/points`)
//     .then(res => res.json())
//     .then(points => {
//       console.log(points.points);
//       this.setState({ points: points.points });
//     });
// };
  //////////////////////////////////////////////////////////////////