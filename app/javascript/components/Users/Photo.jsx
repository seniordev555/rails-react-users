import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles({
  avatar: {
    width: (props) => props.size,
    height: (props) => props.size,
    fontSize: (props) => `${props.size / 40}rem`,

    '& > svg': {
      fontSize: (props) => `${props.size / 24}rem`,
    },
  },
});

const Photo = ({ text, photo, size }) => {
  const classes = useStyles({ size });

  return (
    <>
      {photo && <Avatar className={classes.avatar} alt="photo" src={photo} />}
      {!photo && text && (
        <Avatar className={classes.avatar}>{text.toUpperCase()}</Avatar>
      )}
      {!photo && !text && (
        <Avatar className={classes.avatar}>
          <PersonIcon />
        </Avatar>
      )}
    </>
  );
};

Photo.propTypes = {
  size: PropTypes.number,
  text: PropTypes.string,
  photo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

Photo.defaultProps = {
  size: 100,
  text: '',
  photo: null,
};

export default Photo;
