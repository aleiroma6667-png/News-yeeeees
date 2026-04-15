import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            background: '#797979', // Темный цвет, как на верхней панели
            padding: '40px 20px',
            textAlign: 'center',
            marginTop: 'auto' // Помогает футеру оставаться внизу
        }}>
            <p style={{
                color: '#ffffff', // ДЕЛАЕМ ТЕКСТ БЕЛЫМ
                margin: 0,
                fontSize: '18px',
                opacity: 0.8
            }}>
                ©️ 2026 Все новости футбола
            </p>
        </footer>
    );
};

export default Footer;