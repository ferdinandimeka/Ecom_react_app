import React from 'react'
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Paginator({ page, pages, keyword = '', isAdmin = false }) {
    // ONLY IN ADMIN ProductList PAGE IT WILL BE SET TO TRUE
    
    const queryParams = new URLSearchParams(window.location.search);

    if (queryParams.has('keyword')) {
    keyword = queryParams.get('keyword');
    }


    console.log('keyword', keyword)

  return (
    pages > 1 && (
        <Pagination>
            {[...Array(pages).keys()].map((x) => {
                const linkTo = !isAdmin
                ? { pathname: '/', search: `?keyword=${keyword}&page=${x + 1}`}
                : { pathname: '/productlist/', search: `?keyword=${keyword}&page=${x + 1}`}   
                
                return (
                    <LinkContainer key={x + 1} to={linkTo}>
                        <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                )
            })}
        </Pagination>
    )
  )
}

export default Paginator