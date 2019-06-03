import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { R, RU } from 'helpers/ramda';
import { PaginationRS, TableTD, LinkButton, TableContents } from 'components/Desktop';

const { changeURL } = RU;

const style = {
  tr: {
    borderBottomStyle: 'solid',
    borderBottomColor: '#E1E1E1',
    borderBottomWidth: 1,
  },
  th: {
    padding: '10px',
    borderStyle: 'solid',
    borderColor: '#E1E1E1',
    borderWidth: 1,
    fontWeight: '400',
    height: '30px',
    backgroundColor: '#F2F2F2',
    backgroundImage: 'linear-gradient(to bottom, #f8f8f8 0%, #ececec 100%)',
    color: 'rgb(119, 119, 119)',
    fontSize: 14,
  },
  td: {
    padding: '10px',
    borderRightStyle: 'solid',
    borderRightColor: '#E1E1E1',
    borderRightWidth: 1,
    fontWeight: '300',
    height: '25px',
    color: 'black',
  },
};

class Table extends Component {
  state = {
    currFocusRowIndex: -1,
    currSelectedRowIndex: -1,
  };

  render() {
    const { allItemCount, columnNames, data, rowsPerPage, page, setPage, setRowsPerPage } = this.props;

    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
          }}
        >
          <span>Total : {allItemCount} rows</span>
          <span>
            Rows&nbsp;:&nbsp;
            <select style={{ height: '18px' }} value={rowsPerPage} onChange={e => setRowsPerPage(e.target.value)}>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </span>
        </div>
        <table
          style={{
            backgroundColor: 'white',
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: '#E1E1E1',
            borderRightStyle: 'solid',
            borderRightColor: '#E1E1E1',
            borderRightWidth: 1,
            borderLeftStyle: 'solid',
            borderLeftColor: '#E1E1E1',
            borderLeftWidth: 1,
            width: '100%',
            color: '#4b70a5',
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          <tbody>
            <tr style={style.tr}>
              {columnNames &&
                columnNames.map((item, index) => {
                  return (
                    <th style={style.th} key={index}>
                      {item}
                    </th>
                  );
                })}
            </tr>
            {data &&
              data.map((item, index) => {
                let applyTrStyle = style.tr;

                if (this.state.currFocusRowIndex === index) {
                  applyTrStyle = {
                    ...style.tr,
                    backgroundColor: 'rgb(239, 244, 247)',
                  };
                }

                if (this.state.currSelectedRowIndex === index) {
                  applyTrStyle = {
                    ...style.tr,
                    backgroundColor: 'rgb(228, 239, 201)',
                  };
                }

                const childrenWithProps = React.Children.map(this.props.children, child =>
                  React.cloneElement(child, { item, index }),
                );

                return (
                  <tr
                    style={applyTrStyle}
                    onMouseOver={e => {
                      this.setState({ currFocusRowIndex: index });
                    }}
                    onFocus={e => {
                      this.setState({ currFocusRowIndex: index });
                    }}
                    onMouseOut={e => {
                      this.setState({ currFocusRowIndex: -1 });
                    }}
                    onBlur={e => {
                      this.setState({ currFocusRowIndex: -1 });
                    }}
                    onClick={e => {
                      this.setState({ currSelectedRowIndex: index });
                    }}
                    key={index}
                  >
                    {childrenWithProps}
                  </tr>
                );
              })}
            <tr>
              <th style={{ padding: '4px', backgroundColor: '#eff3f8' }} colSpan={columnNames.length}>
                <PaginationRS count={allItemCount} rowsPerPage={rowsPerPage} page={page} setPage={setPage} />
              </th>
            </tr>
          </tbody>
        </table>
        <div style={{ height: '30px' }} />
      </React.Fragment>
    );
  }
}

export default Table;
