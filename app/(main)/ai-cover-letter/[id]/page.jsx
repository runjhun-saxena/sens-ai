import React from 'react'

const CoverLetter = async ({params}) => {
  const id = await params.id;

  return (
    <div>
      Cover Letter Page for ID: {id}
    </div>
  )
}

export default CoverLetter
