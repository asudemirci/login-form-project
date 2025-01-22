import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { NavbarBrand } from 'reactstrap';

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: auto;
  max-width: 20%;
  min-width: 120px;
  position: relative;
  background-color: #fff;
  border-radius: 9px;
  border: 1px solid #222222;
  transition: border 0.3s ease-in-out;
  overflow: hidden;
  margin-left: auto;

  &:focus-within {
    border: 1.5px solid black;
    outline: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding-left: 32px;
  position: relative;
`;

const Icon = styled.i`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 18px;
  color: #b6b6b6;
  flex-shrink: 0;
`;

const SearchField = styled.input`
  width: 100%;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 8px;
  border-radius: 5px;

  &::placeholder {
    color: #727272;
  }
`;

const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 85%;
  margin: 0 auto;
  max-width: 144rem;
  padding: 10px 0;
  overflow: hidden;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  white-space: nowrap;
  overflow-x: hidden; 
  -ms-overflow-style: none; 
  scrollbar-width: none;
  margin-left: auto;

  &::-webkit-scrollbar {
    display: none; 
  }
`;

export default function NavBar({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  const categoryRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollStep = 200;
  const checkArrows = () => {
    if (!categoryRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = categoryRef.current;

    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    checkArrows();
    window.addEventListener('resize', checkArrows);
    categoryRef.current?.addEventListener('scroll', checkArrows);

    return () => {
      window.removeEventListener('resize', checkArrows);
      categoryRef.current?.removeEventListener('scroll', checkArrows);
    };
  }, []);

  const scrollLeft = () => {
    categoryRef.current?.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  };

  const scrollRight = () => {
    categoryRef.current?.scrollBy({ left: scrollStep, behavior: 'smooth' });
  };

  return (
    <ScrollContainer>
      <div className="brand-name">
        <NavbarBrand>FreakBuy</NavbarBrand>
      </div>
      <div className="scroll-controls">
        {showLeftArrow && (
          <button className="scroll-button-left" onClick={scrollLeft}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        )}
      </div>
      <CategoriesWrapper ref={categoryRef}>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${
              activeCategory === category ? 'active' : ''
            }`}
            onClick={() => setActiveCategory(category)}
            style={{ padding: '10px', cursor: 'pointer' }}
          >
            {category}
          </div>
        ))}
      </CategoriesWrapper>
      <div className="scroll-controls">
        {showRightArrow && (
          <button className="scroll-button-right" onClick={scrollRight}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        )}
      </div>
      <SearchForm role="search">
        <InputWrapper>
          <Icon className="fas fa-search" />
          <SearchField
            type="text"
            placeholder="Search"
            aria-label="Search input"
          />
        </InputWrapper>
      </SearchForm>
    </ScrollContainer>
  );
}
