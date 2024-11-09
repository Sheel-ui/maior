import HeatMap, { HeatMapValue } from '@uiw/react-heat-map';

interface HeatProps {
  value: HeatMapValue[]
}
const Demo = ({value}: HeatProps) => {
  console.log(value);
  return (
    <HeatMap
      className='w-2/3'
      value={value}
      width={600}
      startDate={new Date('2024/03/01')}
      rectSize={14}
      panelColors={{
        5: '#f7fee7',
        50: '#ecfccb',
        100: '#d9f99d',
        250: '#bef264',
        500: '#a3e635',
        1250: '#84cc16',
        3500: '#65a30d',
        5000: '#4d7c0f',
        8000: '#3f6212'
      }}
    />
  )
};
export default Demo