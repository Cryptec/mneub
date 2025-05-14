import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import './Button.css';

type ButtonProps = {
  variant?: 'primary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  type?: 'button' | 'submit' | 'reset';
};

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  startIcon,
  endIcon,
  disabled = false,
  isLoading = false,
  className = '',
  href,
  target,
  rel,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const isDisabled = disabled || isLoading;
  const classNames = `btn ${variant} ${size} ${fullWidth ? 'full-width' : ''} ${isDisabled ? 'disabled' : ''} ${className}`.trim();
  
  // Common props for all button types
  const commonProps = {
    className: classNames,
    'aria-disabled': isDisabled,
    'data-variant': variant,
    'data-size': size,
    'data-full-width': fullWidth,
    'data-loading': isLoading,
    ...(isDisabled ? { 'aria-busy': true } : {}),
  };

  // Motion props
  const motionProps = {
    whileHover: !isDisabled ? { scale: 1.02 } : {},
    whileTap: !isDisabled ? { scale: 0.98 } : {},
  };

  // If href is provided, render as an anchor tag
  if (href) {
    const isAnchorLink = href.startsWith('#');
    const linkRel = target === '_blank' 
      ? `${rel || ''} noopener noreferrer`.trim() 
      : rel;
    
    const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (isDisabled) {
        e.preventDefault();
        return;
      }

      if (isAnchorLink) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL without adding to history
          window.history.pushState(null, '', href);
        }
      }
      
      if (onClick) {
        onClick(e);
      }
    };
    
    return (
      <motion.a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={isDisabled ? undefined : href}
        target={target}
        rel={linkRel}
        onClick={handleAnchorClick}
        {...commonProps}
        {...motionProps}
        {...props}
      >
        {renderContent()}
      </motion.a>
    );
  }

  // Default to button element
  return (
    <motion.button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      {...commonProps}
      {...motionProps}
      {...props}
    >
      {renderContent()}
    </motion.button>
  );

  // Helper function to render the button content
  function renderContent() {
    if (isLoading) {
      return (
        <span className="btn-loader">
          <span></span>
          <span></span>
          <span></span>
        </span>
      );
    }

    return (
      <>
        {startIcon && <span className="btn-icon start">{startIcon}</span>}
        <span className="btn-text">{children}</span>
        {endIcon && <span className="btn-icon end">{endIcon}</span>}
      </>
    );
  }
});

Button.displayName = 'Button';

export default Button;
