import { Translation } from './type';
import typeLabels from './typeLabels.json';


export const getTypeLabel = (type_id: number, is_translate: 'ru' | 'en' | 'zh' = 'ru'): string => {
  const labels: Record<string, Translation> = typeLabels;

  const label = labels[type_id.toString()];
  
  if (!label) {
    return is_translate === 'ru' ? 'Неизвестный' : is_translate === 'en' ? 'Unknown' : '未知';
  }

  return label[is_translate];
};
