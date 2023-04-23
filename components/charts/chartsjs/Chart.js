import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import ChartNote from './ChartNote';
import theme from '../../../theme';

export function Chart({ keys, values, options }) {
  const defaultOptions = {
    type: 'bar',
  };

  const chartOptions = {
    ...defaultOptions,
    ...options,
  };

  return (
    <div
      key={chartOptions.group_by.name}
      className={`chart ${chartOptions.type}-chart`}
    >
      <div className="chartContainer">
        <div
          className="chart__group--label-container"
          data-tip={chartOptions.group_by.description}
        >
          <h3 className="chart__group--label">
            <ReactTooltip place="bottom" />
            {chartOptions.group_by.name.replace(/_/g, ' ')}
          </h3>
          {chartOptions.group_by.description && (
            <span className="chart__group--description-icon">ⓘ</span>
          )}
        </div>
        {chartOptions.type === 'bar' ? (
          <BarChart
            recordKeys={keys}
            records={values}
            theme={theme}
            incompleteYears={chartOptions.incompleteYears}
          />
        ) : (
          <DoughnutChart recordKeys={keys} records={values} />
        )}
        {chartOptions.note && <ChartNote note={chartOptions.note} />}
      </div>
    </div>
  );
}

Chart.propTypes = {
  keys: PropTypes.array,
  values: PropTypes.array,
  options: PropTypes.object,
};
