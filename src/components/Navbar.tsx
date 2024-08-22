import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Usuario } from '../db/db';

const Nav = styled.nav`
    background-color: #fff;
    padding: 1em;
    display: flex;
    flex: space-between;
    align-items: end;
    width:100vw;
    border-bottom: 4px solid #004AAC;
    
`;

const NavLink = styled(Link)`
    color: #004AAC;
    text-decoration: none;
    margin: 0px 15px 10px 15px;
    font-weight: bold;
    font-size: 1.1rem;

    &:hover {
        text-decoration: underline;
    }
`;
const NavImage = styled.img<{ isAdmin: boolean }>`
    width: 80px;
    margin: ${({ isAdmin }) => (isAdmin ? '0px 64vw 0px 10px' : '0px 73vw 0px 10px')};
`;


const UserImage = styled.img`
    height: 50px;
    width: 50px;
    border-radius: 50%; /* Isso vai fazer com que a imagem fique circular */
    margin-left: 5px;
    object-fit: cover; /* Garante que a imagem preencha o quadrado sem distorção */
    object-position: center; /* Centraliza a parte da imagem que será mostrada */
`;




const Navbar: React.FC<{ usuario: Usuario | null }> = ({ usuario }) => {
    
        return (
            <Nav>
                <NavImage src='\GROWTH HUB LOGO.png' isAdmin={!!usuario?.adm} />
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cursos">Cursos</NavLink>
                <NavLink to="/area-aluno">Área do Aluno</NavLink>
                {usuario?.adm && (
                    <NavLink to="/area-adm">Área Administrativa</NavLink>
                )}
                {usuario ? (
                    usuario.foto === '' ? <UserImage src='https://static.vecteezy.com/ti/vetor-gratis/p3/11186876-simbolo-de-foto-de-perfil-masculino-vetor.jpg'/> : <UserImage src={usuario.foto}/> 
                ) : (
                    <NavLink to="/login">Login</NavLink>
                ) }
            </Nav>
        );
        
    
};

export default Navbar;
