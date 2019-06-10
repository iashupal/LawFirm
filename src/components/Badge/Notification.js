import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';

export default class Notification extends React.Component{
    render(){
        return(
            <div>
                <IconButton color="inherit">
                    <Badge badgeContent={2} color="secondary">
                    <i className="material-icons">
                        notification_important
                    </i>
                    </Badge>
                </IconButton>
            </div>
        )
    }
}
