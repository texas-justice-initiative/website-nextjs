import React from 'react'

class HeroContent extends React.Component {
  render() {
    return (
      <div>
        <p className="mobile-only text--red">
          * Because the charts may become very large, this page is best viewed
          on a desktop or laptop screen.
        </p>
      </div>
    )
  }
}

export default HeroContent
