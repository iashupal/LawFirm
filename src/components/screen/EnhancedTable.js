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
import Tooltip from '@material-ui/core/Tooltip';
import '../../styles/ui/_checkbox.scss';
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
  { id: 'name', numeric: false, disablePadding: true, label: 'Date' },
  { id: 'task', numeric: true, disablePadding: false, label: 'Task' },
  { id: 'tags', numeric: true, disablePadding: false, label: 'Tags' },
  { id: 'text', numeric: true, disablePadding: false, label: 'Text' },
  { id: 'buttons', numeric: true, disablePadding: false, label: 'Buttons' },

 
];
const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
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
                {/* <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                > */}
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                {/* </Tooltip> */}
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


export class EnhancedTable extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'task',
    selected: [],
    data: [
      createData('2019-01-01', 'abx', 3.7, 67, 500),
      createData('2019-01-01', 452, 25.0, 51, 4.9),
      createData('2019-01-01', 262, 16.0, 24, 6.0),
      createData('2019-01-01', 159, 6.0, 24, 4.0),
      createData('2019-01-01', 356, 16.0, 49, 3.9),
      createData('2019-01-01', 408, 3.2, 87, 6.5),
      createData('2019-01-01', 237, 9.0, 37, 4.3),
      createData('2019-01-01', 375, 0.0, 94, 0.0),
      createData('2019-01-01', 518, 26.0, 65, 7.0),
      createData('2019-01-01', 392, 0.2, 98, 0.0),
      createData('2019-01-01', 318, 0, 81, 2.0),
      createData('2019-01-01', 360, 19.0, 9, 37.0),
      createData('2019-01-01', 437, 18.0, 63, 4.0),
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
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <Paper>
        <div>
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
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                      className="task-table2"
                    >
                      <TableCell padding="checkbox" className="task-td-border task-checkbox-width"
                      onClick={event => this.handleClick(event, n.id)}
                      role="checkbox"
                       aria-checked={isSelected}
                      >
                        <Checkbox checked={isSelected} />
                        {/* <SimpleCheckbox checked={isSelected}/> */}
                        {/* <div className="checkbox right">
                            <input type="checkbox" id="checkboxTable" name="" value="" checked={isSelected}/>
                            <label htmlFor="checkboxTable" ></label>
                        </div> */}
                      </TableCell>
                      <TableCell component="th" scope="row" className="task-td-border task-checkbox-width">
                        {n.name}
                      </TableCell>
                      <TableCell align="right" className="task-td-border task-checkbox-width">{n.task}</TableCell>
                      <TableCell align="right" className="task-td-border task-checkbox-width text-center">
                        <div className="task-tags-btn">
                          <button type="button" className="btn btnStyle accord3-btn-clr">Button2</button>
                        </div>
                         
                      </TableCell>
                      <TableCell align="right" className="task-td-border task-checkbox-width text-center">{n.text}</TableCell>
                      <TableCell align="right" className="task-checkbox-width">
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