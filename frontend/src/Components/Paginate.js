import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({forURL, pages, page, keyword = ''}) => {
    return pages > 5 ? (
        <Pagination>            
            <React.Fragment>                
                {page !== 1 &&
                    <React.Fragment>
                        <LinkContainer to={keyword ? `/${forURL}/search/${keyword}/page/1` : `/${forURL}/page/1`}>
                            <Pagination.Item><i className='bi bi-chevron-bar-left'></i></Pagination.Item>
                        </LinkContainer>

                        <LinkContainer to={keyword ? `/${forURL}/search/${keyword}/page/${page-1}` : `/${forURL}/page/${page-1}`}>
                            <Pagination.Item className='mx-2'><i className='bi bi-chevron-compact-left'></i></Pagination.Item>
                        </LinkContainer>
                    </React.Fragment>
                }                

                <Pagination.Item className='mx-2'>{page}</Pagination.Item>
                
                {page !== pages && 
                    <LinkContainer to={keyword ? `/${forURL}/search/${keyword}/page/${page+1}` : `/${forURL}/page/${page+1}`}>
                        <Pagination.Item className='mx-2'><i className='bi bi-chevron-compact-right'></i></Pagination.Item>
                    </LinkContainer>
                }

                <LinkContainer to={keyword ? `/${forURL}/search/${keyword}/page/${pages}` : `/${forURL}/page/${pages}`}>
                        <Pagination.Item><i className='bi bi-chevron-bar-right'></i></Pagination.Item>
                </LinkContainer>
            </React.Fragment>           
        </Pagination>
    ) : (
        <Pagination>
            {[...Array(pages).keys()].map(x => (
                <LinkContainer key={x+1} to={keyword ? `/${forURL}/search/${keyword}/page/${x+1}` : `/${forURL}/page/${x+1}`}>
                    <Pagination.Item active={x+1 === page}>{x+1}</Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate
