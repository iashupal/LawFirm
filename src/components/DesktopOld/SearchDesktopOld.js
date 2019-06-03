import React, { Component } from 'react';
import {
  Button,
  ButtonBox,
  SearchBox,
  Table,
  Title,
  Input,
  SearchItem,
  SearchRow,
} from 'components/DesktopOld';
import { BlankSpan } from 'helpers/ui';

class SearchDesktopOld extends Component {
  componentDidMount() {
    this.props.setListPaging({
      paging: {
        Page: 0,
        Records: this.props.contractSearch.listPaging.Records,
      },
      searchCond: this.props.contractSearch,
    });
  }

  render() {
    const { contractSearch, handleChangeValues, setListPaging } = this.props;
    const { listData } = contractSearch;
    const { List } = listData;

    return (
      <div style={{ padding: 14, backgroundColor: 'white', height: '100%' }}>
        <Title title="계약서 검토 조회" />
        <SearchBox>
          <SearchRow>
            <SearchItem title="회사명" lastLine>
              <Input
                value="test123"
                onChange={e => {
                  alert(e.target.value);
                }}
              />
            </SearchItem>
            <SearchItem title="계약명">
              <Input />
            </SearchItem>
          </SearchRow>
          <SearchRow>
            <SearchItem title="요청자" lastLine>
              <Input />
            </SearchItem>
            <SearchItem title="법무 담당자">
              <Input />
            </SearchItem>
          </SearchRow>
          <SearchRow>
            <SearchItem title="계약분류" lastLine>
              <Input />
            </SearchItem>
            <SearchItem title="진행상태">
              <Input />
            </SearchItem>
          </SearchRow>
          <SearchRow>
            <SearchItem title="등록일" colSpan={3}>
              <Input />
            </SearchItem>
          </SearchRow>
        </SearchBox>
        <ButtonBox>
          <Button
            name="검색"
            handleClick={e => {
              alert('111');
            }}
          />
          <BlankSpan num={1} />
          <Button
            name="조회"
            handleClick={e => {
              alert('222');
            }}
          />
        </ButtonBox>
        <Table List={List} />
      </div>
    );
  }
}

export default SearchDesktopOld;
