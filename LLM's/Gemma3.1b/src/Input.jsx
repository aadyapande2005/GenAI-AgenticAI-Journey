import React from 'react'

export default function Input(props) {
  return (
    <input type="text" value={props.value} placeholder='  Enter your query here' style={{margin: "20px", height: "20px", width: "30rem", padding: "8px", borderRadius: "20px"}}  />
  )
}
