import React, { useState } from 'react';

interface ImagePreviewOnHoverProps {
  src: string;
  width?: number;
  height?: number;
  children: React.ReactNode;
}

const ImagePreviewOnHover = ({ src, width, height, children }: ImagePreviewOnHoverProps) => {
  const [showPreview, setShowPreview] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setShowPreview(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCursorPosition({ x: e.clientX + 15, y: e.clientY + 15 });
  };

  const handleMouseLeave = () => {
    setShowPreview(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showPreview && src && (
        <img
          src={src}
          alt="Ошибка!"
          width={width}
          height={height}
          style={{
            position: 'absolute',
            top: cursorPosition.y,
            left: cursorPosition.x,
            border: '1px solid #ddd',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
            backgroundColor: '#fff',
          }}
        />
      )}
    </div>
  );
};

export default ImagePreviewOnHover;
