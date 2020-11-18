import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DataTable = ({ datasets }) => (
  <Table>
    <thead>
      <tr>
        <th>Data Set</th>
        <th>Last Updated</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {datasets.map((dataset, index) => (
        <tr key={index}>
          <td>
            <h4>{dataset.title}</h4>
            <p>{dataset.description}</p>
          </td>
          <td>{dataset.date}</td>
          <td>
            <a href={dataset.link}>View</a>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);
export default DataTable;

DataTable.propTypes = {
  datasets: PropTypes.object.isRequired,
};

const Table = styled.table``;
