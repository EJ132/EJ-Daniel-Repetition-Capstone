import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './Dash.css'
import ApiService from '../../services/auth-api-service'
import german_flag from '../../Images/german.png'
import {Doughnut} from 'react-chartjs-2'

class DashboardRoute extends Component {

  completed = 42;
  uncompleted = 100 - this.completed

  state = {
    data: {
      labels: [
        'Completed', 'Uncompleted'
      ],
      datasets: [ {
        data: [this.completed, this.uncompleted],
        backgroundColor: [
        '#00A550'
        ],
      }],
    },
    options: {
      responsive: true,
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: 'Chart.js Doughnut Chart'
      },
    }
  }

  componentDidMount(){
    ApiService.getLanguages()
    .then(resJSON => { this.setState({
      languages : {...resJSON}
    })
    console.log(resJSON)

    console.log(this.state.languages.language.name)
  })
  }

  displayDash = () => {
    console.log('inside display: ' + this.state.languages.language.name)
    return (
      <div className='side_content'>
        <img src={german_flag} alt='german flag'/>
        <h2>{this.state.languages.language.name}</h2>
        <p id='hidden'></p>
        <h5>Your progress</h5>
        <h4>Total correct answers: {this.state.languages.language.total_score}</h4>
      </div>)
  }

  displayWords = () => {
    console.log(this.state.languages.words)
    return (this.state.languages.words.map(word =>
      <li className='practice_more' key={word.id}>
        <h4>{word.original}</h4>
        correct answer count: {word.correct_count} incorrect answer count: {word.incorrect_count}
      </li> 
      )
    )
  }

  render() {
    return (
        <section className='Dashboard'>
          <div className='main_dashboard'>
            <h1>My Dashboard</h1>
          </div>
          <div className='side_dashboard'>
            <div>{this.state.languages ? this.displayDash() : null}</div>
            <Link to='/learn'>Start practicing</Link>
          </div>
            <div className='twoPiece_dashboard'>
              <div className='dash_grid'>
              <h3>Words to practice</h3>
                {this.state.languages ? this.displayWords() : null}
              </div>
              <div className='progress'>
                <h2>Progress</h2>
                <Doughnut options={this.state.options} data={this.state.data} />
              </div>
            </div>
        </section>
    );
  }
}

export default DashboardRoute

// {this.state.languages ? this.displayWords() : null}