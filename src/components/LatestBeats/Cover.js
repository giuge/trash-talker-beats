import PropTypes from 'prop-types'
import React from 'react'

const Cover = props => (
  <svg width="240" height="240" viewBox="0 0 240 240" fill="#0D2B40" {...props}>
    <defs>
      <clipPath id="clip">
        <path
          fill="#0D2B40"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 0C3.58172 0 0 3.58173 0 8.00001V232C0 236.418 3.58173 240 8.00001 240H232C236.418 240 240 236.418 240 232V165.259C229.994 152.893 224 137.146 224 120C224 102.854 229.994 87.1071 240 74.7413V8C240 3.58172 236.418 0 232 0H8Z"
        />
      </clipPath>
    </defs>

    {/* Show empty cover if the image is not there yet */}
    {!props.image && (
      <path
        fill="#0D2B40"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.58172 0 0 3.58173 0 8.00001V232C0 236.418 3.58173 240 8.00001 240H232C236.418 240 240 236.418 240 232V165.259C229.994 152.893 224 137.146 224 120C224 102.854 229.994 87.1071 240 74.7413V8C240 3.58172 236.418 0 232 0H8Z"
      />
    )}

    <image
      width="240"
      height="240"
      xlinkHref={props.image}
      preserveAspectRatio="xMinYMin slice"
      clipPath="url(#clip)"
    />
  </svg>
)

Cover.propTypes = {
  image: PropTypes.string.isRequired,
}

Cover.defaultProps = {
  image: '',
}

export default Cover
