import React from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { PDFDownloadLink, Page, Text, View, Document, Image, StyleSheet } from '@react-pdf/renderer';
import { Usuario, certificados, cursos } from '../db/db';

const CertificadoContainer = styled.div`
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 5px;
    background-color: #ffffff;
`;

const CertificadoTitle = styled.h2`
    color: #007bff;
`;

const CertificadoText = styled.p`
    color: #6c757d;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
    },
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    content: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#474a51',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 100
    },
    text: {
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        color: '#000',
        textAlign: 'center',
    },
    assinatura:{
        width: '200px',
        margin: '80px'
    },
    logo:{
        width: '200px',
        marginRight: 30

    }
});

const CertificadoPDF: React.FC<{ usuario: Usuario; cursoTitulo: string }> = ({ usuario, cursoTitulo }) => (
    <Document>
        <Page size="A4" style={styles.page} orientation='landscape'>
            <View style={styles.container}>
                <Image src='/fundo_certificado.png' style={styles.backgroundImage}/>
                <View style={styles.content}>
                    <Image src='\GROWTH HUB LOGO.png' style={styles.logo}/>
                    <Text style={styles.title}>{usuario.nome}</Text>
                    <Text style={styles.text}>
                        Certificamos que o(a) participante completou com sucesso o treinamento <Text style={{color: 'blue'}}>{cursoTitulo}</Text>
                    </Text>
                    <Image src='/assinatura.png' style={styles.assinatura}/>
                    <Text style={styles.date}>
                        Data de Emissão: {new Date().toLocaleDateString('pt-BR')}
                    </Text>
                </View>
            </View>
        </Page>
    </Document>
);

const Certificados: React.FC<{ usuario: Usuario | null }> = ({ usuario }) => {
    const { id } = useParams<{ id: string }>();
    const cursoId = Number(id?.replace(':', ''));
    const curso = cursos.find(curso => curso.id === cursoId);
    const certificado = certificados.find(c => c.cursoId === cursoId && c.usuarioId === (usuario?.id || -1));

    if (!usuario) {
        return <div>Usuário não logado</div>;
    }
    if (!curso) {
        return <div>Curso não encontrado.</div>;
    }

    return (
        <CertificadoContainer>
            <CertificadoTitle>Certificado de Conclusão</CertificadoTitle>
                <>
                    
                        <>
                            <CertificadoText>
                                Parabéns {usuario.nome}! Você completou o curso "{curso.titulo}".
                            </CertificadoText>
                            <CertificadoText>
                                Data de Emissão: {certificado?.dataEmissao}
                            </CertificadoText>
                            <PDFDownloadLink
                                document={<CertificadoPDF usuario={usuario} cursoTitulo={curso.titulo} />}
                                fileName={`Certificado_${curso.titulo}_${usuario.nome}.pdf`}
                            >
                                {({ loading }) => (
                                    <Button>{loading ? 'Gerando PDF...' : 'Baixar Certificado em PDF'}</Button>
                                )}
                            </PDFDownloadLink>
                        </>
                    
                </>
        </CertificadoContainer>
    );
};

export default Certificados;
