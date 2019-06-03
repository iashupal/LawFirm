import classnames from 'classnames';

export const tableCellStyle = {
  padding: '8px',
  textAlign: 'center',
};

export const hideClassName = value => classnames({ 'd-none': value });

// 상태별 색상
export const getColorByTypeStatus = (code, status) => {
  if (code === 'BCAT_B01') {
    if (status === 'CST_0010') return 'bg-warning';
    if (status === 'CST_0020') return 'bg-primary';
    if (status === 'CST_0030') return 'bg-primary';
    if (status === 'CST_0040') return 'bg-primary';
    if (status === 'CST_0050') return 'bg-primary';
    if (status === 'CST_0060') return 'bg-light-blue';
    if (status === 'CST_0070') return 'bg-light-blue';
    if (status === 'CST_0080') return 'bg-green';
    if (status === 'CST_0990') return 'bg-danger';
  }
  if (code === 'BCAT_B02') {
    if (status === 'SCST_0010') return 'bg-light-blue';
    if (status === 'SCST_0030') return 'bg-green';
    if (status === 'SCST_0020') return 'bg-danger';
  }
  if (code === 'BCAT_B03') {
    if (status === 'LST_0010') return 'bg-warning';
    if (status === 'LST_0020') return 'bg-light-blue';
    if (status === 'LST_0030') return 'bg-green';
    if (status === 'LST_0990') return 'bg-danger';
  }
  if (code === 'BCAT_B04') {
    if (status === 'PST_0010') return 'bg-light-blue';
    if (status === 'PST_0020') return 'bg-green';
  }
  if (code === 'BCAT_B05') {
    if (status === 'LIST_0010') return 'bg-light-blue';
    if (status === 'LIST_0020') return 'bg-green';
  }
  return 'bg-light-blue';
};

export const PieChartColors = [
  '#f03e3e',
  '#0088FE',
  '#FFBB28',
  '#FF8042',
  '#be4bdb',
];

export const LawStatusColor = {
  LST_0010: '#868e96',
  LST_0020: '#2b8a3e',
  LST_0030: '#ff0000',
  LST_0990: '#fcc419',
};

export const LawStatusColor2 = {
  LST_0010: 'light',
  LST_0020: 'success',
  LST_0030: 'secondary',
  LST_0990: 'warning',
};

// toggle시 마다 깜빡이는 style.
export const transitionStyles = ms => ({
  // default, entering, entered, exiting, exited
  default: {
    transition: `color ${ms}ms ease-in-out, opacity ${ms}ms ease-in-out, font-size ${ms}ms ease-in-out`,
  },
  entering: {
    opacity: 1,
    color: 'lightgray',
    // backgroundColor: 'yellow',
    // fontSize: '18px'
  },
  entered: {
    opacity: 1,
    color: 'black',
    // backgroundColor: 'white',
    // fontSize: '14px'
  },
  exiting: {
    opacity: 1,
    color: 'lightgray',
    // backgroundColor: 'yellow',
    // fontSize: '18px'
  },
  exited: {
    opacity: 1,
    color: 'black',
    // backgroundColor: 'white',
    // fontSize: '14px'
  },
});

export const tableHeaderStyle = {
  backgroundColor: 'lightyellow',
  // backgroundColor: $primary,
  fontWeight: 'bold',
  fontSize: '16px',
  textAlign: 'center',
};

export const yellowBox = {
  fontWeight: 'bold',
  backgroundColor: 'yellow',
  borderRadius: '5px',
  padding: '5px',
};
