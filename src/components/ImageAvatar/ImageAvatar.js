import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
// import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';

const styles = theme => ({
  avatar: {
    margin: 10,
  },
  pinkAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#FD0059',
  },
  greenAvatar: {
    margin: 10,
    color: '#fff',
    backgroundColor: '#00BE50',
  },
});

 class ImageAvatar extends React.Component {
    render(){
        const {classes} = this.props;

        return (
          <Grid container justify="center" alignItems="center">
            <Avatar className={classes.avatar}>
              <FolderIcon />
            </Avatar>
            <Avatar className={classes.pinkAvatar}>
              <PageviewIcon />
            </Avatar>
            <Avatar className={classes.greenAvatar}>
              <AssignmentIcon />
            </Avatar>
        </Grid>
        );
    }
}
ImageAvatar.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  export default withStyles(styles)(ImageAvatar);