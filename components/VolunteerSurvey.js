import React from 'react'
import styled from 'styled-components'

export default function Form() {
  return (
    <Iframe>
      <iframe
        title="Volunteer Interest Form"
        src="https://docs.google.com/forms/d/e/1FAIpQLSdsGpk6VunuQcTTgVCfD1p_cb8idSHEty5SoaO0LGwq3KXiQw/viewform?embedded=true"
        width="100%"
        height="2000"
      >
        Loading…
      </iframe>
    </Iframe>
  )
}

const Iframe = styled.div`
  > iframe {
    width: 100%;
    height: 600px;
    border: 0;

    @media screen and (min-width: ${(props) =>
        props.theme.breakpoints.medium}) {
      height: 2000px;
    }
  }
`
