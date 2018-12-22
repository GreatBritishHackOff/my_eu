import React from 'react'
import PropTypes from 'prop-types'

import SearchAgain from '../search_again'

import SignsStore from './store'

class SignsInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loaded: false }
  }

  componentDidMount() {
    SignsStore.getInstance().loadData.then(() => {
      this.setState({ loaded: true })
    })
  }

  render() {
    const match = this.props.match
    const signId = match.params.signId

    if (!this.state.loaded)
      return (
        <div className="my-eu-info">
          <p>Loading&hellip;</p>
        </div>
      )

    const imageSrc = `https://www.myeu.uk/signs/${signId}`
    const sign = SignsStore.getInstance().findSignById(signId)
    const signTitle = sign && <p>{sign.title}</p>

    return (
      <div className="my-eu-info">
        <ul className="nav">
          <SearchAgain />
        </ul>
        <p>
          <img src={imageSrc} className="img-fluid w-100" />
        </p>
        {signTitle}
        <p className="text-muted">
          This image was contributed by the myeu.uk community.
        </p>
      </div>
    )
  }
}

SignsInfo.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      signId: PropTypes.string.isRequired
    })
  })
}

export default SignsInfo
