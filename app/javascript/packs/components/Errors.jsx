import React from 'react'


export default function Errors({ errors }) {
  return (
    errors.length > 0 &&
    <div className="errors alert alert-danger mt-2">
      {
        errors.map((err, index) => {
          return (
            <p className="text-danger" key={index}>{ err }</p>
          )
        })
      }
    </div>
  )
}