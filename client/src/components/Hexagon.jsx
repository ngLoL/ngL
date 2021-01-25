import React from 'react';
import styled from 'styled-components';

const Hexagon = (props) => {

  return (
    <div id="hexagon">
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