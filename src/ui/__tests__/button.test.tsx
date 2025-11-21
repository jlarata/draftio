import { render, screen, fireEvent } from '@testing-library/react'
import { Button, BlueButton } from '../button'

describe('Button Components', () => {
  describe('Button', () => {
    it('should render children correctly', () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole('button')).toHaveTextContent('Click me')
    })

    it('should apply default classes', () => {
      render(<Button>Test</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-green-500')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('rounded-lg')
    })

    it('should merge custom className with default classes', () => {
      render(<Button className="custom-class">Test</Button>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-green-500')
      expect(button).toHaveClass('custom-class')
    })

    it('should pass through button props', () => {
      const handleClick = jest.fn()
      render(
        <Button onClick={handleClick} data-testid="test-button">
          Test
        </Button>
      )
      
      const button = screen.getByTestId('test-button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle disabled state', () => {
      render(<Button disabled>Disabled</Button>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })

    it('should render complex children', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      )
      
      expect(screen.getByText('Icon')).toBeInTheDocument()
      expect(screen.getByText('Text')).toBeInTheDocument()
    })
  })

  describe('BlueButton', () => {
    it('should render children correctly', () => {
      render(<BlueButton>Blue Button</BlueButton>)
      expect(screen.getByRole('button')).toHaveTextContent('Blue Button')
    })

    it('should apply blue-specific classes', () => {
      render(<BlueButton>Test</BlueButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-400')
      expect(button).toHaveClass('text-white')
      expect(button).toHaveClass('rounded-lg')
    })

    it('should merge custom className with default classes', () => {
      render(<BlueButton className="custom-blue-class">Test</BlueButton>)
      const button = screen.getByRole('button')
      expect(button).toHaveClass('bg-blue-400')
      expect(button).toHaveClass('custom-blue-class')
    })

    it('should handle click events', () => {
      const handleClick = jest.fn()
      render(<BlueButton onClick={handleClick}>Blue Test</BlueButton>)
      
      const button = screen.getByRole('button')
      fireEvent.click(button)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it('should handle disabled state', () => {
      render(<BlueButton disabled>Disabled Blue</BlueButton>)
      const button = screen.getByRole('button')
      expect(button).toBeDisabled()
    })
  })
}) 
