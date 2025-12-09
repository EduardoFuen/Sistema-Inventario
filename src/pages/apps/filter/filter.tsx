import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { Grid, TextField } from '@mui/material';
import { Button } from '@mui/material';
import { useFilterContext } from 'contexts/Filter.context';
import React, { useState } from 'react';
import { FilterPurchase } from 'types/filterPurchase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'store';


export const listafiltrada = [];
const parseDDMMYYYY = (dateString: string): Date | null => {
    const parts = dateString.split(/[\/-]/);

    if (parts.length !== 3) {
        return null;
    }

    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        return null;
    }

    const dateObject = new Date(Date.UTC(year, month - 1, day));

    if (dateObject.getUTCFullYear() !== year || dateObject.getUTCMonth() !== month - 1 || dateObject.getUTCDate() !== day) {
        return null;
    }

    return dateObject;
};

export const filterByRange = (data: FilterPurchase[], property: keyof FilterPurchase, range: { min: number; max: number }): FilterPurchase[] => {
    return data.filter((item) => {
        const value = item[property];
        let numericValue: number | undefined;

        if (typeof value === 'string') {
            const customDate = parseDDMMYYYY(value);

            if (customDate) {
                numericValue = customDate.getTime();
            }
        } else if (typeof value === 'number') {
            numericValue = value;
        }

        if (typeof numericValue !== 'number') {
            return false;
        }

        return numericValue >= range.min && numericValue <= range.max;
    });
};
//funcion para filtrar por rango de fechas
export function Filter() {
    const { listPurchase } = useSelector((state) => state.purchase);
    const history = useNavigate();
    const { setLista, setDateFrom, setDateTo } = useFilterContext();

    const [dataForm, setDataForm] = useState<{
        dateFrom: Date | null;
        dateTo: Date | null;
    }>({
        dateFrom: new Date(),
        dateTo: new Date()
    });

    const handleFilter = () => {
        if (!dataForm.dateFrom || !dataForm.dateTo) {
            alert("'Desde' y 'Hasta', son necesarios.");
            return;
        }

        const fromDate = dataForm.dateFrom;
        const toDate = dataForm.dateTo;

        const min = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();

        const max = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate(), 23, 59, 59, 999).getTime();

        const filteredData = filterByRange(listPurchase, 'CreatedAt', { min, max });
        setLista(filteredData);

        // Guardar las fechas en el contexto
        setDateFrom(fromDate);
        setDateTo(toDate);

        history('/filter/list');
    };
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={3}>
                <Grid item xs={8}>
                    <DatePicker
                        disableFuture
                        label="Desde"
                        value={dataForm.dateFrom}
                        onChange={(newValue: Date | null) => {
                            setDataForm({ ...dataForm, dateFrom: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={8}>
                    <DatePicker
                        disableFuture
                        label="Hasta"
                        value={dataForm.dateTo}
                        minDate={dataForm.dateFrom ?? undefined}
                        onChange={(newValue: Date | null) => {
                            setDataForm({ ...dataForm, dateTo: newValue });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </Grid>
                <Grid item xs={8}>
                    <Button variant="contained" onClick={handleFilter}>
                        Filtrar
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
}
export default Filter;

//funcion para encontrar el comprador mas frecuente
export function findTopComprador(lista: FilterPurchase[]): string | null {
    if (lista.length === 0) {
        return null;
    }


    const contador: { [key: string]: number } = {};


    let compradorMasFrecuente: string | null = null;
    let maxCount = 0;

    lista.forEach((venta) => {

        const nombreComprador: string =
            venta.BusinessName ?? venta.Supplier?.BusinessName ?? 'Desconocido';

        contador[nombreComprador] = (contador[nombreComprador] || 0) + 1;

        if (contador[nombreComprador] > maxCount) {
            maxCount = contador[nombreComprador];
            compradorMasFrecuente = nombreComprador;
        }
    });

    return compradorMasFrecuente;
}

//funcion para encontrar la venta mas alta
export function findTopVenta(lista: FilterPurchase[]): FilterPurchase | null {
    if (!lista || lista.length === 0) return null;

    return lista.reduce((top: FilterPurchase | null, actual: FilterPurchase) => {
        const valorActual = Number(actual.Total);
        const valorTop = top !== null ? Number(top.Total) : -Infinity;

        if (!isNaN(valorActual) && valorActual > valorTop) {
            return actual;
        }

        return top;
    }, null);
}
