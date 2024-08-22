import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    background-color: #004AAC;
    color: #ffffff;
    text-align: center;
    padding: 0px 0;
    margin-top: auto;
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <p>GrowthHub &copy; 2024 | Desenvolvido por David Balzarini</p>
        </FooterContainer>
    );
};

export default Footer;
