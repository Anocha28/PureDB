import React, {useState} from 'react'
import { Form, FormControl, Button, InputGroup } from 'react-bootstrap'

const SearchBox = ({history, forURL}) => {

    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            history.push(`/${forURL}/search/${keyword}`)
        } else {
            history.push(`/${forURL}`)
        }
    }
    const clearForm = () => {
        setKeyword('')
        history.push(`/${forURL}`)
    }
    return (
            <Form onSubmit={submitHandler} >
                <InputGroup>
                    <FormControl 
                        type='text'
                        value={keyword}
                        placeholder='Search...'
                        onKeyPress={(event) => {if (!/[0-9,a-z,A-Z]/.test(event.key)) {event.preventDefault()}}}                    
                        style={{width: '300px'}}
                        onChange={(e) => setKeyword(e.target.value)}
                        >
                    </FormControl>

                    <Button variant='outline-secondary' onClick={clearForm}>clear</Button>
                </InputGroup>
            </Form>
    )
}

export default SearchBox
