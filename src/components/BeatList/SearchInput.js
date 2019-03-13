import React, { Component } from 'react'
import ReactTags from 'react-tag-autocomplete'
import styled from 'styled-components'
import { IconContext } from 'react-icons'
import { MdSearch } from 'react-icons/md'

import { withStoreContext } from '../../context/StoreContext'
import './search.css'

const TagContainer = styled.div`
  padding: 8px 8px;
  font-size: 14px;
  border-radius: 2px;
  color: #011523;
  cursor: pointer;
  display: inline-block;
  margin-right: 4px;
  text-transform: uppercase;
`

const Container = styled.div`
  padding: 0;
  margin: 0;
  position: relative;
`

const Tag = ({ onDelete, tag }) => (
  <TagContainer onClick={() => onDelete()} title="Click to remove">
    {tag.name}
  </TagContainer>
)

class SearchInput extends Component {
  constructor(props) {
    super(props)
    this.container = React.createRef()
    this.input = React.createRef()
    this.state = {
      text: '',
    }
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(e) {
    if (e.keyCode === 9 || e.keyCode === 13) {
      const node = this.container.current
      const firstSuggestion = node.querySelectorAll(
        '.react-tags__suggestions ul li'
      )[0]

      if (!!firstSuggestion) {
        const regex = /(<([^>]+)>)/gi
        const value = firstSuggestion.children[0].innerHTML.replace(regex, '')
        const input = node.querySelectorAll(
          '.react-tags__search-input input'
        )[0]

        if (!!input && !!value) {
          const nativeValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            'value'
          ).set
          const event = new Event('input', { bubbles: true })
          nativeValueSetter.call(input, value)
          input.dispatchEvent(event)
          //input.focus()
        }
      }
    }
  }

  render() {
    const { search } = this.props.context.store

    return (
      <Container ref={this.container}>
        <IconContext.Provider
          value={{
            size: 24,
            color: '#DCEAF4',
            style: {
              position: 'absolute',
              top: '50%',
              right: '0',
              transform: 'translate(-50%,-50%)',
              zIndex: 200,
              opacity: 0.5,
            },
          }}
        >
          <MdSearch />
        </IconContext.Provider>

        <ReactTags
          autofocus={false}
          ref={this.input}
          tags={search.tags}
          suggestions={search.suggestions}
          handleAddition={t => search.addTag(t)}
          handleDelete={i => search.removeTag(i)}
          placeholder={'Search beat by tag'}
          allowNew={false}
          autoresize={false}
          tagComponent={Tag}
          delimiters={[9, 13]}
          maxSuggestionsLength={1}
          minQueryLength={1}
          handleInputChange={text => this.setState({ text })}
          addOnBlur={true}
          delimiterChars={[' ']}
        />
      </Container>
    )
  }
}

export default withStoreContext(SearchInput)
