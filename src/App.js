import React, { Component } from 'react';
import './App.css';
import FeedbackOptions from './components/Feedback/Feedback';
import Statistics from './components/Statistics/Statistics';
import Notification from './components/Notification/Notification';


class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onLeaveFeedback = e =>{
    const { textContent } = e.target;
    this.setState(prevState => ({
      [textContent]: prevState[textContent] + 1,
    }));
  }

  countTotalFeedback = () => {
    const { bad, neutral, good } = this.state;
    return bad + neutral + good;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return this.countTotalFeedback()
      ? Math.floor((good * 100) / this.countTotalFeedback())
      : 0;
  };
  
  render() {
    const {good, bad, neutral} = this.state;
    return(
      <>
      <div title="Please leave feedback">
        <h1>Please leave feedback</h1>
          <FeedbackOptions
            options={Object.keys(this.state)}
            onLeaveFeedback={this.onLeaveFeedback}
          />
           </div>
          <div>
          {this.countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
          </div>
          </>
    );
}
}
export default App;
