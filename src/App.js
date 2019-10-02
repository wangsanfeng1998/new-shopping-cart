import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar} from 'rbx';
import Product from './Components/Card';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
      <Container as='div' style={ {width: '100%', paddingTop: '20px'} }>
        <Navbar fixed='top' as='div' style={ {paddingLeft: '60px', paddingRight: '50px', paddingTop: '10px'} }>
        <Navbar.Brand>
          <Navbar.Item>
              <h1 style={{fontSize: '24px'}}><strong>Catalog</strong></h1>
              </Navbar.Item>
          </Navbar.Brand>
        </Navbar>
        <Column.Group multiline>
          <Column size='full'>
          </Column>
          {products.map(product =>
            <Column size='one-third'>
              <Product product={ product } />
            </Column>
          )}
        </Column.Group>
      </Container>
  );
};
export default App;