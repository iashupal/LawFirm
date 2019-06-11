import { reducerSelector } from 'helpers/immer';

const initial = {
  Header: {
    통합검색: '검색어',
    통합검색_하단결과: [{ name: '사건-1', value: 'UUID' }, { name: '사건-2', value: 'UUID' }],
    최근목록: {
      사건: [{ name: '사건-1', value: 'UUID' }, { name: '사건-2', value: 'UUID' }],
      자문: [{ name: '자문-1', value: 'UUID' }, { name: '자문-2', value: 'UUID' }],
      상담: [{ name: '상담-1', value: 'UUID' }, { name: '상담-2', value: 'UUID' }],
    },
    신규: [{ name: '사건 신규', link: '123' }, { name: '자문 신규', link: '456' }],
    시간체크: 12,
    알람: [{ mainText: '메세지 도착 1', subText: '의뢰인A' }, { mainText: '메세지 도착 2', subText: '의뢰인B' }],
  },
  CommonGrid: {
    Search: {
      담당자_ID: '1',
      담당자_List: [{ name: '박변호사', value: '1' }, { name: '김변호사', value: '2' }],
      수임자_ID: '1',
      수임자_List: [{ name: '박변호사', value: '1' }, { name: '김변호사', value: '2' }],
      사건상태_Value: '1',
      사건상태_List: [{ name: '박변호사', value: '1' }, { name: '김변호사', value: '2' }],
      그리드_검색: '',
      컬럼선택_open: false,
      컬럼_List: {
        기본: ['의뢰인', '사건', '사건번호'],
        확장: ['연락처'],
      },
      컬럼_선택값_List: {
        기본: ['의뢰인', '사건번호'],
        확장: [],
      },
      // 복수 필드?
    },
    Data: {},
    Paging: {},
  },
};

const handlers = {};

export default reducerSelector(initial, handlers);
