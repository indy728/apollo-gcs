import React from 'react';
import { FlexSpacer, InlineBrand, Typography } from 'components/ui';
import {HeaderNav, HeaderItemsContainer, HeaderItem} from './components/top-nav.styles';
import {HeaderLinks} from './components';

const TopNav: React.FC = () => (
    <HeaderNav>
      <HeaderItemsContainer>
        <HeaderItem>
          <Typography fontSize="2.8rem">
            <InlineBrand />
          </Typography>
        </HeaderItem>
        <FlexSpacer />
        <HeaderLinks />
      </HeaderItemsContainer>
    </HeaderNav>
)

export default TopNav;