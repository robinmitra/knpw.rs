/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import graphql from 'graphql-tag';
import dateformat from 'dateformat';
import ReactDisqusThread from 'react-disqus-thread';
import g from 'glamorous';
import site from '../shapes/site';
import TagsList from '../components/tags-list';
import PostNav from '../components/post-nav';
import pathContextShape from '../shapes/path-context';
import postShape from '../shapes/post';

const Main = g.main(({ theme }) => ({
  color: theme.textColor,
}));

const Header = g.header(({ theme }) => ({
  ...theme.centerPadding,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  [theme.smallMedia]: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
  },
}));

const HeaderTitle = g.h1(({ theme }) => ({
  width: '85%',
  marginBottom: theme.spacing,
  [theme.smallMedia]: {
    width: '100%',
    textAlign: 'center',
    marginBottom: 0,
  },
}));

const HeaderDate = g.time(({ theme }) => ({
  width: '15%',
  textAlign: 'right',
  [theme.smallMedia]: {
    width: '100%',
    textAlign: 'center',
  },
}));

const Footer = g.footer(({ theme }) => ({
  ...theme.centerPadding,
}));

const PostWrap = g.section(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '> *': {
    width: '100vw',
    wordWrap: 'break-word',
    ':not(.gatsby-highlight)': {
      ...theme.centerPadding,
    },
  },
  '> .gatsby-highlight > pre': {
    ...theme.centerPadding,
    paddingTop: theme.spacing,
    paddingBottom: theme.spacing,
  },
  '>ul,>ol': {
    marginLeft: `${theme.spacingPx * 4}px`,
    width: `calc(100% - ${theme.spacingPx * 4}px)`,
  },
}));

const PostNavWrap = g.div(({ theme }) => ({
  ...theme.centerPadding,
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'row',
  marginTop: theme.spacing,
}));

const BlogPost = ({ data, pathContext }) => {
  const { markdownRemark: post } = data;
  const { title, siteUrl } = data.site.siteMetadata;
  const { next, prev } = pathContext;

  const isProduction = process.env.NODE_ENV === 'production';
  const fullUrl = `${siteUrl}${post.frontmatter.path}`;

  return (
    <Main>
      <Helmet>
        <title>{post.frontmatter.title} &middot; {title}</title>
      </Helmet>
      <article>
        <Header>
          <HeaderTitle>
            {post.frontmatter.title}
          </HeaderTitle>
          <HeaderDate dateTime={dateformat(post.frontmatter.date, 'isoDateTime')}>
            {dateformat(post.frontmatter.date, 'mmmm d, yyyy')}
          </HeaderDate>
          <TagsList tags={post.frontmatter.tags} />
        </Header>
        <PostWrap dangerouslySetInnerHTML={{ __html: post.html }} />
        <Footer>
          {isProduction &&
            <ReactDisqusThread
              shortname="kenpowers"
              identifier={post.frontmatter.path}
              title={post.frontmatter.title}
              url={fullUrl}
            />}
        </Footer>
      </article>
      <PostNavWrap>
        <PostNav prev post={prev} />
        <PostNav next post={next} />
      </PostNavWrap>
    </Main>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    site,
    allMarkdownRemark: postShape,
  }).isRequired,
  pathContext: pathContextShape.isRequired,
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByPath($refPath: String!) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    markdownRemark(frontmatter: { path: { eq: $refPath } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        title
      }
    }
  }
`;
