import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../index'

describe('Swiss Button Component', () => {
  it('should render string label correctly', () => {
    render(<Button label="Swiss Button" />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Swiss Button')
  })

  it('should render ReactNode label correctly', () => {
    const complexLabel = (
      <div>
        <span>Complex</span>
        <span>Label</span>
      </div>
    )
    
    render(<Button label={complexLabel} />)
    expect(screen.getByText('Complex')).toBeInTheDocument()
    expect(screen.getByText('Label')).toBeInTheDocument()
  })

  it('should wrap string labels in span with correct class', () => {
    render(<Button label="Text Label" />)
    const span = screen.getByText('Text Label')
    expect(span.tagName).toBe('SPAN')
    expect(span).toHaveClass('text-[1em]')
  })

  it('should handle click events', () => {
    const handleClick = jest.fn()
    render(<Button label="Clickable" onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should handle disabled state with proper styling', () => {
    render(<Button label="Disabled" disabled />)
    const button = screen.getByRole('button')
    
    expect(button).toBeDisabled()
    expect(button).toHaveClass('disabled:bg-gray-200')
    expect(button).toHaveClass('disabled:text-gray-400')
    expect(button).toHaveClass('disabled:cursor-not-allowed')
  })

  it('should apply default green styling classes', () => {
    render(<Button label="Green Button" />)
    const button = screen.getByRole('button')
    
    expect(button).toHaveClass('text-green-600')
    expect(button).toHaveClass('border-green-300')
    expect(button).toHaveClass('hover:bg-green-300')
    expect(button).toHaveClass('hover:text-white')
  })

  it('should pass through additional props', () => {
    render(
      <Button 
        label="Test" 
        data-testid="swiss-button"
        title="Swiss Button Title"
      />
    )
    
    const button = screen.getByTestId('swiss-button')
    expect(button).toHaveAttribute('title', 'Swiss Button Title')
  })

  it('should merge custom className with default classes', () => {
    render(<Button label="Custom" className="custom-class" />)
    const button = screen.getByRole('button')
    
    // Should still have default classes
    expect(button).toHaveClass('text-green-600')
    expect(button).toHaveClass('border-green-300')
    
    // Should also have custom class
    expect(button).toHaveClass('custom-class')
  })

  it('should handle form submission when type="submit"', () => {
    const handleSubmit = jest.fn()
    render(
      <form onSubmit={handleSubmit}>
        <Button label="Submit" type="submit" />
      </form>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
}) 
