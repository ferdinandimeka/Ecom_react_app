import React, {useEffect} from 'react'
import {Row, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../Product'
import { listProducts } from '../../actions/productAction'
import Loader from '../Loader'
import Message from '../Message'
import Paginator from '../Paginator'
import ProductCarousel from '../ProductCarousel'
import { useParams } from 'react-router-dom'


function HomeScreen() {

  const dispatch = useDispatch();

  // getting the productList state from the redux store
  const productList = useSelector((state) => state.productList);
  const { error, page, pages, loading, products } = productList;

  /** if users searches for anything the keyword changes and useeffect gets trigerred */
  // const queryParams = new URLSearchParams(window.location.search);
  // const keyword = queryParams.get('search') || 1;

  const keyword = useParams().id

  /** firing off action using dispatch */
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}

      <h1 className="text-center">Latest Products</h1>
      {loading ?(
        <Loader />
      ): error ?(
        <Message variant='danger'>{error}</Message>
      ): 
      <div>
        <Row>
          {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              {/* <h3>{product.name}</h3> */}
              <Product product={product}/>
            </Col>
            ))
          }
        </Row>
        <Paginator page={page} pages={pages} keyword={keyword} />
      </div>
      }
    </div>
  )
}

export default HomeScreen