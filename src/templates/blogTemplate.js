import React from "react"
import { graphql } from "gatsby"

import Disqus from "disqus-react"

import { Container } from "reactstrap"

import "../components/styles.scss"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark

  const disqusShortname = "gatsby-blog-with-comments"

  const disqusConfig = {
    url: `https://awesome-heyrovsky-996a50.netlify.com${markdownRemark.fields.slug}`,
    identifier: markdownRemark.id,
    title: frontmatter.title,
  }

  return (
    <Container>
      <div className="blog-post">
        <img
          src={frontmatter.featured_image}
          style={{
            display: "block",
            maxWidth: "50%",
            margin: "auto",
          }}
        ></img>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
    </Container>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      fields {
        slug
      }
      html
      id
      frontmatter {
        date(formatString: "D/M/YYYY HH:mm")
        title
        featured_image
      }
    }
  }
`
