import { NextResponse } from 'next/server';
import { handleCommonError } from '@/server/errorHandlers';
import {
  getWorkshopServiceById,
  updateWorkshopService,
  removeWorkshopService,
} from '@/server/services/workshopServices';
import { WorkshopServiceUpdateSchema } from '@/schemas/WorkshopServicesSchema';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const workshopService = await getWorkshopServiceById(parseInt(params.id));
    if (!workshopService) {
      return NextResponse.json(
        {
          message: 'Servicio no Encontrado',
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(workshopService, { status: 200 });
  } catch (error) {
    return handleCommonError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const body = await request.json();
    const newData = WorkshopServiceUpdateSchema.parse(body);
    const workshopService = await updateWorkshopService(parseInt(params.id), newData);
    if (!workshopService) {
      return NextResponse.json(
        {
          message: 'No se pudo actualizar, servicio no encontrado',
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json({ workshopService }, { status: 200 });
  } catch (error) {
    return handleCommonError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const workshopService = await removeWorkshopService(parseInt(params.id));
    if (!workshopService) {
      return NextResponse.json(
        {
          message: 'No se pudo encontrar el servicio',
        },
        {
          status: 404,
        },
      );
    }
    return NextResponse.json(
      {
        workshopService,
        message: 'Servicio borrado exitosamente',
      },
      { status: 200 },
    );
  } catch (error) {
    return handleCommonError(error);
  }
}
