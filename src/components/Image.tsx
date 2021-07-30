import { graphql, useStaticQuery } from "gatsby"
import React, { CSSProperties } from "react"
import { useMemo } from "react"
import Img, { FluidObject } from "gatsby-image"

interface Props {
  src: string
  alt: string
  style: CSSProperties
}

const Image: React.FC<Props> = ({ src, ...rest }) => {
  const data = useStaticQuery(graphql`
    query {
      images: allFile(filter: { internal: { mediaType: { regex: "/image/" } } }) {
        edges {
          node {
            relativePath
            extension
            publicURL
            childImageSharp {
              fluid(maxWidth: 600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  interface NodeType {
    childImageSharp: { fluid: FluidObject | FluidObject[] }
    publicURL: string
    extension: string
    relativePath: string
  }

  const match = useMemo(() => data.images.edges.find(({ node }: { node: NodeType }) => src === node.relativePath), [
    data,
    src,
  ])

  if (!match) return null

  const { node: { childImageSharp, publicURL, extension } = {} } = match as { node: NodeType }

  if (extension === `svg` || !childImageSharp) {
    return <img src={publicURL} {...rest} />
  }

  return <Img fluid={childImageSharp.fluid} {...rest} />
}

export default Image
