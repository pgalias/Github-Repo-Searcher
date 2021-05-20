import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import Button from '@material-ui/core/Button';
import { useFetchRepositories } from '../../hooks/useFetchRepositories';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
  text-align: center;
`;

export const Fetcher: FunctionComponent = () => {
  const fetch = useFetchRepositories();

  return (
    <Wrapper>
      <Button variant="outlined" onClick={fetch}>
        Fetch more repositories
      </Button>
    </Wrapper>
  );
};
