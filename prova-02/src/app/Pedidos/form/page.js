'use client'

import Pagina from '@/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import * as Yup from 'yup'
import { useEffect } from 'react'

export default function PedidoFormPage(props) {
  const router = useRouter()
  const pedidos = JSON.parse(localStorage.getItem('pedidos')) || []

  const id = props.searchParams.id
  const pedidoEditado = pedidos.find(item => item.id == id)

  function salvar(dados) {
    if (pedidoEditado) {
      Object.assign(pedidoEditado, dados)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
    } else {
      dados.id = v4()
      pedidos.push(dados)
      localStorage.setItem('pedidos', JSON.stringify(pedidos))
    }
    alert("Pedido salvo com sucesso!")
    router.push("/Pedidos")
  }

  const initialValues = {
    cliente: '',
    material: '',
    quantidade: '',
    precoTotal: '',
    dataPedido: '',
    status: ''
  }

  const validationSchema = Yup.object().shape({
    cliente: Yup.string().required("Campo obrigatório"),
    material: Yup.string().required("Campo obrigatório"),
    quantidade: Yup.number().required("Campo obrigatório").positive("Quantidade deve ser positiva"),
    precoTotal: Yup.number().required("Campo obrigatório").positive("Preço total deve ser positivo"),
    dataPedido: Yup.date().required("Campo obrigatório"),
    status: Yup.string().required("Campo obrigatório")
  })

  return (
    <Pagina titulo={"Cadastro de Pedido"}>
      <Formik
        initialValues={pedidoEditado || initialValues}
        validationSchema={validationSchema}
        onSubmit={salvar}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Cliente:</Form.Label>
                  <Form.Control
                    name='cliente'
                    type='text'
                    value={values.cliente}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.cliente && !errors.cliente}
                    isInvalid={touched.cliente && errors.cliente}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.cliente}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Material:</Form.Label>
                  <Form.Control
                    name='material'
                    type='text'
                    value={values.material}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.material && !errors.material}
                    isInvalid={touched.material && errors.material}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.material}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Quantidade:</Form.Label>
                  <Form.Control
                    name='quantidade'
                    type='number'
                    value={values.quantidade}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.quantidade && !errors.quantidade}
                    isInvalid={touched.quantidade && errors.quantidade}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.quantidade}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Preço Total:</Form.Label>
                  <Form.Control
                    name='precoTotal'
                    type='number'
                    value={values.precoTotal}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.precoTotal && !errors.precoTotal}
                    isInvalid={touched.precoTotal && errors.precoTotal}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.precoTotal}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Row className='mb-2'>
                <Form.Group as={Col}>
                  <Form.Label>Data do Pedido:</Form.Label>
                  <Form.Control
                    name='dataPedido'
                    type='date'
                    value={values.dataPedido}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.dataPedido && !errors.dataPedido}
                    isInvalid={touched.dataPedido && errors.dataPedido}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.dataPedido}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col}>
                  <Form.Label>Status:</Form.Label>
                  <Form.Select
                    name='status'
                    value={values.status}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.status && !errors.status}
                    isInvalid={touched.status && errors.status}
                  >
                    <option value="">Selecione o status</option>
                    <option value="Pendente">Pendente</option>
                    <option value="Em processamento">Em processamento</option>
                    <option value="Concluído">Concluído</option>
                    <option value="Cancelado">Cancelado</option>
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>{errors.status}</Form.Control.Feedback>
                </Form.Group>
              </Row>

              <Form.Group className='text-end'>
                <Button className='me-2' href='/Pedidos'><FaArrowLeft /> Voltar</Button>
                <Button type='submit' variant='success'><FaCheck /> Enviar</Button>
              </Form.Group>
            </Form>
          )
        }}
      </Formik>
    </Pagina>
  )
}
