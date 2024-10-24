import { useEffect, useState } from 'react'
import { Database } from '../services/Database'
import { NavLink } from 'react-router-dom'
import type {} from '@mui/x-data-grid/themeAugmentation'
import {
    GridRowId,
    GridRowsProp,
    GridValidRowModel,
} from '@mui/x-data-grid/models/gridRows'
import {
    GridColDef,
    GridValueSetter,
} from '@mui/x-data-grid/models/colDef/gridColDef'
import { DataGrid } from '@mui/x-data-grid/DataGrid/DataGrid'
import { GridActionsCellItem } from '@mui/x-data-grid/components/cell/GridActionsCellItem'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { z } from 'zod'
import { BookSchema } from '../zod/schemas/Book'

type ViewAllBooksProps = {
    database: Database
}
type Book = z.infer<typeof BookSchema>

export default function ViewAllBooks({
    database,
}: ViewAllBooksProps): JSX.Element {
    const [books, setBooks] = useState<Book[]>()
    const [loading, setLoading] = useState<boolean>(true)

    async function deleteBook(id: GridRowId): Promise<void> {
        const statusCode = await database.deleteBook(id.toString())
        if (statusCode === 200) {
            setBooks(books?.filter((book) => book.id !== id))
        } else {
            console.error(`Unable to delete Book status code: ${statusCode}`)
        }
    }

    async function getAllBooks(): Promise<void> {
        const books = await database.getAllBooks()
        setLoading(false)
        setBooks(books)
    }

    useEffect(() => {
        getAllBooks()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [books])

    const setUpdatedTitle: GridValueSetter<GridValidRowModel> = (
        value,
        row
    ) => {
        const title = value
        return { ...row, title }
    }
    const setUpdatedAuthor: GridValueSetter<GridValidRowModel> = (
        value,
        row
    ) => {
        const author = value
        return { ...row, author }
    }
    const setUpdatedPgs: GridValueSetter<GridValidRowModel> = (value, row) => {
        const pages = value
        return { ...row, pages }
    }
    const setUpdatedGenre: GridValueSetter<GridValidRowModel> = (
        value,
        row
    ) => {
        const genre = value
        return { ...row, genre }
    }
    const setUpdatedPrice: GridValueSetter<GridValidRowModel> = (
        value,
        row
    ) => {
        const price = value
        return { ...row, price }
    }
    const setUpdatedStock: GridValueSetter<GridValidRowModel> = (
        value,
        row
    ) => {
        const stock = value
        return { ...row, stock }
    }

    async function saveUpdatedCellToDb(updatedRow: Book): Promise<void> {
        const statusCode = await database.editBook(updatedRow)
        if (statusCode !== 200) {
            console.error('updated from DB failed')
        }
    }

    function updateErrMsg(): void {
        console.error('update FE failed')
    }

    const rows: GridRowsProp = books!

    const columns: GridColDef[] = [
        {
            field: 'title',
            headerName: 'Title',
            headerAlign: 'center',
            width: 225,
            headerClassName: 'data-grid-header',
            editable: true,
            description: 'double-click to edit Title',
            valueSetter: setUpdatedTitle,
        },
        {
            field: 'author',
            headerName: 'Author',
            headerAlign: 'center',
            width: 225,
            headerClassName: 'data-grid-header',
            editable: true,
            description: 'double-click to edit Author',
            valueSetter: setUpdatedAuthor,
        },
        {
            field: 'pages',
            headerName: 'Pages',
            headerAlign: 'center',
            width: 150,
            headerClassName: 'data-grid-header',
            editable: true,
            description: 'double-click to edit Pgs',
            valueSetter: setUpdatedPgs,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 200,
            headerClassName: 'data-grid-header',
            headerAlign: 'center',
            editable: true,
            description: 'double-click to edit Genre',
            valueSetter: setUpdatedGenre,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 140,
            headerClassName: 'data-grid-header',
            editable: true,
            description: 'double-click to edit Price',
            headerAlign: 'center',
            valueSetter: setUpdatedPrice,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 140,
            headerClassName: 'data-grid-header',
            headerAlign: 'center',
            editable: true,
            description: 'double-click to edit Stock',
            valueSetter: setUpdatedStock,
        },
        {
            field: 'actions',
            type: 'actions',
            headerClassName: 'data-grid-header',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                return [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => deleteBook(id)}
                        color="inherit"
                    />,
                ]
            },
        },
    ]

    function renderAllBooks(): JSX.Element {
        if (!database.isAuthorized()) {
            return (
                <>
                    <br />
                    <NavLink to={'/login'}> Must Login First</NavLink>
                </>
            )
        }
        return (
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    sx={{
                        '.MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold',
                        },
                    }}
                    loading={loading}
                    rows={rows}
                    columns={columns}
                    processRowUpdate={(updatedRow) => {
                        saveUpdatedCellToDb(updatedRow)
                        return updatedRow
                    }}
                    onProcessRowUpdateError={updateErrMsg}
                />
            </div>
        )
    }

    return renderAllBooks()
}
