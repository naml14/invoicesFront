import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import React, { useEffect, useState } from 'react';
import Input from '@mui/joy/Input';
import ExportPDFButton from '../components/PDFDocument';
import { useTokenContext } from "../utils/tokenContext";

function TableSheet() {

    const token = useTokenContext();
    const [data, setData] = useState([]);
    useEffect(() => {
        // Cargar datos desde la URL utilizando Axios
        const fetchData = async () => {
            try {
                const response = await axios.get('https://backend-invoice.onrender.com/api/v0/facturas');
                setData(response.data);
            } catch (error) {
                console.error('Error al cargar datos desde la URL:', error);
            }
        };

        fetchData();
    }, []);

    if (!token) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="App-header">
                <main style={{ marginTop: '-180px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                    <Sheet variant="soft" sx={{ pt: 1, borderRadius: 'sm', overflowY: 'auto', maxHeight: '80vh' }}>

                        <Table
                            stripe="odd"
                            hoverRow
                            sx={{ captionSide: 'top', '& tbody': { bgcolor: 'background.surface' } }}
                        >
                            <caption style={{ textAlign: 'center' }}>
                                <h1>Invoices</h1>

                                <h6>Search Project</h6>
                                <Input
                                    size="sm"
                                    placeholder="Search..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    width="20%"

                                />
                            </caption>
                            <thead>
                                <tr>
                                    <th style={{ width: '6%' }}>ID Invoice</th>
                                    <th style={{ width: '11%' }}>ID Project</th>
                                    <th style={{ width: '11%' }}>Name Project</th>
                                    <th style={{ width: '7%' }}>Client</th>
                                    <th style={{ width: '12%' }}>Date of Issue</th>
                                    <th style={{ width: '8%' }}>Price Hour</th>
                                    <th style={{ width: '8%' }}>Total Hours</th>
                                    <th style={{ width: '8%' }}>Total Invoice</th>
                                    <th style={{ width: '10%' }}>Status Invoice</th>
                                    <th style={{ width: '10%' }}> ↓ Invoice</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data
                                    .filter((row) =>
                                        row.nombreProyecto.toLowerCase().includes(searchTerm.toLowerCase())
                                    )
                                    .map((row, index) => (
                                        <tr key={index}>
                                            <td>{row.IdFactura}</td>
                                            <td>{row.idProyecto}</td>
                                            <td>{row.nombreProyecto}</td>
                                            <td>{row.Cliente}</td>
                                            <td>{row.FechaEmision}</td>
                                            <td>{row.TarifaHora + " US"}</td>
                                            <td>{row.TotalHoras + " Hrs"}</td>
                                            <td>{row.TarifaHora ? (row.TarifaHora * row.TotalHoras + " US") : "N/A"}</td>
                                            <td>{row.EstadoFactura}</td>
                                            <td style={{ display: 'flex', gap: '10px' }}>
                                                <ExportPDFButton data={row} />
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Sheet>
                </main>
            </div>
        </>
    );
}

export default TableSheet;
