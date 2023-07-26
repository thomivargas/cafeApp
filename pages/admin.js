import useSWR from 'swr';
import axios from 'axios';
import AdminLayout from "../layout/AdminLayout"
import Orden from '../components/Orden';

export default function Admin() {
    const fetcher = () => axios('/api/ordenes').then((res) => res.data);
    const { data, error, isLoading } = useSWR('/api/ordenes', fetcher, { refreshInterval: 100 });
    console.log(data)

    return (
        <AdminLayout pagina={'Admin'}>
            <h1 className='text-3xl text-gray-800 font-light'>Panel de Administracion</h1>
            <p className="text-gray-500 mt-3">Ordenes</p>

            { data && data.length ? data.map( orden => 
                <Orden
                    key={orden.id}
                    orden={orden}
                />
            ) : <p>No hay ordenes</p>}
        </AdminLayout>
    )
}