import './Avatar.css';
import PropTypes from "prop-types";

export default function Avatar ({ username }) {
  const userIconColors = ['#ffcccc', '#ffe5cc', '#ffffcc', '#e5ffcc', '#ccff35', '#ccffff', '#ccccff', '#ffccff'];
  const colorIndex = username.length % userIconColors.length;
  const backgroundColor = userIconColors[colorIndex];

  return (
    <span className='user-icon' style={{backgroundColor : backgroundColor}}>{username[0]}</span>
  )
}

Avatar.propTypes = {
  username: PropTypes.string
}