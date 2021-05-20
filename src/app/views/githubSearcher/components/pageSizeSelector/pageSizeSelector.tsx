import React, { ChangeEvent, FunctionComponent } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { setPageSizeAction } from '../../../../../domain/repository/reducer';
import { selectPageSize } from '../../../../../domain/repository/reducer/selectors';
import { useDispatch, useSelector } from '../../../../contexts/repository/provider';
import { PAGE_SIZES } from '../../../../constants/pageSizes';

export const PageSizeSelector: FunctionComponent = () => {
  const dispatch = useDispatch();
  const pageSize = useSelector(selectPageSize);

  const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown }>) => {
    dispatch(setPageSizeAction(parseInt(event.target.value as string, 10)));
  };

  return (
    <>
      <InputLabel id="page-size">Page Size</InputLabel>
      <Select value={pageSize} onChange={handleChange} labelId="page-size">
        {PAGE_SIZES.map(size => (
          <MenuItem value={size} key={size}>
            {size}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
