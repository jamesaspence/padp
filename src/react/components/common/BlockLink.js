import React from 'react';
import './BlockLink.scss';
import { Link } from 'react-router-dom';

const BlockLink = ({ to, children }) => (
  <Link className="BlockLink" to={to}>{children}</Link>
);

export default BlockLink;