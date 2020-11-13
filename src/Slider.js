import React, { useState, useEffect } from "react"
import people from "./data"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAngleLeft, faAngleRight, faQuoteRight } from "@fortawesome/free-solid-svg-icons"

const Slider = () => {
  const [value, setValue] = useState(0)
  let autoScroll
  let timeOut

  useEffect(() => {
    autoScroll = setInterval(() => {
      handleValue("+")
    }, 3000)
    return () => {
      clearInterval(autoScroll)
    }
  }, [value])

  const handleValue = (e) => {
    clearTimeout(timeOut)
    if (e === "+") {
      if (value < people.length - 1) {
        setValue(value + 1)
      } else {
        setValue(0)
      }
    } else if (e === "+/") {
      timeOut = setTimeout(() => {
        if (value < people.length - 1) {
          setValue(value + 1)
        } else {
          setValue(0)
        }
      }, 1000)
    } else {
      if (value > 0) {
        setValue(value - 1)
      } else {
        setValue(people.length - 1)
      }
    }
  }

  const addClass = (index) => {
    if (index === people.length - 1 && value === 0) {
      return "prev"
    }
    if (index === 0 && value === people.length - 1) {
      return "next"
    }
    if (value === index) {
      return "current"
    } else if (value > index) {
      if (value - index > 1) {
        return "d-none"
      }
      return "prev"
    } else if (value < index) {
      if (index - value > 1) {
        return "d-none"
      }
      return "next"
    }
  }

  return (
    <div>
      <div
        className="slider"
        onMouseOver={() => clearInterval(autoScroll)}
        onMouseLeave={() => handleValue("+/")}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="prev-btn" onClick={() => handleValue("-")} />
        {people.map((elem, index) => {
          const { image, name, title, quote } = elem
          return (
            <div className={`inner-slider ${addClass(index)}`} key={index}>
              <div className="image-container">
                <img src={image} alt="person" />
              </div>
              <h3>{name}</h3>
              <h5>{title}</h5>
              <p>{quote}</p>
              <FontAwesomeIcon icon={faQuoteRight} className="quote" />
            </div>
          )
        })}

        <FontAwesomeIcon
          icon={faAngleRight}
          className="next-btn"
          onClick={() => handleValue("+")}
        />
      </div>
    </div>
  )
}

export default Slider
