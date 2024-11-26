import { useEffect, useState } from 'react';
import { Box, Typography, Link } from '@mui/material';

const AdsBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: isVisible ? 5 : -100,
        right: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '8px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        textAlign: 'center',
        fontSize: '14px',
        transition: 'bottom 1s ease, opacity 1s ease', 
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Typography variant="body2" component="p">
        © {currentYear}{' '}
        <Link
          href="https://www.herzen.spb.ru/about/struct-uni/inst/i-it/kafedry/laboratoriya-vizualizatsii-i-kompyuternoy-grafiki"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Лаборатория визуализации
        </Link>
      </Typography>
    </Box>
  );
};

export default AdsBanner;
