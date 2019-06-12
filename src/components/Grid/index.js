import React from 'react';

function Grid({ contents }) {
    return (
        <div className="tab1-form tab2-form task-table-form">
            <table className="table">
                <tbody>
                    {contents.map(content => (
                        <tr>
                            <td>{content.title}</td>
                            <td>
                                <div className="form-group">
                                    {content.child}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Grid;
