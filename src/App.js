import React, { useEffect, useState } from 'react';
import 'rbx/index.css';
import { Column, Container, Navbar, Button, Icon, Modal, Box } from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Product from './Components/Card';
import Cart from './Components/Cart';

const App = () => {
  const [data, setData] = useState({});
  const [cartActive, setCart] = useState(false);
  const [cartInfo, setCartInfo] = useState([]);

  const useRenderUpdate = () => {
    const [value, set] = useState(true);
    return () => set(value => !value);
  }
  const renderUpdate = useRenderUpdate();

  const products = Object.values(data);

  const id2product = {}
  let i;
  for (i = 0; i < products.length; i += 1) {
    id2product[products[i].sku] = products[i];
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const addCartItem = (productId, size) => {
    let i;
    let found = false;
    let content = cartInfo;
    for (i = 0; i < content.length; i += 1) {
      if (content[i].productId === productId) {
        found = true;
        break;
      }
    }
    if (found) {
      content[i][size] += 1;
    }
    else {
      content.push({
        productId: productId,
        product: id2product[productId],
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
      });
      content[content.length - 1][size] += 1;
    }
    setCartInfo(content);
    setCart(true);
    renderUpdate();
  };

  const removeCartItem = (productId, size) => {
    let i;
    let found = false;
    let content = cartInfo;
    for (i = 0; i < content.length; i += 1) {
      if (content[i].productId === productId) {
        found = true;
        break;
      }
    }
    if (found) {
      content[i][size] = content[i][size] > 0 ? content[i][size] - 1 : 0;
    }
    else {
      content.push({
        productId: productId,
        product: id2product[productId],
        'S': 0,
        'M': 0,
        'L': 0,
        'XL': 0,
      });
      content[i][size] = content[i][size] > 0 ? content[i][size] - 1 : 0;
    }
    setCartInfo(content);
    renderUpdate();
  };

  return (
    <Container as='div' style={{ width: '100%', paddingTop: '20px' }}>
      <Navbar fixed='top' as='div' style={{ paddingLeft: '60px', paddingRight: '50px', paddingTop: '10px' }}>
        <Navbar.Brand>
          <Navbar.Item>
            <h1 style={{ fontSize: '24px' }}><strong>Catalog</strong></h1>
          </Navbar.Item>
          <Navbar.Item>
            <Button color='black' onClick={() => setCart(true)}>
              <Icon>
                <FontAwesomeIcon icon={faShoppingCart} />
              </Icon>
            </Button>
          </Navbar.Item>
        </Navbar.Brand>
      </Navbar>
      <Modal active={cartActive}>
        <Modal.Background />
        <Modal.Content>
          <Box>
            <Cart cartInfoContent={cartInfo} removeFromCart={removeCartItem} />
          </Box>
        </Modal.Content>
        <Modal.Close onClick={() => setCart(false)} />
      </Modal>
      <Column.Group multiline>
        <Column size='full'>
        </Column>
        {products.map(product =>
          <Column size='one-third'>
            <Product product={product} addToCart={addCartItem} />
          </Column>
        )}
      </Column.Group>
    </Container>
  );
};
export default App;