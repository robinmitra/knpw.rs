import React from 'react';
import PropTypes from 'prop-types';
import g from 'glamorous';
import postShape from '../shapes/post';

const Wrap = g.div(({ prev }) => ({
  textAlign: prev ? 'left' : 'right',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  textTransform: 'uppercase',
}));

const Span = g.span(({ theme }) => ({
  color: theme.textColor,
  opacity: 0.35,
  fontWeight: 'bold',
}));

const A = g.a(({ theme }) => ({
  color: theme.textColor,
  textDecoration: 'none',
  fontWeight: 'bold',
  transition: 'color 250ms linear',
  ':hover': {
    color: theme.accentColor,
  },
}));

const PostNav = ({ prev, post }) => {
  const link = post
    ? <A href={post.frontmatter.path}>{prev ? 'Previous Post' : 'Next Post'}</A>
    : <Span>{prev ? 'Previous Post' : 'Next Post'}</Span>;
  return (
    <Wrap prev={prev}>
      {link}
      <small>{post ? post.frontmatter.title : null}</small>
    </Wrap>
  );
};

PostNav.propTypes = {
  prev: PropTypes.bool,
  post: PropTypes.oneOfType([postShape, PropTypes.bool]).isRequired,
};

PostNav.defaultProps = {
  prev: false,
};

export default PostNav;
