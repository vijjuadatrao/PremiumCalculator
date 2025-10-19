import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PremiumCalculator from '../Components/PremiumCalculator'; // adjust import path

describe('PremiumCalculator Component', () => {
  test('renders all input fields and heading', () => {
    render(<PremiumCalculator />);

    // Check the labels present in document
    expect(screen.getByText(/Premium Calculator/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Age Next Birthday/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Death - Sum Insured/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Usual Occupation/i)).toBeInTheDocument();
  });

  //update the form values
  test('updates input values correctly', () => {
    render(<PremiumCalculator />);
    const nameInput = screen.getByLabelText(/Name/i) as HTMLInputElement;
    fireEvent.change(nameInput, { target: { value: 'Vidya', name: 'name' } });

    expect(nameInput.value).toBe('Vidya');
  });

  test('does not show premium initially', () => {
    render(<PremiumCalculator />);
    expect(
      screen.queryByText(/Your Monthly Premium is/i)
    ).not.toBeInTheDocument();
  });

  test('calculates premium correctly when all fields are filled and occupation changes', () => {
    render(<PremiumCalculator />);

    // Fill out the form fields
    fireEvent.change(screen.getByLabelText(/Name/i), {
      target: { name: 'name', value: 'Vidya' },
    });
    fireEvent.change(screen.getByLabelText(/Age Next Birthday/i), {
      target: { name: 'age', value: '30' },
    });
    fireEvent.change(screen.getByLabelText(/Date of Birth/i), {
      target: { name: 'dateOfBirth', value: '1995-08' },
    });
    fireEvent.change(screen.getByLabelText(/Death - Sum Insured/i), {
      target: { name: 'deathCoverAmount', value: '200000' },
    });

    // Trigger occupation change (which should trigger calculation)
    fireEvent.change(screen.getByLabelText(/Usual Occupation/i), {
      target: { name: 'occupation', value: 'Doctor' },
    });

    expect(
      screen.getByText(/Your Monthly Premium is/i)
    ).toBeInTheDocument();
  });

  test('does calculate premium if occupation is changed or if all fields are filled', () => {
    render(<PremiumCalculator />);

    fireEvent.change(screen.getByLabelText(/Usual Occupation/i), {
      target: { name: 'occupation', value: 'Cleaner' },
    });

    expect(
      screen.queryByText(/Your Monthly Premium is/i)
    ).toBeInTheDocument();
  });

  test('null input on any of the field should not show the premium', () => {
    render(<PremiumCalculator />);

    fireEvent.change(screen.getByLabelText(/Age/i), {
      target: { name: 'age', value: '' },
    });

    expect(
      screen.queryByText(/Your Monthly Premium is/i)
    ).not.toBeInTheDocument();
  });

});
