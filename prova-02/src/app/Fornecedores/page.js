'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FornecedoresPage() {

  const [fornecedores, setFornecedores] = useState([])

  // Carrega a lista de fornecedores do localStorage ao acessar a tela
  useEffect(() => {
    const fornecedoresLocalStorage = JSON.parse(localStorage.getItem("fornecedores")) || []
    setFornecedores(fornecedoresLocalStorage)
    console.log(fornecedoresLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(fornecedor) {
    if (window.confirm(`Deseja realmente excluir o fornecedor ${fornecedor.nome}?`)) {
      const novaLista = fornecedores.filter(item => item.id !== fornecedor.id)
      localStorage.setItem('fornecedores', JSON.stringify(novaLista))
      setFornecedores(novaLista)
      alert("Fornecedor excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Fornecedores"}>
      <div className='text-end mb-2'>
        <Button href='/Fornecedores/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Fornecedores */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome do Fornecedor</th>
            <th>CNPJ</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Endereço</th>
            <th>Representante</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => {
            return (
              <tr key={fornecedor.id}>
                <td>{fornecedor.nomefornecedores}</td>
                <td>{fornecedor.cnpj}</td>
                <td>{fornecedor.telefone}</td>
                <td>{fornecedor.email}</td>
                <td>{fornecedor.endereco}</td>
                <td>{fornecedor.representante}</td>
                <td className='text-center'>
                  {/* Botões das ações */}
                  <Button className='me-2' href={`/Fornecedores/form?id=${fornecedor.id}`}><FaPen /></Button>
                  <Button variant='danger' onClick={() => excluir(fornecedor)}><FaTrash /></Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Pagina>
  )
}
