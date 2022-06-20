import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Carousel from './Carousel';

it('renders without crashing', function () {
  render(<Carousel />);
});

it('matches snapshot', function () {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it('works when you click on the right arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
});

it('works when you click on the left arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel (to start at second photo)
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the first image to show, but not the third
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the third image to show, but not the first
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument();
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
});

it('hides the left arrow on the first card in the array', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the left arrow to not show for the first, but show for the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument();
  expect(queryByTestId('left-arrow')).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
  expect(queryByTestId('left-arrow')).toBeInTheDocument();
});

it('hides the right arrow on the last card in the array', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  // move forward to end of the carousel
  const rightArrow = queryByTestId('right-arrow');
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to not show for the last, but show for the second
  expect(queryByAltText('Photo by Josh Post on Unsplash')).toBeInTheDocument();
  expect(queryByTestId('right-arrow')).not.toBeInTheDocument();

  // move backward one in the carousel
  const leftArrow = queryByTestId('left-arrow');
  fireEvent.click(leftArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument();
  expect(queryByTestId('right-arrow')).toBeInTheDocument();
});