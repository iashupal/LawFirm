import React from "react";
import '../../styles/ui/_pagination.scss';
import Pagination from "react-js-pagination";
// import '../../../node_modules/bootstrap-less/bootstrap/bootstrap.less';



 
class ReactPagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 15,
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }
 
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({activePage: pageNumber});
  }
 
  render() {
    return (
      <div>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}
export default ReactPagination;

// export default class ReactPagination extends React.Component {
//     constructor() {
//       super();
//       this.state = {
//         todos: ['a','b','c','d','e','f','g','h','i','j','k'],
//         currentPage: 1,
//         todosPerPage: 3
//       };
//       this.handleClick = this.handleClick.bind(this);
//     }
  
//     handleClick(event) {
//       this.setState({
//         currentPage: Number(event.target.id)
//       });
//     }
  
//     render() {
//       const { todos, currentPage, todosPerPage } = this.state;
  
//       // Logic for displaying todos
//       const indexOfLastTodo = currentPage * todosPerPage;
//       const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//       const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);
  
//       const renderTodos = currentTodos.map((todo, index) => {
//         return <li key={index}>{todo}</li>;
//       });
  
//       // Logic for displaying page numbers
//       const pageNumbers = [];
//       for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
//         pageNumbers.push(i);
//       }
  
//       const renderPageNumbers = pageNumbers.map(number => {
//         return (
//           <li
//             key={number}
//             id={number}
//             onClick={this.handleClick}
//           >
//             {number}
//           </li>
//         );
//       });
  
//       return (
//         <div>
//           <ul>
//             {renderTodos}
//           </ul>
//           <ul id="page-numbers">
//             {renderPageNumbers}
//           </ul>
//         </div>
//       );
//     }
//   }

