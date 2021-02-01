import React from 'react';
import styled from 'styled-components';
import { Radar } from 'react-chartjs-2';

// conditional rendering
// if (state == faker or 0 or key) { render that player's hexagon }
const Hexagon = (props) => {
  const data = {
    labels: [ "KDA", "CS/min", "Win Rate", "Kill Participation", "Team Damage", "Vision Score per min" ],
    datasets: [
      {
        label: `${props.summonerName}`,
        backgroundColor: "rgba(200, 200, 200, 0.2)",
        pointBackgroundColor: "rgba(200, 200, 200, 1)",
        data: [ 0, 1, 2, 3, 4, 5 ],
      },
      {
        label: "Faker",
        backgroundColor: "rgba(220, 220, 220, 0.2)",
        pointBackgroundColor: "rgba(220, 220, 220, 1)",
        data: [ 1, 2, 3, 4, 5, 6 ],
      },
    ],
  };

  const options = {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Your Hexagon',
    },
    scale: {
      reverse: false,
    },
    ticks: {
      beginAtZero: true,
    },
  };

  return (
    <div id="hexagon">
      <Radar data={data} options={options}></Radar>
      <div>KDA: {props.kda.toFixed(2)}</div>
      <div>CS/min: {props.cs}</div>
      <div>Win Rate: {props.winRate}%</div>
      <div>Kill Participation: {props.killParticipation}%</div>
      <div>Team Damage: {props.teamDamage}%</div>
      <div>Vision Score per min:{props.visionScore}</div>
    </div>
  );
};

export default Hexagon;