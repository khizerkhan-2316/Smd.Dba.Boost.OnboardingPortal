import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: '10px 16px',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const BaseTable = ({
  columns,
  data,
  editHandler,
  deleteHandler,
  detailsHandler,
  onboardingHandler,
}: {
  columns: { id: string; label: string }[];
  data: any[];
  editHandler?: (id: string) => void;
  deleteHandler?: (id: string) => void;
  detailsHandler?: (id: string) => void;
  onboardingHandler?: (id: string) => void;
}) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 'auto' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell align="center" key={column.id}>
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((row) => (
              <StyledTableRow key={row.id}>
                {columns.map((column) =>
                  column.id === 'opdatere' ? (
                    <StyledTableCell
                      key={`${row.id}-${column.id}`}
                      align="center"
                    >
                      <IconButton
                        onClick={() => editHandler && editHandler(row.id)}
                        color="primary"
                        aria-label="edit"
                      >
                        <EditIcon />
                      </IconButton>
                    </StyledTableCell>
                  ) : column.id === 'delete' ? (
                    <StyledTableCell
                      key={`${row.id}-${column.id}`}
                      align="center"
                    >
                      <IconButton
                        onClick={() => deleteHandler && deleteHandler(row.id)}
                        color="error"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </StyledTableCell>
                  ) : column.id === 'details' ? (
                    <StyledTableCell
                      key={`${row.id}-${column.id}`}
                      align="center"
                    >
                      <IconButton
                        onClick={() => detailsHandler && detailsHandler(row.id)}
                        color="primary"
                        aria-label="details"
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </StyledTableCell>
                  ) : column.id === 'onboarding' ? (
                    <StyledTableCell
                      key={`${row.id}-${column.id}`}
                      align="center"
                    >
                      <IconButton
                        onClick={() =>
                          onboardingHandler && onboardingHandler(row.id)
                        }
                        color="primary"
                        aria-label="onboarding-details"
                      >
                        <LinearScaleIcon />
                      </IconButton>
                    </StyledTableCell>
                  ) : (
                    <StyledTableCell
                      key={`${row.id}-${column.id}`}
                      align="center"
                    >
                      {row[column.id]}
                    </StyledTableCell>
                  )
                )}
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;
