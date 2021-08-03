
import React from 'react';

interface NewMarketState {
  marketName: string,
  marketLocation: string,
  marketSeason: string
}

interface customEvent {
  target: HTMLInputElement
}

export class NewMarketForm extends React.Component<{}, NewMarketState> {
  state: NewMarketState = {
    marketName: '',
    marketLocation: '',
    marketSeason: ''
  }


  private onNameChange(event: customEvent) {
    this.setState({ marketName: event.target.value })
  }

  render() {
    return (
      <form>
        <div>
          <h2> Add A New Market </h2>
          <label> NAME: </label>
          <input value="market name" onChange={this.onNameChange} /><br />
          <label> LOCATION: </label>
          <input value="market location" /><br />
          <label> HOURS/SEASON </label>
          <input value="i.e 9AM-3PM Summer" /><br />
          <input type='checkbox' name="been-there" />
          <label htmlFor="been-there">Been There! </label> <br />
          <input type='checkbox' name="want-to" />
          <label htmlFor="want-to">Want to go!</label> <br />
          <button type='submit'> SUBMIT </button>

        </div>
      </form>
    )
  }


}