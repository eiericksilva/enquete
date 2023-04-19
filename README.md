/\*
O desafio consiste em criar uma aplicação de enquete.
A aplicação deve conter quatro funções:

1. Registrar novas enquetes ✅
2. Remover enquetes ✅
3. Registrar uma nova resposta ✅
4. Exibir contador de respostas

5. PLUS: Interface
6. PLUS: Testes automatizados

const enquete = registrarEnquete({
pergunta: 'Qual é seu animal favorito?',
opcoes: ['1. Gato', '2. Cachorro', '3. Papagaio']
})

removerEnquete(enquete.id)

registrarResposta({
id: enquete.id,
opcao: 0
})

const respostas = exibirRespostas(enquete.id)
console.table(respostas)
