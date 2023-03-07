import {Component} from 'react'

import {v4} from 'uuid'

import PasswordItem from './component/PasswordItem'

import './App.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class App extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    searchInput: '',
    passwordList: [],
    isActive: false,
  }

  deleteItem = id => {
    const {passwordList} = this.state
    const filteredPasswordList = passwordList.filter(each => each.id !== id)
    this.setState({passwordList: filteredPasswordList})
  }

  renderPasswordList = () => {
    const {searchInput, passwordList, isActive} = this.state

    const searchResults = passwordList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (passwordList.length === 0) {
      return (
        <div className="no-passwords-container">
          <img
            className="no-passwords-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-text">No Passwords</p>
        </div>
      )
    }

    if (searchResults.length === 0) {
      return (
        <div className="no-passwords-container">
          <img
            className="no-passwords-image"
            alt="no passwords"
            src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          />
          <p className="no-passwords-text">No Passwords</p>
        </div>
      )
    }
    return (
      <ul className="list-item-container">
        {searchResults.map(eachItem => (
          <PasswordItem
            key={eachItem.id}
            itemDetails={eachItem}
            isActive={isActive}
            deleteItem={this.deleteItem}
          />
        ))}
      </ul>
    )
  }

  onAddBtn = event => {
    event.preventDefault()
    const {username, website, password} = this.state

    const initialBgClassName =
      initialContainerBackgroundClassNames[
        Math.ceil(Math.random() * initialContainerBackgroundClassNames.length)
      ]

    const addPassword = {
      id: v4(),
      website,
      username,
      password,
      initialBackGround: initialBgClassName,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, addPassword],
      website: '',
      username: '',
      password: '',
    }))
  }

  onToggleActive = () => {
    this.setState(prevState => ({isActive: !prevState.isActive}))
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  render() {
    const {website, username, password, passwordList} = this.state
    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="logo-image"
        />
        <div className="password-card-container">
          <div className="top-card">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="password-manager-small"
            />
            <form className="input-card-container" onSubmit={this.onAddBtn}>
              <h1 className="heading">Add New Password</h1>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icons"
                />
                <input
                  type="text"
                  placeholder="Enter Website"
                  className="input-element"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icons"
                />
                <input
                  type="text"
                  placeholder="Enter Username"
                  className="input-element"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="input-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icons"
                />
                <input
                  type="password"
                  placeholder="Enter Password"
                  className="input-element"
                  onChange={this.onChangePassword}
                  value={password}
                />
              </div>
              <div className="button-container">
                <button type="submit" className="add-btn">
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-large"
            />
          </div>
          <div className="bottom-card">
            <div className="bottom-container-nav">
              <div className="passwords-count-container">
                <h1 className="your-passwords">Your Passwords</h1>
                <p className="passwords-number">{passwordList.length}</p>
              </div>
              <div className="search-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                  alt="search"
                  className="icons"
                />
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search"
                  onChange={this.onChangeSearchInput}
                />
              </div>
            </div>
            <hr className="hr-line" />
            <div className="checkbox-icon">
              <input
                type="checkbox"
                id="showPasswords"
                className="check-box"
                onClick={this.onToggleActive}
              />
              <label htmlFor="showPasswords" className="label">
                Show Passwords
              </label>
            </div>
            <div>{this.renderPasswordList()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
