// @flow
import React, {Component} from 'react';
import styled from 'styled-components';

import { TextComponent } from './text';

import readyIcon from '../assets/images/green_check.png';
import syncIcon from '../assets/images/sync_icon.png';
import errorIcon from '../assets/images/error_icon.png';


const Wrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #000;
  border-radius: 27px;
  padding: 7px 13px;
`;

const Icon = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 8px;
`;

const StatusPillLabel = styled(TextComponent)`
  color: ${props => props.theme.colors.statusPillLabel};
  font-weight: ${props => props.theme.fontWeight.bold};
  text-transform: uppercase;
`;

type Props = {
  percent: number,
};

type State = {
  progress: number,
  type: string,
  icon: string,
  isRunning: boolean,
};

export class StatusPill extends Component<Props, State> {

  state = {
    progress: 0,
    type: 'synching',
    icon: syncIcon,
    isRunning: false,
  };

  componentDidMount() {
    this.status(this.props.percent);
  };

  status = (percent) => {
    if (percent === 100.0) {
      this.setState(() => ({ type: 'ready' }));
      this.setState(() => ({ icon: readyIcon }));
    }
  };
  
  render() {
    const { type, icon } = this.state;
    const { percent } = this.props;

    
    const showPercent = percent > 0 && percent < 100.0 ? `(${percent}%)` : '';
    
    return (
      <Wrapper>
        <Icon src={icon} />
        <StatusPillLabel value={`${type} ${showPercent}`} />
      </Wrapper>
    );
  };

};
