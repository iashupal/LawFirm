import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const style = {
  tr: {
    borderBottomStyle: 'solid',
    borderBottomColor: '#9fb9de',
    borderBottomWidth: 1,
  },
  th: {
    padding: '3px 5px',
    borderRightStyle: 'solid',
    borderRightColor: '#9fb9de',
    borderRightWidth: 1,
    fontWeight: '500',
    height: '30px',
  },
  th2: {
    padding: '3px 5px',
    borderRightStyle: 'solid',
    borderRightColor: '#9fb9de',
    borderRightWidth: 1,
    fontWeight: '500',
  },
  td: {
    backgroundColor: 'white',
    padding: '3px 5px',
    borderRightStyle: 'solid',
    borderRightColor: '#9fb9de',
    borderRightWidth: 1,
    fontWeight: '300',
    height: '25px',
  },
  paging: {
    color: 'rgb(75, 112, 165)',
    fontSize: '13px',
    fontWeight: '300',
  },
};

class Table extends Component {
  render() {
    return (
      <React.Fragment>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11px',
          }}
        >
          <span>Total : 345 rows</span>
          <span>
            Rows&nbsp;:&nbsp;
            <select style={{ height: '18px' }}>
              <option>10</option>
              <option>20</option>
              <option>30</option>
              <option>50</option>
              <option>100</option>
            </select>
          </span>
        </div>
        <table
          style={{
            backgroundColor: '#f4f6fb',
            borderTopStyle: 'solid',
            borderTopWidth: 2,
            borderTopColor: '#4587d8',
            borderBottomStyle: 'solid',
            borderBottomWidth: 1,
            borderBottomColor: '#9fb9de',
            borderRightStyle: 'solid',
            borderRightColor: '#9fb9de',
            borderRightWidth: 1,
            borderLeftStyle: 'solid',
            borderLeftColor: '#9fb9de',
            borderLeftWidth: 1,
            width: '100%',
            color: '#4b70a5',
            fontSize: 13,
            textAlign: 'center',
          }}
        >
          <tbody>
            <tr style={style.tr}>
              <th style={style.th} />
              <th style={style.th}>제목</th>
              <th style={style.th}>내용</th>
              <th style={style.th}>상태</th>
              <th style={style.th}>작성자</th>
              <th style={style.th}>날짜</th>
            </tr>
            {this.props.List &&
              this.props.List.map((item, index) => (
                <tr style={style.tr} key={index}>
                  <th
                    style={{ ...style.th2, fontWeight: '300', width: '40px' }}
                  >
                    {index + 1}
                  </th>

                  <td
                    style={{
                      ...style.td,
                      color: 'black',
                      textAlign: 'left',
                    }}
                  >
                    <span
                      style={{ cursor: 'pointer', color: 'blue' }}
                      onClick={e => {
                        alert('test title');
                      }}
                      role="button"
                      tabIndex="-1"
                    >
                      {item.ContractName}
                    </span>
                  </td>
                  <td
                    style={{
                      ...style.td,
                      color: 'black',
                      textAlign: 'left',
                    }}
                  >
                    {item.AgreementFirstVerse}
                  </td>
                  <td
                    style={{
                      ...style.td,
                      color: 'black',
                    }}
                  >
                    {item.ReviewStatusName}
                  </td>
                  <td
                    style={{
                      ...style.td,
                      color: 'black',
                    }}
                  >
                    {item.RequestUserName}
                  </td>
                  <td
                    style={{
                      backgroundColor: 'white',
                      padding: '3px 5px',
                      color: 'black',
                    }}
                  >
                    {item.CreateDate}
                  </td>
                </tr>
              ))}
            <tr>
              <th style={{ padding: '3px 5px' }} colSpan={6}>
                <Pagination
                  size="sm"
                  aria-label="Page navigation example"
                  style={{
                    marginBottom: '0px',
                    justifyContent: 'center',
                  }}
                >
                  <PaginationItem>
                    <PaginationLink
                      previous
                      onClick={e => {
                        alert('test paging click');
                      }}
                      style={style.paging}
                    />
                  </PaginationItem>
                  <PaginationItem disabled>
                    <PaginationLink
                      style={{
                        ...style.paging,
                        color: 'white',
                        backgroundColor: '#4587d8',
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem
                  // disabled
                  >
                    <PaginationLink style={style.paging}>2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink style={style.paging}>3</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink style={style.paging}>4</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink style={style.paging}>5</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink next style={style.paging} />
                  </PaginationItem>
                </Pagination>
              </th>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
