import React, { FunctionComponent } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import TableFooter from '@material-ui/core/TableFooter';
import Table from '@material-ui/core/Table';
import { PageSizeSelector } from '../pageSizeSelector';
import { useSelector } from '../../../../contexts/repository/provider';
import { selectIsLoading, selectRepositories } from '../../../../../domain/repository/reducer/selectors';
import { Loader } from '../../../../components/loader';

export const DataTable: FunctionComponent = () => {
  const repositories = useSelector(selectRepositories);
  const isLoading = useSelector(selectIsLoading);

  return (
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Stars</TableCell>
          <TableCell>Forks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {repositories.map(repository => (
          <TableRow key={repository.name}>
            <TableCell>
              <a href={repository.url} target="_blank" rel="noreferrer">
                {repository.name}
              </a>
            </TableCell>
            <TableCell>{repository.stars}</TableCell>
            <TableCell>{repository.forks}</TableCell>
          </TableRow>
        ))}
        {isLoading && (
          <TableRow>
            <TableCell />
            <TableCell>
              <Loader />
            </TableCell>
            <TableCell />
          </TableRow>
        )}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>
            <PageSizeSelector />
          </TableCell>
          <TableCell>Visible repositories amount: {repositories.length}</TableCell>
          <TableCell />
        </TableRow>
      </TableFooter>
    </Table>
  );
};
