'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function AlunosPage() {

  const [alunos, setAlunos] = useState([])

  // Faz alguma coisa quando o usuário acessa a tela
  useEffect(() => {
    // Busca a lista do localStorage, se não existir, inicia uma vazia
    const alunosLocalStorage = JSON.parse(localStorage.getItem("alunos")) || []
    // guarda a lista no estado alunos
    setAlunos(alunosLocalStorage)
    console.log(alunosLocalStorage)
  }, [])

  // Função para exclusão do item
  function excluir(aluno) {
    // Confirma com o usuário a exclusão
    if (window.confirm(`Deseja realmente excluir o aluno ${aluno.nome} ${aluno.sobrenome}?`)) {
      // filtra a lista antiga removando o aluno recebido
      const novaLista = alunos.filter(item => item.id !== aluno.id)
      // grava no localStorage a nova lista
      localStorage.setItem('alunos', JSON.stringify(novaLista))
      // grava a nova lista no estado para renderizar na tela
      setAlunos(novaLista)
      alert("Aluno excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Alunos"}>
      <div className='text-end mb-2'>
        <Button href='/alunos/form'><FaPlusCircle /> Novo</Button>
      </div>

      {/* Tabela com os Alunos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Matrícula</th>
            <th>Nome</th>
            <th>Sobrenome</th>
            <th>Faculdade</th>
            <th>Curso</th>
            <th>Período</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map(aluno => {
            return (
            <tr key={aluno.id}>
              <td>
                {aluno.foto ? (
                  <img src={aluno.foto} alt="Foto do aluno" style={{ maxWidth: '50px', borderRadius: '50%' }} />
                ) : (
                  <div style={{ width: '50px', height: '50px', backgroundColor: '#f0f0f0', borderRadius: '50%' }}></div>
                )}
              </td>
              <td>{aluno.matricula}</td>
              <td>{aluno.nome}</td>
              <td>{aluno.sobrenome}</td>
              <td>{aluno.faculdade}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.periodo}</td>
              <td className='text-center'>
                <Button className='me-2' href={`/alunos/form?id=${aluno.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(aluno)}><FaTrash /></Button>
              </td>
            </tr>
            )
        })}
        </tbody>
      </Table>
    </Pagina>
  )
}