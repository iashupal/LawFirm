import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import '../../styles/ui/_checkbox.scss';
import Button from '../../components/Button/';
import SimpleCheckbox from '../Checkbox/SimpleCheckbox';
let counter = 0;
function createData(name, task, tags, text, buttons) {
  counter += 1;
  return { id: counter, name, task, tags, text, buttons};
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'date', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'task', numeric: true, disablePadding: false, label: 'Task' },
  { id: 'tags', numeric: true, disablePadding: false, label: 'Tags' },
  { id: 'text', numeric: true, disablePadding: false, label: 'Text' },
  { id: 'buttons', numeric: true, disablePadding: false, label: 'Buttons' },

 
];
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: scroll,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    
  },
 
  
  table: {
    minWidth: 750,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy} = this.props;

    return (
      <TableHead className="table-head">
        <TableRow className="table-row">
          <TableCell className="table-cell">
            
          </TableCell>
          {rows.map(
            row => (
              <TableCell className="table-cell text-center"
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const IconButton = ({props}) => {
  return(
    <React.Fragment>
    <div className="table-action-btn table-btn-clr">
        <i className="material-icons left icons">
          access_time
        </i>
    </div>
    <div className="table-action-btn table-btn-clr">
      <i className="material-icons icons">
        border_color
      </i>
    </div>
    <div className="table-action-btn table-btn-clr">
      <i className="material-icons icons">
          delete
      </i>
    </div>
    </React.Fragment>
  )
}
const Tags = () => {
  return(
    <div className="task-tags-btn">
        {/* <button type="button" className="btn btnStyle accord3-btn-clr">Button2</button> */}
        <Button 
            mode="regular"
            size="small"
            color="inverted"
            variant="contained"
        >
        Btn
        </Button>
    </div>
  )
}


export class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'task',
    selected: [],
  
    data :  [
      {date: '2019-01-01', task:'abx', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-02-01', task:'123', tags:(<Tags/>), text: 68, buttons:(<IconButton/>)},
      {date: '2019-03-01', task:'223', tags:(<Tags/>), text: 69, buttons:(<IconButton/>)},
      {date: '2019-04-01', task:'667', tags:(<Tags/>), text: 70, buttons:(<IconButton/>)},
      {date: '2019-05-01', task:'678', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-06-01', task:'abc', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-07-01', task:'ghj', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-08-01', task:'dfgh', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-09-01', task:'hjk', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-10-01', task:'cvb', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-11-01', task:'fgh', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
      {date: '2019-12-01', task:'ghi', tags:(<Tags/>), text: 67, buttons:(<IconButton/>)},
    ],
    
    page: 0,
    rowsPerPage: 5,
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };
  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { data, order, orderBy, selected,  rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper>
        <div className="tableScroll">
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={data.length}
            />
            <TableBody className="table-body">
              {stableSort(data, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  const isSelected = this.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      // onClick={event => this.handleClick(event, n.id)}
                      // role="checkbox"
                      // aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      // selected={isSelected}
                      className="task-table2"
                    >
                      <TableCell padding="checkbox" className="task-td-border task-checkbox-width"
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                       aria-checked={isSelected}
                      >
                        <Checkbox />
                      
                        
                      </TableCell>
                      <TableCell component="th" scope="row" className="task-td-border task-checkbox-width">
                        {n.date}
                      </TableCell>
                      <TableCell align="right" className="task-td-border task-checkbox-width">{n.task}</TableCell>
                      <TableCell align="right" className="task-td-border task-checkbox-width text-center">
                        {n.tags}
                       
                         
                      </TableCell>
                      <TableCell align="right" className="task-td-border task-checkbox-width text-center">{n.text}</TableCell>
                      <TableCell align="right" className="task-checkbox-width">{n.buttons}
                       
                      </TableCell>
                     
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 49 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[8, 12, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    );
  }
}
export default EnhancedTable;