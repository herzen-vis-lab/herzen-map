import { getStatusLabel, getTypeLabel } from 'utils';

export const columns = [
  { label: 'Названия', accessor: 'names.ru', maxWidth: 150 },
  { label: 'Описания', accessor: 'descriptions.ru', maxWidth: 300 },
  { label: 'Долгота', accessor: 'longitude', maxWidth: 100 },
  { label: 'Широта', accessor: 'latitude', maxWidth: 100 },
  {
    label: 'Тип',
    accessor: 'type_id',
    maxWidth: 100,
    render: (type_id: number) => getTypeLabel(type_id),
  },
  {
    label: 'Статус',
    accessor: 'status_id',
    maxWidth: 50,
    render: (status_id: number) => getStatusLabel(status_id),
  },
];
