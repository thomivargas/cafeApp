import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
    const prisma = new PrismaClient();
    if(req.method === 'POST'){
        const { id } = req.query;
        try {
            const orden = await prisma.ordenes.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    estado: true
                }
            });
            res.status(200).json(orden);
        } catch(error) {
            console.log(error);
            res.status(500).json({mensaje: 'Hubo un error'});
        }
    }
}