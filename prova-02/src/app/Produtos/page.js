'use client'


import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function ProdutosPage() {

  const [produtos, setProdutos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const produtosLocalStorage = JSON.parse(localStorage.getItem("produtos")) || []
    // guarda a lista no estado faculdades
    setProdutos(produtosLocalStorage)
    console.log(produtosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(produto) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o cliente ${produto.nome}?`)) {
      // filtra a lista antiga removando o curso recebido
      const novaLista = produtos.filter(item => item.id !== produto.id)
      // grava no localStorage a nova lista
      localStorage.setItem('produtos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setProdutos(novaLista)
      alert("Produto excluído com sucesso!")
    }
  }


  return (
    <Pagina titulo={"Lista de Produtos"}>
      <div className='text-end mb-2'>
        <Button href='/Produtos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Produtos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do produto</th>
            <th>Tipo</th>
            <th>Medida</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Marca</th>
            <th>Fornecedor</th>
            <th>Cor</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(produto => {
            return (
              <tr>
                <td>{produto.nomeproduto}</td>
                <td>{produto.tipo}</td>
                <td>{produto.medida}</td>
                <td>{produto.preco}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.marca}</td>
                <td>{produto.fornecedor}</td>
                <td>{produto.cor}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/Produtos/form?id=${produto.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(produto)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>



    </Pagina>
  )
}