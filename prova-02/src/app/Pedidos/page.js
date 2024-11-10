'use client'

import Pagina from '@/components/Pagina'
import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { FaPen, FaPlusCircle, FaTrash } from 'react-icons/fa'

export default function PedidosPage() {

  const [pedidos, setPedidos] = useState([])

  // Executa ao carregar a página
  useEffect(() => {
    // Carrega a lista de pedidos do localStorage ou inicia uma lista vazia
    const pedidosLocalStorage = JSON.parse(localStorage.getItem("pedidos")) || []
    setPedidos(pedidosLocalStorage)
    console.log(pedidosLocalStorage)
  }, [])

  // Função para exclusão do pedido
  function excluir(pedido) {
    // Confirmação de exclusão
    if (window.confirm(`Deseja realmente excluir o pedido de ${pedido.cliente}?`)) {
      // Filtra a lista para remover o pedido
      const novaLista = pedidos.filter(item => item.id !== pedido.id)
      // Atualiza o localStorage e o estado
      localStorage.setItem('pedidos', JSON.stringify(novaLista))
      setPedidos(novaLista)
      alert("Pedido excluído com sucesso!")
    }
  }

  return (
    <Pagina titulo={"Lista de Pedidos"}>
      <div className='text-end mb-2'>
        <Button href='/Pedidos/form'><FaPlusCircle /> Novo Pedido</Button>
      </div>

      {/* Tabela com os Pedidos */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Material</th>
            <th>Quantidade</th>
            <th>Preço Total</th>
            <th>Data do Pedido</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map(pedido => (
            <tr key={pedido.id}>
              <td>{pedido.cliente}</td>
              <td>{pedido.material}</td>
              <td>{pedido.quantidade}</td>
              <td>{pedido.precoTotal}</td>
              <td>{pedido.dataPedido}</td>
              <td>{pedido.status}</td>
              <td className='text-center'>
                {/* Botões de ações */}
                <Button className='me-2' href={`/Pedidos/form?id=${pedido.id}`}><FaPen /></Button>
                <Button variant='danger' onClick={() => excluir(pedido)}><FaTrash /></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Pagina>
  )
}
