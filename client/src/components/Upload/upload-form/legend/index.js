import React from 'react';
import {LegendRow} from './legend.styles';

const Legend = ({}) => (
  <LegendRow className="upload-form__legend legend-row">
    <div className="legend">
      <span className="legend__required">*required</span>
      <span className="legend__metadata">(indicates info taken from track metadata)</span>
    </div>
  </LegendRow>
)

export default Legend