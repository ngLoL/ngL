import React, { useState } from 'react';
import RadarChart from 'react-svg-radar-chart';
import 'react-svg-radar-chart/build/css/index.css';
import styled from 'styled-components';

const Hexagon = (props) => {
  const [userStats, setUserStats] = useState([
    {
      data: {
        kda: props.kda / 10,
        cs: props.cs / 10,
        winRate: props.winRate / 100,
        killParticipation: props.killParticipation / 100,
        teamDamage: props.teamDamage / 100,
        visionScore: props.visionScore / 5,
      }
    }
  ]);
  const cap = {
    kda: 'KDA',
    cs: 'CS / min',
    winRate: 'Win Rate %',
    killParticipation: 'Kill Participation %',
    teamDamage: 'Team Damage %',
    visionScore: 'Vision Score / min',
  }

  return (
    <div id="hexagon">
      <RadarChart captions={cap} data={userStats} size={400}/>
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