import '@testing-library/jest-dom';

import { render, screen, fireEvent, within } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { useCartStore } from '@/store/cart';
import Cart from './cart';
import { Product } from '@/interfaces/product';

// Mock data
const mockProduct: Product = {
  id: 1,
  imageUrl: '/test-image.jpg',
  name: 'Test Product',
  status: 'active',
  price: '99.99',
  stock: 150,
  availableAt: new Date(),
};

describe('Cart Component', () => {
  beforeEach(() => {
    // Clear the cart before each test
    act(() => {
      useCartStore.getState().clearCart();
    });
  });

  it('renders empty cart message when cart is empty', () => {
    render(<Cart />);

    const cartTrigger = screen.getByRole('button');
    fireEvent.click(cartTrigger);

    expect(screen.getByText('The cart is empty.')).toBeInTheDocument();
  });

  it('displays correct number of items in badge', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
    });

    render(<Cart />);

    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('displays product details correctly', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
    });

    render(<Cart />);

    const cartTrigger = screen.getByRole('button');
    fireEvent.click(cartTrigger);

    const productContainer = screen.getByText(mockProduct.name).closest('div');
    expect(productContainer).toBeInTheDocument();

    expect(
      within(productContainer!).getByText(`${mockProduct.price} €`)
    ).toBeInTheDocument();
    expect(screen.getByText(/quantity:/i)).toBeInTheDocument();
  });

  it('removes item from cart when remove button is clicked', async () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
    });

    render(<Cart />);

    const cartTrigger = screen.getByRole('button');
    fireEvent.click(cartTrigger);

    const removeButton = screen.getByLabelText('Remove cart item');
    fireEvent.click(removeButton);

    const confirmButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(confirmButton);

    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it('displays correct total price', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct, 2);
    });

    render(<Cart />);

    const cartTrigger = screen.getByRole('button');
    fireEvent.click(cartTrigger);

    const totalPrice = screen.getByLabelText('Total cart');

    expect(totalPrice).toHaveTextContent('Total: 199.98 €');
  });
});

describe('Cart Store', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  it('adds item to cart', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual({ ...mockProduct, quantity: 1 });
  });

  it('updates quantity of existing item', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().addItem(mockProduct);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(1);
    expect(state.items[0].quantity).toBe(2);
  });

  it('removes item from cart', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().removeItem(mockProduct.id);
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
  });

  it('clears cart', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().clearCart();
    });

    const state = useCartStore.getState();
    expect(state.items).toHaveLength(0);
    expect(state.total).toBe(0);
  });

  it('calculates total correctly', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct, 2);
    });

    const state = useCartStore.getState();
    expect(state.total).toBe(199.98);
  });

  it('updates quantity directly', () => {
    act(() => {
      useCartStore.getState().addItem(mockProduct);
      useCartStore.getState().updateQuantity(mockProduct.id, 5);
    });

    const state = useCartStore.getState();
    expect(state.items[0].quantity).toBe(5);
    expect(state.total).toBe(499.95);
  });
});
