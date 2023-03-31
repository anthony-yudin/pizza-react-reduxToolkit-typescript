import React from 'react'
import ContentLoader from 'react-content-loader'

function SkeletonCart(props) {
  return (
    <ContentLoader
      speed={2}
      width={315}
      height={456}
      viewBox="0 0 315 456"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="142" cy="115" r="115" />
      <rect x="0" y="262" rx="0" ry="0" width="315" height="24" />
      <rect x="0" y="309" rx="0" ry="0" width="315" height="76" />
      <rect x="0" y="416" rx="0" ry="0" width="90" height="29" />
      <rect x="161" y="409" rx="23" ry="23" width="151" height="41" />
    </ContentLoader>
  )
}

export default SkeletonCart
