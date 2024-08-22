// Tipos de dados
export interface Usuario {
    id: number;
    nome: string;
    email: string;
    foto: string;
    senha: string;
    adm: boolean;
}

export interface Certificado {
    id: number;
    usuarioId: number;
    cursoId: number;
    dataEmissao: string;
}

interface Modulo {
    id: number;
    titulo: string;
    descricao: string;
    videoUrl: string;
    visualizacao: { [usuarioId: number]: boolean };
}

export interface Curso {
    id: number;
    titulo: string;
    descricao: string;
    image: string;
    obg: boolean;
    modulos: Modulo[]
}

export interface Matricula {
    id: number;
    usuarioId: number;
    cursoId: number;
    dataMatricula: string;
}

// Simulação do banco de dados
export const usuarios: Usuario[] = [
    { id: 1, nome: 'Admin', email: 'adm@gmail.com', senha: '123456', foto: '', adm: true },
    { id: 2, nome: 'David Balzarini', email: 'david@gmail.com', senha: '123456', foto: 'https://images4.alphacoders.com/133/1332281.jpeg', adm: false  },
];

export const cursos: Curso[] = [
    {
        id: 1,
        titulo: 'Curso de React',
        descricao: 'Aprenda React do básico ao avançado.',
        image: 'https://i.ytimg.com/vi/ErjWNvP6mko/maxresdefault.jpg',
        obg: false,
        modulos: [
            {
                id: 1,
                titulo: 'Introdução ao React',
                descricao: 'Aprenda os fundamentos do React.',
                videoUrl: 'https://www.youtube.com/embed/ttfRRdONvxM?si=6f8_jQbyU5S22GC2',
                visualizacao: {}, // Mapeamento de IDs de usuários para booleanos
            },
            {
                id: 2,
                titulo: 'Componentes e Props',
                descricao: 'Entenda como trabalhar com componentes e props no React.',
                videoUrl: 'https://www.youtube.com/embed/0mYq5LrQN1s?si=wzoG1VEmRy9mFWVC',
                visualizacao: {}, // Mapeamento de IDs de usuários para booleanos
            },
        ],        
    },
    {
        id: 2,
        titulo: 'Curso de TypeScript',
        descricao: 'Entenda TypeScript e seus conceitos avançados.',
        image: 'https://i.ytimg.com/vi/ppDsxbUNtNQ/maxresdefault.jpg',
        obg: false,
        modulos: [
            {
                id: 1,
                titulo: 'Introdução ao TypeScript',
                descricao: 'Aprenda os fundamentos do React.',
                videoUrl: 'https://www.youtube.com/embed/0mYq5LrQN1s?si=wzoG1VEmRy9mFWVC',
                visualizacao: {},
            },
        ],
    },
    {
        id: 3,
        titulo: 'Bem estar no trabalho',
        descricao: 'Este curso aborda práticas e estratégias para melhorar a saúde física e mental no ambiente de trabalho. Com foco em técnicas de gerenciamento de estresse, ergonomia e desenvolvimento de um ambiente positivo, o curso visa aumentar a produtividade e satisfação dos colaboradores, promovendo um equilíbrio saudável entre a vida profissional e pessoal. Ideal para profissionais de todas as áreas que buscam melhorar a qualidade de vida no trabalho.',
        image: 'https://www.psitto.com.br/wp-content/uploads/2023/07/bem-estar-trabalho1.png',
        obg: false,
        modulos: [
            {
                id: 1,
                titulo: 'Introdução ao TypeScript',
                descricao: 'Aprenda os fundamentos do React.',
                videoUrl: 'https://www.youtube.com/embed/2g1_FIGjuvc?si=fhtrcnMjejTIXQPW',
                visualizacao: {},
            },
        ],
    },
    {
        id: 4,
        titulo: 'Segurança no trabalho',
        descricao: 'treinamento segurança no trabalho',
        image: 'https://beecorp.com.br/wp-content/uploads/2021/09/seguranca-do-trabalho-e1645725554720.webp',
        obg: true,
        modulos: [
            {
                id: 1,
                titulo: 'módulo 1',
                descricao: 'segurança no trabalho',
                videoUrl: 'https://www.youtube.com/embed/l3EizB-rU_Q?si=WpDV_kFmu6Tj9oWE',
                visualizacao: {},
            },
        ],
    },
    {
        id: 5,
        titulo: 'Pacote Office',
        descricao: 'treinamento para dominar o pacote office',
        image: 'https://portalidea.com.br/cursos/e671855099d8e90df6875019d44c7ffc.webp',
        obg: false,
        modulos: [
            {
                id: 1,
                titulo: 'Excel',
                descricao: 'Aprenda os fundamentos de excel',
                videoUrl: 'https://www.youtube.com/embed/LgXzzu68j7M?si=OWZKeCgj1Tg4EDY9',
                visualizacao: {},
            },
            {
                id: 2,
                titulo: 'word',
                descricao: 'Aprenda os fundamentos do word',
                videoUrl: 'https://www.youtube.com/embed/pfUnnEKSn2g?si=wy1uLwzkACyTp-HF',
                visualizacao: {},
            },
            {
                id: 3,
                titulo: 'Power point',
                descricao: 'Aprenda os fundamentos do power point',
                videoUrl: 'https://www.youtube.com/embed/l5Ij7nUy9UQ?si=bDZdf2taRadtAsZd',
                visualizacao: {},
            },
        ],
    },
    {
        id: 5,
        titulo: 'Power BI',
        descricao: 'treinamento para dominar o power BI',
        image: 'https://avantisolucoes.com.br/wp-content/uploads/2022/03/imagem_2022-03-05_121508.png',
        obg: false,
        modulos: [
            {
                id: 1,
                titulo: 'modulo 1',
                descricao: 'descrição modulo 1',
                videoUrl: 'https://www.youtube.com/embed/NNSHu0rkew8?si=NW5svgwkJ86YIqkq',
                visualizacao: {},
            },
        ],
    },
    
];

export const certificados: Certificado[] = [
    {
        id: 1,
        usuarioId: 1,
        cursoId: 1,
        dataEmissao: '2024-08-01',
    },
    {
        id: 2,
        usuarioId: 2,
        cursoId: 2,
        dataEmissao: '2024-08-15',
    },
];


export const matriculas: Matricula[] = [
    { id: 1, usuarioId: 1, cursoId: 1, dataMatricula: '2024-08-16' },
    { id: 2, usuarioId: 2, cursoId: 2, dataMatricula: '2024-08-17' },
];

// Funções de manipulação dos dados
export function autenticarUsuario(email: string, senha: string): Usuario | null {
    const usuario = usuarios.find((u) => u.email === email && u.senha === senha);
    return usuario || null;
}

export function matricularUsuario(usuarioId: number, cursoId: number): void {
    const novaMatricula: Matricula = {
        id: matriculas.length + 1,
        usuarioId,
        cursoId,
        dataMatricula: new Date().toISOString().split('T')[0],
    };
    matriculas.push(novaMatricula);
}

export function listarCursosMatriculados(usuarioId: number): Curso[] {
    const cursosMatriculadosIds = matriculas
        .filter((matricula) => matricula.usuarioId === usuarioId)
        .map((matricula) => matricula.cursoId);

    return cursos.filter((curso) => cursosMatriculadosIds.includes(curso.id));
}

