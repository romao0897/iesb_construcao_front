'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function FuncionariosPage() {

  const [funcionarios, setFuncionarios] = useState([])

  // Executa ao carregar a página
  useEffect(() => {
    // Carrega a lista de funcionários do localStorage ou inicia uma lista vazia
    const funcionariosLocalStorage = JSON.parse(localStorage.getItem("funcionarios")) || []
    setFuncionarios(funcionariosLocalStorage)
    console.log(funcionariosLocalStorage)
  }, [])

  // Função para exclusão do funcionário
  function excluir(funcionario) {
    // Confirmação de exclusão
    if (window.confirm(`Deseja realmente excluir o funcionário ${funcionario.nome}?`)) {
      // Filtra a lista para remover o funcionário
      const novaLista = funcionarios.filter(item => item.id !== funcionario.id)
      // Atualiza o localStorage e o estado
      localStorage.setItem('funcionarios', JSON.stringify(novaLista))
      setFuncionarios(novaLista)
      alert("Funcionário excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Funcionários"}>
      <div className='text-end mb-2'>
        <Button href='/Funcionarios/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Funcionários */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Sexo</th>
            <th>Cargo</th>
            <th>Salário</th>
            <th>Departamento</th>
            <th>Data de Contratação</th>
            <th>Telefone</th>
            <th>E-mail</th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map(funcionario => (
            <tr key={funcionario.id}>
              <td>{funcionario.nome}</td>
              <td>{funcionario.sexo}</td>
              <td>{funcionario.cargo}</td>
              <td>{funcionario.salario}</td>
              <td>{funcionario.departamento}</td>
              <td>{funcionario.dataContratacao}</td>
              <td>{funcionario.telefone}</td>
              <td>{funcionario.email}</td>
              <td className='text-center'>
                {/* Botões de ações */}
                <Button className='me-2' href={`/Funcionarios/form?id=${funcionario.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(funcionario)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
