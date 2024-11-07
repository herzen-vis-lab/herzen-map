// Определяем интерфейс пропсов для AdminTable
type Props = {
    points: any[];
};

const AdminTable = ({ points }: Props) => {
  return (
    <div>
      <h2>Точки данных</h2>
      <ul>
        {points.map((point, index) => (
          <li key={point.id || index}>
            <strong>ID:</strong> {point.id} <br />
            <strong>Longitude:</strong> {point.longitude} <br />
            <strong>Latitude:</strong> {point.latitude} <br />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminTable;
