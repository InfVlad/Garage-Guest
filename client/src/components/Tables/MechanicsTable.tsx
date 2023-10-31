'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from '@/components/ui';
import { useQuery } from '@tanstack/react-query';
import { getMechanics, deleteMechanic } from '@/services/mechanicsService';
import { usePagination } from '@/hooks/usePagination';
import { StatusChip } from '../StatusChip';
import { ActionsButtons } from '../ActionsButtons';
import { TableContainer } from '../TableContainer';

export const MechanicsTable = ({ children }: { children: React.ReactNode }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['mechanics'],
    queryFn: getMechanics,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  const itemsPerPage = 10;
  const { currentPage, setCurrentPage, totalPages, PaginationButtons } = usePagination(
    data?.mechanics.length ?? 1,
    itemsPerPage,
  );

  if (isLoading) return <div className='w-full'>{children}</div>;
  if (isError) return <div>Error: {String(error)}</div>;
  if (data.mechanics.length === 0) {
    return (
      <div className='flex h-full w-full items-center justify-center'>
        <div>No hay Mecánicos para mostrar</div>
      </div>
    );
  }
  const reversedMechanics = [...data.mechanics].reverse();
  const mechanicsOnCurrentPage = reversedMechanics.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  return (
    <TableContainer>
      <Text variant='title' className='mb-4 text-center text-slate-800 dark:text-white'>
        Lista de Mecánicos
      </Text>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nombre</TableHead>
            <TableHead>DNI</TableHead>
            <TableHead>Teléfono</TableHead>
            <TableHead>Dirección</TableHead>
            <TableHead>Estatus</TableHead>
            <TableHead className='text-center'>Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mechanicsOnCurrentPage.map(({ id, isActive, name, dni, phone, address }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{dni}</TableCell>
              <TableCell>{phone}</TableCell>
              <TableCell>{address}</TableCell>
              <TableCell>
                <StatusChip isActive={isActive} />
              </TableCell>
              <TableCell className='flex items-center justify-center'>
                <ActionsButtons
                  deleteFunction={deleteMechanic}
                  id={id}
                  category='mechanics'
                  deleteDescription={`Esta seguro que desea borrar al empleado: ${name}. Borrarlo afectara a las ordenes relacionadas`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationButtons
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </TableContainer>
  );
};
