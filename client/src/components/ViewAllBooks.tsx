import { useEffect, useState } from 'react'
import { Database } from '../services/Database'
import type { Book } from '../models/model'
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

type ViewAllBooksProps = {
    database: Database
}

export default function ViewAllBooks({
    database,
}: ViewAllBooksProps): JSX.Element {
    const [books, setBooks] = useState<Book[]>()
    const [loading, setLoading] = useState<boolean>(true)

    const deleteBook = async (id: GridRowId): Promise<void> => {
        const statusCode = await database.deleteBook(id.toString())
        if (statusCode === 200) {
            setBooks(books?.filter((book) => book.id !== id))
        } else {
            console.error(`Unable to delete Book status code: ${statusCode}`)
        }
    }

    const getAllBooks = async (): Promise<void> => {
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

    const saveUpdatedCellToDb = async (updatedRow: Book): Promise<void> => {
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
            width: 150,
            editable: true,
            description: 'double-click to edit Title',
            headerAlign: 'center',
            valueSetter: setUpdatedTitle,
        },
        {
            field: 'author',
            headerName: 'Author',
            width: 150,
            editable: true,
            description: 'double-click to edit Author',
            headerAlign: 'center',
            valueSetter: setUpdatedAuthor,
        },
        {
            field: 'pages',
            headerName: 'Pages',
            width: 150,
            editable: true,
            description: 'double-click to edit Pgs',
            headerAlign: 'center',
            valueSetter: setUpdatedPgs,
        },
        {
            field: 'genre',
            headerName: 'Genre',
            width: 150,
            editable: true,
            description: 'double-click to edit Genre',
            headerAlign: 'center',
            valueSetter: setUpdatedGenre,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
            description: 'double-click to edit Price',
            headerAlign: 'center',
            valueSetter: setUpdatedPrice,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            width: 150,
            editable: true,
            description: 'double-click to edit Stock',
            headerAlign: 'center',
            valueSetter: setUpdatedStock,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: '',
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

    function loadAllBooks(): JSX.Element {
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

    return loadAllBooks()
}
