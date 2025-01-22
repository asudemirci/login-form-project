import React, { useState } from 'react';
import styled from 'styled-components';
import "../NavBar.css";
import {
  Navbar,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from 'reactstrap';
import NavBar from "./NavBar";

const MainContainer = styled.div`
  background-color: white;
  min-height: 100vh;
  padding-top: 70px; /* Navbar yüksekliği kadar */
`;

const categories = [
  'Sale',
  'New in',
  'Clothing',
  'Shoes',
  'Bags',
  'Accessories',
  'Personal Care',
  'Jewelery',
  'Homeware',
  'Pre-owned',
];
const saleItems = [
  {
    id: 1,
    title: '50% Off Jacket',
    description: 'Stylish and warm jackets.',
    image: 'https://picsum.photos/645',
  },
  {
    id: 2,
    title: '30% Off Shoes',
    description: 'Comfortable and trendy shoes.',
    image: 'https://picsum.photos/646',
  },
  {
    id: 3,
    title: 'Buy 1 Get 1 Free Bags',
    description: 'Durable and elegant bags.',
    image: 'https://picsum.photos/647',
  },
];

export default function Success() {
  const [activeCategory, setActiveCategory] = useState('Sale');
  return (
    <>
      <Navbar expand="md">
        <NavBar
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </Navbar>
      <MainContainer>
        {activeCategory === 'Sale' && (
          <Row>
            {saleItems.map((item) => (
              <Col key={item.id} sm={12} md={6} lg={4} className="mb-4">
                <Card>
                  <CardImg top width="100%" src={item.image} alt={item.title} />
                  <CardBody>
                    <CardTitle tag="h5">{item.title}</CardTitle>
                    <CardText>{item.description}</CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {activeCategory !== 'Sale' && (
          <h3>{activeCategory} content will be added soon.</h3>
        )}
      </MainContainer>
    </>
  );
}
