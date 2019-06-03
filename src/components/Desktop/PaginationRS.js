import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import * as R from 'ramda';

const style = {
  paging: {
    color: 'rgb(75, 112, 165)',
    fontSize: '13px',
    fontWeight: '300',
    height: '30px',
  },
  pagingActive: {
    fontSize: '13px',
    fontWeight: '300',
    height: '30px',
    color: 'white',
    backgroundColor: '#4587d8',
  },
};

class PaginationRS extends Component {
  render() {
    const { count, rowsPerPage, page, setPage } = this.props;
    const pageInt = parseInt(page, 10);
    const totalPages = Math.ceil(count / rowsPerPage); // 41개
    const allPageArr = R.range(0, totalPages); // [0, ... 40] // 41개

    const minPageNum = pageInt - 5;
    const maxPageNum = pageInt + 5;

    const showPageArr = R.filter(a => a >= minPageNum && a <= maxPageNum, allPageArr);

    return (
      <Pagination
        size="sm"
        aria-label="Page navigation example"
        style={{
          marginBottom: '0px',
          justifyContent: 'center',
        }}
      >
        {!(pageInt === 0) && (
          <PaginationItem disabled={pageInt === 0}>
            <PaginationLink onClick={e => setPage(0)} style={style.paging}>
              First
            </PaginationLink>
          </PaginationItem>
        )}

        {!(pageInt === 0) && (
          <PaginationItem disabled={pageInt === 0}>
            <PaginationLink previous onClick={e => setPage(pageInt - 1)} style={style.paging} />
          </PaginationItem>
        )}

        {showPageArr &&
          showPageArr.map((item, index) => (
            <PaginationItem disabled={item === pageInt} key={item}>
              <PaginationLink
                style={item === pageInt ? style.pagingActive : style.paging}
                onClick={e => setPage(e.target.value)}
                value={item}
              >
                {item + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

        {!(pageInt === totalPages - 1) && (
          <PaginationItem disabled={pageInt === totalPages - 1}>
            <PaginationLink next onClick={e => setPage(pageInt + 1)} style={style.paging} />
          </PaginationItem>
        )}

        {!(pageInt === totalPages - 1) && (
          <PaginationItem disabled={pageInt === totalPages - 1}>
            <PaginationLink onClick={e => setPage(totalPages - 1)} style={style.paging}>
              Last
            </PaginationLink>
          </PaginationItem>
        )}
      </Pagination>
    );
  }
}

export default PaginationRS;
