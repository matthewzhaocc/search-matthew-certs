import express from 'express'
import elasticsearch, { Client } from '@elastic/elasticsearch'

export default () => {
    const router = express.Router()
    const es_index = process.env.ES_INDEX || "matthewcert"
    router.use(express.json())
    router.post("/new", async (req, res) => {
        const certname = req.body.certname
        
        const client = getEsClient()
        await client.index({
            index: es_index,
            body: {
                certname: certname
            }
        })
        await client.indices.refresh({ index: es_index })
        return res.send("success")
    })

    router.get("/search", async (req, res) => {
        const certname = req.query.certname
        const { body } = await getEsClient().search({
            index: es_index,
            body: {
                query: {
                    match: {
                        certname: certname
                    }
                }
            }
        })
        return res.json(body.hits)
    })
    return router
}

const getEsClient = () => {
    if (process.env.ES_USERNAME && process.env.ES_PASSWORD) {
        return new elasticsearch.Client({
            node: process.env.ES_HOST,
            auth: {
                username: process.env.ES_USERNAME || "elastic",
                password: process.env.ES_PASSWORD || "changeme"
            }
        })
    } else {
        return new elasticsearch.Client({
            node: process.env.ES_HOST
        })
    }
    
}