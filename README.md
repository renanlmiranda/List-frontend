# Softwrap-fronted
 
Link: [Projeto](https://distracted-archimedes-ccf41a.netlify.app)

## Iniciar o projeto

- Clonar repositório: git clone {link}.
- Instalar dependências: yarn install.
- Criar .env baseado no .env.example
- Iniciar projeto: yarn start

## Dependências

- Reactstrap
- React-icons
- Styled-components
- Eslint/Prettier
- Axios

## Relatório

No frontend utlizei o reacstrap, o que facilitou bastante a parte visual, e assim conseguisse focar na parte lógica, no primeiro momento acabei fazendo a tela de cadastro e update em paginas separadas, mas como fiz um modal para o delete, acabei fazendo os três no mesmo componente, reutilizando bastante o mesmo, a paginação esta com um limite de 5 itens, por enquanto não cheguei a utilizar tanto o style-components no projeto, somente em um ou dois componentes, a validação é algo que tenho que melhorar bastante ainda, pois ela só esta na parte de criação, quando a pessoa digita algo e apaga, ou tenta salvar, para as rotas utilizei o axios diretamente na página, futuramente vou colocar ele em uma pasta services para deixar mais organizado, e para deploy usei o netlify, sendo bem simples e gratuito, toda vez que mando um commit para a main ele ja faz o processo automático.

