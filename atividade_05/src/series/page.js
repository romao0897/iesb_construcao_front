'use client'

import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import apiSerie from "../apis/apiSerie.js";
import Pagina from "../components/Pagina";

export default function Serie() {

    // Armazenar um dado para que o react saiba que ele sofreu alguma mudança
    // e mude na tela
    const [series, setSerie] = useState([])

    // Efeito Colateral
    useEffect(() => {
        // A requisição pra buscar os filmes
        buscarSerie()
    }, [])

    async function buscarSerie() {
        const resultado = await apiSerie.get("/tv/popular?language=pt-BR")
        console.log(resultado.data.results)
        // alterando o estado filmes para receber os filmes da requisição
        setSerie(resultado.data.results)
    }


    return (
        <Pagina titulo="Séries Populares">

            <Row md={4}>
                {
                    series.map(series => {
                        return (
                            <Col className="py-2">
                                <Card style={{ height: '100%' }}>
                                    <Card.Img src={'https://image.tmdb.org/t/p/w500/' + series.poster_path} />
                                    <Card.Body>
                                        <Card.Title>{series.original_title}</Card.Title>
                                        <p><b>Nota: {series.vote_average} ⭐</b></p>
                                    </Card.Body>
                                    <Card.Footer className="text-end">
                                        <Button href={"/series/" + series.id}>Detalhes</Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>

        </Pagina>
    )
}