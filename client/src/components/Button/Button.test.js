import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Button  from 'components/Button'

it("renders correctly",()=>{
    const {queryByTestId, queryByPlaceholderName} = render(<Button />)

    expect(queryByTestId('button')).toBeTruthy()
}) 